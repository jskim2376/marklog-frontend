import "@/component/header/element/header-login";
import "@/component/footer/footer";
import { createHeader } from "@/component/header/header";
import { createFooter } from "@/component/footer/footer";
import { RouterLocation } from "@vaadin/router";
import { createPost } from "@/component/main/post";

class PostPageElement extends HTMLElement {
	onBeforeEnter(location: RouterLocation) {
		let id = location.params.id as string;
		this.setAttribute("post-id", id);
	}

	async connectedCallback() {
		this.appendChild(await createHeader("hihi"));
		this.appendChild(createPost());
		this.appendChild(createFooter());
	}
}
customElements.define("ml-post-page", PostPageElement);
