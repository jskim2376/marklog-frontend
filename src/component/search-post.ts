import "@/component/search-post"
import { Api } from "@/utils/api";
function getCard(postId:string, imgSrc:string, cardTitle:string, cardSummary:string, cardDate:string, cardCommentCount:number, cardLikeCount:number, picture:string, cardWriter:string, cardWriterSrc:string): HTMLElement {
  let card = document.createElement("div");
  card.setAttribute("class", "col mb-3");
  card.innerHTML = ` 
    <div class="card">
      <div>
        <a href=${"post/"+postId} class="text-dark text-decoration-none" >
          <img src=${imgSrc} class="card-img-top object-fit-cover" style=" aspect-ratio: 16/9;object-fit:cover">
          <div class="card-body">
              <h5 class="card-title">${cardTitle}</h5>
            <p class="card-text">${cardSummary}</p>
          </div>
        </a>
      <div class="card-footer">
          <small class="text-muted">${cardDate.substring(0,10)}</small>
          &nbsp;&nbsp;
            <small class="text-muted">♥·${cardLikeCount}</small>
            <small class="text-muted">댓글·${cardCommentCount}</small>
          <br/>
          <small class="text-muted">by
            <a href=${"user/"+cardWriterSrc}>${cardWriter}</a>
          </small>
      </div>
    </div>
   `;
  return card;
}
class SearchPostElement extends HTMLElement{
  getPage(){
    let cardrow = document.getElementById("card-row")!;
    let page = parseInt(cardrow.getAttribute("page")!);
    page++;
    cardrow.setAttribute("page",page.toString());
    return page;
  }  
  
  async setSearchCard(page:number){
        let api = new Api;
        let searchInput = <HTMLInputElement>document.getElementById('search-input')!;
        let searchPost = await api.getSearchPost(searchInput.value, page);
        let cardRow = document.getElementById("card-row")!;
        if(page==0){
          cardRow.innerHTML='';
        }
        for(let post of searchPost.content)
        {
          cardRow.appendChild(getCard(post.postId ,post.thumbnail,post.title, post.summary, post.modifiedDate,post.commentCount,post.likeCount,post.picture, post.userName,post.userId));
        }
    }
    
    connectedCallback(){
        this.innerHTML = `
        <!-- Main Content-->
        <div class="container">
          <div class="input-group input-group-lg mb-3">
              <button class="btn btn-outline-dark" id="search-button">
                  <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                  </svg>
              </button>
              <input type="text" class="form-control btn-outline-dark" placeholder="Search" id="search-input">
          </div>
          <div class="mb-5">
            <div
            class="row row-cols-1 mb-3"
            page=0
            id="card-row">
            </div>
          </div>
        </div>
        `

        let searchButton:HTMLElement = document.getElementById("search-button")!;
        let searchInput:HTMLElement = document.getElementById("search-input")!;
        searchButton.onclick = ()=>{
          this.setSearchCard(0)
          window.addEventListener('scroll', () => {
            let val = window.innerHeight + window.scrollY;
            if(val >= document.body.offsetHeight){
              let page = this.getPage();
              this.setSearchCard(page);
            }
          });       
        };
        searchInput.onkeydown = (e)=>{
            if(e.code ==  "Enter"){
              searchButton.click();
            }
        }
    }
}

customElements.define("ml-search-post", SearchPostElement);

export function createSearchPost(){
    return document.createElement("ml-search-post");
  }