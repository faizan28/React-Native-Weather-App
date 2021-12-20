import React from 'react';
import Root from './src/index';
import {store, persistor} from './src/store/configureStore';

export default function App() {
  return <Root store={store} persistor={persistor} />;
}
