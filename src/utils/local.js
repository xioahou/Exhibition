export function setLang(lang) {
  localStorage.setItem("lang", JSON.stringify(lang));
}

export function getLang() {
  const lang = localStorage.getItem("lang");
  return lang ? JSON.parse(lang) : null;
}
export function removeLang() {
  localStorage.removeItem("lang");
}
