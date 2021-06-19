export default {
  user: {
    id: 0,
    email: "",
    name: "",
    family: "",
    secondname: "",
    phone: "",
    rights: [],
    lastLogin: "",
    photo: "",
    admin: false
  },
  auth: sessionStorage.getItem("auth") == 'true' || false
}
