// <sl-button>, <sl-icon>, <sl-input>, and <sl-rating> are ready to use!
import { createEdit } from "@/component/main/edit";
import { createWrite } from "@/component/main/write";

class WritePageElement extends HTMLElement {
	async connectedCallback() {
		this.appendChild(createWrite());
	}
}
customElements.define("ml-write-page", WritePageElement);
