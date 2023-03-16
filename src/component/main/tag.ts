import "@/component/main/search";
import { Api } from "@/api/api";
import { PostList } from "@/interface/post-list";
import { render, html } from "lit";
import { PostCard } from "./element/post-card";
import { PostCardRowOne } from "./element/post-card-row-one";

class TagPostElement extends HTMLElement {
	postCard: PostCard;
	hashTagName: string;

	constructor() {
		super();
		this.postCard = new PostCardRowOne();
		let url = new URL(window.location.href);
		this.hashTagName = url.searchParams.get("tag-name")!;
	}

	async setTagCard() {
		let api = new Api();
		let response: Array<PostList> = await api.getPostByTagName(this.hashTagName, this.postCard.getPage());
	}

	setScroll() {
		window.addEventListener("scroll", () => {
			let val = window.innerHeight + window.scrollY;
			if (val >= document.body.offsetHeight) {
				this.postCard.setPage(this.postCard.getPage() + 1);
				this.setTagCard();
			}
		});
	}

	connectedCallback() {
		const template = html`
			<div class="container">
				<h1># ${this.hashTagName}</h1>
			</div>
		`;
		render(template, this);
		this.lastElementChild!.appendChild(this.postCard.cardRow);
		this.setTagCard();
		this.setScroll();
	}
}

customElements.define("ml-tag-post", TagPostElement);

export function createTagPost() {
	return document.createElement("ml-tag-post");
}
