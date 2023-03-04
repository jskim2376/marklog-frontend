import { Api} from "@/utils/api";

class RecentPostElement extends HTMLElement {
  getCard(postId:string, imgSrc:string, cardTitle:string, cardSummary:string, cardDate:string, cardCommentCount:number, cardLikeCount:number, picture:string, cardWriter:string, cardWriterSrc:string): HTMLElement {
    let card = document.createElement("div");
    card.innerHTML = ` 
    <div class="col h-100">
      <div class="card h-100">
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
    </div>
  `;

    return card;
  }

  async connectedCallback() {
    this.innerHTML = ` 
      <div class="container">
        <div
          class="row row-cols-1 row-cols-lg-2 row-cols-xxl-4 g-4"
          id="card-row">
        </div>
      </div>
    `;

    let api = new Api;
    let recentPosts = await api.getRecentPost();
    let card_row:HTMLElement = document.getElementById("card-row")!;
    for(let post of recentPosts.content)
    {
      card_row.appendChild(this.getCard(post.postId ,post.thumbnail,post.title, post.summary, post.modifiedDate,post.commentCount,post.likeCount,post.picture, post.userName,post.userId));
    }
  }
}

customElements.define("ml-recent-post", RecentPostElement);

export function createRecentPost(parent:HTMLElement){
  let element:HTMLElement = document.createElement("ml-recent-post");
  parent.appendChild(element);
}