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
                  <th>
                  </th>
                  <th v-for="key in gridColumns">
                    {{ key | capitalize }}
                  </th>
                  <th>
                    Path Id (For Desktop Nav)
                  </th>
                </tr>
              </thead>
              <draggable v-model="list" :element="'tbody'">
                <tr v-for="entry in gridData">
                  <td align="center">
                    <a>
                      <span class="glyphicon glyphicon-option-vertical" aria-hidden="true"></span>
                    </a>
                  </td>
                  <td v-for="key in gridColumns" :id="entry.id">
                    <router-link :to="{name: 'NavItem', params: { name: entry.name, id: entry.catagoryId } }"><span>{{ entry[key] | capitalize }}</span></router-link>
                    <div id="hide" class="edit-container">
                      <input type="text" :value="entry.name"/>
                    </div>
                  </td>
                  <td :id="entry.id">
                    <router-link :to="{name: 'NavItem', params: { name: entry.name, id: entry.catagoryId } }"><span>{{ entry.catagoryId }}</span></router-link>
                    <div id="hide" class="edit-container">
                      <input type="text" :value="entry.catagoryId"/>
                      <button class="btn btn-success" v-on:click="saveMenuItem($event, entry.id)">Save</button>
                    </div>
                  </td>
                  <td align="right">
                    <a class="btn btn-default btn-sm" v-on:click="editItem(entry.id)">
                      <span class="glyphicon glyphicon-pencil" aria-hidden="true"></span>
                    </a>
                  </td>
                  <td align="left">
                    <a class="btn btn-default btn-sm" v-on:click="removeItem(entry.id)">
                      <span class="glyphicon glyphicon-trash" aria-hidden="true"></span>
                    </a>
                  </td>
                </tr>
              </draggable>
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
      gridData: [
        { id: 1, name: 'boats', catagoryId: 4 },
        { id: 2, name: "women's", catagoryId: 209 },
        { id: 3, name: "men's", catagoryId: 15 },
        { id: 4, name: 'accessories', catagoryId: 67 },
        { id: 5, name: 'tools & gear', catagoryId: 43 },
        { id: 6, name: "camp home", catagoryId: 52 },
        { id: 7, name: "gift cards", catagoryId: 56 },
        { id: 8, name: 'outlet', catagoryId: 81 }
      ],
      menuItem: '',
      menuId: '',
      toEdit: [],
    }
  },
  methods: {
    addMenu: function(menuItem, menuId){
      var id = this.gridData.length + 1;
      this.gridData.push({id: id, name: menuItem, catagoryId: menuId });
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
      var pathLink = this.toEdit[1].children[0];
      var pathInput = this.toEdit[1].children[1];
      nameLink.style.display = 'none';
      nameInput.style.display = 'block';
      pathLink.style.display = 'none';
      pathInput.style.display = 'block';
    },
    saveMenuItem: function(e, id){
      var nameInput = this.toEdit[0].children[1].children[0];
      var catInput = this.toEdit[1].children[1].children[0];
      for(var i = 0; i < this.gridData.length; i++){
        if(this.gridData[i].id === id){
          this.gridData[i].name = nameInput.value;
          this.gridData[i].catagoryId = catInput.value;
        }
      }
      this.toEdit[0].children[0].style.display = 'block';
      this.toEdit[0].children[1].style.display = 'none';
      this.toEdit[1].children[0].style.display = 'block'
      this.toEdit[1].children[1].style.display = 'none';
      //update local storage with new parent values because of menu item change
      if(localStorage.subNavItem){
        var db = JSON.parse(localStorage.subNavItem);
        for(var j = 0; j < db.length; j++){
          if(db[j].parent === nameInput._value){
            db[j].parent = nameInput.value;
            db[j].parentId = catInput.value;
          }
        }
        localStorage.subNavItem = JSON.stringify(db);
      }
      if(localStorage.menuItems){
        var menuDB = JSON.parse(localStorage.menuItems);
        for(var x = 0; x < menuDB.length; x++){
          if(menuDB[x].id == id){
            menuDB[x].name = nameInput.value;
            menuDB[x].catagoryId = catInput.value;
          }
        }
        localStorage.menuItems = JSON.stringify(menuDB);
      }
    },
    removeItem: function(id){
      for(var i = this.gridData.length - 1; i >= 0; i--){
        if(this.gridData[i].id == id){
          this.gridData.splice(i, 1);
        }
      }
    } 
  },
  filters: {
    capitalize: function (str) {
      return str.charAt(0).toUpperCase() + str.slice(1)
    }
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
    if(localStorage.menuItems){
      this.gridData = JSON.parse(localStorage.menuItems);
    } else {
      localStorage.menuItems = JSON.stringify(this.gridData);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  a{
    color: black;
    text-decoration: none;
  }
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