<template>
  <div class="main">
    <v-system-bar color="#84919A"></v-system-bar>
    <v-app-bar
        color="#84919A"
        dark
        app
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title class="display-1">MedCode</v-toolbar-title>
      <v-spacer></v-spacer>

      <v-btn
          to="/logout"
          icon
      >
        <v-icon>mdi-logout</v-icon>
      </v-btn>
    </v-app-bar>
    <v-navigation-drawer
        v-model="drawer"
        absolute
        class="pt-16"
    >
      <template v-slot:prepend>
        <v-list-item two-line>
          <v-list-item-avatar>
            <img src="https://randomuser.me/api/portraits/men/79.jpg">
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>Сидоркин Д.</v-list-item-title>
            <v-list-item-subtitle>Эксперт</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </template>
      <v-divider></v-divider>

      <v-list
          shaped
      >
        <v-list-item
            v-for="item in items"
            :key="item.title"
            :to="item.link"
            link
            color="primary"
            :disabled="item.disable"
            aria-readonly="true"
        >
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main style="background: #E5E5E5;">
      <v-container class="pa-0">
     <router-view />
      </v-container>
    </v-main>

  </div>
</template>
<script>
export default {
  name: 'MainLayout',

  data() {
    return {
      drawer: false,
      group: null,
      items: [
        { title: 'Дашборд', disable:false, link: '/', icon: 'mdi-home-city' },
        // { title: 'Динамика', disable:true, link: '/narusheniya', icon: 'mdi-account' },
        // { title: 'Процедуры', disable:true, link: '/narusheniya', icon: 'mdi-account' },
        // { title: 'Врачи', disable:true, link: '/narusheniya', icon: 'mdi-account' },
        // { title: 'Отделения', disable:true, link: '/narusheniya', icon: 'mdi-account' },
        { title: 'Пациенты', disable:false, link: '/pacients', icon: 'mdi-account' },
        // { title: 'Группы пациентов', disable:true, link: '/narusheniya', icon: 'mdi-account' },
        // { title: 'Нарушения',disable:true, link: '/narusheniya', icon: 'mdi-account-group-outline' },
      ],
    }
  },
  components:{
  },
  methods: {
  }
}
</script>
