import { ReactShadowCounter } from './components/ReactShadowCounter';
import reportWebVitals from './reportWebVitals';

/**
 * Custom Elementsの登録
 */
customElements.define('react-app', ReactShadowCounter);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
