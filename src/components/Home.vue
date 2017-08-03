<template>
  <div class="home">
    
    <div class="container-fluid">
      <h1>Navigation</h1>
      <input type="text" v-model="menuItem">
      <a class="btn-success" v-on:click="addMenu(menuItem)">Add Nav</a>
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
                    <router-link :to="{name: 'NavItem', params: {name: entry.name} }"><span>{{ entry[key] | capitalize }}</span></router-link>
                    <div id="hide" class="edit-container">
                      <input type="text" :value="entry.name"/>
                      <button class="btn btn-success" v-on:click="saveMenuItem($event, entry.id)">Save</button>
                    </div>
                  </td>
                  <td>
                    <a class="btn btn-default btn-sm" v-on:click="editItem(entry.id)">
                      <span class="glyphicon glyphicon-pencil" aria-hidden="true"></span>
                    </a>
                  </td>
                  <td>
                    <a class="btn btn-default btn-sm" v-on:click="removeItem(entry.id)">
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
export default {
  name: 'hello',
  data () {
    return {
      gridColumns: ['name'],
      gridData: [
        { id: 1, name: 'boats' },
        { id: 2, name: "women's" },
        { id: 3, name: "men's"},
        { id: 4, name: 'accessories' },
        { id: 5, name: 'tools & gear' },
        { id: 6, name: "camp home" },
        { id: 7, name: "gift cards"},
        { id: 8, name: 'outlet' }
      ],
      menuItem: '',
    }
  },
  methods: {
    addMenu: function(menuItem){
      var id = this.gridData.length + 1;
      this.gridData.push({id: id, name: menuItem});
    },
    editItem: function(className){
      var data = document.getElementById(className);
      console.log(document.getElementsByTagName('td'));
      var link = data.children[0];
      var input = data.children[1];
      link.style.display = 'none';
      input.style.display = 'block';
    },
    saveMenuItem: function(e, id){
      console.log(e);
      var data = document.getElementById(id);
      data.children[0].style.display = 'block';
      var container = e.target.parentElement;
      var input = container.children[0];
      for(var i = 0; i < this.gridData.length; i++){
        if(this.gridData[i].id === id){
          console.log('sdf')
          this.gridData[i].name = input.value;
        }
      }
      container.style.display = 'none';
      //update local storage with new parent values because of menu item change
      var db = JSON.parse(localStorage.data);
      for(var j = 0; j < db.length; j++){
        if(db[j].parent === input._value){
          db[j].parent = input.value;
        }
      }
      localStorage.data = JSON.stringify(db);
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
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
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