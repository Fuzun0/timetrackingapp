import React from 'react';
import TimerForm from './TimerForm';
import Timer from './Timer';

export default function EditableTimer({
  id,
  title,
  project,
  elapsed,
  isRunning,
  editFormOpen,
  onFormSubmit,
  onFormClose,
  onEditPress,
  onRemovePress,
  onTimerStart,
  onTimerStop,
  onTimerTick,
}) {
  if (editFormOpen) {
    return (
      <TimerForm
        id={id}
        title={title}
        project={project}
        onFormSubmit={onFormSubmit}
        onFormClose={onFormClose}
      />
    );
  }

  return (
    <Timer
      id={id}
      title={title}
      project={project}
      elapsed={elapsed}
      isRunning={isRunning}
      onEditPress={onEditPress}
      onRemovePress={onRemovePress}
      onTimerStart={onTimerStart}
      onTimerStop={onTimerStop}
      onTimerTick={onTimerTick}
    />
  );
}
