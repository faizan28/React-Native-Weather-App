import React, {Component} from 'react';
import {Text, View, SafeAreaView, StyleSheet, Dimensions} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {TouchableOpacity} from 'react-native-gesture-handler';

import PermissionModal from './../modals/permissionModal';
import {
  getWeatherDataAction,
  getWeatherHistoryDataAction,
} from './../../actions/counts';
import {connect} from 'react-redux';
import {Actions} from 'react-native-router-flux';

var height = Dimensions.get('window').height;
var width = Dimensions.get('window').width;
class WelcomeText extends Component {
  state = {
    modalVisible: false,
  };
  onContinueBtn = event => {
    this.setState({modalVisible: true});
  };
  handleCallback = event => {
    this.setState({modalVisible: false});
    if (event === false) {
      Actions.home();
    }
  };
  render() {
    return (
      <SafeAreaView>
        <View style={{alignItems: 'center'}}>
          <Animatable.View animation="slideInDown" direction="alternate">
            <Text style={styles.text}>Welcome</Text>
          </Animatable.View>
          <View>
            <Animatable.View delay={1000} duration={2000} animation="fadeIn">
              <Text style={[styles.h5, styles.lineHeight]}>to</Text>
              <Text style={styles.h5}>Weather App</Text>
            </Animatable.View>
            <Animatable.View animation="slideInLeft">
              <View style={styles.descCont}>
                <Text style={styles.descText}>
                  Forecast Daily, Hourly and for next 3 days on your current
                  location.
                </Text>
              </View>
            </Animatable.View>
            <Animatable.View
              delay={0}
              duration={2000}
              animation="slideInUp"
              direction="normal">
              <View style={styles.bottomCont}>
                <TouchableOpacity
                  onPress={this.onContinueBtn}
                  style={styles.touchBtn}>
                  <Text style={styles.btnTxt}>Continue</Text>
                </TouchableOpacity>
                <Text style={styles.perTxt}>
                  by selecting continue you must allowing permission for gps
                  location for getting accurate results.
                </Text>
                <Text style={styles.bottomText}>
                  This app is develop by Faizan Naeem using React Native as an
                  asssignment
                </Text>
              </View>
            </Animatable.View>
          </View>
        </View>
        {this.state.modalVisible === true && (
          <PermissionModal
            {...this.props}
            modalVisible={this.state.modalVisible}
            parentCallback={this.handleCallback}
          />
        )}
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => {
  return state.countReducers;
};

const mapDispatchToProps = {
  getWeatherDataAction,
  getWeatherHistoryDataAction,
};

const styles = StyleSheet.create({
  text: {
    top: 10,
    color: 'white',
    fontSize: 42,

    fontWeight: 'bold',
    textAlign: 'center',
  },
  lineHeight: {lineHeight: 84},
  descCont: {
    top: 100,
  },
  bottomCont: {
    top: height - 500,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  bottomText: {
    color: 'black',
    textAlign: 'center',
    fontSize: 19,
    top: 80,
  },
  descText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 22,
    marginHorizontal: 5,
  },
  h5: {
    top: 10,
    color: 'white',
    fontSize: 35,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  touchBtn: {
    // marginHorizontal: 20,
    backgroundColor: '#FFFF',
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    width: width - 50,
  },
  btnTxt: {
    color: '#396EB0',
    fontSize: 25,
  },
  perTxt: {
    color: 'black',
    textalign: 'center',
    marginTop: 10,
    fontSize: 15,
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(WelcomeText);
