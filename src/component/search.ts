import "@/component/search-post"
import { createSearchPost } from "@/component/search-post";
class SearchElement extends HTMLElement{
    connectedCallback(){
        this.innerHTML = `
    <!-- Main Content-->
    <main class="container vh-100">
        <div class="input-group input-group-lg mb-3">
            <button class="btn btn-outline-dark" id="search_button">
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                </svg>
            </button>
            <input type="text" class="form-control btn-outline-dark" placeholder="Search">
        </div>
        <div class="mb-5">
            <div class="container">
                <div
                class="row row-cols-1 mb-3"
                id="card-row">
                </div>
            </div>
        </div>
    </main>
        `
    }
}

customElements.define("ml-search", SearchElement);

export function createSearch(){
    return document.createElement("ml-search");

    // let shadow = searchPostDiv.attachShadow({"mode":"open"});
    // let slot = document.createElement("slot");
    // shadow.appendChild(slot);

    // let searchButton:HTMLElement = document.getElementById("search_button")!;
    // searchButton.onclick = ()=>{
    //     let searchPost = document.getElementsByTagName("ml-search-post")[0];
    //     let searchInput = document.getElementsByTagName("input")[0];
        
    //     searchPost.setAttribute("keyword",searchInput.value);
    // }
  }