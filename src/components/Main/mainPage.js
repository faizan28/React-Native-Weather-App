import React, {Component} from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  Image,
  StatusBar,
  ScrollView,
  SafeAreaView,
  Alert,
  TouchableHighlight,
} from 'react-native';
import {connect} from 'react-redux';
import CameraRoll from '@react-native-community/cameraroll';
import {captureScreen} from 'react-native-view-shot';
import {
  getWeatherDataAction,
  getWeatherHistoryDataAction,
  updateLoading,
} from './../../actions/counts';
import {getLocationPermission} from '../../services/locationService';
import AcitivityIndicator from './../activityIndicator';
import {BackgroundImages} from '../../libs/constant';
import {Dimensions} from 'react-native';
import {HistoryComponent} from '../history/historyComponent';

var width = Dimensions.get('window').width;
export class increment extends Component {
  state = {
    currentWeather: this.props.currentWeatherData,
    backGroundImageURL: '',
  };
  static getDerivedStateFromProps(nextProps, prevState) {
    console.log('nextProps', nextProps);
    if (nextProps.currentWeatherData !== prevState.currentWeatherData) {
      return {
        currentWeather: nextProps.currentWeatherData,
      };
    }
    return null;
  }
  constructor(props) {
    super(props);
    this.setBackgroundImage(props.currentWeatherData.current.is_day);
  }
  // componentDidUpdate(prevProps) {
  //   if (prevProps.currentWeatherData !== this.props.currentWeatherData) {
  //     this.setBackgroundImage(this.props.currentWeatherData.current.is_day);
  //   }
  // }
  setBackgroundImage(isDay) {
    console.log('working DAY=>', isDay);
    if (isDay === 1) {
      this.setState({
        backGroundImageURL: require('./../../../assets/images/Sun-bg.webp'),
      });
    } else {
      this.setState({
        backGroundImageURL: require('./../../../assets/images/Moon-bg.webp'),
      });
    }
  }
  getWeatherData(data) {
    this.props.getWeatherDataAction(data?.coords);
    this.props.getWeatherHistoryDataAction(data?.coords);
  }
  getLocation = async () => {
    let result = await getLocationPermission();
    console.info(result);
    if (result) {
      this.getWeatherData(result);
    }
    console.info(result);
  };
  takeScreenShot = () => {
    captureScreen({
      format: 'jpg',
      quality: 0.8,
    }).then(
      uri => {
        CameraRoll.save(uri)
          .then(resp => {
            console.log(resp);
            Alert.alert('Success', 'Photo added to camera roll!');
          })
          .catch(err => console.log('err:', err));
      },
      error => {
        console.error('Oops, snapshot failed', error);
        Alert.alert('Failed', 'Oops, snapshot failed');
      },
    );
  };
  render() {
    console.log('render');
    return (
      <View style={styles.container}>
        {/* <Button title="test" onPress={this.getLocation} /> */}
        {this.props.currentWeatherData.current.is_day === 1 ? (
          <Image
            source={require('./../../../assets/images/Sun-bg.webp')}
            style={styles.backgroundImage}
          />
        ) : (
          <Image
            source={require('./../../../assets/images/Moon-bg.webp')}
            style={styles.backgroundImage}
          />
        )}

        {/* <Button title="test" onPress={this.getLocation} /> */}
        {this.state.currentWeather?.current && (
          <View style={styles.container}>
            <View style={styles.container_pinImage}>
              <Image
                style={styles.pin_image}
                source={require('./../../../assets/images/pin.png')}
              />
              <Text style={styles.loc_lbl}>
                {this.state.currentWeather?.location?.tz_id}
              </Text>
              <TouchableHighlight
                style={styles.ss_image}
                onPress={this.takeScreenShot}>
                <Image
                  style={{width: 50, height: 50}}
                  // source={require('./../../../assets/images/pin.png')}
                  source={require('./../../../assets/images/screen-shot.png')}
                />
              </TouchableHighlight>
            </View>
            <Text style={styles.loc_lbl}>
              {this.state.currentWeather?.location?.localtime}
            </Text>
            <View style={styles.current_lbl}>
              <Text style={styles.temp_lbl}>
                {this.state.currentWeather?.current?.temp_c}
              </Text>
              <Text style={styles.centi_lbl}>o</Text>
            </View>
            <Text style={styles.condition_lbl}>
              {this.state.currentWeather?.current?.condition?.text}
            </Text>
            <Image
              source={{uri: this.state.currentWeather.current.condition.icon}}
            />
            {/* <Text>of {this.state.currentWeather?.location?.tz_id}</Text> */}
            <Text style={styles.feels_like}>
              Feels Like {this.state.currentWeather?.current?.feelslike_c} C
            </Text>
            <View />
            <View style={[styles.container_details, styles.center]}>
              <View style={[styles.row]}>
                <Text style={[styles.color_white, styles.details_txt]}>
                  Humidty: {this.state.currentWeather?.current?.humidity}%
                </Text>
                <Text style={[styles.color_white, styles.details_txt]}>
                  UV: {this.state.currentWeather?.current?.uv}%
                </Text>
              </View>
              <View style={styles.row}>
                <Image
                  style={styles.icon_image}
                  source={require('./../../../assets/images/wind.png')}
                />
                <Text style={[styles.color_white, styles.details_txt]}>
                  {this.state.currentWeather?.current?.wind_kph} kph
                </Text>
                <Image
                  style={styles.icon_image}
                  source={require('./../../../assets/images/compass.png')}
                />
                <Text style={[styles.color_white, styles.details_txt]}>
                  {this.state.currentWeather?.current?.wind_dir}
                </Text>
              </View>
            </View>
          </View>
        )}
        <View style={{height: 200, width: width - 40, marginBottom: 10}}>
          <HistoryComponent {...this.props.historyWeatherData} />
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return state.countReducers;
};

const mapDispatchToProps = {
  getWeatherDataAction,
  updateLoading,
  getWeatherHistoryDataAction,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  color_white: {color: '#ffff'},
  container_pinImage: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  details_txt: {
    margin: 5,
    fontSize: 16,
  },
  icon_image: {
    height: 20,
    width: 20,
  },
  pin_image: {
    height: 20,
    width: 20,
  },
  ss_image: {
    left: 70,
    height: 50,
    width: 50,
  },
  current_lbl: {
    flexDirection: 'row',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
  label: {
    color: '#ffff',
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', // or 'stretch'
    position: 'absolute',
    height: '100%',
    width: '100%',
  },
  temp_lbl: {
    color: '#ffff',
    fontSize: 50,
    fontFamily: 'sans-serif-medium',
    fontWeight: 'bold',
    top: 100,
  },
  centi_lbl: {
    color: '#ffff',
    fontSize: 30,
    fontFamily: 'sans-serif-medium',
    fontWeight: 'bold',
    top: 100,
  },
  condition_lbl: {
    color: '#ffff',
    fontSize: 25,
    fontFamily: 'sans-serif-thin',
    fontWeight: 'bold',
    top: 100,
  },
  loc_lbl: {
    color: '#fcdb79',
    fontSize: 18,
  },
  feels_like: {
    color: '#ffff',
    fontSize: 16,
    top: 220,
    backgroundColor: '#a6a6a6',
    padding: 6,
    borderRadius: 10,
    opacity: 0.7,
  },
  container_details: {
    backgroundColor: '#a6a6a6',
    // alignSelf: 'stretch',
    // textAlign: 'center',
    width: width - 40,
    borderRadius: 10,
    margin: 0,
    height: 80,
    opacity: 0.8,
    top: 250,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    // borderBottomColor: '#ffff',
    // borderBottomWidth: 2,
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollView: {
    backgroundColor: 'pink',
    marginHorizontal: 20,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(increment);
