import React from 'react';
import {Router, Scene} from 'react-native-router-flux';
import MainPage from './../components/Main/mainPage';
import WelcomePage from '../components/welcome/welcomePage';
import {useStore} from 'react-redux';
import store from './../store/configureStore';

const Routes = () => {
  let homeInitial = false;
  const mainStore = useStore(store);
  const reducer = mainStore.getState();
  if (reducer?.countReducers?.currentWeatherData?.current) {
    homeInitial = true;
  }
  console.log('MYREDUER=>', reducer);
  return (
    <Router>
      <Scene key="root" hideNavBar="true">
        <Scene key="welcome" component={WelcomePage} title="Welcome" />
        <Scene
          key="home"
          component={MainPage}
          title="Home"
          initial={homeInitial}
        />
      </Scene>
    </Router>
  );
};
export default Routes;
