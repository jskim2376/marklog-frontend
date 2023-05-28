import { html, render } from "lit-html";
import { PostCard } from "./element/post-card";
import { Api } from "@/api/api";
import { Page } from "@/interface/page";
import { PostList } from "@/interface/post-list";
import { TagCount } from "@/interface/tag-count";
import { PostCardRowOne } from "./element/post-card-row-one";

class BlogElement extends HTMLElement {
	postCard: PostCard;
	constructor() {
		super();
		this.postCard = new PostCardRowOne();
	}

	setScroll() {
		window.addEventListener("scroll", async () => {
			this.postCard.setPage(this.postCard.getPage() + 1);
			this.postCard.cardRowAppendCard();
		});
	}

	async connectedCallback() {
		let api = new Api();
		// let tagCount: TagCount = await api.getTagCount(userId);

		let template = html` <div class="container" id="blog"></div> `;
		render(template, this);

		let blog = document.getElementById("blog");
		blog?.appendChild(this.postCard.cardRow);
		this.setScroll();
	}
}

customElements.define("ml-blog", BlogElement);

export function createBlog() {
	return document.createElement("ml-blog");
}
