import '@/component/search-post';
import {Api} from '@/api/api';
import {PostCard} from './post-card';
import {Page} from '@/dto/page-dto';
import {PostListDto} from '@/dto/post-list-dto';
import {render, html} from 'lit';
class SearchPostElement extends HTMLElement {
	postCard: PostCard;

	constructor() {
		super();
		this.postCard = new PostCard();
	}

	async setSearchCard() {
		let searchInput = <HTMLInputElement>document.getElementById('search-input')!;
		let api = new Api();
		let response: Page<PostListDto> = await api.getSearchPost(searchInput.value, this.postCard.getPage());
		this.postCard.appendCard(response.content);
	}

	setScroll() {
		window.addEventListener('scroll', () => {
			let val = window.innerHeight + window.scrollY;
			if (val >= document.body.offsetHeight) {
				this.setSearchCard();
			}
		});
	}

	connectedCallback() {
		let url = new URL(window.location.href);
		const template = html`
			<div class="container">
				<h1>검색</h1>
				<b>${url.searchParams.get('username') ? url.searchParams.get('username') + '님이 작성한 게시글 검색' : ''}</b>
				<div class="input-group input-group-lg mb-3">
					<button class="btn btn-outline-dark" id="search-button">
						<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
							<path
								d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
						</svg>
					</button>
					<input type="text" class="form-control btn-outline-dark" placeholder="Search" id="search-input" />
				</div>
			</div>
		`;
		render(template, this);

		let searchButton: HTMLElement = document.getElementById('search-button')!;
		searchButton.onclick = () => {
			this.setSearchCard();
			this.setScroll();
		};
		let searchInput: HTMLElement = document.getElementById('search-input')!;
		searchInput.onkeydown = (e) => {
			if (e.code == 'Enter') {
				searchButton.click();
			}
		};
		this.lastElementChild!.appendChild(this.postCard.cardRow);
	}
}

customElements.define('ml-search-post', SearchPostElement);
export function createSearchPost() {
	return document.createElement('ml-search-post');
}
