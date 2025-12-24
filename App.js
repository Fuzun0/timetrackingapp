import React, { Component } from 'react';
import { StyleSheet, View, ScrollView, Text, KeyboardAvoidingView, Platform } from 'react-native';
import { uuidv4, newTimer } from './utils/TimerUtils';
import EditableTimer from './components/EditableTimer';
import ToggleableTimerForm from './components/ToggleableTimerForm';

export default class App extends Component {
  state = {
    timers: [
      {
        title: 'Mow the lawn',
        project: 'House Chores',
        id: uuidv4(),
        elapsed: 5456099,
        isRunning: true,
        editFormOpen: false,
      },
      {
        title: 'Bake squash',
        project: 'Kitchen Chores',
        id: uuidv4(),
        elapsed: 1273998,
        isRunning: false,
        editFormOpen: false,
      },
    ],
  };

  componentDidMount() {
    const TIME_INTERVAL = 1000;
    this.intervalId = setInterval(() => {
      const { timers } = this.state;
      this.setState({
        timers: timers.map((timer) => {
          const { elapsed, isRunning } = timer;
          return {
            ...timer,
            elapsed: isRunning ? elapsed + TIME_INTERVAL : elapsed,
          };
        }),
      });
    }, TIME_INTERVAL);
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  handleCreateFormSubmit = (timer) => {
    const { timers } = this.state;

    this.setState({
      timers: [newTimer(timer), ...timers],
    });
  };

  handleFormSubmit = (attrs) => {
    const { timers } = this.state;

    this.setState({
      timers: timers.map((timer) => {
        if (timer.id === attrs.id) {
          const { title, project } = attrs;
          return {
            ...timer,
            title,
            project,
            editFormOpen: false,
          };
        }
        return timer;
      }),
    });
  };

  handleEditPress = (timerId) => {
    this.setState({
      timers: this.state.timers.map((timer) => {
        if (timer.id === timerId) {
          return {
            ...timer,
            editFormOpen: true,
          };
        }
        return timer;
      }),
    });
  };

  handleFormClose = (timerId) => {
    this.setState({
      timers: this.state.timers.map((timer) => {
        if (timer.id === timerId) {
          return {
            ...timer,
            editFormOpen: false,
          };
        }
        return timer;
      }),
    });
  };

  handleRemovePress = (timerId) => {
    this.setState({
      timers: this.state.timers.filter((t) => t.id !== timerId),
    });
  };

  handleTimerStart = (timerId) => {
    const now = Date.now();

    this.setState({
      timers: this.state.timers.map((timer) => {
        if (timer.id === timerId) {
          return {
            ...timer,
            isRunning: true,
            startTime: now,
          };
        }
        return timer;
      }),
    });
  };

  handleTimerStop = (timerId) => {
    this.setState({
      timers: this.state.timers.map((timer) => {
        if (timer.id === timerId) {
          return {
            ...timer,
            isRunning: false,
            startTime: null,
          };
        }
        return timer;
      }),
    });
  };

  handleTimerTick = (timerId) => {
    const now = Date.now();

    this.setState({
      timers: this.state.timers.map((timer) => {
        if (timer.id === timerId && timer.isRunning) {
          const elapsedSinceStart = now - timer.startTime;
          return {
            ...timer,
            elapsed: timer.elapsed + 1000,
            startTime: now,
          };
        }
        return timer;
      }),
    });
  };

  render() {
    const { timers } = this.state;

    return (
      <View style={styles.appContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Timers</Text>
        </View>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboardAvoidingView}
        >
          <ScrollView style={styles.timerList}>
            <ToggleableTimerForm onFormSubmit={this.handleCreateFormSubmit} />
            {timers.map((timer) => (
              <EditableTimer
                key={timer.id}
                id={timer.id}
                title={timer.title}
                project={timer.project}
                elapsed={timer.elapsed}
                isRunning={timer.isRunning}
                editFormOpen={timer.editFormOpen}
                onFormSubmit={this.handleFormSubmit}
                onFormClose={() => this.handleFormClose(timer.id)}
                onEditPress={() => this.handleEditPress(timer.id)}
                onRemovePress={() => this.handleRemovePress(timer.id)}
                onTimerStart={this.handleTimerStart}
                onTimerStop={this.handleTimerStop}
                onTimerTick={this.handleTimerTick}
              />
            ))}
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
  },
  titleContainer: {
    paddingTop: 35,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#D6D7DA',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  timerList: {
    paddingBottom: 15,
  },
});
