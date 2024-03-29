import { html, render } from "lit-html";

import { marked } from "marked";

import Tagify, { ChangeEventData } from "@yaireo/tagify";
import "@yaireo/tagify/dist/tagify.css";
import EasyMDE from "easymde";
import "easymde/dist/easymde.min.css";
import { Api } from "@/api/api";
import { Post } from "@/interface/post";

class WriteElement extends HTMLElement {
  uploadImage(editor: any) {
    var input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.id = "uploadInput";
    input.addEventListener("change", (event: Event) => {
      const target = event.target as HTMLInputElement;
      const files = target.files;

      let xhr = new XMLHttpRequest();
      var formData = new FormData();
      xhr.open("POST", "https://api.imgbb.com/1/upload");
      formData.append("key", "ba349a478f0a62e1d11c353fe0ce35c1");
      formData.append("image", files![0]);
      xhr.onreadystatechange = function () {
        if (xhr.readyState === xhr.DONE) {
          if (xhr.status === 200) {
            let res = JSON.parse(xhr.response);
            let url = res.data.image.url;
            (function (url: string) {
              let imagemd = "![](" + url + ")";
              let cm = editor.codemirror;
              cm.replaceSelection(imagemd);
              cm.focus();
            })(url);
          }
        }
      };
      xhr.send(formData);
    });
    input.click();
  }

  connectedCallback() {
    const template = html`
      <div class="d-flex">
        <form class="w-50">
          <header>
            <input
              id="title"
              type="text"
              class="w-100 m fw-bold"
              placeholder="제목을 입력하세요"
              style="font-size:2em;"
            />
            <hr />
            <input
              name="input"
              placeholder="태그를 입력후 엔터를 누르세요"
              id="tagInput"
              class="w-100"
              type="hidden"
            />
          </header>
          <div>
            <textarea id="main" tabindex="0"></textarea>
          </div>
          <footer class="d-flex justify-content-between">
            <button
              class="btn btn-danger fs-5"
              type="button"
              onclick="window.history.back()"
            >
              <i class=""></i>나가기
            </button>
            <button id="post" class="btn btn-success fs-5" type="button">
              출간하기
            </button>
          </footer>
        </form>
        <section class="w-50">
          <h1 id="preview-title"></h1>
          <br />
          <style>
            img {
              width: 100%;
            }
          </style>
          <div
            id="editor-preview"
            class="overflow-scroll"
            style="height:90vh;"
          ></div>
        </section>
      </div>
    `;
    render(template, this);

    var input: HTMLInputElement = document.querySelector("#tagInput")!;
    var tagify = new Tagify(input);

    //에디터 설정
    let easymde = new EasyMDE({
      element: document.getElementById("main")!,
      spellChecker: false,
      renderingConfig: {
        singleLineBreaks: true,
        codeSyntaxHighlighting: true,
      },
      maxHeight: "70vh",
      toolbar: [
        "bold",
        "italic",
        "heading",
        "|",
        "quote",
        "unordered-list",
        "ordered-list",
        "|",
        "link",
        {
          name: "image",
          action: this.uploadImage,
          className: "fa fa-picture-o",
          title: "Insert Image",
        },
      ],
    });

    let title: HTMLInputElement = document.getElementById(
      "title"
    ) as HTMLInputElement;
    title.addEventListener("input", () => {
      let preview_title = document.getElementById("preview-title")!;
      preview_title.innerText = title.value;
    });

    marked.setOptions({
      breaks: true,
    });

    let preview = document.getElementById("editor-preview")!;
    //에디터에 변경발생시 preview 업데이트
    easymde.codemirror.on("change", function () {
      preview.innerHTML = marked.parse(easymde.value());
    });

    let post = document.getElementById("post")!;
    post.addEventListener("click", () => {
      let titleElement = document.getElementById("title") as HTMLInputElement;
      let title = titleElement.value;

      let tagList: string[] = [];
      tagify.value.forEach((tag) => {
        tagList.push(tag.value);
      });

      let content = easymde.value();

      let api = new Api();
      let post: Post;
      post = {
        title: title,
        tagList: tagList,
        content: content,
      };

      api.postPost(post).then(function (data, textStatus, jqXHR) {
        let location = jqXHR.getResponseHeader("Location");
        let id = location?.split("/").pop();
        window.location.href = "/post/" + id;
      });
    });
  }
}

customElements.define("ml-write", WriteElement);

export function createWrite() {
  return document.createElement("ml-write");
}
