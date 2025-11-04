export function setLang(lang) {
  sessionStorage.setItem("lang", JSON.stringify(lang));
}

export function getLang() {
  const lang = sessionStorage.getItem("lang");
  return lang ? JSON.parse(lang) : null;
}

export function removeLang() {
  sessionStorage.removeItem("lang");
}
