import '@/component/header-login';
import '@/component/header-logout';
import {Api} from '@/api/api';

export async function createHeader(blogName: string) {
	let api = new Api();
	let accessToken = localStorage.getItem('access-token');
	if (accessToken == null) {
		let header = document.createElement('ml-header-logout');
		header.setAttribute('blog-name', blogName);
		return header;
	} else {
		let header = document.createElement('ml-header-login');
		header.setAttribute('blog-name', blogName);
		return header;
	}
}
