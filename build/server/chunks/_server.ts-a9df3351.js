import { E as ERROR_SERVER } from './private-47102920.js';

const POST = async ({ request }) => {
  try {
    const { errorData } = await request.json();
    await fetch(ERROR_SERVER, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(
        errorData
      )
    });
    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    console.error("Failed to log client error:", error);
    return new Response(JSON.stringify({ success: false, error: "Failed to log error" }), {
      status: 500
    });
  }
};

export { POST };
//# sourceMappingURL=_server.ts-a9df3351.js.map
