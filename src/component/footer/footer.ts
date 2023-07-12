class FooterElement extends HTMLElement {
	connectedCallback() {
		this.innerHTML = `     
    <div class="container">
    <hr class="hr" />
    <a target="_blank" class="d-block">

    </a>
    <div class="small text-center text-muted fst-italic">
      Copyright &copy; padomay1352@gmail.com
    </div>
  </div>
`;
	}
}
customElements.define("ml-footer", FooterElement);

export function createFooter() {
	return document.createElement("ml-footer");
}
