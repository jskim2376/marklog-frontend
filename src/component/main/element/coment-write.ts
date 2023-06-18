import { Api } from "@/api/api";
import { PostComment } from "@/interface/post-comment";
import { post } from "jquery";
import { html, render } from "lit-html";

export class CommentWrite {
	commentWrite(postId: number, parentId: number) {
		let div = document.createElement("div");
		let template = html`
			<div class="input-group py-1">
				<textarea class="form-control col"></textarea>
				<button class="btn btn-primary col-1 commentComplete">댓글 작성</button>
			</div>
		`;

		render(template, div);
		div.getElementsByClassName("commentComplete")[0].addEventListener("click", (element) => {
			let api = new Api();
			let content = div.getElementsByTagName("textarea")[0].value;
			api.postComment(postId, content, parentId);
			window.location.reload();
		});
		return div;
	}
}
