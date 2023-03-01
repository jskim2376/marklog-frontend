import { Commands, Context, Router } from "@vaadin/router";
import "@/page/home";
import "bootstrap"
function initRouter() {
  const router = new Router(document.querySelector("main"));
  router.setRoutes([
    {
      path: "/",
      component: "home-page",

      children: [
        {
          path: "index",
          component: "home-page",
        },
      ],
    },
    {
      path: "/hihi",
      component: "home-page",
    },
  ]);
}

window.onload = () => initRouter();

