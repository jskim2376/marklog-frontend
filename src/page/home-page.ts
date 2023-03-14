// <sl-button>, <sl-icon>, <sl-input>, and <sl-rating> are ready to use!
import { createHeader} from "@/component/header";
import { createRecentPost} from "@/component/recent-post";
import {createFooter} from "@/component/footer";
import { Api } from "@/api/api";

class HomePageElement extends HTMLElement {
  async connectedCallback() {
    this.appendChild(await createHeader("Marklog"));
    this.appendChild(createRecentPost());
    this.appendChild(createFooter())
  }
}
customElements.define('ml-home-page', HomePageElement);
