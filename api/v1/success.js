export default async function checkoutSuccessHandler(req, res) {
  try {
    const session = await stripe.checkout.sessions.retrieve(
      req.query.session_id
    );

    res.json({ status: session.payment_status });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}
