export const UPDATE_SPEECH_CONTROL = 'UPDATE_SPEECH_CONTROL';

export const updateSpeechControl = bool => ({
  type: UPDATE_SPEECH_CONTROL,
  payload: { bool },
});
