const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export default async function checkoutHandler(req, res) {
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
        "http://localhost:5173/account/checkout/success?session_id={CHECKOUT_SESSION_ID}",
      cancel_url:
        "http://localhost:5173/account/checkout/cancel?session_id={CHECKOUT_SESSION_ID}",
    });

    res.json({ url: session.url });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}
