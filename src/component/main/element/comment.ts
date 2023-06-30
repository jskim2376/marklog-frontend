import { Api } from "@/api/api";
import { PostComment } from "@/interface/post-comment";
import { post } from "jquery";
import { html, render } from "lit-html";
import { CommentWrite } from "./coment-write";

export class Comment {
	postId: number;

	constructor(postId: number) {
		this.postId = postId;
	}

	createComment(postComment: PostComment, depth: number) {
		let div = document.createElement("div");
		div.setAttribute("class", "border");
		div.setAttribute("style", "margin-left:" + 10 * depth + "px");
		let template = html`
			<div class="d-flex justify-content-between">
				<a href="/blog/${postComment.userId}" class="text-decoration-none">${postComment.userName}</a>
				<br />
				<button class="btn btn-danger deleteComment">삭제</button>
			</div>
			<h5>${postComment.content}</h5>
			<button class="btn px-0 newComment">답글달기</button>
		`;

		render(template, div);
		if (postComment.childList != null) {
			postComment.childList.forEach;
			postComment.childList.forEach((element) => {
				div.appendChild(this.createComment(element, depth + 1));
			});
		}

		let newComment = div.getElementsByClassName("newComment")[0];
		newComment.addEventListener("click", (element) => {
			let commentWrite = new CommentWrite();
			newComment.after(commentWrite.commentWrite(this.postId, postComment.postCommentId));
		});

		let deleteComment = div.getElementsByClassName("deleteComment")[0];
		deleteComment.addEventListener("click", (element) => {
			let api = new Api();
			api.deletePostComment(this.postId, postComment.postCommentId);
			window.location.reload();
		});

		return div;
	}

	async commentMake() {
		let api = new Api();
		let postComments: Array<PostComment> = await api.getPostComment(this.postId);

		let commentElements = document.createElement("div");
		postComments.forEach((postComment: PostComment) => {
			let commentElement = this.createComment(postComment, 0);
			commentElements.appendChild(commentElement);
		});

		return commentElements;
	}
}
