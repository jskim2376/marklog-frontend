import "@/component/header/element/header-login";
import "@/component/footer/footer";
import { createHeader } from "@/component/header/header";
import { createFooter } from "@/component/footer/footer";
import { RouterLocation } from "@vaadin/router";
import { createPost } from "@/component/main/post";
import { Api } from "@/api/api";
import { PostResponse, PostResponseDto } from "@/interface/post";
import { User } from "@/interface/user";

class PostPageElement extends HTMLElement {
	onBeforeEnter(location: RouterLocation) {
		let id = location.params.id as string;
		this.setAttribute("post-id", id);
	}

	async connectedCallback() {
		let api = new Api();
		let id: string = this.getAttribute("post-id")!;

		let post: PostResponseDto = await api.getPost(parseInt(id));
		let user: User = await api.getUser(post.userId.toString());

		this.appendChild(await createHeader(user.title, post.userId));
		this.appendChild(createPost());
		this.appendChild(createFooter());
	}
}
customElements.define("ml-post-page", PostPageElement);
