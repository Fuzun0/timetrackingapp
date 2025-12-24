import React from 'react';
import { StyleSheet, View } from 'react-native';
import TimerButton from './TimerButton';
import TimerForm from './TimerForm';

export default function ToggleableTimerForm({ onFormSubmit }) {
  const [isOpen, setIsOpen] = React.useState(false);

  const handleFormOpen = () => {
    setIsOpen(true);
  };

  const handleFormClose = () => {
    setIsOpen(false);
  };

  const handleFormSubmit = (timer) => {
    onFormSubmit(timer);
    setIsOpen(false);
  };

  return (
    <View style={[styles.container, !isOpen && styles.buttonPadding]}>
      {isOpen ? (
        <TimerForm onFormSubmit={handleFormSubmit} onFormClose={handleFormClose} />
      ) : (
        <TimerButton title="+" color="black" onPress={handleFormOpen} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
  },
  buttonPadding: {
    paddingHorizontal: 15,
  },
});
