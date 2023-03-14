import {createFooter} from '@/component/footer';
import {createHeader} from '@/component/header';
import {createRecentPost} from '@/component/recent-post';

class BlogPageElement extends HTMLElement {
	async connectedCallback() {
		this.appendChild(await createHeader('Marklog'));
		this.appendChild(createRecentPost());
		this.appendChild(createFooter());
	}
}
customElements.define('ml-blog-page', BlogPageElement);
