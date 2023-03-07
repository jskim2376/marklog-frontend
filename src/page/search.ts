import "@/component/header-login";
import "@/component/footer";
import { createHeader } from "@/component/header";
import { createFooter } from "@/component/footer";
import { createSearch } from "@/component/search";

class SearchPageElement extends HTMLElement {
  async connectedCallback() {
    this.appendChild(await createHeader());
    this.appendChild(createSearch());
    this.appendChild(createFooter())
  }
}
customElements.define('ml-search-page', SearchPageElement);
