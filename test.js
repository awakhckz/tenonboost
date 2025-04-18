import express from 'express'
import axios from 'axios'
import cors from 'cors'
import dotenv from 'dotenv'
import morgan from 'morgan'
import nodemailer from 'nodemailer'

// Load environment variables
dotenv.config()

// Initialize Express
const app = express()
app.use(morgan('combined'))
app.use(cors())
app.use(express.json())

const PAYMENTRECEIVER_API_KEY = process.env.PAYMENTRECEIVER_API_KEY
const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN
const TELEGRAM_CHAT_ID = process.env.TG_CHAT_ID

// Rate limiting
import rateLimit from 'express-rate-limit'
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200,
  message: 'Too many requests, please try again later',
})

app.use('/api/', apiLimiter)

// Security headers
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff')
  res.setHeader('X-Frame-Options', 'DENY')
  res.setHeader('X-XSS-Protection', '1; mode=block')
  res.setHeader('Referrer-Policy', 'same-origin')
  next()
})

// Generate Payment Link
app.post('/api/generate-payment-link', async (req, res) => {
  const { totalPrice, email, categoryType, serviceType, link, quantity } = req.body

  if (!totalPrice || !email || !serviceType) {
    return res.status(400).json({
      status: 'error',
      message: 'Missing required fields',
    })
  }

  try {
    const tx_ref = `TENON-${Date.now()}-${Math.floor(Math.random() * 1000)}`

    const paymentPayload = {
      tx_ref,
      amount: parseFloat(totalPrice).toFixed(2),
      currency: 'NGN',
      redirect_url: `https://yourdomain.com/order/verify/${tx_ref}`,
      customer: {
        email,
        name: email.split('@')[0] || 'Customer',
      },
      customizations: {
        title: 'TenonBoost',
        logo: 'https://yourdomain.com/logo.png',
      },
      meta: {
        serviceType,
        link: link || '',
        quantity: quantity || 1,
      },
    }

    const response = await axios.post('https://api.flutterwave.com/v3/payments', paymentPayload, {
      headers: {
        Authorization: `Bearer ${PAYMENTRECEIVER_API_KEY}`,
        'Content-Type': 'application/json',
      },
      timeout: 15000,
    })

    if (!response.data?.data?.link) {
      throw new Error('Invalid response from Flutterwave')
    }

    return res.json({
      status: 'success',
      paymentLink: response.data.data.link,
      reference: tx_ref,
    })
  } catch (error) {
    console.error('Payment processing error:', error.response?.data || error.message)
    return res.status(500).json({
      status: 'error',
      message: 'Failed to create payment link',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    })
  }
})

// Flutterwave Webhook
app.post('/flutterwave-webhook', async (req, res) => {
  // Verify webhook signature
  const secretHash = process.env.FLUTTERWAVE_WEBHOOK_SECRET
  const signature = req.headers['verif-hash']

  if (secretHash && signature !== secretHash) {
    console.warn('⚠️ Unauthorized webhook attempt')
    return res.status(401).end()
  }

  const { event, data } = req.body
  console.log('Webhook received:', { event, ref: data?.tx_ref })

  if (event === 'charge.completed') {
    try {
      // Process successful payment
      if (data.status === 'successful') {
        // Send notifications
        if (TELEGRAM_BOT_TOKEN && TELEGRAM_CHAT_ID) {
          const message = `
<b>💰 Payment Verified</b>
━━━━━━━━━━━━━━━━
• <b>Order ID</b>: <code>${data.tx_ref}</code>
• <b>Amount</b>: ${data.currency} ${data.amount}
• <b>Service</b>: ${data.meta?.serviceType || 'N/A'}
• <b>Customer</b>: <code>${data.customer?.email || 'N/A'}</code>
━━━━━━━━━━━━━━━━
<i>${new Date().toLocaleString()}</i>`

          await axios.post(
            `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
            {
              chat_id: TELEGRAM_CHAT_ID,
              text: message,
              parse_mode: 'HTML',
            },
            { timeout: 5000 },
          )
        }

        // Send confirmation email
        if (process.env.GMAIL_USER && data.customer?.email) {
          await transporter.sendMail({
            from: `"Tenon Boost" <${process.env.GMAIL_USER}>`,
            to: data.customer.email,
            subject: 'Payment Confirmed',
            html: `Your payment for ${data.meta?.serviceType} was successfully processed.`,
          })
        }
      }
    } catch (error) {
      console.error('Webhook processing failed:', error)
    }
  }

  res.status(200).end()
})

// Verify Payment Status
app.get('/api/verify-payment/:tx_ref', async (req, res) => {
  try {
    const { tx_ref } = req.params

    // Verify with Flutterwave API directly
    const response = await axios.get(
      `https://api.flutterwave.com/v3/transactions/verify_by_reference?tx_ref=${tx_ref}`,
      {
        headers: {
          Authorization: `Bearer ${PAYMENTRECEIVER_API_KEY}`,
        },
        timeout: 10000,
      },
    )

    const paymentData = response.data.data
    if (!paymentData) {
      return res.status(404).json({ error: 'Transaction not found' })
    }

    res.json({
      status: paymentData.status === 'successful' ? 'success' : 'failed',
      amount: paymentData.amount,
      currency: paymentData.currency,
      serviceType: paymentData.meta?.serviceType,
    })
  } catch (error) {
    console.error('Payment verification failed:', error.message)

    if (error.response?.status === 404) {
      return res.status(404).json({ error: 'Transaction not found' })
    }

    res.status(500).json({
      error: 'Payment verification failed',
      message: error.message,
    })
  }
})

// Configure Nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
})

// Start Server
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
