import { createStore } from 'redux';
import PolymerRedux from 'polymer-redux';

const reducers = {};

const initialStore = {};

const store = createStore((state = initialStore, action) => state);

const ReduxMixin = PolymerRedux(store);

export { reducers, store, ReduxMixin };
