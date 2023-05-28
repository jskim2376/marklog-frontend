import { LitElement, html } from "lit-element";
class FooterElement extends LitElement {
  render() {
    return html`
      <div class="container">
        <hr class="hr" />
        <a target="_blank" class="d-block">
          <img
            class="mx-auto d-block"
            src="assets/img/github.png"
            width="35"
            height="35"
            onclick="location.href='https://github.com/padomay1352/marklog.git'"
            style="cursor: pointer"
          />
        </a>
        <div class="small text-center text-muted fst-italic">
          Copyright &copy; padomay1352@gmail.com
        </div>
      </div>
    `;
  }
}
customElements.define("footer-element", FooterElement);
