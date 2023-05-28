import { LitElement, html } from "lit-element";
class LogoutHeaderElement extends LitElement {
  render() {
    return html`
      <nav
        class="navbar navbar-expand-lg navbar-light bg-light"
        id="logout-nav"
      >
        <div class="container">
          <a class="navbar-brand fs-3" href="index.html">Marklog</a>
          <ul class="nav">
            <li class="nav-item">
              <a class="nav-link" href="search.html"
                ><i class="fa-solid fa-magnifying-glass"></i
              ></a>
            </li>
            <li class="nav-item">
              <button
                class="btn btn btn-secondary"
                onclick="location.href='login.html'"
              >
                로그인
              </button>
            </li>
          </ul>
        </div>
      </nav>
    `;
  }
}
customElements.define("logout-header", LogoutHeaderElement);
