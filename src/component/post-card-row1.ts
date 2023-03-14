import {html, render} from "lit-html";
import {PostListDto} from "@/dto/post-list-dto";
import {Tag} from "@/dto/tag-dto";

export class PostCardRow1 {
	cardRow: HTMLElement;

	constructor() {
		this.cardRow = this.createPostCardRow();
	}

	createPostCardRow() {
		let cardRow = document.createElement("div");
		cardRow.setAttribute("class", "row row-cols-1");
		cardRow.setAttribute("page", "0");
		return cardRow;
	}

	createPostCard(post: PostListDto): HTMLElement {
		let card = document.createElement("div");
		card.setAttribute("class", "my-3");
		let tagList = this.createTag(post.tagList);
		const template = html`
			<div class="col h-100">
				<div class="card h-100">
					<div>
						<a href=${"post/" + post.postId} class="text-dark text-decoration-none">
							<img src=${post.thumbnail} class="card-img-top object-fit-cover" style=" aspect-ratio: 16/9;object-fit:cover" />
							<div class="card-body">
								<h5 class="card-title">${post.title}</h5>
								<p class="card-text">${post.summary}</p>
							</div>
						</a>
						${tagList}
						<div class="card-footer">
							<a href=${post.picture}></a>
							<small class="text-muted">${post.createdDate}</small>
							<small class="text-muted">♥·${post.likeCount}</small>
							<small class="text-muted">댓글·${post.commentCount}</small>
							<br />
							<small class="text-muted"
								>by
								<a href=${"blog/" + post.userId}>${post.userName}</a>
							</small>
						</div>
					</div>
				</div>
			</div>
		`;
		render(template, card);
		return card;
	}

	createTag(tagList: Array<Tag>) {
		let tagListElement = document.createElement("div");
		tagListElement.setAttribute("class", "mb-3");
		tagList.forEach((tag) => {
			let tagElement = document.createElement("button");
			tagElement.onclick = () => (location.href = `/tag?tag-name=${tag.name}`);
			tagElement.setAttribute("class", "btn btn-primary mx-2");
			tagElement.innerText = tag.name;
			tagListElement.appendChild(tagElement);
		});

		return tagListElement;
	}

	appendCard(postList: Array<PostListDto>) {
		postList.forEach((post: PostListDto) => {
			let card = this.createPostCard(post);
			this.cardRow.appendChild(card);
		});
	}

	getPage() {
		return parseInt(this.cardRow.getAttribute("page")!);
	}

	setPage(page: number) {
		this.cardRow.setAttribute("page", String(page));
		return page;
	}
}
