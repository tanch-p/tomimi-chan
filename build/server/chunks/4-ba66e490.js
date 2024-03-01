import { r as redirect } from './index-4dc5572a.js';

const load = async ({ request }) => {
  let language = "en";
  const userAgent = request.headers.get("user-agent");
  if (!userAgent) {
    throw redirect(308, `/en`);
  } else if (userAgent.toLowerCase().includes("baidu")) {
    throw redirect(308, `/zh`);
  } else if (userAgent.toLowerCase().includes("bot")) {
    throw redirect(308, "/en");
  }
  const acceptLanguage = request.headers.get("accept-language")?.split(",")[0];
  if (!acceptLanguage) {
    throw redirect(307, `/en`);
  }
  if (acceptLanguage.match(/ja|ja/i)) {
    language = "ja";
  } else if (acceptLanguage.includes("zh")) {
    language = "zh";
  }
  throw redirect(307, `/${language}`);
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  load: load
});

const index = 4;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-f8478715.js')).default;
const server_id = "src/routes/+page.server.ts";
const imports = ["_app/immutable/nodes/4.98912ee9.js","_app/immutable/chunks/index.8135641d.js","_app/immutable/chunks/navigation.47b1e90b.js","_app/immutable/chunks/singletons.48dfce54.js"];
const stylesheets = [];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=4-ba66e490.js.map
