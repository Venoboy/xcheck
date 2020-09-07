import { createStore } from 'redux';
import reducer from '../Reducer/reducer';

const Store: any = createStore(reducer);

export default Store;
