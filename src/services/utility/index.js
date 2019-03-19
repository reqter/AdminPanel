import languageManager from "./../languageManager";
export default {
  applyeLangs(value) {
    const langs = languageManager.getAllLanguages();
    const data = {};
    for (const key in langs) {
      data[key] = value;
    }
    return data;
  }
};
