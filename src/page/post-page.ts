import "@/component/header-login";
import "@/component/footer";
import { createHeader } from "@/component/header";
import { createFooter } from "@/component/footer";
import { RouterLocation } from "@vaadin/router";
import { createPost } from "@/component/post";

class PostPageElement extends HTMLElement {
  onBeforeEnter(location: RouterLocation) { 
    let id = location.params.id as string;
    this.setAttribute("post-id",id);
  }

  async connectedCallback() {
    this.appendChild(await createHeader("hihi"));
    this.appendChild(createPost());
    this.appendChild(createFooter())
  }

}
customElements.define('ml-post-page', PostPageElement);
