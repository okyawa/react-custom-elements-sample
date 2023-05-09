import './App.css';

type Props = {
  value: string;
};

function App({ value }: Props) {
  return (
    <>
      <h1>React Custom Elements</h1>
      <dl>
        <dt>Value</dt>
        <dd>{value}</dd>
      </dl>
    </>
  )
}

export default App;
