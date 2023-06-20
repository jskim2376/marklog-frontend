import "@/component/main/search";
import { Api } from "@/api/api";
import { Page } from "@/interface/page";
import { PostList } from "@/interface/post-list";
import { render, html } from "lit";
import { PostCardRowOne } from "./element/post-card-row-one";
import { PostCard } from "./element/post-card";
class TagPostElement extends HTMLElement {
	postCard: PostCard;
	api: Api;
	constructor() {
		super();
		this.postCard = new PostCardRowOne();
		this.api = new Api();
	}

	async setTagCard() {
		const urlParams = new URL(location.href).searchParams;
		const name = urlParams.get("name");

		let response: Page<PostList> = await this.api.getSearchTag(name!, this.postCard.getPage());
		this.postCard.cardRowAppendCard(response);
	}

	async appendTagCard() {
		const urlParams = new URL(location.href).searchParams;
		const name = urlParams.get("name");

		let response: Page<PostList> = await this.api.getSearchTag(name!, this.postCard.getPage());
		this.postCard.cardRowAppendCard(response);
	}

	setScroll() {
		window.addEventListener("scroll", () => {
			let val = window.innerHeight + window.scrollY;
			if (val >= document.body.offsetHeight) {
				this.postCard.increasePage();
				this.appendTagCard();
			}
		});
	}

	connectedCallback() {
		let url = new URL(window.location.href);
		const template = html`
			<div class="container">
				<h1>태그</h1>
				<b>${url.searchParams.get("username") ? url.searchParams.get("username") + "님이 작성한 게시글 검색" : ""}</b>
			</div>
		`;
		render(template, this);

		this.setTagCard();
		this.setScroll();

		this.lastElementChild!.appendChild(this.postCard.cardRow);
	}
}

customElements.define("ml-tag-post", TagPostElement);
export function createTagPost() {
	return document.createElement("ml-tag-post");
}
