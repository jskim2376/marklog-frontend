import { Api } from "@/api/api";
import jwtDecode, { JwtPayload } from "jwt-decode";
import { html, render } from "lit-html";
import { User } from "@/interface/user";
import { Notice } from "@/interface/notice";

export class HeaderLoginElement extends HTMLElement {
	createSearch() {
		let element = document.createElement("div");
		const template = html` <button onclick="location.href='/search'" class="btn">
			<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
				<path
					d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
			</svg>
		</button>`;
		render(template, element);
		return element;
	}

	deleteAllNotice(userId: string) {
		let element = document.getElementById("notice-elements")!;
		element.innerHTML = "";
		const template = html`
			<b class="dropdown-header d-flex justify-content-between mx-2">
				알림
				<button class="text-black btn py-0" id="notice-delete-btn">
					<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
						<path
							d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
						<path
							fill-rule="evenodd"
							d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
					</svg>
				</button>
			</b>
		`;
		render(template, element);

		let api = new Api();
		api.deleteAllNotice(userId);
	}

	async createNoticeItem(userId: string): Promise<HTMLElement[]> {
		let noticeElements: Array<HTMLElement> = new Array();
		let api = new Api();
		let notices: Array<Notice> = await api.getNotices(userId);

		if (notices.length > 0) {
			let headerLine: HTMLElement = document.createElement("li");
			const temp2 = html`<hr class="dropdown-divider" />`;
			render(temp2, headerLine);
			noticeElements.push(headerLine);
		}

		notices.forEach((element) => {
			let item: HTMLElement = document.createElement("li");
			item.setAttribute("class", "dropdown-item");
			item.innerText = element.content;
			item.onclick = () => {};
			noticeElements.push(item);
		});
		return noticeElements;
	}

	async createNotice(userId: string, notice: HTMLElement) {
		const template = html`
		<div class="dropdown">
				<button class="btn btn-secondary dropdown-toggle " type="button" data-bs-toggle="dropdown" aria-expanded="false">
					<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-bell-fill" viewBox="0 0 16 16">
						<path
							d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zm.995-14.901a1 1 0 1 0-1.99 0A5.002 5.002 0 0 0 3 6c0 1.098-.5 6-2 7h14c-1.5-1-2-5.902-2-7 0-2.42-1.72-4.44-4.005-4.901z" />
					</svg>
				</button>
				<ul class="dropdown-menu dropdown-menu-end" id="notice-elements">
					<b class="dropdown-header d-flex justify-content-between mx-2">
						알림
						<button class="text-black btn py-0" id="notice-delete-btn">
							<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
								<path
									d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
								<path
									fill-rule="evenodd"
									d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
							</svg>
						</button>
					</b>
				</ul>
			</div>
		</li>`;
		render(template, notice);

		let btn = document.getElementById("notice-delete-btn");
		btn?.addEventListener("click", (e: Event) => this.deleteAllNotice(userId));

		let dropdownMenu = notice.getElementsByClassName("dropdown-menu")[0];
		(await this.createNoticeItem(userId)).forEach((item) => {
			dropdownMenu.appendChild(item);
		});
	}

	createProfile(userId: string, user: User) {
		let element = document.createElement("div");
		const template = html`
			<div class="dropdown">
				<a class="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
					<img src=${user.picture} title="profile img" class="float-start rounded-circle" width="25" height="25" id="userProfile" />
				</a>
				<ul class="dropdown-menu" aria-labelledby="navbarDropdown">
					<li>
						<a href="/blog/${userId}" class="dropdown-item" id="myblog">내블로그</a>
					</li>
					<li><a class="dropdown-item" href="/setting">설정</a></li>
					<li>
						<hr class="dropdown-divider" />
					</li>
					<li>
						<button onclick="location.href='/api/v1/user/logout'" class="dropdown-item">로그아웃</button>
					</li>
				</ul>
			</div>
		`;
		render(template, element);
		return element;
	}

	async connectedCallback() {
		let api = new Api();
		let accessToken: string = localStorage.getItem("access-token")!;
		let userId = jwtDecode<JwtPayload>(accessToken).jti!;
		let user: User = await api.getUser(userId);
		let blogName = this.getAttribute("blog-name");
		let blogUserId = this.getAttribute("userId");
		const template = html`
			<nav class="navbar navbar-expand-lg navbar-light bg-light mb-3" id="login-nav">
				<div class="container">
					<a class="navbar-brand fs-3" href="${blogUserId != "0" ? "/blog/" + blogUserId : "/"}">${blogName}</a>
					<ul class="nav">
						<li class="nav-item" id="search"></li>
						<li class="nav-item" id="notice"></li>
						<li class="nav-item">
							<button class="btn btn btn-secondary" onclick="location.href='/write'">글 작성</button>
						</li>
						<li class="nav-item" id="profile"></li>
					</ul>
				</div>
			</nav>
		`;
		render(template, this);

		let search = document.getElementById("search")!;
		let searchHtml = this.createSearch();
		render(searchHtml, search);

		let notice = document.getElementById("notice")!;
		this.createNotice(userId, notice);

		let profile = document.getElementById("profile")!;
		let profileHtml = this.createProfile(userId, user);
		render(profileHtml, profile);
	}
}

customElements.define("ml-header-login", HeaderLoginElement);
