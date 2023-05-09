import ReactDOM from "react-dom";

import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

class ReactCounter extends HTMLElement {
  static get observedAttributes() {
    return [
      'value',
    ];
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    if (this.shadowRoot === null) {
      return;
    }
    const value = this.getAttribute('value') || '';
    ReactDOM.render(<App value={value} />, this.shadowRoot);
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (name === "value" && oldValue !== newValue) {
      ReactDOM.render(<App value={newValue} />, this.shadowRoot);
    }
  }

  disconnectedCallback() {
    if (this.shadowRoot === null) {
      return;
    }
    ReactDOM.unmountComponentAtNode(this.shadowRoot);
  }
}

customElements.define("react-app", ReactCounter);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
