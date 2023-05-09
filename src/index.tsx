import ReactDOM from "react-dom";

import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

/**
 * Reactを使ったサンプルのCustom Elements
 */
class ReactCounter extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  /**
   * 要素がdocumentに追加された際に実行される
   */
  connectedCallback() {
    if (this.shadowRoot === null) {
      return;
    }

    // 外部CSSファイルを読み込み
    this.appendCSSFile('global.css')

    // Web Components の属性値を取得し、Reactコンポーネントをマウント
    const value = this.getAttribute('value') || '';
    ReactDOM.render(
      <App value={value} onCountChanged={this.handleCountChanged} />,
      this.shadowRoot
    );
  }

  /**
   * 変更を監視する属性名の配列を指定
   */
  static get observedAttributes() {
    return [
      'value',
    ];
  }

  /**
   * observedAttributesで列挙したいずれかの属性が変更されたときに呼ばれる
   */
  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (name === 'value' && oldValue !== newValue) {
      // 更新された Web Components の属性値をReactコンポーネントに反映
      ReactDOM.render(
        <App value={newValue} onCountChanged={this.handleCountChanged} />,
        this.shadowRoot
      );
    }
  }

  /**
   * 要素がdocumentから削除された際に実行される
   */
  disconnectedCallback() {
    if (this.shadowRoot === null) {
      return;
    }
    ReactDOM.unmountComponentAtNode(this.shadowRoot);
  }

  /**
   * 外部CSSファイルを読み込み
   */
  private appendCSSFile(filePath: string) {
    if (this.shadowRoot === null) {
      return
    }
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = filePath;
    this.shadowRoot.appendChild(link);
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

/**
 * Custom Elementsの登録
 */
customElements.define("react-app", ReactCounter);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
