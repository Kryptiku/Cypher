const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// ReCAPTCHA secret key from .env
const RECAPTCHA_SECRET_KEY = process.env.SITE_SECRET;

app.post('/verify-captcha', async (req, res) => {
  const { token } = req.body;


  try {
    const response = await axios.post(`https://www.google.com/recaptcha/api/siteverify`, null, {
      params: {
        secret: RECAPTCHA_SECRET_KEY,
        response: token,
      },
    });

    const { success } = response.data;

    if (success) {
      return res.status(200).json({ message: 'CAPTCHA verified successfully!' });
    } else {
      return res.status(400).json({ message: 'CAPTCHA verification failed.' });
    }
  } catch (error) {
    return res.status(500).json({ message: 'Error verifying CAPTCHA.', error: error.message });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
