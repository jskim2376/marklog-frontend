import { html, render } from "lit-html";

class LoginElement extends HTMLElement {
	connectedCallback() {
		const template = html`
			<div class="container vh-100">
				<div class="border py-5 my-5 mx-auto" style="max-width:400px;">
					<div>
						<h1 class="text-center">Login</h1>
						<br />
						<br />
						<button
							onclick="location.assign(window.location.origin + '/api/oauth2/authorization/google')"
							class="btn btn-outline-primary d-block mx-auto btn-lg">
							<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-google" viewBox="0 0 16 16">
								<path
									d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z" />
							</svg>
							Login with Google
						</button>
					</div>
				</div>
			</div>
		`;
		render(template, this);
	}
}

customElements.define("ml-login", LoginElement);

export function createLogin() {
	return document.createElement("ml-login");
}
