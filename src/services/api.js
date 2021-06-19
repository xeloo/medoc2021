import {createWSProxy} from "@/utils/wsapi";
import {BASE_URL} from "@/settings/config";

export const api = createWSProxy(`${BASE_URL}/api`);


// Включение/выключение логирования вызовов

// api.log(true);

api.log({
  __all: true,
  getTime: false,
});

// api.log({
//   __all: true,
//   login: false,
//   getTime: false,

//   __all: false,
//   login: true,
//   getTime: false,
// });

