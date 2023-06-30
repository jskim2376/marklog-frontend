import "@/component/main/search";
import { Api } from "@/api/api";
<<<<<<< HEAD
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
=======
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
>>>>>>> dev
	}

	setScroll() {
		window.addEventListener("scroll", () => {
			let val = window.innerHeight + window.scrollY;
			if (val >= document.body.offsetHeight) {
<<<<<<< HEAD
				this.postCard.setPage(this.postCard.getPage() + 1);
				this.setTagCard();
=======
				this.postCard.increasePage();
				this.appendTagCard();
>>>>>>> dev
			}
		});
	}

	connectedCallback() {
<<<<<<< HEAD
		const template = html`
			<div class="container">
				<h1># ${this.hashTagName}</h1>
			</div>
		`;
		render(template, this);
		this.lastElementChild!.appendChild(this.postCard.cardRow);
		this.setTagCard();
		this.setScroll();
=======
		let url = new URL(window.location.href);

		const template = html`
			<div class="container">
				<h1>태그</h1>
				<b>검색 태그 : ${url.searchParams.get("name")}</b>
			</div>
		`;
		render(template, this);

		this.setTagCard();
		this.setScroll();

		this.lastElementChild!.appendChild(this.postCard.cardRow);
>>>>>>> dev
	}
}

customElements.define("ml-tag-post", TagPostElement);
<<<<<<< HEAD

=======
>>>>>>> dev
export function createTagPost() {
	return document.createElement("ml-tag-post");
}
