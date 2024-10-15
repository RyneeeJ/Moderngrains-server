export default async function checkoutSuccessHandler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*"); // Allow requests from any origin
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS"); // Allowed methods
  res.setHeader("Access-Control-Allow-Headers", "Content-Type"); // Allowed headers

  if (req.method === "OPTIONS") {
    // Handle preflight requests
    res.status(200).end();
    return;
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(
      req.query.session_id
    );

    res.json({ status: session.payment_status });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}
