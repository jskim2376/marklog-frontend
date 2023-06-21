import "@/component/header/element/header-login";
import "@/component/header//element/header-logout";
import { Api } from "@/api/api";

export async function createHeader(blogName: string, userId: number | string) {
	let api = new Api();
	let accessToken = localStorage.getItem("access-token");
	if (accessToken == null) {
		let header = document.createElement("ml-header-logout");
		header.setAttribute("blog-name", blogName);
		header.setAttribute("userId", userId.toString());

		return header;
	} else {
		let header = document.createElement("ml-header-login");
		header.setAttribute("blog-name", blogName);
		header.setAttribute("userId", userId.toString());
		return header;
	}
}
