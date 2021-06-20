<template>
  <div class="pacients">
    <v-card
        elevation="2"
        class="pa-5 d-flex justify-space-between flex-wrap"
    >
      <div>
        <span class="subtitle-2 mr-3">Период:</span>
        <a href="#" style="text-decoration: none; color: #0E73F6; font-size: 14px;">01 мая 2021 - 15 мая 2021</a>
      </div>
      <div>
        <span class="subtitle-2 mr-3">Больница:</span>
        <a href="#" style="text-decoration: none; color: #0E73F6; font-size: 14px;">(ЦГБ) Ямало-Ненецкого АО</a>
      </div>
      <div>
        <span class="subtitle-2 mr-3">Отделение:</span>
        <a href="#" style="text-decoration: none; color: #0E73F6; font-size: 14px;">Кардиологическое отделение</a>
      </div>
      <v-autocomplete
          v-if="false"
          v-model="selectService"
          :loading="loadingService"
          :items="itemsService"
          :search-input.sync="searchService"
          cache-items
          class="ma-4"
          flat
          hide-no-data
          hide-details
          label="Поиск услуг"
      ></v-autocomplete>
      <v-autocomplete
          v-if="false"
          v-model="selectDrug"
          :loading="loadingDrug"
          :items="itemsDrug"
          :search-input.sync="searchDrug"
          cache-items
          class="ma-4"
          flat
          hide-no-data
          hide-details
          label="Поиск препаратов"
      ></v-autocomplete>
    </v-card>
    <v-card class="mt-3">
      <v-card-title class="subtitle-1" style="background: #F6F8F9;">
        Список пациентов
      </v-card-title>
      <v-card-text
          class="pa-0"
      >
        <v-data-table
            :headers="headers"
            :items="PatientList"
            :loading="loading"
            loading-text="Загрузка пациентов..."
            :items-per-page="5"
            @click:row="click"
        >
          <template v-slot:item.expertiza="{ item }">
              <strong :class="(+item.expertiza.charAt(0)<4)?'red--text':'black--text'">{{ item.expertiza.charAt(0) }}</strong>
              {{ item.expertiza.substr(1) }}
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>
 </div>
</template>

<script>
import {authService} from "@/services/auth-service";

export default {
  name: "Pacients",
  data () {
    return {
      headers: [
        {
          text: 'ФИО',
          align: 'start',
          sortable: true,
          value: 'fullName',
        },
        { text: 'Статус', sortable: true, value: 'status' },
        { text: 'Возраст', value: 'age' },
        { text: 'Диагноз', value: 'diagId' },
        { text: 'Экспертиза', value: 'expertiza' }
      ],
      loading:false,
      PatientList:[]
    }
  },
  created() {
    this.getPatientList()
  },
  methods: {
    click(val){
      this.$router.push(`/pacient/${val.id}`)
    },
    async getPatientList() {
      this.loading = true
      let status = ['Выписан','В отделении']
      let data = await authService.getPatientList();
      data.forEach(element=>{
        element.fullName = [element.lastName, element.firstName, element.middleName].join(' ')
        element.status = status[Math.floor(Math.random()*status.length)]
        element.expertiza = Math.floor(Math.random() * 8)+ '/7'
      })
      this.PatientList = data;
      this.loading = false
    }
  }
}
</script>

<style scoped>

</style>
