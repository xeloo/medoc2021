<template>
 <div>
   <v-list-item
       v-for="rout in routs"
       :key="rout.name"
       :to="rout.link"
   >
     <v-list-item-icon>
       <v-icon>
         {{rout.icon}}
       </v-icon>
     </v-list-item-icon>
     <v-list-item-title>
       {{rout.name}}
<!--       <router-link-->
<!--           :to="rout.link">-->
<!--         {{rout.name}}-->
<!--       </router-link>-->
     </v-list-item-title>
   </v-list-item>
 </div>
</template>

<script>
export default {
  name: "Menu",

  data() {
    return {
      routs: [
        {
          name:'Главная',
          icon:'mdi-home',
          link:'/',
        },
        {
          name:'Выход',
          icon:'mdi-logout',
          link:'/logout',
        },
      ]
    }
  }
}
</script>

<style scoped>

</style>
