// <sl-button>, <sl-icon>, <sl-input>, and <sl-rating> are ready to use!
import { html, LitElement } from "lit";
import "@shoelace-style/shoelace/dist/themes/light.css";
import "@shoelace-style/shoelace/dist/components/button/button.js";
import "@shoelace-style/shoelace/dist/components/icon/icon.js";
import "@shoelace-style/shoelace/dist/components/input/input.js";
import "@shoelace-style/shoelace/dist/components/rating/rating.js";
import { setBasePath } from "@shoelace-style/shoelace/dist/utilities/base-path.js";

// Set the base path to the folder you copied Shoelace's assets to
setBasePath("/path/to/shoelace/dist");
class MyPage extends LitElement {
  render() {
    return html`<sl-button>hi</sl-button>`;
  }
}
customElements.define("my-page", MyPage);