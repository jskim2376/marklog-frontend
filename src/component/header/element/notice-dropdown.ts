import { Api } from "@/api/api";
import { Notice } from "@/interface/notice";
import { html, render } from "lit";

export async function createNoticeElement(userId: string): Promise<HTMLElement[]> {
	let api = new Api();
	let notices: Array<Notice> = await api.getNotices(userId);
	let noticeElements: Array<HTMLElement> = new Array();

	let header: HTMLElement = document.createElement("li");
	header.setAttribute("class", "dropdown-header d-flex justify-content-between mx-2");
	const temp = html`
		<b>알림</b>
		<a href="/" class="text-black">
			<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
				<path
					d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
				<path
					fill-rule="evenodd"
					d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
			</svg>
		</a>
	`;
	render(temp, header);
	noticeElements.push(header);

	let headerLine: HTMLElement = document.createElement("li");
	const temp2 = html`<hr class="dropdown-divider" />`;
	render(temp2, headerLine);
	noticeElements.push(headerLine);

	let tt: HTMLElement = document.createElement("li");
	tt.innerText = "hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh";
	noticeElements.push(tt);

	notices.forEach((element) => {
		let item: HTMLElement = document.createElement("li");
		item.setAttribute("class", "dropdown-item");
		item.innerText = element.content;
		Array<Notice>;
		item.onclick = () => {
			api.deleteNotice(element.id);
			item.remove();
		};
		noticeElements.push(item);
	});
	return noticeElements;
}
