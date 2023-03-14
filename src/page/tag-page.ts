import "@/component/header-login";
import "@/component/footer";
import {createHeader} from "@/component/header";
import {createFooter} from "@/component/footer";
import {createTagPost} from "@/component/tag-post";

class TagPageElement extends HTMLElement {
	async connectedCallback() {
		this.appendChild(await createHeader("Marklog"));
		this.appendChild(createTagPost());
		this.appendChild(createFooter());
	}
}
customElements.define("ml-tag-page", TagPageElement);
