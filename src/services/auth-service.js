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
    return await api.getDiagnoseList();
  },

  async getCriteria(diagnose) {
    return await api.getCriteria({diag: diagnose});
  },
// Поиск услуг
async getServiceList(search, max = 20) {
   return await api.getServiceList({q: search, max: max});
  },
  // Поиск препаратов
  async getDrugList(search, max = 20) {
    return await api.getDrugList({q: search, max: max});
  },
  // Получаем дашборд
  async getChartData() {
    return await api.getChartData();
  },
 // Получаем Пациентов
  async getPatientList() {
    return await api.getPatientList();
  },
  // Получаем Пациента и процедуры
  async getPatient(id) {
    return await api.getPatient({"id": id});
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

