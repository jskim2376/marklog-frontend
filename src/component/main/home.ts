import { html, render } from "lit-html";
import { PostCard } from "./element/post-card";
import { PostCardRowOne } from "./element/post-card-row-one";
import { PostCardRowFour } from "./element/post-card-row-four";

class RecentPostElement extends HTMLElement {
	postCard: PostCard;

	constructor() {
		super();
		this.postCard = new PostCardRowFour();
	}

	setScroll() {
		window.addEventListener("scroll", async () => {
			this.postCard.setPage(this.postCard.getPage() + 1);
			this.postCard.cardRowAppendCard();
		});
	}

	async connectedCallback() {
		let template = html`
			<div class="container" id="home">
				<h1>최신글</h1>
			</div>
		`;
		render(template, this);

		this.postCard.cardRowAppendCard();
		let home = document.getElementById("home");
		home?.appendChild(this.postCard.cardRow);
		this.setScroll();
	}
}

customElements.define("ml-recent-post", RecentPostElement);

export function createRecentPost() {
	return document.createElement("ml-recent-post");
}
