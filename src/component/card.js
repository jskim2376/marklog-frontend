import { LitElement, html } from "lit-element";
class CardElement extends LitElement {
  render() {
    return html`
      <div class="col">
        <div class="card h-100">
          <img class="card-img-top" />
          <div class="card-body">
            <h5 class="card-title"></h5>
            <p class="card-text">hihi</p>
          </div>
          <div class="card-footer">
            <small class="text-muted"></small>
          </div>
        </div>
      </div>
    `;
  }
}
customElements.define("card-element", CardElement);
