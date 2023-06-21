// <sl-button>, <sl-icon>, <sl-input>, and <sl-rating> are ready to use!
import { createHeader } from "@/component/header/header";
import { createRecentPost } from "@/component/main/home";
import { createFooter } from "@/component/footer/footer";

class HomePageElement extends HTMLElement {
	async connectedCallback() {
		this.appendChild(await createHeader("Marklog", 0));
		this.appendChild(createRecentPost());
		this.appendChild(createFooter());
	}
}
customElements.define("ml-home-page", HomePageElement);
