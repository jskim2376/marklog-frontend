import '@/component/header-login';
import '@/component/footer';
import {Api} from '@/api/api';
import {createHeader} from '@/component/header';
import {createFooter} from '@/component/footer';
import {createLogin} from '@/component/login';

class LoginPageElement extends HTMLElement {
	async connectedCallback() {
		this.appendChild(await createHeader('Marklog'));
		this.appendChild(createLogin());
		this.appendChild(createFooter());
	}
}
customElements.define('ml-login-page', LoginPageElement);
