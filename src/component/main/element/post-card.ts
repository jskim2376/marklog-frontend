import { html, render } from "lit-html";
import { PostList } from "@/interface/post-list";
import { Tag } from "@/interface/tag";
import { Api } from "@/api/api";
import { Page } from "@/interface/page";

export class PostCard {
	cardRow: HTMLElement;
	page: number;
	constructor() {
		this.cardRow = this.createCardRow();
		this.page = 0;
	}

	createCardRow() {
		let cardRow = document.createElement("div");
		return cardRow;
	}

	getPage() {
		return this.page;
	}

	setPage(page: number) {
		this.page = page;
		return this.page;
	}

	increasePage() {
		this.page++;
	}

	createTag(tagList: Array<Tag>) {
		let tagListElement = document.createElement("div");
		tagListElement.setAttribute("class", "mb-3");
		tagList.forEach((tag) => {
			let tagElement = document.createElement("button");
<<<<<<< HEAD
			tagElement.onclick = () => (location.href = `/tag?tag-name=${tag.name}`);
=======
			tagElement.onclick = () => (location.href = `/tag?name=${tag.name}`);
>>>>>>> dev
			tagElement.setAttribute("class", "btn btn-primary mx-2");
			tagElement.innerText = tag.name;
			tagListElement.appendChild(tagElement);
		});

		return tagListElement;
	}

	dateToString(date: String) {
		var dateString = date.split("T");
		dateString[1] = dateString[1].substring(0, dateString[1].indexOf("."));
		return dateString;
	}

	createPostCard(post: PostList): HTMLElement {
		let card = document.createElement("div");
		card.setAttribute("class", "my-3");
		let tagList = this.createTag(post.tagList);
		let date = this.dateToString(post.createdDate);
		const template = html`
			<div class="col h-100">
				<div class="card h-100">
					<div>
						<a href=${"/post/" + post.postId} class="text-dark text-decoration-none">
							<img src=${post.thumbnail} class="card-img-top object-fit-cover" style=" aspect-ratio: 16/9;object-fit:cover" />
							<div class="card-body">
								<h5 class="card-title">${post.title}</h5>
								<p class="card-text">${post.summary}</p>
							</div>
						</a>
						${tagList}
						<div class="card-footer">
							<a href=${post.picture}></a>
							<small class="text-muted">${date}</small>
							<small class="text-muted">♥·${post.likeCount}</small>
							<small class="text-muted">댓글·${post.commentCount}</small>
							<br />
							<small class="text-muted"
								>by
								<a href=${"/blog/" + post.userId}>${post.userName}</a>
							</small>
						</div>
					</div>
				</div>
			</div>
		`;
		render(template, card);
		return card;
	}

	async cardRowAppendCard(postListCardPage: Page<PostList>) {
		postListCardPage.content.forEach((post: PostList) => {
			let card = this.createPostCard(post);
			this.cardRow.appendChild(card);
		});
	}
}
