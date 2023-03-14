import {html, render} from 'lit-html';
import {PostCard} from './post-card';
import {Api} from '@/api/api';
import {Page} from '@/dto/page-dto';
import {PostListDto} from '@/dto/post-list-dto';

class RecentPostElement extends HTMLElement {
	api: Api;
	constructor() {
		super();
		this.api = new Api();
	}

	setScroll(postCard: PostCard) {
		window.addEventListener('scroll', async () => {
			postCard.setPage(postCard.getPage() + 1);
			let response: Page<PostListDto> = await this.api.getRecentPost(postCard.getPage());
			postCard.appendCard(response.content);
		});
	}

	async connectedCallback() {
		let postCard: PostCard = new PostCard();
		let response: Page<PostListDto> = await this.api.getRecentPost(postCard.getPage());
		postCard.appendCard(response.content);
		let template = html`
			<div class="container">
				<h1>최신글</h1>
				${postCard.cardRow}
			</div>
		`;
		render(template, this);
		this.setScroll(postCard);
	}
}

customElements.define('ml-recent-post', RecentPostElement);

export function createRecentPost() {
	return document.createElement('ml-recent-post');
}
