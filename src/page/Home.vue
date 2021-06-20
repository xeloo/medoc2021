<template>
  <div class="home">
    <v-card
        elevation="2"
        class="pa-4 d-flex justify-space-between flex-wrap"
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
    <div class="parent">
      <div class="div1">
        <v-card>
          <v-card-title class="subtitle-1" style="background: #F6F8F9;">
            Динамика
          </v-card-title>
          <v-card-text
              class="pa-5"
          >
            <apexchart type="area" height="350" ref="Dinamic" :options="chartOptionsDinamic" :series="seriesDinamic"></apexchart>
          </v-card-text>
        </v-card>
      </div>
      <div class="div2">
        <v-card>
          <v-card-title class="subtitle-1" style="background: #F6F8F9;">
            Врачи
          </v-card-title>
          <v-card-text
              class="pa-5"
          >
            <apexchart type="pie" height="350" ref="Doctor" :options="chartOptionsDoctor" :series="seriesDoctor"></apexchart>
          </v-card-text>
        </v-card>
      </div>
      <div class="div3">
        <v-card>
          <v-card-title class="subtitle-1" style="background: #F6F8F9;">
            Отделы
          </v-card-title>
          <v-card-text
              class="pa-5"
          >
            <apexchart type="pie" height="350"  ref="Dep" :options="chartOptionsDep" :series="seriesDep"></apexchart>
          </v-card-text>
        </v-card>
      </div>
      <div class="div4">
        <v-card>
          <v-card-title class="subtitle-1" style="background: #F6F8F9;">
            Нарушения за период
          </v-card-title>
          <v-card-text
              class="d-flex justify-space-between align-center pa-8"
          >
            <v-progress-circular
                :rotate="-180"
                :size="150"
                :width="20"
                :value="(narusheniya.error/narusheniya.all)*100"
                color="#F76659"
            >
              {{ ((narusheniya.error/narusheniya.all)*100).toFixed(1) }} %
            </v-progress-circular>
            <div class="pa-5 ">
              <div class="d-flex justify-space-between align-center my-5">
                <div class="subtitle-2" style="max-width: 60%">Всего актов оказания мед помощи за период</div>
                <div><h2>{{ narusheniya.all }}</h2></div>
              </div>
              <div class="d-flex justify-space-between align-center my-5">
                <div class="subtitle-2">Из них с ошибкой</div>
                <div><h2>{{ narusheniya.error }}</h2></div>
              </div>
            </div>
          </v-card-text>
        </v-card>
      </div>
      <div class="div5">
        <v-card>
          <v-card-title class="subtitle-1" style="background: #F6F8F9;">
            Ошибки в группах пациентов
          </v-card-title>
          <v-card-text
              class="pa-5"
          >
            <apexchart type="pie" height="350" ref="Groups" :options="chartOptionsGroups" :series="seriesGroups"></apexchart>
          </v-card-text>
        </v-card>
      </div>
      <div class="div6">
        <v-card
            style="height: 100%"
        >
          <v-card-title class="subtitle-1" style="background: #F6F8F9;">
            Процедуры
          </v-card-title>
          <v-card-text
              class="pa-5"
          >
            <apexchart type="pie" height="350" ref="Procedures" :options="chartOptionsProcedures" :series="seriesProcedures"></apexchart>
          </v-card-text>
        </v-card>
      </div>
    </div>
    <div v-if="false">
      <v-autocomplete
          v-model="valuesSelect"
          :items="DiagnoseList"
          label="Диагнозы"
          placeholder="Укажите диагноз"
          clearable
          solo
          :filter="customFilter"
      >
        <template v-slot:append-outer>
          <v-slide-x-reverse-transition
              mode="out-in"
          >
            <v-icon
                :key="`icon-${isEditing}`"
                :color="isEditing ? 'success' : 'info'"
                @click="getDiagnose"
                v-text="isEditing ? 'mdi-check-outline' : 'mdi-refresh'"
            ></v-icon>
          </v-slide-x-reverse-transition>
        </template>
      </v-autocomplete>

      <v-card
          class="mx-auto"
      >
        <v-card-text>
          <p class="text-h6 text--primary">
            {{ textCriteria }}
          </p>
        </v-card-text>
        <v-list three-line>
          <v-list-item-group
              v-model="selected"
              active-class="pink--text"
              multiple
          >
            <template v-for="(item, index) in listCriteria">
              <v-list-item :key="item.title">
                <template v-slot:default="{ active }">
                  <v-list-item-content>
                    <v-list-item-title v-text="item.title"></v-list-item-title>
                  </v-list-item-content>

                  <v-list-item-action>
                    <v-list-item-action-text v-text="item.action"></v-list-item-action-text>

                    <v-icon
                        v-if="!active"
                        color="grey lighten-1"
                    >
                      mdi-star-outline
                    </v-icon>

                    <v-icon
                        v-else
                        color="yellow darken-3"
                    >
                      mdi-star
                    </v-icon>
                  </v-list-item-action>
                </template>
              </v-list-item>

              <v-divider
                  v-if="index < listCriteria.length - 1"
                  :key="index"
              ></v-divider>
            </template>
          </v-list-item-group>
        </v-list>
      </v-card>
    </div>
  </div>
</template>

<script>
import {authService} from "@/services/auth-service";
import VueApexCharts from 'vue-apexcharts'


export default {
  name: 'Home',
  components: {
    'apexchart': VueApexCharts
  },
  data() {
    return {
      seriesDinamic: [{
        name: "data",
        data: []
      }],
      chartOptionsDinamic: {
        chart: {
          height: 350,
          type: "area"
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          curve: "smooth"
        },
        colors: ['#A6CEE3', '#BAD5C4', '#FDAEA1','#D7EDFF', '#BBF6F4', '#FEF99F'],
        xaxis: {
          type: "datetime",
          categories: []
        },
        tooltip: {
          x: {
            format: "dd.MM.yy"
          }
        }
      },
      seriesDep: [],
      chartOptionsDep: {
        legend: {
          position: 'bottom',
          horizontalAlign: 'left',
        },
        chart: {
          height: 350,
          type: 'pie',
          foreColor: '#373d3f'
        },
        colors: ['#BAD5C4', '#FDAEA1','#D7EDFF', '#BBF6F4', '#FEF99F'],
        labels: [],
        responsive: [{
          breakpoint: 1000,
          options: {
            chart: {
              height: 350
            },
            legend: {
              position: 'right'
            }
          }
        }],
        dataLabels: {
          style: {
            colors: ['#373d3f']
          },
          dropShadow: {
            enabled: false,
            top: 1,
            left: 1,
            blur: 1,
            color: '#000',
            opacity: 0.45
          }
        },
        noData: {
          text: 'Нет данных',
          align: 'center',
          verticalAlign: 'middle',
          offsetX: 0,
          offsetY: 0,
          style: {
            color: undefined,
            fontSize: '14px',
            fontFamily: undefined
          }
        }
      },
      seriesDoctor: [],
      chartOptionsDoctor: {
        labels: [],
        legend: {
          position: 'bottom',
          horizontalAlign: 'left',
        },
        chart: {
          width: 380,
          type: 'pie',
          foreColor: '#373d3f'
        },
        colors: ['#BAD5C4', '#FDAEA1','#D7EDFF', '#BBF6F4', '#FEF99F'],
        responsive: [{
          breakpoint: 1000,
          options: {
            chart: {
              height: 350
            },
            legend: {
              position: 'right'
            }
          }
        }],
        dataLabels: {
          style: {
            colors: ['#373d3f']
          },
          dropShadow: {
            enabled: false,
            top: 1,
            left: 1,
            blur: 1,
            color: '#000',
            opacity: 0.45
          }
        },
        noData: {
          text: 'Нет данных',
          align: 'center',
          verticalAlign: 'middle',
          offsetX: 0,
          offsetY: 0,
          style: {
            color: undefined,
            fontSize: '14px',
            fontFamily: undefined
          }
        }
      },
      DiagnoseList: [],
      chartOptionsProcedures: {
        labels: [],
        legend: {
          position: 'bottom',
          horizontalAlign: 'left',
        },
        chart: {
          width: 380,
          type: 'pie',
          foreColor: '#373d3f'
        },
        colors: ['#BAD5C4', '#FDAEA1','#D7EDFF', '#BBF6F4', '#FEF99F'],
        responsive: [{
          breakpoint: 1000,
          options: {
            chart: {
              height: 350,
            },
            legend: {
              position: 'right'
            }
          }
        }],
        dataLabels: {
          style: {
            colors: ['#373d3f']
          },
          dropShadow: {
            enabled: false,
            top: 1,
            left: 1,
            blur: 1,
            color: '#000',
            opacity: 0.45
          }
        },
        noData: {
          text: 'Нет данных',
          align: 'center',
          verticalAlign: 'middle',
          offsetX: 0,
          offsetY: 0,
          style: {
            color: undefined,
            fontSize: '14px',
            fontFamily: undefined
          }
        }
      },
      seriesProcedures: [],
      chartOptionsGroups: {
        labels: [],
        legend: {
          position: 'bottom',
          horizontalAlign: 'left',
        },
        chart: {
          height: 350,
          type: 'pie',
          foreColor: '#373d3f'
        },
        colors: ['#BAD5C4', '#FDAEA1','#D7EDFF', '#BBF6F4', '#FEF99F'],
        responsive: [{
          breakpoint: 1000,
          options: {
            chart: {
              height: 350,
            },
            legend: {
              position: 'right'
            }
          }
        }],
        dataLabels: {
          style: {
            colors: ['#373d3f']
          },
          dropShadow: {
            enabled: false,
            top: 1,
            left: 1,
            blur: 1,
            color: '#000',
            opacity: 0.45
          }
        },
        noData: {
          text: 'Нет данных',
          align: 'center',
          verticalAlign: 'middle',
          offsetX: 0,
          offsetY: 0,
          style: {
            color: undefined,
            fontSize: '14px',
            fontFamily: undefined
          }
        }
      },
      narusheniya: {
        all:0,
        error:0
      },
      seriesGroups: [],
      selected: [2],
      valuesSelect: '',
      CriteriaSelect: null,
      descriptionLimit: 60,
      isEditing: false,
      loadingService: false,
      itemsService: [],
      searchService: null,
      selectService: null,
      loadingDrug: false,
      itemsDrug: [],
      searchDrug: null,
      selectDrug: null,
    }
  },
  methods: {
    async getChartData(){
      this.chartOptionsDinamic.xaxis.categories = []
      let data = await authService.getChartData()
      this.seriesDinamic[0].data = data.dynamics.y.slice(-7)
      data.dynamics.x.slice(-7).forEach(element=>{
        this.chartOptionsDinamic.xaxis.categories.push(element + 'Z')
      })

      this.$refs.Doctor.updateOptions({
        series: data.doctors.data.slice(-5),
        labels: data.doctors.names.slice(-5)
      })

      this.$refs.Procedures.updateOptions({
        series: data.procedures.values,
        labels: data.procedures.names
      })

      this.$refs.Groups.updateOptions({
        series: data.groups.data,
        labels: data.groups.names
      })

      this.$refs.Dep.updateOptions({
        series: data.departments.data.slice(-5),
        labels: data.departments.names.slice(-5)
      })

      const reducer = (accumulator, currentValue) => accumulator + currentValue;
      this.narusheniya.all = 171000
      this.narusheniya.error = data.groups.data.reduce(reducer)
    },
    async getDiagnose() {
      this.isEditing = !this.isEditing
      this.DiagnoseList = await authService.getDiagnoseList();
      setTimeout(() => {
        this.isEditing = !this.isEditing
      }, 500)
    },
    async getServiceList(search) {
      return await authService.getServiceList(search);
    },
    async getDrugList(search) {
      return await authService.getDrugList(search);
    },
    async getCriteria(diagnose) {
      // let diagnose = 'I21'
      this.CriteriaSelect = await authService.getCriteria(diagnose);
    },
    customFilter(item, queryText) {
      let text = item.join().toLowerCase()
      const searchText = queryText.toLowerCase()

      return text.indexOf(searchText) > -1
    },
    async querySelectionsService (v) {
      this.loadingService = true
      this.itemsService = []
      let tt = await this.getServiceList(v)
      if(tt)
      tt.forEach(elem=>{
        this.itemsService.push(elem.join())
      })
      // this.itemsService = tt.filter(e => {
        //   return (e || '').toLowerCase().indexOf((v || '').toLowerCase()) > -1
        // })
        this.loadingService = false
    },
    async querySelectionsDrug (v) {
      this.loadingDrug = true
      this.itemsDrug = []
      let tt = await this.getDrugList(v)
      if(tt)
      tt.forEach(elem=>{
        this.itemsDrug.push(elem.join())
      })
      // this.itemsDrug = tt.filter(e => {
        //   return (e || '').toLowerCase().indexOf((v || '').toLowerCase()) > -1
        // })
        this.loadingDrug = false
    },
  },
  watch: {
    valuesSelect(val) {
      if (val && val[0])
      {
        this.getCriteria(val[0])
      } else
      {
        this.CriteriaSelect = null
      }
    },
    searchService (val) {
      val && val !== this.select && this.querySelectionsService(val)
    },
    searchDrug (val) {
      val && val !== this.select && this.querySelectionsDrug(val)
    },
  },
  created() {
    this.getChartData()
  },
  computed: {
    textCriteria() {
      return (this.CriteriaSelect && this.CriteriaSelect.ref) ?? 'Критерии не найдены'
    },
    listCriteria() {
      if (this.CriteriaSelect && this.CriteriaSelect.items)
      {
        let arr = []
        this.CriteriaSelect.items.forEach(element => {
          let tmp = {
            action: '',
            headline: '',
            subtitle: '',
            title: element,
          }
          arr.push(tmp)
        })
        return arr
      }
      return []
    },
  }
}
</script>
<style>
.parent {
  margin-top: 1rem;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-template-rows: repeat(3, 0fr);
  grid-column-gap: 1.5rem;
  grid-row-gap: 1.5rem;
}

.div1 { grid-area: 1 / 1 / 2 / 5; }
.div2 { grid-area: 2 / 1 / 3 / 3; }
.div3 { grid-area: 2 / 3 / 3 / 5; }
.div4 { grid-area: 3 / 1 / 4 / 4; }
.div5 { grid-area: 3 / 4 / 4 / 7; }
.div6 { grid-area: 1 / 5 / 3 / 7; }

@media (max-width: 1300px) {
  .parent {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(4, 0fr);
    grid-column-gap: 1.5rem;
    grid-row-gap: 1.5rem;
  }

  .div1 { grid-area: 1 / 1 / 2 / 3; }
  .div2 { grid-area: 2 / 1 / 3 / 2; }
  .div3 { grid-area: 2 / 2 / 3 / 3; }
  .div4 { grid-area: 4 / 1 / 5 / 2; }
  .div5 { grid-area: 4 / 2 / 5 / 3; }
  .div6 { grid-area: 3 / 1 / 4 / 2; }
}
@media (max-width: 1000px) {
  .parent {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: repeat(6, 0fr);
    grid-column-gap: 1.5rem;
    grid-row-gap: 1.5rem;
  }

  .div1 { grid-area: 1 / 1 / 2 / 2; }
  .div2 { grid-area: 2 / 1 / 3 / 2; }
  .div3 { grid-area: 3 / 1 / 4 / 2; }
  .div4 { grid-area: 5 / 1 / 6 / 2; }
  .div5 { grid-area: 6 / 1 / 7 / 2; }
  .div6 { grid-area: 4 / 1 / 5 / 2; }
}
</style>
