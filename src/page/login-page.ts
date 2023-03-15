import "@/component/header/element/header-login";
import "@/component/footer/footer";
import { createHeader } from "@/component/header/header";
import { createFooter } from "@/component/footer/footer";
import { createLogin } from "@/component/main/login";

class LoginPageElement extends HTMLElement {
	async connectedCallback() {
		this.appendChild(await createHeader("Marklog"));
		this.appendChild(createLogin());
		this.appendChild(createFooter());
	}
}
customElements.define("ml-login-page", LoginPageElement);
