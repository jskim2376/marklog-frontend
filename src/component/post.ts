import {Api} from '@/api/api';
import {marked} from 'marked';

interface TagResponseDto {
	name: string;
}

interface PostResponseDto {
	createdDate: string;
	modifiedDate: string;
	title: string;
	content: string;
	userId: number;
	userName: string;
	tagList: Array<TagResponseDto>;
	like: boolean;
}

class PostElement extends HTMLElement {
	createTagElements(tagList: Array<TagResponseDto>) {
		let tagElements: Array<HTMLElement> = new Array();
		tagList.forEach((tagResponseDto) => {
			let tag = document.createElement('button');
			tag.innerText = tagResponseDto.name;
			tag.setAttribute('class', 'btn btn-primary mx-1');
			tagElements.push(tag);
		});
		return tagElements;
	}

	async connectedCallback() {
		let api = new Api();
		let postId: number = parseInt(this.parentElement?.getAttribute('post-id')!);
		let post: PostResponseDto = await api.getPost(postId);
		marked.setOptions({
			breaks: true,
		});
		this.innerHTML = /*html*/ `
      <div class="container">
        <header>
          <h1 class="display-1">${post.title}</h1>
          <p>
            <a href="/user/${post.userId}" class="link-primary text-decoration-none li">${post.userName}</a>
            ·
            작성일:${post.createdDate.substring(0, 10)}
            ·
            수정일:${post.modifiedDate.substring(0, 10)}
          </p>
          <div id="taglist">
          </div>
        </header>
        <article id="post">
        ${marked.parse(post.content)}
        </article>
      </div>
    `;
		let tagDiv = document.getElementById('taglist')!;
		this.createTagElements(post.tagList).forEach((tagElement) => {
			tagDiv.appendChild(tagElement);
		});
	}
}

customElements.define('ml-post', PostElement);

export function createPost() {
	return document.createElement('ml-post');
}
