import { useEffect, useState } from 'react';
import './App.css';

type Props = {
  value: string;
  onCountChanged: (count: number) => void;
};

function App({ value, onCountChanged }: Props) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    // カスタムイベントを発行
    onCountChanged(count);
  }, [count, onCountChanged]);

  const handleClick = () => {
    setCount(count + 1);
  }

  return (
    <>
      <section>
        <h1>React Custom Elements</h1>
        <p>Custom Elements 内</p>
        <dl>
          <dt>Value</dt>
          <dd>{value}</dd>
        </dl>
        <p>
          <b>{count}</b>: <button type="button" onClick={handleClick}>カウントアップ</button>
        </p>
      </section>
    </>
  )
}

export default App;
