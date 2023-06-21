import { html, render } from "lit";
export class HeaderLogoutElement extends HTMLElement {
	connectedCallback() {
		let blogName = this.getAttribute("blog-name");
		let blogUserId = this.getAttribute("userId");

		const template = html`
			<nav class="navbar navbar-expand-lg navbar-light bg-light mb-3" id="logout-nav">
				<div class="container">
					<a class="navbar-brand fs-3" href="${blogUserId != "0" ? "/blog/" + blogUserId : "/"}">${blogName}</a>
					<ul class="nav">
						<li class="nav-item">
							<a href="/search" class="btn">
								<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
									<path
										d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
								</svg>
							</a>
						</li>
						<li class="nav-item">
							<button class="btn btn btn-secondary" onclick="location.href='/login'">로그인</button>
						</li>
					</ul>
				</div>
			</nav>
		`;
		render(template, this);
	}
}
customElements.define("ml-header-logout", HeaderLogoutElement);
