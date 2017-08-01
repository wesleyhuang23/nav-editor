<template>
    <div class="navItem">
        <div class="container-fluid">
            <div class="row">
                <div class="col-lg-6">
                    <h1>Menu</h1>
                </div>
                <div class="col-lg-6">
                    <p>Name</p>
                    <input type="text">
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

                        <tr v-for="items in navitems" class="navData">
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
            navitems: [
                { id: 1, name: 'outerwear', link: 'www.guideboat.co/womens/outerwear'},
                { id: 2, name: 'shoes', link: 'www.guideboat.co/womens/shoes'},
                { id: 3, name: 'coats', link: 'www.guideboat.co/womens/coats'}
            ],
        }
    },
    methods: {
        removeItem: function(id){
            for(let i = 0; i < this.navitems.length; i++){
                if(this.navitems[i].id === id){
                    this.navitems.splice(i, 1);
                }
            }
        },
        update: function(){
            console.log(this.navitems);
            localStorage.data = JSON.stringify(this.navitems);
        },
        addItem: function(){
            var id = this.navitems.lenght + 1;
            this.navitems.push({id: id, name: '', link: ''});
        },
        updateName: function(e){
            let value = e.target.value;
            let oldValue = e.target._value;
            for(var i = 0; i < this.navitems.length; i++){
                if(this.navitems[i].name === oldValue){
                    this.navitems[i].name = value;
                }
            }
        },
        updateLink: function(e){
            let value = e.target.value;
            let oldValue = e.target._value;
            for(var i = 0; i < this.navitems.length; i++){
                if(this.navitems[i].link === oldValue){
                    this.navitems[i].link = value;
                }
            }
        }
    },
    created() {
        this.navitems = JSON.parse(localStorage.data);
        console.log(this.navitems);
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