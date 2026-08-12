export async function onRequestPost(context) {
  try {
    const { request, env } = context;
    const body = await request.json();
    
    if (!body.email) {
      return new Response(JSON.stringify({ error: "Email is required" }), { status: 400 });
    }

    // Connect to Loops.so
    const LOOPS_API_KEY = env.LOOPS_API_KEY;
    if (!LOOPS_API_KEY) {
      return new Response(JSON.stringify({ error: "Server configuration missing" }), { status: 500 });
    }

    // We send a transactional email based on the ID provided by the user
    const response = await fetch("https://app.loops.so/api/v1/transactional", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${LOOPS_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: body.email,
        transactionalId: "cmpfv5myt05se0jwmbsv05uhr" // Hardcoded transactional ID from user
      })
    });

    const data = await response.json();

    if (!response.ok) {
      return new Response(JSON.stringify(data), { status: response.status });
    }

    return new Response(JSON.stringify({ success: true, data }), {
      headers: { "Content-Type": "application/json" }
    });

  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
