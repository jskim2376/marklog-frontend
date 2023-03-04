import { Router } from "@vaadin/router";
import "@/page/home";
import "@/page/login"
function initRouter() {
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
  ]);
}

  window.onload = () => initRouter();

