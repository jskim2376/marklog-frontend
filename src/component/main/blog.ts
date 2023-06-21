import { html, render } from "lit-html";
import { PostCard } from "./element/post-card";
import { Api } from "@/api/api";
import { Page } from "@/interface/page";
import { PostList } from "@/interface/post-list";
import { TagCount } from "@/interface/tag-count";
import { PostCardRowOne } from "./element/post-card-row-one";

class BlogElement extends HTMLElement {
	userId: number;
	postCard: PostCard;
	api: Api;

	constructor() {
		super();
		this.userId = parseInt(window.location.pathname.split("/")[2]);
		this.postCard = new PostCardRowOne();
		this.api = new Api();
	}

	async setBlogCard() {
		let response: Page<PostList> = await this.api.getSearchPostByUserId(this.userId, this.postCard.getPage());
		this.postCard.cardRowAppendCard(response);
	}
	async appendBlogCard() {
		this.postCard.increasePage();
		let response: Page<PostList> = await this.api.getSearchPostByUserId(this.userId, this.postCard.getPage());
		this.postCard.cardRowAppendCard(response);
	}

	setScroll() {
		window.addEventListener("scroll", () => {
			let val = window.innerHeight + window.scrollY;
			if (val >= document.body.offsetHeight) {
				this.appendBlogCard();
			}
		});
	}

	async connectedCallback() {
		let template = html` <div class="container" id="blog"></div> `;
		render(template, this);

		this.setBlogCard();
		this.setScroll();
		let blog = document.getElementById("blog");
		blog?.appendChild(this.postCard.cardRow);
	}
}

customElements.define("ml-blog", BlogElement);

export function createBlog() {
	return document.createElement("ml-blog");
}
