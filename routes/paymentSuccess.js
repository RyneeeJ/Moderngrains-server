const express = require("express");
const router = express.Router();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

router.get("/", async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.retrieve(
      req.query.session_id
    );

    res.json({ status: session.payment_status });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

module.exports = router;
