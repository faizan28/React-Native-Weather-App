import moment from 'moment';
import React, {Component} from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  BackHandler,
} from 'react-native';
import {connect} from 'react-redux';
import Notifications from './../../libs/notification';
export class HistoryComponent extends Component {
  constructor(props) {
    super();
    let currenthour = moment(props.current?.last_updated).hour();
    console.log('HISTORY_COMPONENTPROPS=>', props);
  }
  componentDidMount() {
    // setTimeout(() => {
    //   BackHandler.exitApp();
    // }, 5000);
    // Notifications.schduleNotification(new Date(Date.now() + 5 * 1000));
    // setInterval(() => {
    //   DeviceInfo.getBatteryLevel().then(batteryLevel => {
    //     // 0.759999
    //     console.log('BATTYER=>', batteryLevel);
    //   });
    // }, 1000);
  }
  render() {
    const logo = {
      uri: 'https://reactnative.dev/img/tiny_logo.png',
      width: 64,
      height: 64,
    };
    return (
      <ScrollView>
        <View style={styles.container}>
          {this.props?.forecast?.forecastday?.length > 0 &&
            this.props.forecast?.forecastday.map((data, index) => (
              <View key={index} style={styles.daysContainer}>
                <Text
                  style={{
                    fontSize: 20,
                    marginBottom: 10,
                    color: '#ffff',
                    textTransform: 'uppercase',
                    fontWeight: '500',
                  }}>
                  {moment(data.date).format('dddd')}
                </Text>
                <ScrollView
                  showsHorizontalScrollIndicator={false}
                  horizontal
                  style={{flexDirection: 'row'}}>
                  {data?.hour?.length > 0 &&
                    data.hour.map((hour, indexj) =>
                      index == 0 &&
                      indexj >
                        moment(this.props.current?.last_updated).hour() ? (
                        <View key={indexj} style={styles.hoursContainer}>
                          <Text
                            style={[styles.colorWhite, {fontWeight: '900'}]}>
                            {hour.time.substring(11, hour.time.length)}
                          </Text>
                          <Text
                            style={[
                              styles.colorWhite,
                              {
                                fontStyle: 'italic',
                                fontWeight: '900',
                                marginVertical: 5,
                              },
                            ]}>
                            {hour.temp_c} C
                          </Text>
                          <Image
                            source={{uri: 'https://' + hour.condition.icon}}
                            style={{width: 50, height: 50}}
                          />
                          <Text style={styles.colorWhite}>
                            {hour.wind_kph} km/h
                          </Text>
                        </View>
                      ) : (
                        index !== 0 && (
                          <View key={indexj} style={styles.hoursContainer}>
                            <Text
                              style={[styles.colorWhite, {fontWeight: '900'}]}>
                              {hour.time.substring(11, hour.time.length)}
                            </Text>
                            <Text
                              style={[
                                styles.colorWhite,
                                {
                                  fontStyle: 'italic',
                                  fontWeight: '900',
                                  marginVertical: 5,
                                },
                              ]}>
                              {hour.temp_c} C
                            </Text>
                            <Image
                              source={{uri: 'https://' + hour.condition.icon}}
                              style={{width: 50, height: 50}}
                            />
                            <Text style={styles.colorWhite}>
                              {hour.wind_kph} km/h
                            </Text>
                          </View>
                        )
                      ),
                    )}
                </ScrollView>
              </View>
            ))}
        </View>
      </ScrollView>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

const styles = StyleSheet.create({
  container: {
    overflow: 'visible',
    backgroundColor: '#a6a6a6',
    borderRadius: 10,
    opacity: 0.8,
    padding: 10,
  },
  daysContainer: {
    marginVertical: 10,
    borderBottomWidth: 2,
    padding: 10,
    borderColor: '#ffff',
  },
  hoursContainer: {
    flexDirection: 'column',
    marginHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
    color: '#ffff',
  },
  colorWhite: {
    color: '#ffff',
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(HistoryComponent);
