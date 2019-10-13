import React from 'react';
import logo from './logo.svg';
import './css/App.css';
import { Provider } from 'react-redux';

import { store, persistor } from "./store";
import { PersistGate } from 'redux-persist/integration/react';
import Dashboard from './screens/dashboard';

interface iProps {

};

interface iState {

};

export default class App extends React.Component<iProps, iState> {

  constructor(props: iProps) {
    super(props);
  }

  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={<div>Loading...</div>} persistor={persistor}>
          <Dashboard />
        </PersistGate>
      </Provider>
    )
  }

}
