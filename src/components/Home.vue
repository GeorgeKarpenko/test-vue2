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
          <tr v-for="message in bitcoin" :key="message.id">
            <td><router-link class="nav-link" :to="'/' + message.id">{{message.name}}</router-link></td>
            <td>{{message.price}}</td>
            <td class="bv-d-sm-down-none">{{message.maketCap}}</td>
            <td class="bv-d-sm-down-none">{{message.volume}}</td>
          </tr>
        </tbody>
      </table>
      </div>
             
    </div>
  </main>
</template>

<script>

export default {
  
  metaInfo: {
    // if no subcomponents specify a metaInfo.title, this title will be used
    title: 'Главная страница',
    // all titles will be injected into this template
    titleTemplate: '%s | Информация о биткоинах',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' }
    ]
  },
  data () {
    return {
      bitcoin:{}
    }
  },
  created() {
    this.chatBD();
    
    this.ws = new WebSocket("ws://localhost:8080/chat-server.php");
    this.ws.onopen = function() {
      console.log('WS подключенно')
    };
    this.ws.onclose = function(eventclose) {
      console.log('соеденение закрыто причина: ' + this.eventclose)
    };
    this.ws.onmessage = event => {
      let mess = JSON.parse(event.data);
      
      let len = this.bitcoin.length;
      if(mess.id >= len){
        this.bitcoin.push(mess);
      }
      else{
        this.bitcoin[mess.id].name = mess.name;
        this.bitcoin[mess.id].price = mess.price;
        this.bitcoin[mess.id].maketCap = mess.maketCap;
        this.bitcoin[mess.id].volume = mess.volume;
      }
      console.log(this.bitcoin);
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
    chatBD(){
      this.$http.get('http://localhost:3000/bitcoin')
      .then(response => {
        return response.json()
      })
      .then( bitcoin => {
        this.bitcoin=bitcoin
      })
    },
    add() {
        // Emit the server side
        this.$socket.emit("add", { a: 5, b: 3 });
    },
    get() {
		  	this.$socket.emit("get", { id: 'bitcoin' }, (response) => {
					console.log(response);
				});
			},
        clickButton: function (data) {
            // $socket is socket.io-client instance
            this.$socket.emit('emit_method', data)
        }
  },
  /*
  socket: {
    // Prefix for event names
    // prefix: "/counter/",

    // If you set `namespace`, it will create a new socket connection to the namespace instead of `/`
    // namespace: "/counter",

    events: {

      // Similar as this.$socket.on("changed", (msg) => { ... });
      // If you set `prefix` to `/counter/`, the event name will be `/counter/changed`
      //
      changed(msg) {
        console.log("Something changed: " + msg);
      },

      connect() {
        console.log("Websocket connected to " + this.$socket.nsp);
      },

      disconnect() {
        console.log("Websocket disconnected from " + this.$socket.nsp);
      },

      error(err) {
        console.error("Websocket error!", err);
      }

    }
  }*/
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

.table{
  position: absolute;
}

.well {
  height: 84%;
  overflow: hidden;
  position: relative;
  overflow-y: scroll;
}
.well::-webkit-scrollbar-track {
  border-radius: 4px;
}
.well::-webkit-scrollbar {
  width: 6px;
}
.well::-webkit-scrollbar-thumb {
  border-radius: 4px;
  background: none;
}
.well:hover::-webkit-scrollbar-thumb {
  background: #6a7d9b;
}

</style>
