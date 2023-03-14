import "@/component/search-post";
import {Api} from "@/api/api";
import {PostListDto} from "@/dto/post-list-dto";
import {render, html} from "lit";
import {PostCardRow1} from "./post-card-row1";

class TagPostElement extends HTMLElement {
	postCard: PostCardRow1;
	hashTagName: string;

	constructor() {
		super();
		this.postCard = new PostCardRow1();
		let url = new URL(window.location.href);
		this.hashTagName = url.searchParams.get("tag-name")!;
	}

	async setTagCard() {
		let api = new Api();
		let response: Array<PostListDto> = await api.getTagPost(this.hashTagName, this.postCard.getPage());
		this.postCard.appendCard(response);
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
