import { html, render } from "lit-html";
import { PostCard } from "./element/post-card";
import { PostCardRowOne } from "./element/post-card-row-one";
import { PostCardRowFour } from "./element/post-card-row-four";
import { Api } from "@/api/api";

class RecentPostElement extends HTMLElement {
	postCard: PostCard;
	api: Api;

	constructor() {
		super();
		this.postCard = new PostCardRowFour();
		this.api = new Api();
	}

	setScroll() {
		window.addEventListener("scroll", async () => {
			this.postCard.setPage(this.postCard.getPage() + 1);
			this.postCard.cardRowAppendCard(await this.api.getRecentPost(this.postCard.getPage()));
		});
	}

	async connectedCallback() {
		let template = html`
			<div class="container" id="home">
				<h1>최신글</h1>
			</div>
		`;
		render(template, this);

		this.postCard.cardRowAppendCard(await this.api.getRecentPost(this.postCard.getPage()));
		let home = document.getElementById("home");
		home?.appendChild(this.postCard.cardRow);
		this.setScroll();
	}
}

customElements.define("ml-recent-post", RecentPostElement);

export function createRecentPost() {
	return document.createElement("ml-recent-post");
}
