const express = require("express");
const router = express.Router();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

router.post("/", async (req, res) => {
  try {
    const items = req.body.items;
    let lineItems = [];
    items.forEach((item) => {
      lineItems.push({
        price: item.stripeId,
        quantity: item.quantity,
      });
    });

    const session = await stripe.checkout.sessions.create({
      line_items: lineItems,
      mode: "payment",
      success_url:
        "https://moderngrains-rpg.netlify.app/account/checkout/success?session_id={CHECKOUT_SESSION_ID}",
      cancel_url:
        "https://moderngrains-rpg.netlify.app/account/checkout/cancel?session_id={CHECKOUT_SESSION_ID}",
    });

    res.json({ url: session.url });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

module.exports = router;
