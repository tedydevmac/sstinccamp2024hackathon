import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
export default class Timer extends React.Component {
  state = {
    time: 240,
  };
  startTimer = () => {
    this.interval = setInterval(() => {
      this.setState(state => ({
        time: state.time - 1,
      }));
    }, 1000);
  };
  stopTimer = () => {
    clearInterval(this.interval);
  };
  render() {
    return (
      <View
        style={{
          flexDirection: 'row',
          alignContent: 'space-around',
          justifyContent: 'center',
        }}>
        <View style={{flexDirection: 'column', marginRight: 10}}>
          <TouchableOpacity onPress={this.startTimer}>
            <Text style={styles.text}>Start</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.stopTimer}>
            <Text style={styles.text}>Stop</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.time}>{this.state.time}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    fontSize: 17.5,
    fontWeight: '500',
  },
  time: {
    fontSize: 25,
    fontWeight: '500',
  },
});
