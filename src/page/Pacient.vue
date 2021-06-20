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
        Карточка пациента
      </v-card-title>
      <v-card-text
          class="pa-0"
      >
        <v-row >
          <v-col
              class="col-12
              col-sm-6"
          >
            <v-list
                subheader
            >
              <v-subheader class="title">Экспертиза</v-subheader>
              <template v-for="(item,index) in expertiza">
                <v-divider
                    v-if="item.divider"
                    :key="index"
                    inset
                ></v-divider>
                <v-list-item
                    :key="index"
                    v-else
                >

                  <v-list-item-avatar>
                    <v-list-item-subtitle>
                      {{ index+1 }}
                    </v-list-item-subtitle>
                  </v-list-item-avatar>
                  <v-list-item-content>
                      {{ item.name }}
                  </v-list-item-content>
                  <v-list-item-action>
                    <strong style="color:#119C2B">
                      {{ item.status }}
                    </strong>
                  </v-list-item-action>
                </v-list-item>
              </template>
            </v-list>
          </v-col>
          <v-col
              class="col-12
              col-sm-6"
          >
            <v-list
            >
              <v-list-item>
                <v-list-item-avatar left min-width="80">
                  <v-list-item-subtitle>
                    Фио:
                  </v-list-item-subtitle>
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title>
                    {{ Patient.fullName }}
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-divider
              ></v-divider>

              <v-list-item>
                <v-list-item-avatar left min-width="80">
                  <v-list-item-subtitle>Статус:</v-list-item-subtitle>
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title>
                    {{ Patient.status }}
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-divider
              ></v-divider>

              <v-list-item>
                <v-list-item-avatar left min-width="80">
                  <v-list-item-subtitle>Возраст:</v-list-item-subtitle>
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title>
                    {{ Patient.age }}
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-divider
              ></v-divider>

              <v-list-item>
                <v-list-item-avatar left min-width="80">
                  <v-list-item-subtitle>Пол:</v-list-item-subtitle>
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title>
                    {{ Patient.sex }}
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-divider
              ></v-divider>

              <v-list-item>
                <v-list-item-avatar left min-width="80">
                  <v-list-item-subtitle>Диагноз:</v-list-item-subtitle>
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title>
                    {{ Patient.diagId }}
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-divider
              ></v-divider>

              <v-list-item>
                <v-list-item-avatar left min-width="80">
                  <v-list-item-subtitle>Время создания карты:</v-list-item-subtitle>
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title>
                    {{ Patient.startDate }}
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-divider
              ></v-divider>
            </v-list>

            <br>
            <v-list
                subheader
            >
              <v-subheader class="title">Процедуры</v-subheader>
              <template v-for="(item, index) in Patient.treatment">
                <v-list-item :key="item.code+item.criteria">
                  <v-list-item-avatar left min-width="80">
                    <v-list-item-subtitle>
                      {{ item.criteria }}
                    </v-list-item-subtitle>
                  </v-list-item-avatar>
                  <v-list-item-content>
                      {{ item.name }}
                  </v-list-item-content>
                  <v-list-item-icon>
                    <v-icon :color="item.done ? 'green' : 'grey'">
                      {{ item.done? 'mdi-check': 'mdi-minus' }}
                      mdi-check
                    </v-icon>
                  </v-list-item-icon>
                </v-list-item>

                <v-divider
                    v-if="index < Patient.treatment.length - 1"
                    :key="index"
                ></v-divider>
              </template>
            </v-list>
          </v-col>
        </v-row>
        <div class="d-flex justify-center">
          <v-btn
              depressed
              color="primary"
          >
            Распечатать отчет
          </v-btn>
        </div>
      </v-card-text>
      <br>
    </v-card>
    <br>
    <br>
  </div>
</template>

<script>


import {authService} from "@/services/auth-service";

export default {
  name: "Pacient",
  data () {
    return {
      loading:false,
      Patient:[],
      expertiza:[
        {
          name:'Выполнен осмотр врачом-кардиологом не позднее 5 минут от момента поступления в стационар',
          status:"Да",
        },
        { divider: true, inset: true },
        {
          name:'Выполнено электрокардиографическое исследование не позднее 10 минут от момента поступления в стационар\n',
          status:"Да",
        },
        { divider: true, inset: true },
        {
          name:'Выполнено определение уровня тропонинов I, Т в крови и/или определение уровня и активности креатинкиназы в крови\n',
          status:"Да",
        },
        { divider: true, inset: true },
        {
          name:'Проведена (при остром коронарном синдроме с подъемом сегмента ST электрокардиограммы) терапия фибринолитическими лекарственными препаратами не позднее 30 минут от момента поступления в стационар (в случае, если терапия фибринолитическими лекарственными препаратами не проведена на догоспитальном этапе) или выполнено первичное чрескожное коронарное вмешательство не позднее 1 часа от момента поступления в стационар (в зависимости от медицинских показаний и при отсутствии медицинских противопоказаний)\n',
          status:"Да",
        },
        { divider: true, inset: true },
        {
          name:'Проведена терапия ингибиторами агрегации тромбоцитов\n',
          status:"Да",
        },
        { divider: true, inset: true },
        {
          name:'Проведена терапия ацетилсалициловой кислотой\n',
          status:"Да",
        },
        { divider: true, inset: true },
        {
          name:'Проведена терапия гиполипидемическими препаратами\n',
          status:"Да",
        },
        { divider: true, inset: true },
        {
          name:'Выполнено электрокардиографическое исследование до начала тромболитической терапии и через 1 час после окончания (в случае проведения тромболитической терапии)\n',
          status:"Да",
        },
        { divider: true, inset: true },
        {
          name:'Выполнено электрокардиографическое исследование до начала чрескожного коронарного вмешательства и через 30 минут после его окончания (при чрескожном коронарном вмешательстве)',
          status:"Да",
        },
      ]
    }
  },
  created() {
    if(this.$route.params.id){
      this.getPatient(this.$route.params.id)
    }
  },
  methods: {
    async getServiceList(val){
      return await authService.getServiceList(val);
    },
    async getDrugList(val){
      return await authService.getDrugList(val);
    },
    async getPatient(id) {
      let status = ['Выписан','В отделении']
      this.loading = true
      let data = await authService.getPatient(id);
      data.treatment.forEach((element)=>{
        if(element.service){
          this.getServiceList(element.code)
          .then((resp)=>{
            element.name = resp[0].join(' ')
          })
        }else{
          this.getDrugList(element.code)
              .then((resp)=>{
                element.name = resp[0].join(' ')
              })
        }
      })
      data.fullName=[data.lastName, data.firstName, data.middleName].join(' ')
      data.status=status[Math.floor(Math.random()*status.length)]
      data.sex=data.sex == 'm'?"М":"Ж"
      setTimeout(()=>{
        this.Patient = data
      },500)
      this.loading = false

    }
  }
}
</script>

<style scoped>

</style>
