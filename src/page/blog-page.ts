import { Api } from "@/api/api";
import { createBlog } from "@/component/main/blog";
import { createFooter } from "@/component/footer/footer";
import { createHeader } from "@/component/header/header";
import { User } from "@/interface/user";
import { RouterLocation } from "@vaadin/router";

class BlogPageElement extends HTMLElement {
	onBeforeEnter(location: RouterLocation) {
		let id = location.params.id as string;
		this.setAttribute("user-id", id);
	}

	async connectedCallback() {
		let userId = this.getAttribute("user-id")!;
		let api = new Api();
		let user: User = await api.getUser(userId);

		this.appendChild(await createHeader(user.title, userId));

		this.appendChild(createBlog());

		this.appendChild(createFooter());
	}
}
customElements.define("ml-blog-page", BlogPageElement);
