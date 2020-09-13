import { createStore, Store } from 'redux';
import reducer from '../Reducer/reducer';

const store: Store<ReturnType<typeof reducer>> = createStore(reducer);

export default store;
