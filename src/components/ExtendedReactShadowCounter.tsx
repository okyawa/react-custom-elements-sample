import CountUp from './CountUp';
import { CustomElementShadowBase } from './CustomElementShadowBase';

/**
 * Reactを使ったサンプルのCustom Elements (Shadow Rootを使用)
 */
export class ExtendedReactShadowCounter extends CustomElementShadowBase {
  /** Reactコンポーネントからカスタムイベントを実行する際のカスタムイベント名 */
  protected customEventName = 'sampleEvent';

  connectedCallback() {
    super.connectedCallback();
    this.appendCSSFile('global.css');
  }

  /**
   * 変更を監視する属性名の配列を指定
   */
  static get observedAttributes(): string[] {
    return [
      'value',
    ];
  }

  /**
   * Reactコンポーネントを描画
   */
  protected render() {
    if (this.root === null) {
      return;
    }
    const value = this.getAttribute('value') || '';
    this.root.render(
      <CountUp value={value} onCountChanged={this.handleCountChanged} />,
    );
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

  /**
   * Reactコンポーネントの再描画が必要かどうか
   */
  protected needRendering(name: string, oldValue: string, newValue: string): boolean {
    const isTargetAttribute = ExtendedReactShadowCounter
      .observedAttributes
      .includes(name);
    return isTargetAttribute && oldValue !== newValue;
  }
}
