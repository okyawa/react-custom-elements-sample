import ReactDOM from 'react-dom';
import { createRoot, Root } from 'react-dom/client';

/**
 * Reactを使ったCustom Elementsのベースクラス
 */
export class CustomElementBase extends HTMLElement {
  /**
   * Reactコンポーネントからカスタムイベントを実行する際のカスタムイベント名
   *
   * ※継承先で実装
   */
  protected customEventName = 'customElementEvent';

  /**
   * Shadow Rootを使うかどうか
   *
   * ※継承先で実装
   */
  protected shadowRootEnabled = true;

  protected root: Root | null;

  constructor() {
    super();
    if (this.shadowRootEnabled) {
      this.attachShadow({ mode: 'open' });
    }
    this.root = null;
  }

  /**
   * 要素がdocumentに追加された際に実行される
   */
  connectedCallback() {
    if (this.shadowRootEnabled && this.shadowRoot === null) {
      return;
    }

    // Web Components の属性値を取得し、Reactコンポーネントをマウント
    if (this.shadowRootEnabled && this.shadowRoot !== null) {
      this.root = createRoot(this.shadowRoot);
    } else {
      this.root = createRoot(this);
    }
    this.render();
  }

  /**
   * 変更を監視する属性名の配列を指定
   *
   * ※継承先で実装
   */
  static get observedAttributes(): string[] {
    return [
    ];
  }

  /**
   * observedAttributesで列挙したいずれかの属性が変更されたときに呼ばれる
   */
  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (this.root === null) {
      return;
    }
    if (oldValue === newValue) {
      return;
    }
    // 更新された Web Components の属性値をReactコンポーネントに反映
    this.render();
  }

  /**
   * 要素がdocumentから削除された際に実行される
   */
  disconnectedCallback() {
    if (!this.shadowRootEnabled) {
      ReactDOM.unmountComponentAtNode(this);
      return;
    }
    if (this.shadowRoot === null) {
      return;
    }
    ReactDOM.unmountComponentAtNode(this.shadowRoot);
  }

  /**
   * Reactコンポーネントを描画
   *
   * ※継承先で実装
   *
   * 実装例)
   * this.root.render(<Sample />);
   */
  protected render() { }

  /**
   * 外部CSSファイルを読み込み
   */
  protected appendCSSFile(filePath: string) {
    if (!this.shadowRootEnabled) {
      // Shadow Rootを使わない場合、
      // 外部CSSを読み込んでもCustom Elements内にスコープを限定できないため、読み込まない
      return;
    }
    if (this.shadowRoot === null) {
      return;
    }
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = filePath;
    this.shadowRoot.appendChild(link);
  }
}
