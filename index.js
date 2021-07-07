/**
 * @format
 */

import React from 'react';
import {AppRegistry} from 'react-native';
import App from './App';
import {Provider} from 'react-redux';
import {Store} from './src/module/store';
import {name as appName} from './app.json';
import {PersistGate} from 'redux-persist/integration/react';

import {persistStore} from 'redux-persist';
const persistor = persistStore(Store);
const Root = () => {
  return (
    <Provider store={Store}>
      <PersistGate persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  );
};
AppRegistry.registerComponent(appName, () => Root);
