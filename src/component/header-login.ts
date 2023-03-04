import userimg from '@/assets/img/user.png';
class HeaderLoginElement extends HTMLElement {
  static get observedAttributes() {
    // 모니터링 할 속성 이름
    return ['user-id', 'user-picture'];
  }

  attributeChangedCallback(name:string, oldValue:string, newValue:string) {
    if(name=="user-id"){
      let myblog:HTMLElement = document.getElementById("myblog")!;
      myblog.setAttribute("href","user/"+newValue);
    }
    else if(name=="user-picture"){
      let userProfile:HTMLElement = document.getElementById("userProfile")!;
      userProfile.setAttribute("src",newValue);
    }
  }

  connectedCallback() {
    this.innerHTML = `
    <nav class="navbar navbar-expand-lg navbar-light bg-light mb-3" id="login-nav">
      <div class="container">
        <a class="navbar-brand fs-3" href="/">Marklog</a>
        <ul class="nav">
          <li class="nav-item">
            <a class="nav-link" href="search.html"
              ><i class="fa-solid fa-magnifying-glass"></i
            ></a>
          </li>
          <li class="nav-item">
            <button onclick="location.href='/search'" class="btn">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
            </svg>
           </button>
          </li>
          <li class="nav-item">
            <button class="btn btn btn-secondary" onclick="location.href='/write'">글 작성</button>
          </li>
          <li class="nav-item dropdown show">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              id="navbarDropdown"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <img title="profile img" class="float-start rounded-circle" width=25 height=25 id="userProfile" />
            </a>
            <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
              <li>
                <a class="dropdown-item" id="myblog">내블로그</a>
              </li>
              <li><a class="dropdown-item" href="/setting">설정</a></li>
              <li>
                <hr class="dropdown-divider" />
              </li>
              <li>
                <a class="dropdown-item" href="/logout">로그아웃</a>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </nav>
  `;
  }

}

customElements.define('ml-header-login', HeaderLoginElement);