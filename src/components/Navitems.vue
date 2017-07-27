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
                    <button class="btn btn-default">Add Nav Item</button>
                </div>
                <div class="col-lg-6 navitems">
                    <table>
                        <tr>
                            <th>Name</th>
                            <th>Link</th>
                        </tr>

                        <tr v-for="items in navitems">
                            <td><input type="text" v-bind:value="items.name"></td>
                            <td><input type="text" v-bind:value="items.link"></td>
                            <td><a class="btn btn-default btn-sm" v-on:click="removeItem(items.name)">
                                <span class="glyphicon glyphicon-trash" aria-hidden="true"></span>
                            </a>
                            </td>
                        </tr>
                    </table>
                </div>
            </div>
            <hr>
            <div class="row actions">
                <button class="btn btn-danger"> Delete</button>
                <button class="btn btn-success"> Save</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            navitems: [
                { name: 'outerwear', link: 'www.guideboat.co/womens/outerwear'},
                { name: 'shoes', link: 'www.guideboat.co/womens/shoes'},
                { name: 'coats', link: 'www.guideboat.co/womens/coats'}
            ]
        }
    },
    methods: {
        removeItem: function(name){
            for(let i = 0; i < this.navitems.length; i++){
                if(this.navitems[i].name === name){
                    this.navitems.splice(i, 1);
                }
            }
        }
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