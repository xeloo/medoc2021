export function setAuth (state, data) {
  sessionStorage.setItem("auth", data)
  state.auth = data;
}
