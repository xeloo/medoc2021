<template>
  <div class="main">
    <v-app-bar
        color="grey"
        dark
    >
      <v-toolbar-title>MedCode</v-toolbar-title>
      <v-spacer></v-spacer>

      <v-btn
          to="/logout"
          icon
      >
        <v-icon>mdi-logout</v-icon>
      </v-btn>
    </v-app-bar>
     <router-view />
  </div>
</template>
<script>
export default {
  name: 'MainLayout',

  data() {
    return {
      drawer: false,
      group: null,
    }
  },
  components:{
  },
  methods: {
  }
}
</script>
