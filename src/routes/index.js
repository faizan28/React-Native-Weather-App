import React from 'react';
import {Router, Scene} from 'react-native-router-flux';
import MainPage from './../components/Main/mainPage';
import WelcomePage from '../components/welcome/welcomePage';

const Routes = () => (
  <Router>
    <Scene key="root" hideNavBar="true">
      <Scene
        key="welcome"
        component={WelcomePage}
        title="Welcome"
        initial={true}
      />
      <Scene key="home" component={MainPage} title="Home" />
    </Scene>
  </Router>
);
export default Routes;
