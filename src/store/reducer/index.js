import { UPDATE_LANGUAGE, UPDATE_SELECTED_LANGUAGE } from '../actions';

const initialState = {
  lang1: { name: 'Português (Brasil)', value: 'pt-BR' },
  lang2: { name: 'Inglês (US)', value: 'en-US' },
  selected_language: { name: 'Português (Brasil)', value: 'pt-BR' },
  app_language: '',
};

export default function app(state = initialState, action) {
  const { payload } = action;
  switch (action.type) {
    case UPDATE_LANGUAGE: {
      const { key, langData } = payload;
      return { ...state, [key]: { ...langData } };
    }
    case UPDATE_SELECTED_LANGUAGE: {
      const { lang } = payload;
      return { ...state, selected_language: lang };
    }

    default:
      return state;
  }
}
