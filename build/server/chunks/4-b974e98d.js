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
const component = async () => component_cache ??= (await import('./_page.svelte-0c4da6d6.js')).default;
const server_id = "src/routes/+page.server.ts";
const imports = ["_app/immutable/nodes/4.1d8a04e4.js","_app/immutable/chunks/index.51467544.js","_app/immutable/chunks/navigation.d2b5738a.js","_app/immutable/chunks/singletons.6af57275.js"];
const stylesheets = [];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=4-b974e98d.js.map
