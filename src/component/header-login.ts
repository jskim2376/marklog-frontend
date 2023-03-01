import { html , customElement} from "lit-element";
import userimg from '@/assets/img/user.png';
import "bootstrap";
@customElement("header-login")
class HeaderLoginElement extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
    <nav class="navbar navbar-expand-lg navbar-light bg-light" id="login-nav">
      <div class="container">
        <a class="navbar-brand fs-3" href="index.html">Marklog</a>
        <ul class="nav">
          <li class="nav-item">
            <a class="nav-link" href="search.html"
              ><i class="fa-solid fa-magnifying-glass"></i
            ></a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="post-create.html">새글작성</a>
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
              <img title="profile img" class="float-start profile" src=${userimg} />
            </a>
            <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
              <li>
                <a class="dropdown-item" href="userpost.html">내글보기</a>
              </li>
              <li><a class="dropdown-item" href="setting.html">설정</a></li>
              <li>
                <hr class="dropdown-divider" />
              </li>
              <li>
                <a class="dropdown-item" href="logout.html">로그아웃</a>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </nav>
  `;

  }
}