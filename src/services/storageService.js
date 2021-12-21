export const storageService = {
  load,
  save,
};

function save(key, val) {
  localStorage.setItem(key, JSON.stringify(val));
}

function load(key) {
  const val = localStorage.getItem(key);
  return JSON.parse(val);
}
