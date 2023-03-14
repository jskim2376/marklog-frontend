import {Api} from '@/api/api';
import {NoticesResponseDto} from '@/dto/notice-dto';
import jwtDecode, {JwtPayload} from 'jwt-decode';
import {html, render} from 'lit-html';

export class HeaderLoginElement extends HTMLElement {
	async createNoticeElement(userId: string) {
		let api = new Api();
		let notices: Array<NoticesResponseDto> = await api.getNotices(userId);

		if (notices.length == 0) {
			let item = document.createElement('li');
			item.setAttribute('class', 'dropdown-item');
			item.innerText = '\n';
			return item;
		} else {
			let noticeElement = document.createElement('div');
			notices.forEach((element) => {
				let item: HTMLElement = document.createElement('li');
				item.setAttribute('class', 'dropdown-item');
				item.innerText = element.content;
				Array<NoticesResponseDto>;
				item.onclick = () => {
					api.deleteNotice(element.id);
					item.remove();
				};

				noticeElement.appendChild(item);
			});
			return noticeElement;
		}
	}

	async connectedCallback() {
		let api = new Api();
		let accessToken: string = localStorage.getItem('access-token')!;
		let userId = jwtDecode<JwtPayload>(accessToken).jti!;
		let user = await api.getUser(userId);
		let blogName = this.getAttribute('blog-name');
		const template = html`
			<nav class="navbar navbar-expand-lg navbar-light bg-light mb-3" id="login-nav">
				<div class="container">
					<a class="navbar-brand fs-3" href="/">${blogName}</a>
					<ul class="nav">
						<li class="nav-item">
							<button onclick="location.href='/search'" class="btn">
								<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
									<path
										d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
								</svg>
							</button>
						</li>
						<li class="nav-item mx-1">
							<div class="dropdown">
								<button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="16"
										height="16"
										fill="currentColor"
										class="bi bi-bell-fill"
										viewBox="0 0 16 16">
										<path
											d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zm.995-14.901a1 1 0 1 0-1.99 0A5.002 5.002 0 0 0 3 6c0 1.098-.5 6-2 7h14c-1.5-1-2-5.902-2-7 0-2.42-1.72-4.44-4.005-4.901z" />
									</svg>
								</button>
								<ul class="dropdown-menu" id="notice"></ul>
							</div>
						</li>
						<li class="nav-item">
							<button class="btn btn btn-secondary" onclick="location.href='/write'">글 작성</button>
						</li>
						<li class="nav-item dropdown show">
							<a class="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
								<img src=${user.picture} title="profile img" class="float-start rounded-circle" width="25" height="25" id="userProfile" />
							</a>
							<ul class="dropdown-menu" aria-labelledby="navbarDropdown">
								<li>
									<a href="/user/${userId}" class="dropdown-item" id="myblog">내블로그</a>
								</li>
								<li><a class="dropdown-item" href="/setting">설정</a></li>
								<li>
									<hr class="dropdown-divider" />
								</li>
								<li>
									<a class="dropdown-item" href="/logout">로그아웃</a>
								</li>
							</ul>
						</li>
					</ul>
				</div>
			</nav>
		`;
		render(template, this);

		let noticesElement = await this.createNoticeElement(userId);
		let notice = this.querySelector('#notice')!;
		notice.appendChild(noticesElement);
	}
}

customElements.define('ml-header-login', HeaderLoginElement);
