import ReactDOM from "react-dom";
import { createRoot, Root } from 'react-dom/client';

import './ReactCounter.css';
import CountUp from './CountUp';

/**
 * Reactを使ったサンプルのCustom Elements
 */
export class ReactShadowCounter extends HTMLElement {
  private root: Root | null;

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.root = null;
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
    this.root = createRoot(this.shadowRoot);
    this.root.render(
      <CountUp value={value} onCountChanged={this.handleCountChanged} />
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
    if (this.root === null) {
      return;
    }
    if (ReactShadowCounter.observedAttributes.includes(name) && oldValue !== newValue) {
      // 更新された Web Components の属性値をReactコンポーネントに反映
      this.root.render(
        <CountUp value={newValue} onCountChanged={this.handleCountChanged} />
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
