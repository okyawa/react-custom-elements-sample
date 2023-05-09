import './App.css';

type Props = {
  value: string;
};

function App({ value }: Props) {
  return (
    <>
      <section>
        <h1>React Custom Elements</h1>
        <p>Custom Elements 内</p>
        <dl>
          <dt>Value</dt>
          <dd>{value}</dd>
        </dl>
      </section>
    </>
  )
}

export default App;
