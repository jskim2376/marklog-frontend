import "@/component/header-login";
import "@/component/footer";
import { createHeader } from "@/component/header";
import { createFooter } from "@/component/footer";
import { createSearchPost } from "@/component/search-post";

class SearchPageElement extends HTMLElement {
  async connectedCallback() {
    this.appendChild(await createHeader());
    this.appendChild(createSearchPost());
    this.appendChild(createFooter())
  }
}
customElements.define('ml-search-page', SearchPageElement);
