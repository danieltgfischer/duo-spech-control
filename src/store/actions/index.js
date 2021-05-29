export const UPDATE_LANGUAGE = 'UPDATE_LANGUAGE';
export const UPDATE_SELECTED_LANGUAGE = 'UPDATE_SELECTED_LANGUAGE';

export const updateLanguage = (key, langData) => ({
  type: UPDATE_LANGUAGE,
  payload: { key, langData },
});

export const updateSelectedLanguage = lang => ({
  type: UPDATE_SELECTED_LANGUAGE,
  payload: { lang },
});
