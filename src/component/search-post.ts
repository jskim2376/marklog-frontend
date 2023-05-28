import { Api} from "@/utils/api";

class SearchPostElement extends HTMLElement {


  static get observedAttributes() {
    // 모니터링 할 속성 이름
    return ['keyword'];
  }

  async attributeChangedCallback(name:string, oldValue:string, newValue:string) {
    }
  }

  connectedCallback() {
    this.innerHTML = ` 

    `;
  }
}

customElements.define("ml-search-post", SearchPostElement);

export function createSearchPost(){
  return document.createElement("ml-search-post");
}