import {api} from "@/services/api";
// import {ref} from "vue";

// const state = {
//   time: ref(''),
//   authorized: ref(undefined),
//   user: ref(undefined)
// };

// setInterval(async () => {
//   state.time.value = await api.getTime();
// }, 2000);


export const authService = {

  // isAuthorized() {
  //   api.isAuthorized().then((value) => {
  //     state.authorized.value = value;
  //   });
  //   return state.authorized;
  // },

  // async login(username, password) {
  //   const user = state.user.value = await api.login({username, password});
  //   return state.authorized.value = !!user;
  // },

  async getDiagnoseList() {
    const DiagnoseList = await api.getDiagnoseList();
    return DiagnoseList;
  },
  async getCriteria(diagnose) {
    const Criteria = await api.getCriteria({diag: diagnose});
    return Criteria;
  },

  // async logout() {
  //   await api.logout();
  //   state.authorized.value = false;
  //   state.user.value = undefined;
  // },
  //
  // getUser() {
  //   if( !state.user.value ) {
  //     api.login().then(user => {
  //       state.authorized.value = !!user;
  //       state.user.value = user;
  //     });
  //   }
  //   return state.user;
  // },
  //
  // getTime() {
  //   return state.time;
  // }

};

