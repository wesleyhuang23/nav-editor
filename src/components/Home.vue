<template>
  <div class="home">
    <div class="container">
      <div class="row">
        <div class="col-lg-4">
          <h1>Navigation</h1>
        </div>
        <div class="col-lg-8">
          <h3>Menu Name</h3>
          <input type="text" v-model="menuItem">
          <h3>Menu Path Id</h3>
          <input type="text" v-model="menuId">
          <br>
          <br>
          <a class="btn-success" v-on:click="addMenu(menuItem, menuId)">Add Menu</a>
        </div>
      </div>
      <hr>
      <div class="row">
        <div class="col-lg-4">
          <h2>Nav Categories</h2>
          <p>Help customers navigate around your online store.</p>
        </div>
        <div class="col-lg-8">
          <div class="menu">
            <table>
              <thead>
                <tr>
                  <th v-for="key in gridColumns">
                    {{ key | capitalize }}
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="entry in gridData">
                  <td v-for="key in gridColumns" :id="entry.id">
                    <router-link :to="{name: 'NavItem', params: { name: entry.name } }"><span>{{ entry[key] | capitalize }}</span></router-link>
                    <div id="hide" class="edit-container">
                      <input type="text" :value="entry.name"/>
                      <button class="btn btn-success" v-on:click="saveMenuItem($event, entry.id)">Save</button>
                    </div>
                  </td>
                  <td align="right">
                    <a class="btn btn-default btn-sm" v-on:click="editItem(entry.id)">
                      <span class="glyphicon glyphicon-pencil" aria-hidden="true"></span>
                    </a>
                  </td>
                  <td align="left">
                    <a class="btn btn-default btn-sm" v-on:click="removeItem(entry.id, entry.name)">
                      <span class="glyphicon glyphicon-trash" aria-hidden="true"></span>
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import draggable from 'vuedraggable';
export default {
  name: 'hello',
  components: {
    draggable,
  },
  data () {
    return {
      gridColumns: ['name'],
      gridData: [],
      menuItem: '',
      menuId: '',
      toEdit: [],
    }
  },
  methods: {
    addMenu: function(menuItem, menuId){
      var id = this.gridData.length + 1;
      this.$http.post('/api/menu', { id: menuId, name: menuItem }).then(function(res){
        this.$http.get('/api/menu').then((res) => {
          console.log(res.body, 'menudb');
          this.gridData = res.body;
        })
      });
    },
    editItem: function(className){
      var data = document.getElementsByTagName('td');
      this.toEdit = [];
      for(var i = 0; i < data.length; i++){
        if(data[i].id == className){
          this.toEdit.push(data[i]);
        }
      }
      var nameLink = this.toEdit[0].children[0];
      var nameInput = this.toEdit[0].children[1];
      nameLink.style.display = 'none';
      nameInput.style.display = 'block';
    },
    saveMenuItem: function(e, id){
      var nameInput = this.toEdit[0].children[1].children[0];
      var newMenu;
      for(var i = 0; i < this.gridData.length; i++){
        if(this.gridData[i].id === id){
          this.gridData[i].name = nameInput.value;
          var newMenu = this.gridData[i];
        }
      }
      this.toEdit[0].children[0].style.display = 'block';
      this.toEdit[0].children[1].style.display = 'none';
      //update local storage with new parent values because of menu item change
      // if(localStorage.subNavItem){
      //   var db = JSON.parse(localStorage.subNavItem);
      //   for(var j = 0; j < db.length; j++){
      //     if(db[j].parent === nameInput._value){
      //       db[j].parent = nameInput.value;
      //     }
      //   }
      //   localStorage.subNavItem = JSON.stringify(db);
      // }
      // if(localStorage.menuItems){
      //   var menuDB = JSON.parse(localStorage.menuItems);
      //   for(var x = 0; x < menuDB.length; x++){
      //     if(menuDB[x].id == id){
      //       menuDB[x].name = nameInput.value;
      //     }
      //   }
      //   localStorage.menuItems = JSON.stringify(menuDB);
      // }
      this.$http.put('/api/updateMenu', {body: newMenu }).then(function(res){
        console.log('updated in db', res);
        //get database again;
        this.$http.get('/api/menu').then(function(res){
          console.log(res.body, 'menudb');
          this.gridData = res.body;
        })
      })
    },
    removeItem: function(id, name){
      for(var i = this.gridData.length - 1; i >= 0; i--){
        if(this.gridData[i].id == id){
          this.gridData.splice(i, 1);
        }
      }
      console.log('remove')
      this.$http.delete('/api/delete/' + id).then((res) => {
        console.log('removed from db', res);
        //get database again;
        this.$http.get('/api/menu').then((res) => {
          console.log(res.body, 'menudb');
          this.gridData = res.body;
        })
      })
    },
    getData(){
      
    }, 
  },
  computed: {
    list: {
        get() {
            return this.value
        },
        set(value) {
            this.$emit('input', value)
        }
    }
	},
  
  created() {
    // if(localStorage.menuItems){
    //   this.gridData = JSON.parse(localStorage.menuItems);
    // } else {
    //   localStorage.menuItems = JSON.stringify(this.gridData);
    // }
    console.log('asd')
      this.$http.get('/api/menu').then(function(res){
        console.log(res.body, 'menudb');
        this.gridData = res.body;
      })
      this.$http.get('/api/navItems').then(function(res){
        console.log(res.body, 'navitemsdb');
      })
      // this.$http.post('/menu', {id: 1, name: 'children'}).then(function(res){
      //   console.log(red.body);
      // })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  input{
    background-color: white;
  }
  span{
    color:black !important;
    background-color: white !important;
  }
  .btn-success{
    padding:5px;
    border-radius: 5px;
    cursor: pointer;
  }
  .menu{
    border: 1px solid gray;
    background-color: white;
    padding: 10px;
  }
  th{
    padding-left: 10px;
    padding-right: 10px;
    font-size: 20px;
    background-color: white;
  }
  td{
    padding-left: 10px;
    padding-right: 10px;
    background-color: white;
    font-size: 20px;
    span{
      text-transform: capitalize;
    }
  }
  tr{
    border-bottom: 1px solid #EBEEF0;
  }
  table{
    width: 100%;
  }
  span{
    color: blue;
    cursor: pointer;
  }
  #hide{
    display: none;
  }
  #show{
    display: inline-block;
  }
</style>