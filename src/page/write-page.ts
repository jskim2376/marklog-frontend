// <sl-button>, <sl-icon>, <sl-input>, and <sl-rating> are ready to use!
import { createHeader } from "@/component/header/header";
import { createRecentPost } from "@/component/main/home";
import { createFooter } from "@/component/footer/footer";
import { createWrite } from "@/component/main/write";

class WritePageElement extends HTMLElement {
	async connectedCallback() {
		this.appendChild(createWrite());
	}
}
customElements.define("ml-write-page", WritePageElement);
