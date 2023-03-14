import '@/component/header-login';
import '@/component/footer';
import {createHeader} from '@/component/header';
import {createFooter} from '@/component/footer';
import {createSearchPost} from '@/component/search-post';

class TagPageElement extends HTMLElement {
	async connectedCallback() {
		const urlParameter = window.location.search;
		this.appendChild(await createHeader('Marklog'));
		this.appendChild(createSearchPost());
		this.appendChild(createFooter());
	}
}
customElements.define('ml-tag-page', TagPageElement);
