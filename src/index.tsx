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

    // 外部CSSファイルを読み込み
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "global.css";
    this.shadowRoot.appendChild(link);

    // Web Components の属性値を取得し、Reactコンポーネントをマウント
    const value = this.getAttribute('value') || '';
    ReactDOM.render(
      <App value={value} onCountChanged={this.handleCountChanged} />,
      this.shadowRoot
    );
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (name === 'value' && oldValue !== newValue) {
      // 更新された Web Components の属性値をReactコンポーネントに反映
      ReactDOM.render(
        <App value={newValue} onCountChanged={this.handleCountChanged} />,
        this.shadowRoot
      );
    }
  }

  disconnectedCallback() {
    if (this.shadowRoot === null) {
      return;
    }
    ReactDOM.unmountComponentAtNode(this.shadowRoot);
  }

  /**
   * Reactコンポーネントからカスタムイベントを実行するために渡すcallback関数
   */
  private handleCountChanged = (count: number) => {
    const event = new CustomEvent('count-changed', {
      detail: count,
    });
    this.dispatchEvent(event);
  };
}

customElements.define("react-app", ReactCounter);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
