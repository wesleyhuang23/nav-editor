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
                </div>
                <div class="col-lg-6 navitems">
                    <table>
                        <tr>
                            <th>Name</th>
                            <th>Link</th>
                        </tr>

                        <tr>
                            <td><input type="text"></td>
                            <td><input type="text"></td>
                            <td><a class="btn btn-default btn-sm">
                                <span class="glyphicon glyphicon-trash" aria-hidden="true"></span>
                            </a>
                            </td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default{
        data () {
            return {

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
</style>