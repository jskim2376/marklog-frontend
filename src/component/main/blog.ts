import { html, render } from "lit-html";
import { PostCard } from "./element/post-card";
import { Api } from "@/api/api";
import { Page } from "@/interface/page";
import { PostList } from "@/interface/post-list";
import { TagCount } from "@/interface/tag-count";
import { PostCardRowOne } from "./element/post-card-row-one";
import { User } from "@/interface/user";

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
		let api = new Api();
<<<<<<< HEAD
		// let tagCount: TagCount = await api.getTagCount(userId);

		let template = html` <div class="container" id="blog"></div> `;
=======
		const userId = window.location.href.split("/")[4];
		let user: User = await api.getUser(userId);

		let template = html`
			<div class="container" id="blog">
				<div class="row mb-5 mx-1">
					<div class="col-3 text-center">
						<img id="picture" class="bigprofile mb-2 rounded-circle" src="${user.picture}" width="100" height="100" />
					</div>
					<div class="col-8">
						<h3>${user.name}</h3>
						<h5>${user.introduce}</h5>
					</div>
				</div>
				<hr />
				<h1>글</h1>
			</div>
		`;
>>>>>>> dev
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
