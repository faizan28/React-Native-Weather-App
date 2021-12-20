import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {connect} from 'react-redux';

export class increment extends Component {
  constructor(props) {
    super();
    console.log('PROPS=>', props);
  }
  render() {
    return (
      <View>
        <Text> test </Text>
      </View>
    );
  }
}

const mapStateToProps = state => ({count: state});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(increment);
