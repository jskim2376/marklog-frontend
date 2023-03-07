import { Router } from "@vaadin/router";
import "@/page/home";
import "@/page/login";
import "@/page/search";
import { Api } from "./utils/api";

async function initRouter() {
  let api = new Api;
  await api.setAccessToken();
  const router = new Router(document.querySelector("main"));
  router.setRoutes([
    {
      path: "/",
      component: "ml-home-page",
    },
    {
      path: "/login",
      component: "ml-login-page",
    },
    {
      path: "/search",
      component: "ml-search-page",
    },
  ]);
}

  window.onload = () => initRouter();

