import CountUp from './CountUp';
import { CustomElementBase } from './CustomElementBase';

/**
 * Reactを使ったサンプルのCustom Elements (Shadow Rootを使用しない)
 */
export class ExtendedReactCounter extends CustomElementBase {
  /** Reactコンポーネントからカスタムイベントを実行する際のカスタムイベント名 */
  protected customEventName = 'sampleEvent';

  /** Shadow Rootを使うかどうか */
  protected shadowRootEnabled = false;

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
}
