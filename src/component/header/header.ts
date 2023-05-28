import "@/component/header/element/header-login";
import "@/component/header//element/header-logout";

export async function createHeader(blogName: string) {
	let accessToken = localStorage.getItem("access-token");
	if (accessToken == null) {
		let header = document.createElement("ml-header-logout");
		header.setAttribute("blog-name", blogName);
		return header;
	} else {
		let header = document.createElement("ml-header-login");
		header.setAttribute("blog-name", blogName);
		return header;
	}
}
