import express from 'express'
import axios from 'axios'
import cors from 'cors'
import dotenv from 'dotenv'
import process from 'process'
import nodemailer from 'nodemailer'

// Load environment variables
dotenv.config()

// Initialize Express
const app = express()

// Middleware
app.use(cors())
app.use(express.json())

// Flutterwave Configuration
const FLUTTERWAVE_API_KEY = process.env.FLUTTERWAVE_API_KEY
const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN
const TELEGRAM_CHAT_ID = process.env.TG_CHAT_ID

// ReallySimpleSocial API Configuration
const REALLY_SIMPLE_SOCIAL_API_URL = 'https://reallysimplesocial.com/api/v2'

const apiKeyAuth = (req, res, next) => {
    const apiKey = req.headers['x-api-key'] || req.query.api_key;

    if (!apiKey || apiKey !== '127tenonenterprice127') {
        return res.status(401).json({ error: 'Unauthorized: Invalid or missing API key' });
    }
    next();
};

// Fetch Services
app.get('/api/services', apiKeyAuth, async (req, res) => {
  try {
    const response = await axios.post(
      REALLY_SIMPLE_SOCIAL_API_URL,
      {
        key: process.env.REALLY_SIMPLE_SOCIAL_API_KEY,
        action: 'services',
      },
      {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      },
    )

    console.log('API Response:', response.data)

    if (!response.data) {
      throw new Error('No services found in the response')
    }

    res.json({ status: 'success', services: response.data })
  } catch (error) {
    console.error('Error fetching services:', error.response?.data || error.message)
    res.status(500).json({ error: 'Failed to fetch services' })
  }
})

app.post('/api/generate-payment-link', async (req, res) => {
  const { totalPrice, email, categoryType, serviceType, link, quantity } = req.body

  // Enhanced logging
  console.log('Payment request received:', {
    amount: totalPrice,
    email: email,
    service: serviceType,
    timestamp: new Date().toISOString(),
  })

  // Input validation
  if (!totalPrice || !email || !serviceType) {
    console.error('Missing required fields')
    return res.status(400).json({
      status: 'error',
      message: 'Missing required fields (amount, email, serviceType)',
    })
  }

  try {
    const tx_ref = `TENON-${Date.now()}-${Math.floor(Math.random() * 1000)}`
    const redirectUrl = new URL('https://tenonboost.online/order/success')
    redirectUrl.searchParams.append('serviceType', serviceType)
    redirectUrl.searchParams.append('quantity', quantity)
    redirectUrl.searchParams.append('amount', totalPrice)
    redirectUrl.searchParams.append('email', email)
    redirectUrl.searchParams.append('link', link || '')
    redirectUrl.searchParams.append('transaction_id', tx_ref)

    // Send initial Telegram notification (payment initiated)
    if (TELEGRAM_BOT_TOKEN && TELEGRAM_CHAT_ID) {
      const initMessage = `
<b>🔄 Payment Initiated</b>
━━━━━━━━━━━━━━━━
• <b>Order ID</b>: <code>${tx_ref}</code>
• <b>Amount</b>: NGN ${totalPrice}
• <b>Category</b>: ${categoryType}
• <b>Service</b>: ${serviceType}
• <b>Quantity</b>: ${quantity}
• <b>Link</b>: <code>${link}</code>
• <b>Customer</b>: <code>${email}</code>
━━━━━━━━━━━━━━━━
<i>${new Date().toLocaleString()}</i>
      `

      await axios
        .post(
          `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
          {
            chat_id: TELEGRAM_CHAT_ID,
            text: initMessage,
            parse_mode: 'HTML',
          },
          { timeout: 10000 },
        )
        .catch((e) => console.error('Telegram init notification failed:', e.message))
    }

    const flutterwavePayload = {
      tx_ref,
      amount: parseFloat(totalPrice).toFixed(2),
      currency: 'NGN',
      redirect_url: redirectUrl.toString(),
      customer: {
        email,
        name: email.split('@')[0] || 'Customer',
      },
      meta: {
        serviceType,
        link: link || 'N/A',
        quantity: quantity || 1,
      },
      customizations: {
        title: 'TenonBoost',
        logo: 'https://tenonboost.online/assets/logo-colored.avif',
        description: `${serviceType} purchase`,
      },
    }

    console.log('Sending to Flutterwave:', {
      payload: flutterwavePayload,
      key: FLUTTERWAVE_API_KEY ? '***' + FLUTTERWAVE_API_KEY.slice(-4) : 'MISSING',
    })

    const response = await axios.post(
      'https://api.flutterwave.com/v3/payments',
      flutterwavePayload,
      {
        headers: {
          Authorization: `Bearer ${FLUTTERWAVE_API_KEY}`,
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        timeout: 10000,
      },
    )

    if (!response.data?.data?.link) {
      throw new Error('Invalid response from Flutterwave')
    }

    console.log('Payment link generated:', {
      reference: tx_ref,
      link: response.data.data.link,
    })

    return res.json({
      status: 'success',
      paymentLink: response.data.data.link,
      reference: tx_ref,
    })
  } catch (error) {
    console.error('Payment processing failed:', {
      message: error.message,
      response: error.response?.data,
    })

    return res.status(500).json({
      status: 'error',
      message: 'Payment processing failed',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    })
  }
})

app.post('/user_order', async (req, res) => {
  // 1. Verify webhook signature
  const secretHash = process.env.FLUTTERWAVE_WEBHOOK_SECRET
  const signature = req.headers['verif-hash']

  if (secretHash && signature !== secretHash) {
    console.warn('⚠️ Unauthorized webhook attempt')
    return res.status(401).end()
  }

  // 2. Get payment data
  const { event, data } = req.body
  console.log('Webhook received:', { event, ref: data?.tx_ref })

  // 3. Process successful payments
  if (event === 'charge.completed' && data?.status === 'successful') {
    try {
      // 4. Verify config
      if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
        throw new Error('Missing Telegram config')
      }

      // 5. Format message (identical to your Postman test)
      const message = `
<b>💰 Payment Verified</b>
━━━━━━━━━━━━━━━━
• <b>Order ID</b>: <code>${data.tx_ref}</code>
• <b>Amount</b>: ${data.currency} ${data.amount}
• <b>Service</b>: ${data.meta?.serviceType || 'N/A'}
━━━━━━━━━━━━━━━━
<i>${new Date().toLocaleString()}</i>
      `.trim()

      // 6. Send to Telegram (using same format as Postman)
      const telegramResponse = await axios.post(
        `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
        {
          chat_id: TELEGRAM_CHAT_ID,
          text: message,
          parse_mode: 'HTML',
        },
        { timeout: 5000 },
      )

      console.log('Telegram notification sent:', {
        status: telegramResponse.status,
        data: telegramResponse.data,
      })

      return res.status(200).end()
    } catch (error) {
      console.error('Telegram failed:', {
        error: error.message,
        response: error.response?.data,
        config: {
          token: TELEGRAM_BOT_TOKEN ? '***' + TELEGRAM_BOT_TOKEN.slice(-4) : 'MISSING',
          chatId: TELEGRAM_CHAT_ID,
        },
      })
    }
  }

  res.status(200).end()
})

// Configure Nodemailer transporter (Gmail)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER, // Your Gmail (from .env)
    pass: process.env.GMAIL_APP_PASSWORD, // App Password (from .env)
  },
})

// Email endpoint
app.post('/api/send-email', async (req, res) => {
  const { to, subject, html } = req.body
  console.log('Received body:', req.body)

  try {
    // Send email
    await transporter.sendMail({
      from: `"Tenon Boost" <${process.env.GMAIL_USER}>`,
      to,
      subject,
      html: req.body.html, // Critical: Use 'html' (not 'text')
      headers: {
        'Content-Type': 'text/html; charset=utf-8', // Force HTML interpretation
      },
    })

    res.status(200).json({ message: 'Email sent successfully!' })
  } catch (error) {
    console.error('Error sending email:', error)
    res.status(500).json({ error: 'Failed to send email' })
  }
})

app.get('/api/debug', (req, res) => {
  res.json({
    status: 'OK',
    flutterwaveKey: !!FLUTTERWAVE_API_KEY,
    backend: 'Running',
  })
})

// Start Server
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
