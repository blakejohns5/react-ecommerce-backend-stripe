require('dotenv').config();

const express = require('express');

const app = express();
app.use(express.json());

const cors = require('cors');
app.use(cors({
    origin: '*',
}))

const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY);

app.post('/create-checkout-session', async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: req.body.cartItems.map(item => {
          const priceInCents = item.price * 100;
          return {
              price_data: {
                  currency: 'eur',
                  product_data: {
                      name: item.name
                  },
                  unit_amount: priceInCents,
              },
              quantity: item.qty,
          }
      }),
      success_url: `${process.env.CLIENT_URL}/success.html`,
      cancel_url: `${process.env.CLIENT_URL}/cancel.html`,
    })
    res.json({ url: session.url })
  } catch (error) {
      res.status(500).json({
          error: error.message
      })
  }
})

const PORT = 4242;

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})
