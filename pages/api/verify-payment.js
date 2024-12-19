import axios from 'axios';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { reference } = req.body;

    try {
      const response = await axios.get(`https://api.paystack.co/transaction/verify/${reference}`, {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        },
      });

      if (response.data.status && response.data.data.status === 'success') {
        res.status(200).json({ success: true, data: response.data.data });
      } else {
        res.status(400).json({ success: false, message: 'Payment verification failed' });
      }
    } catch (error) {
      res.status(500).json({ success: false, message: 'Server error', error: error.message });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
