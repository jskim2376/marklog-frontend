import { html, render } from "lit-html";
import { PostCard } from "./element/post-card";
import { PostCardRowOne } from "./element/post-card-row-one";
import { PostCardRowFour } from "./element/post-card-row-four";
import { Api } from "@/api/api";
import { post } from "jquery";
import { Page } from "@/interface/page";
import { PostList } from "@/interface/post-list";

class RecentPostElement extends HTMLElement {
	postCard: PostCard;
	api: Api;

	constructor() {
		super();
		this.postCard = new PostCardRowFour();
		this.api = new Api();
	}

	async appendRecentCard() {
		this.postCard.increasePage();
		let response: Page<PostList> = await this.api.getRecentPost(this.postCard.getPage());
		this.postCard.cardRowAppendCard(response);
	}

	setScroll() {
		window.addEventListener("scroll", () => {
			let val = window.innerHeight + window.scrollY;
			if (val >= document.body.offsetHeight) {
				this.appendRecentCard();
			}
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
