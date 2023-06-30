// <sl-button>, <sl-icon>, <sl-input>, and <sl-rating> are ready to use!
import { createEdit } from "@/component/main/edit";

class EditPageElement extends HTMLElement {
	async connectedCallback() {
		this.appendChild(createEdit());
	}
}
customElements.define("ml-edit-page", EditPageElement);
