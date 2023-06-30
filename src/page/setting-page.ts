import "@/component/header/element/header-login";
import "@/component/footer/footer";
import { createHeader } from "@/component/header/header";
import { createFooter } from "@/component/footer/footer";
import { createSearchPost } from "@/component/main/search";
import { createSetting } from "@/component/main/setting";

class SettingPageElement extends HTMLElement {
	async connectedCallback() {
		const urlParameter = window.location.search;
		this.appendChild(await createHeader("Marklog", 0));
		this.appendChild(createSetting());
	}
}
customElements.define("ml-setting-page", SettingPageElement);
