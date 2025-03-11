import { E as ERROR_SERVER } from './private-47102920.js';

const handleError = async ({ error, event }) => {
  console.error("Server error:", error);
  const errorData = {
    message: error.message || "Unknown error",
    stack: error.stack,
    url: event.url.pathname,
    side: "SERVER"
  };
  const res = await fetch(ERROR_SERVER, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(
      errorData
    )
  });
  console.log(res);
};

export { handleError };
//# sourceMappingURL=hooks.server-6c958f23.js.map
