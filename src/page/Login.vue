<template>
  <v-container
      class="grey lighten-5 d-flex align-center"
      style="height: 100%"
  >
    <v-row
        no-gutters
        style="height: 150px;"
        justify="center"
    >
      <v-col
          align-self="center"
          sm="6"
          md="6"
      >
        <v-card
            elevation="2"
            shaped
        >
          <v-card-text>
            <h1>Вход в личный кабинет</h1>
            <v-text-field
                label="Логин"
            ></v-text-field>
            <v-text-field
                label="Пароль"
            ></v-text-field>
          </v-card-text>
          <v-card-actions>
            <v-btn
                color="deep-purple"
                block
                dark
                @click="auth()"
            >
              Войти
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>

export default {
  name: 'Login',

  data() {
    return {
    }
  },
  methods: {
    auth() {
      this.$store.dispatch('auth/Authentication', true)
    }
  }
}
</script>
