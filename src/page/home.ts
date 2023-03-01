// <sl-button>, <sl-icon>, <sl-input>, and <sl-rating> are ready to use!
import {LitElement, customElement, property} from "lit-element";
import {html} from 'lit-html';
import "@/component/header-login";
import "@/component/footer";

@customElement('home-page')
class HomePage extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `      
    <header-login></header-login>
    <footer-element></footer-element>
    `
  }
}