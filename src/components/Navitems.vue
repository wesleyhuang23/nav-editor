<template>
    <div class="navItem">
        <div class="container-fluid">
            <div class="row">
                <div class="col-lg-6">
                    <h1>Menu</h1>
                </div>
                <div class="col-lg-6">
                    <p>Name</p>
                    <input type="text" :value="this.$route.params.name">
                </div>
            </div>
            <hr>
            <div class="row">
                <div class="col-lg-6">
                    <h1>Nav Items</h1>
                    <button class="btn btn-default" v-on:click="addItem()">Add Nav Item</button>
                </div>
                <div class="col-lg-6 navitems">
                    <table>
                        <tr>
                            <th>Name</th>
                            <th>Link</th>
                        </tr>

                        <tr v-for="items in subNavItem" class="navData">
                            <td><input type="text" v-bind:value="items.name" v-on:keyup="updateName($event)"></td>
                            <td><input type="text" v-bind:value="items.link" v-on:keyup="updateLink($event)"></td>
                            <td><a class="btn btn-default btn-sm" v-on:click="removeItem(items.id)">
                                <span class="glyphicon glyphicon-trash" aria-hidden="true"></span>
                            </a>
                            </td>
                        </tr>
                    </table>
                </div>
            </div>
            <hr>
            <div class="row actions">
                <button class="btn btn-danger">Delete</button>
                <button class="btn btn-success" v-on:click="update()">Save</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            subNavItem: [
                { id: 1, name: 'outerwear', link: 'www.guideboat.co/womens/outerwear', parent: 'boats'},
                { id: 2, name: 'shoes', link: 'www.guideboat.co/womens/shoes', parent: 'boats'},
                { id: 3, name: 'coats', link: 'www.guideboat.co/womens/coats', parent: 'boats'}
            ],
        }
    },
    methods: {
        removeItem: function(id){
            for(let i = 0; i < this.subNavItem.length; i++){
                if(this.subNavItem[i].id === id){
                    this.subNavItem.splice(i, 1);
                }
            }
        },
        update: function(){
            console.log(this.subNavItem);
            localStorage.data = JSON.stringify(this.subNavItem);
        },
        addItem: function(){
            var id = this.subNavItem.length + 1;
            var parent = this.$route.params.name;
            this.subNavItem.push({id: id, name: '', link: '', parent: parent,});
        },
        updateName: function(e){
            let value = e.target.value;
            let oldValue = e.target._value;
            for(var i = 0; i < this.subNavItem.length; i++){
                if(this.subNavItem[i].name === oldValue){
                    this.subNavItem[i].name = value;
                }
            }
        },
        updateLink: function(e){
            let value = e.target.value;
            let oldValue = e.target._value;
            for(var i = 0; i < this.subNavItem.length; i++){
                if(this.subNavItem[i].link === oldValue){
                    this.subNavItem[i].link = value;
                }
            }
        }
    },
    created() {
        if(localStorage.data){
            var db = JSON.parse(localStorage.data);
            var state = [];
            for(let i = 0; i < db.length; i++){
                if(db[i].parent === this.$route.params.name){
                    state.push(db[i]);
                }
            }
            this.subNavItem = state;
        }
        console.log(this.subNavItem);
    }
}
</script>

<style lang="scss" scoped>
    input{
        width: 90%;
    }
    hr{
        width: 100%;
        height: 2px;
    }
    th, td, input{
        background-color:white;
    }
    table{
        width: 100%;
    }
    .navitems{
        background-color: white;
        border: 1px solid black;
        border-radius: 2px;
        padding:10px;
        p{
            display: inline-block;
        }
    }
    .actions{
        width: 100%;
        display: flex;
        justify-content: space-between;
    }
</style>