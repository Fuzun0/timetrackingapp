import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { millisecondsToHuman } from '../utils/TimerUtils';
import TimerButton from './TimerButton';

export default class Timer extends Component {
  componentDidMount() {
    const { elapsed, isRunning } = this.props;

    if (isRunning) {
      this.startTimer();
    }
  }

  componentDidUpdate(prevProps) {
    const { isRunning, elapsed } = this.props;

    if (isRunning && !prevProps.isRunning) {
      this.startTimer();
    } else if (!isRunning && prevProps.isRunning) {
      this.stopTimer();
    }
  }

  componentWillUnmount() {
    this.stopTimer();
  }

  startTimer = () => {
    this.interval = setInterval(() => {
      this.props.onTimerTick(this.props.id);
    }, 1000);
  };

  stopTimer = () => {
    clearInterval(this.interval);
  };

  handleStartPress = () => {
    const { onTimerStart, id } = this.props;
    onTimerStart(id);
  };

  handleStopPress = () => {
    const { onTimerStop, id } = this.props;
    onTimerStop(id);
  };

  render() {
    const { title, project, elapsed, isRunning, onEditPress, onRemovePress } = this.props;
    const elapsedString = millisecondsToHuman(elapsed);

    return (
      <View style={styles.timerContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text>{project}</Text>
        <Text style={styles.elapsedTime}>{elapsedString}</Text>
        <View style={styles.buttonGroup}>
          <TimerButton color="blue" small title="Edit" onPress={onEditPress} />
          <TimerButton color="blue" small title="Remove" onPress={onRemovePress} />
        </View>
        {isRunning ? (
          <TimerButton color="#DB2828" title="Stop" onPress={this.handleStopPress} />
        ) : (
          <TimerButton color="#21BA45" title="Start" onPress={this.handleStartPress} />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  timerContainer: {
    backgroundColor: 'white',
    borderColor: '#D6D7DA',
    borderWidth: 2,
    borderRadius: 10,
    padding: 15,
    margin: 15,
    marginBottom: 0,
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  elapsedTime: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingVertical: 10,
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
