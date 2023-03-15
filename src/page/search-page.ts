import "@/component/header/element/header-login";
import "@/component/footer/footer";
import { createHeader } from "@/component/header/header";
import { createFooter } from "@/component/footer/footer";
import { createSearchPost } from "@/component/main/search";

class SearchPageElement extends HTMLElement {
	async connectedCallback() {
		const urlParameter = window.location.search;
		this.appendChild(await createHeader("Marklog"));
		this.appendChild(createSearchPost());
		this.appendChild(createFooter());
	}
}
customElements.define("ml-search-page", SearchPageElement);
