// api/generate-key.js
import crypto from 'crypto'

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email } = req.body

    if (!email) {
      return res.status(400).json({ error: 'Email is required' })
    }

    const apiKey = crypto.randomBytes(32).toString('hex')
    // Store the API key in a database or in-memory storage
    // For simplicity, we'll just return it here
    res.status(200).json({ apiKey })
  } else {
    res.status(405).json({ error: 'Method not allowed' })
  }
}
