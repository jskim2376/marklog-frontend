import { html, render } from "lit-html";
import { PostCard } from "./element/post-card";
import { Api } from "@/api/api";
import { Page } from "@/interface/page";
import { PostList } from "@/interface/post-list";
import { TagCount } from "@/interface/tag-count";

class BlogElement extends HTMLElement {
	api: Api;
	constructor() {
		super();
		this.api = new Api();
	}

	setScroll(postCard: PostCard) {
		window.addEventListener("scroll", async () => {
			postCard.setPage(postCard.getPage() + 1);
			let response: Page<PostList> = await this.api.getRecentPost(postCard.getPage());
			postCard.appendCard(response.content);
		});
	}

	async connectedCallback() {
		let api = new Api();
		// let tagCount: TagCount = await api.getTagCount(userId);

		let postCard: PostCard = new PostCard();
		let response: Page<PostList> = await this.api.getRecentPost(postCard.getPage());

		postCard.appendCard(response.content);
		let template = html` <div class="container">${postCard.cardRow}</div> `;
		render(template, this);
		this.appendChild;
		this.setScroll(postCard);
	}
}

customElements.define("ml-blog", BlogElement);

export function createBlog() {
	return document.createElement("ml-blog");
}
