import { Api } from "@/api/api";
import { TagCount } from "@/interface/tag-count";
import { html, render } from "lit";
export class TagElement extends HTMLElement {
	async createTag(userId: number) {
		let api = new Api();
		let tagCount: TagCount = await api.getTagCount(userId);

		const template = html` <div></div> `;
		render(template, this);
	}
}
