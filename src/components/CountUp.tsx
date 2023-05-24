import { useEffect, useState } from 'react';
import './CountUp.css';

type Props = {
  value: string;
  onCountChanged: (count: number) => void;
};

function CountUp({ value, onCountChanged }: Props) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    // カスタムイベントを発行
    onCountChanged(count);
  }, [count, onCountChanged]);

  const handleClick = () => {
    setCount(count + 1);
  };

  return (
    <>
      <section>
        <h1>React Custom Elements</h1>
        <ul>
          <li>Custom Elements 内</li>
        </ul>
        <dl>
          <dt>Value:</dt>
          <dd>[ <strong>{value}</strong> ]</dd>
        </dl>
        <p>
          <b>{count}</b>: <button type="button" onClick={handleClick}>カウントアップ</button>
        </p>
      </section>
    </>
  );
}

export default CountUp;
