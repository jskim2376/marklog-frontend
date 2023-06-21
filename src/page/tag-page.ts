import "@/component/header/element/header-login";
import "@/component/footer/footer";
import { createHeader } from "@/component/header/header";
import { createFooter } from "@/component/footer/footer";
import { createTagPost } from "@/component/main/tag";

class TagPageElement extends HTMLElement {
	async connectedCallback() {
		const urlParameter = window.location.search;
		this.appendChild(await createHeader("Marklog", 0));
		this.appendChild(createTagPost());
		this.appendChild(createFooter());
	}
}
customElements.define("ml-tag-page", TagPageElement);
