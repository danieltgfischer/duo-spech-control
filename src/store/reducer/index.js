import { UPDATE_SPEECH_CONTROL } from '../actions';

const initialState = {
  commands_labels: {
    mic_off: 'desligar microfone',
    button: 'botão',
    text: 'texto',
    next: 'próximo',
    send: 'enviar',
    verify: 'verificar',
    clear: 'limpar',
    speak: 'falar',
    listen: 'escutar',
    listen_slow: 'escutar devagar',
    cant_listen: 'não posso ouvir',
    cant_speak: 'não posso falar',
    speech_control: 'desativar comando de voz',
  },
  speech_command: false,
};

export default function app(state = initialState, action) {
  const { payload } = action;
  switch (action.type) {
    case UPDATE_SPEECH_CONTROL:
      return { ...state, speech_command: payload.bool };

    default:
      return state;
  }
}
