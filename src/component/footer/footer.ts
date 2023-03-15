import githubImage from "@/assets/img/github.png";
class FooterElement extends HTMLElement {
	connectedCallback() {
		this.innerHTML = `     
    <div class="container">
    <hr class="hr" />
    <a target="_blank" class="d-block">
      <img
      title="github"
        class="mx-auto d-block"
        src=${githubImage}
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
customElements.define("ml-footer", FooterElement);

export function createFooter() {
	return document.createElement("ml-footer");
}
