import React, {Component} from 'react';
import {View, ImageBackground, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import WelcomeText from './welcomeText';
import {Actions} from 'react-native-router-flux';
export class welcome extends Component {
  constructor(props) {
    super(props);
    console.log('weatherReducer:', props);
    if (props.weatherReducer?.currentWeatherData?.current) {
      Actions.home();
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <ImageBackground
          source={require('./../../../assets/images/white-clouds-blue-background.jpg')}
          resizeMode="cover"
          style={styles.image}>
          <WelcomeText />
        </ImageBackground>
      </View>
    );
  }
}

const mapStateToProps = state => ({weatherReducer: state.countReducers});

const mapDispatchToProps = {};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    // justifyContent: 'center',
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(welcome);
