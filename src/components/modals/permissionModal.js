import React, {Component, useState} from 'react';
import {store} from './../../store/configureStore';
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
  ActivityIndicator,
} from 'react-native';
import {getLocationPermission} from '../../services/locationService';
class PermissionModal extends Component {
  state = {
    modalVisible: false,
    spinner: false,
    isGPSGranted: false,
    currentWeather: {},
  };
  constructor(props) {
    super(props);
    this.setState({
      isGPSGranted: store.getState().countReducers.isGPSGranted || false,
    });
    store.subscribe(() => {
      this.setState({
        isGPSGranted: store.getState().countReducers.isGPSGranted || false,
      });
    });
    console.log('PROPS=>', props);
  }
  static getDerivedStateFromProps(nextProps, prevState) {
    console.log('nextProps', nextProps);
    if (nextProps.currentWeatherData !== prevState.currentWeatherData) {
      return {
        currentWeather: nextProps.currentWeatherData,
      };
    }
    return null;
  }
  componentDidUpdate(prevProps) {
    if (prevProps.currentWeatherData !== this.props.currentWeatherData) {
      this.props.parentCallback(false);
    }
  }

  setModalVisible = async visible => {
    try {
      this.setState({spinner: true});
      let result = await getLocationPermission();
      this.setState({spinner: false});
      if (result) {
        this.getWeatherData(result);
      }
    } catch (error) {
      this.setState({spinner: false});
    }
    // this.props.parentCallback(visible);
  };
  getWeatherData(data) {
    this.props.getWeatherDataAction(data?.coords);
    this.props.getWeatherHistoryDataAction(data?.coords);
  }
  render() {
    const {modalVisible} = this.props?.modalVisible;
    return (
      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            this.setModalVisible(!modalVisible);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              {this.state.isGPSGranted === false ? (
                <View>
                  <Text style={styles.modalText}>
                    Hey! I am Faizan Naeem. Would you mind giving me GPS
                    permissions
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-evenly',
                    }}>
                    <Pressable
                      style={[styles.button, styles.buttonClose]}
                      onPress={() => this.setModalVisible()}>
                      <Text style={styles.textStyle}>Give Access</Text>
                    </Pressable>
                    <Pressable
                      style={[styles.button, styles.buttonOpen]}
                      onPress={() => this.props.parentCallback(true)}>
                      <Text style={styles.textStyle}>Not Now</Text>
                    </Pressable>
                  </View>
                </View>
              ) : (
                <View>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-evenly',
                    }}>
                    <Text style={styles.modalText}>Gathering Data...</Text>
                  </View>
                  <ActivityIndicator color={'black'} />
                </View>
              )}
              {this.state.spinner && <ActivityIndicator color={'black'} />}
            </View>
          </View>
        </Modal>
        <Pressable
          style={[styles.button, styles.buttonOpen]}
          onPress={() => this.setModalVisible(true)}>
          <Text style={styles.textStyle}>Show Modal</Text>
        </Pressable>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default PermissionModal;
