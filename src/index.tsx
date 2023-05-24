import { ReactCounter } from './components/ReactCounter';
import { ReactShadowCounter } from './components/ReactShadowCounter';

/**
 * Custom Elementsの登録
 */
customElements.define('react-shadow-counter', ReactShadowCounter);
customElements.define('react-counter', ReactCounter);
