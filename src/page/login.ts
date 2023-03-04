import "@/component/header-login";
import "@/component/footer";
import { Api } from "@/utils/api";
import { createHeader } from "@/component/header";
import { createFooter } from "@/component/footer";
import { createLoginElement } from "@/component/login";

class LoginPageElement extends HTMLElement {
  async connectedCallback() {
    let api = new Api;
    let accessToken = await api.getAccessToken();
    await createHeader(this, accessToken);
    createLoginElement(this);
    createFooter(this);
  }

}
customElements.define('ml-login-page', LoginPageElement);
