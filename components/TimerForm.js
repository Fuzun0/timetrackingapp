import React, { Component } from 'react';
import { StyleSheet, View, TextInput } from 'react-native';
import TimerButton from './TimerButton';

export default class TimerForm extends Component {
  constructor(props) {
    super(props);

    const { id, title, project } = props;

    this.state = {
      title: id ? title : '',
      project: id ? project : '',
    };
  }

  handleTitleChange = (title) => {
    this.setState({ title });
  };

  handleProjectChange = (project) => {
    this.setState({ project });
  };

  handleSubmit = () => {
    const { onFormSubmit, id } = this.props;
    const { title, project } = this.state;

    onFormSubmit({
      id,
      title,
      project,
    });
  };

  render() {
    const { id, onFormClose } = this.props;
    const { title, project } = this.state;

    const submitText = id ? 'Update' : 'Create';

    return (
      <View style={styles.formContainer}>
        <View style={styles.attributeContainer}>
          <TextInput
            style={styles.textInput}
            placeholder="What are you working on?"
            underlineColorAndroid="transparent"
            defaultValue={title}
            onChangeText={this.handleTitleChange}
          />
        </View>
        <View style={styles.attributeContainer}>
          <TextInput
            style={styles.textInput}
            placeholder="Which project?"
            underlineColorAndroid="transparent"
            defaultValue={project}
            onChangeText={this.handleProjectChange}
          />
        </View>
        <View style={styles.buttonGroup}>
          <TimerButton small color="#21BA45" title={submitText} onPress={this.handleSubmit} />
          <TimerButton small color="#DB2828" title="Cancel" onPress={onFormClose} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  formContainer: {
    backgroundColor: 'white',
    borderColor: '#D6D7DA',
    borderWidth: 2,
    borderRadius: 10,
    padding: 15,
    margin: 15,
    marginBottom: 0,
  },
  attributeContainer: {
    marginVertical: 8,
  },
  textInput: {
    height: 40,
    borderColor: '#D6D7DA',
    borderRadius: 5,
    borderWidth: 1,
    paddingHorizontal: 10,
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
