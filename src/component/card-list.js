import { LitElement, html } from "lit-element";
class CardListElement extends LitElement {
  render() {
    return html`
      <div class="container">
        <div
          class="row row-cols-1 row-cols-lg-2 row-cols-xxl-4 g-4"
          id="card-row"
        >
          <slot></slot>
        </div>
      </div>
    `;
  }
}
customElements.define("card-list", CardListElement);
