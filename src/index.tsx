import { ExtendedReactCounter } from './components/ExtendedReactCounter';
import { ExtendedReactShadowCounter } from './components/ExtendedReactShadowCounter';
import { ReactCounter } from './components/ReactCounter';
import { ReactShadowCounter } from './components/ReactShadowCounter';

/**
 * Custom Elementsの登録
 */
customElements.define('react-shadow-counter', ReactShadowCounter);
customElements.define('react-counter', ReactCounter);
customElements.define('extended-react-shadow-counter', ExtendedReactShadowCounter);
customElements.define('extended-react-counter', ExtendedReactCounter);
