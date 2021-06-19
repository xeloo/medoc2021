<template>
  <div class="home">
    <v-container
        fluid
        class="pa-0"
    >
      <v-row
          no-gutters>
        <v-col
            cols="12"
            sm="3"
            md="3"
            class="white pa-6"
        >
            <v-card
                class="pa-5 mb-6 blue lighten-5 rounded-xl"
                style="min-height: 200px"
                v-for="(i) in 3"
                :key="i"
            >
            </v-card>
        </v-col>
        <v-col
            cols="12"
            sm="9"
            md="9"
            class="pa-6"
        >
          <v-card
              elevation="2"
              class="pa-6"
          >
            Фильтр
          </v-card>
          <div class="parent">
            <div class="div1">
              <v-card>
                <v-card-title class="grey lighten-3">
                  Динамика
                </v-card-title>
                <v-card-text
                    class="pa-5"
                >
                  <apexchart type="area" height="350" :options="chartOptionsDinamic" :series="seriesDinamic"></apexchart>
                </v-card-text>
              </v-card>
            </div>
            <div class="div2">
              <v-card>
                <v-card-title class="grey lighten-3">
                  Врачи
                </v-card-title>
                <v-card-text
                    class="pa-5"
                >
                  <apexchart type="pie" width="380" :options="chartOptions" :series="series"></apexchart>
                </v-card-text>
              </v-card>
            </div>
            <div class="div3">
              <v-card>
                <v-card-title class="grey lighten-3">
                  Отделы
                </v-card-title>
                <v-card-text
                    class="pa-5"
                >
                  <apexchart type="pie" width="380" :options="chartOptions" :series="series"></apexchart>
                </v-card-text>
              </v-card>
            </div>
            <div class="div4">
              <v-card>
                <v-card-title class="grey lighten-3">
                  Нарушения за период
                </v-card-title>
                <v-card-text
                    class="pa-5"
                >
                  <apexchart type="pie" width="380" :options="chartOptions" :series="series"></apexchart>
                </v-card-text>
              </v-card>
            </div>
            <div class="div5">
              <v-card>
                <v-card-title class="grey lighten-3">
                  Ошибки в группах пациентов
                </v-card-title>
                <v-card-text
                    class="pa-5"
                >
                  <apexchart type="pie" width="380" :options="chartOptions" :series="series"></apexchart>
                </v-card-text>
              </v-card>
            </div>
            <div class="div6">
              <v-card
              style="height: 100%"
              >
                <v-card-title class="grey lighten-3">
                  Процедуры
                </v-card-title>
                <v-card-text
                    class="pa-5"
                >
                  <apexchart type="pie" width="380" :options="chartOptions" :series="series"></apexchart>
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

        </v-col>
      </v-row>
    </v-container>
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
  methods: {
    async getDiagnose() {
      this.isEditing = !this.isEditing
      this.DiagnoseList = await authService.getDiagnoseList();
      setTimeout(() => {
        this.isEditing = !this.isEditing
      }, 500)
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
    }
  },
  data() {
    return {
      series: [44, 55, 13, 43, 22],
      seriesDinamic: [{
        name: "series1",
        data: [31, 40, 28, 51, 42, 109, 100]
      }],
      chartOptions: {
        legend: {
          position: 'bottom'
        },
        chart: {
          width: 380,
          type: 'pie',
          foreColor: '#373d3f'
        },
        colors: ['#BAD5C4', '#FDAEA1','#D7EDFF', '#BBF6F4', '#FEF99F'],
        labels: ['Team A', 'Team B', 'Team C', 'Team D', 'Team E'],
        responsive: [{
          breakpoint: 1000,
          options: {
            chart: {
              width: 100
            },
            legend: {
              position: 'bottom'
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
        series: [
          {
            name: "series1",
            data: [31, 40, 28, 51, 42, 109, 100]
          },
          {
            name: "series2",
            data: [11, 32, 45, 32, 34, 52, 41]
          }
        ],

        xaxis: {
          type: "datetime",
          categories: [
            "2018-09-19T00:00:00",
            "2018-09-19T01:30:00",
            "2018-09-19T02:30:00",
            "2018-09-19T03:30:00",
            "2018-09-19T04:30:00",
            "2018-09-19T05:30:00",
            "2018-09-19T06:30:00"
          ]
        },
        tooltip: {
          x: {
            format: "dd/MM/yy HH:mm"
          }
        }
      },
      DiagnoseList: [],
      selected: [2],
      valuesSelect: '',
      CriteriaSelect: null,
      descriptionLimit: 60,
      isEditing: false,
    }
  },
  created() {
    // this.getDiagnose()
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
  margin-top: 2rem;
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
</style>
