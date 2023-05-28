import 'bootstrap/dist/css/bootstrap.min.css';
import {css} from 'lit-element';

export const bootstrap = css`
`;

// my-element.js
import {bootstrap} from './bootstrap.css.js';

class MyElement extends LitElement {
  static styles = bootstrap;
}