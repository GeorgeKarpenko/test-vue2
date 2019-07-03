<template>
  <main id="app">
    <div class="row">
      <h1 class="col-12">Информация о биткоинах</h1>
      <div class="col-12 well">
      <table class="table">
        <thead>
          <tr>
            <th>Имя</th>
            <th>Стоимость</th>
            <th class="bv-d-sm-down-none">Рыночная капитализация</th>
            <th class="bv-d-sm-down-none">Суточной объём</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{{bitcoin.name}}</td>
            <td>{{bitcoin.price}}</td>
            <td class="bv-d-sm-down-none">{{bitcoin.maketCap}}</td>
            <td class="bv-d-sm-down-none">{{bitcoin.volume}}</td>
          </tr>
        </tbody>
      </table>
      <ve-line :data="chartData"></ve-line>
      </div>
    </div>
  </main>
</template>

<script>
import VeLine from 'v-charts/lib/line.common'
export default {
  
  metaInfo: {
    title: 'Главная страница',
    titleTemplate: '%s | Информация о биткоинах',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' }
    ]
  },
  created() {
      this.chatBD(this.$route.params['bitcoinId']);
  },
  components: { VeLine },
  data () {
    return {
      bitcoin:{},
      chartData: {
        columns: ['date', 'Стоимость'],
        rows: [
        ]
      }
    }
  },
  
  sockets: {
      connect: function () {
          console.log('socket connected')
      },
      customEmit: function (data) {
          console.log('this method was fired by the socket server. eg: io.emit("customEmit", data)')
      }
  },
  methods:{
    chatBD(id){
      this.$http.get('http://localhost:3000/bitcoin/' + id)
      .then(response => {
        return response.json()
      })
      .then( bitcoin => {
        console.log(bitcoin.rows)
        this.bitcoin=bitcoin
        this.chartData.rows = bitcoin.rows
      })
    }
  }
}


</script>

<style scoped>
main{
  height: 60vh;
}

.row{
  position: relative;
  height: 100%;
}

h1{
  height: 16%;
  margin: 0;
}

</style>
