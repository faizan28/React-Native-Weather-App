import React from 'react';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import Routes from './routes';
import DeviceInfo from 'react-native-device-info';
const App = props => {
  let interval;
  if (interval === undefined) {
    // interval = setInterval(() => {
    //   DeviceInfo.getBatteryLevel().then(batteryLevel => {
    //     // 0.759999
    //     console.log('BATTYER=>', batteryLevel);
    //   });
    // }, 2000);
  }

  console.log('INTERVAL =>', interval);
  const {store, persistor} = props;
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Routes />
      </PersistGate>
    </Provider>
  );
};
export default App;
