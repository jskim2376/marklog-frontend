import { Router } from "@vaadin/router";
import "@/page/home-page";
import "@/page/login-page";
import "@/page/post-page";
import "@/page/search-page";
import "@/page/tag-page";
import "@/page/blog-page";
import "@/page/write-page";
import "@/page/edit-page";
import "@/page/setting-page";

import { Api } from "./api/api";

function logout() {}

async function initRouter() {
	let api = new Api();
	await api.setAccessToken();
	const router = new Router(document.querySelector("body"));
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
		{
			path: "/tag",
			component: "ml-tag-page",
		},
		{
			path: "/write",
			component: "ml-write-page",
		},
		{
			path: "/setting",
			component: "ml-setting-page",
		},
		{
			path: "/edit/:id",
			component: "ml-edit-page",
		},
		{
			path: "/post/:id",
			component: "ml-post-page",
		},
		{
			path: "/blog/:id",
			component: "ml-blog-page",
		},
	]);
}

window.onload = () => initRouter();
