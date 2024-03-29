import { Api } from "@/api/api";
import { html, render } from "lit-html";
import { unsafeHTML } from "lit-html/directives/unsafe-html.js";

import { marked } from "marked";
import { Comment } from "./element/comment";
import { Tag } from "@/interface/tag";
import { PostResponseDto } from "@/interface/post";

class PostElement extends HTMLElement {
  createTagElements(tagList: Array<Tag>) {
    let tagElements: Array<HTMLElement> = new Array();
    tagList.forEach((tagResponseDto) => {
      let tag = document.createElement("button");
      tag.innerText = tagResponseDto.name;
      tag.setAttribute("class", "btn btn-primary mx-1");
      tagElements.push(tag);
      tag.addEventListener("click", () => {
        window.location.href = "/tag?name=" + tagResponseDto.name;
      });
    });
    return tagElements;
  }

  async connectedCallback() {
    marked.setOptions({
      breaks: true,
    });

    let api = new Api();
    let postId: number = parseInt(this.parentElement?.getAttribute("post-id")!);
    let editLocation = "location.href='/edit/" + postId + "'";
    let post: PostResponseDto = await api.getPostByUser(postId);

    let template = html`<div class="container" id="blog"></div>
      <div class="container" style="max-width:1024px">
        <header>
          <h1 class="display-1">${post.title}</h1>
          <br />
          <p>
            <a
              href="/user/${post.userId}"
              class="link-primary text-decoration-none li"
              >${post.userName}</a
            >
            · 작성일 : ${post.createdDate.substring(0, 10)} · 수정일 :
            ${post.modifiedDate.substring(0, 10)}
          </p>
          <div id="taglist"></div>
        </header>
        <br />
        <article id="post">
          <style>
            img {
              width: 100%;
            }
          </style>
          ${unsafeHTML(marked.parse(post.content))}
        </article>
        <div class="d-flex justify-content-center">
          <button
            id="likeBtn"
            class="btn btn-outline-danger rounded-sm rounded-circle"
            style="width:55px;height:55px;"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              fill="currentColor"
              id="unlikeImg"
              class="bi bi-heart"
              viewBox="0 0 16 16"
            >
              <path
                d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"
              />
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              fill="currentColor"
              id="likeImg"
              class="bi bi-heart-fill"
              viewBox="0 0 16 16"
            >
              <path
                fill-rule="evenodd"
                d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"
              />
            </svg>
          </button>
        </div>
        <div class="text-end ">
          <button class="btn btn-primary" onclick=${editLocation}>수정</button>
          <button id="deleteBtn" class="btn btn-danger">삭제</button>
        </div>
        <div class="input-group py-1">
          <textarea id="commentContent" class="form-control col"></textarea>
          <button id="writeComment" class="btn btn-primary col-1">
            댓글 작성
          </button>
        </div>
        <div id="comment" class="my-1"></div>
      </div> `;
    render(template, this);

    let deleteBtn = document.getElementById("deleteBtn")!;
    deleteBtn.addEventListener("click", () => {
      api.deletePost(postId).done(() => {
        window.history.back();
      });
    });

    let tagDiv = document.getElementById("taglist")!;
    this.createTagElements(post.tagList).forEach((tagElement) => {
      tagDiv.appendChild(tagElement);
    });

    let likeBtn = document.getElementById("likeBtn");
    if (post.like) {
      likeBtn?.classList.add("like");
      let unlikeImg = document.getElementById("unlikeImg");
      unlikeImg?.classList.add("d-none");
    } else {
      likeBtn?.classList.add("unlike");
      let likeImg = document.getElementById("likeImg");
      likeImg?.classList.add("d-none");
    }

    likeBtn?.addEventListener("click", (event) => {
      if (likeBtn?.classList.contains("unlike")) {
        likeBtn.classList.remove("unlike");
        likeBtn.classList.add("like");

        let unlikeImg = document.getElementById("unlikeImg");
        unlikeImg?.classList.add("d-none");
        let likeImg = document.getElementById("likeImg");
        likeImg?.classList.remove("d-none");
        api.postLike(postId);
      } else {
        likeBtn?.classList.remove("like");
        likeBtn?.classList.add("unlike");

        let likeImg = document.getElementById("likeImg");
        likeImg?.classList.add("d-none");
        let unlikeImg = document.getElementById("unlikeImg");
        unlikeImg?.classList.remove("d-none");
        api.deleteLike(postId);
      }
    });

    let commentDiv = document.getElementById("comment");
    let comment = new Comment(postId);
    commentDiv?.appendChild(await comment.commentMake());

    let writeComment = document.getElementById("writeComment");
    writeComment?.addEventListener("click", () => {
      let content = this.getElementsByTagName("textarea")[0].value;
      api.postComment(postId, content, 0);
      window.location.reload();
    });
  }
}

customElements.define("ml-post", PostElement);

export function createPost() {
  return document.createElement("ml-post");
}
