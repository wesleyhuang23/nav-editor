<template>
    <div class="navItem">
        <div class="container">
            <div class="row">
                <div class="col-lg-4 col-md-6">
                    <h1>Menu</h1>
                </div>
                <div class="col-lg-8 col-md-6">
                    <p>Name</p>
                    <input type="text" :value="this.$route.params.name">
                </div>
            </div>
            <hr>
            <div class="row">
                <div class="col-lg-4 col-md-6">
                    <h1>Nav Items</h1>
                    <button class="btn btn-default" v-on:click="addItem()">Add Nav Item</button>
                </div>
                <div class="col-lg-8 col-md-6 navitems">
                    <table>
                        <tr>
                            <th>Name</th>
                            <th>Link</th>
                        </tr>
                        <tr v-for="items in subNavItem" class="navData">
                            <td>
                                <input :id="items.id" type="text" :value="items.name" v-on:keyup="updateName($event, items.id)">
                            </td>
                            <td>
                                <input :id="items.id" type="text" :value="items.link" v-on:keyup="updateLink($event, items.id)">
                            </td>
                            <td>
                                <a class="btn btn-default btn-sm" v-on:click="removeItem(items.id)">
                                    <span class="glyphicon glyphicon-trash" aria-hidden="true"></span>
                                </a>
                            </td>
                        </tr>
                    </table>
                </div>
            </div>
            <hr>
            <div class="row actions">
                <button class="btn btn-success" v-on:click="update()">Save</button>
                <button class="btn btn-info" v-on:click="exportNav()">Export</button>
            </div>
            <hr>
            <div class="container">
                <div class="row">
                    <div class="col-lg-12">
                        <textarea></textarea>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            subNavItem: [
                { id: 1, name: 'outerwear', link: 'www.guideboat.co/womens/outerwear', parent: 'boats'},
                { id: 2, name: 'shoes', link: 'www.guideboat.co/womens/shoes', parent: 'boats'},
                { id: 3, name: 'coats', link: 'www.guideboat.co/womens/coats', parent: 'boats'}
            ],
        }
    },
    methods: {
        removeItem: function (id) {
            for (let i = 0; i < this.subNavItem.length; i++) {
                if (this.subNavItem[i].id === id) {
                    this.subNavItem.splice(i, 1);
                }
            }
        },
        update: function () {
            if (localStorage.subNavItem) {
                var db = JSON.parse(localStorage.data);
                //remove previous data relating to local state to avoid duplicates
                for (let i = db.length - 1; i >= 0; i--) {
                    if (db[i].parent === this.subNavItem[0].parent) {
                        db.splice(i, 1);
                    }
                }
                for (let j = 0; j < this.subNavItem.length; j++) {
                    db.push(this.subNavItem[j]);
                }
                localStorage.subNavItem = JSON.stringify(db);
            } else {
                localStorage.subNavItem = JSON.stringify(this.subNavItem);
            }
        },
        addItem: function () {
            var id = this.subNavItem.length + 1;
            var parent = this.$route.params.name;
            this.subNavItem.push({ id: id, name: '', link: '', parent: parent });
        },
        updateName: function (e, id) {
            let value = e.target.value;
            let oldValue = e.target._value;
            for (var i = 0; i < this.subNavItem.length; i++) {
                if (this.subNavItem[i].name === oldValue && this.subNavItem[i].id === id) {
                    this.subNavItem[i].name = value;
                }
            }
        },
        updateLink: function (e, id) {
            let value = e.target.value;
            let oldValue = e.target._value;
            for (var i = 0; i < this.subNavItem.length; i++) {
                if (this.subNavItem[i].link === oldValue && this.subNavItem[i].id === id) {
                    this.subNavItem[i].link = value;
                }
            }
        },
        exportNav: function (e) {
            var outerHTML = `                   <li class="nav-mobile--dig">` + this.subNavItem[0].parent + `</li>
                    <ul class="nav--mobile nav-mobile--level-two">
                        <li class="nav-mobile--back">Back</li>`
            //creating subitem html
            var final = [];
            for (var i = 0; i < this.subNavItem.length; i++) {
                final.push('<li><span class="widget widget-category-link"><a href="' + this.subNavItem[i].link + '" title="' + this.subNavItem[i].name + '"><span>' + this.subNavItem[i].name + '</span></a></span></li>')
            }
            var textarea = document.getElementsByTagName('textarea')[0];
            var combine;
            for (var j = 0; j < final.length; j++) {
                if (j === 0) {
                    combine = outerHTML + `
                        ` + final[j];
                } else {
                    var combine = combine + `
                        ` + final[j];
                }
            }
            textarea.innerHTML = combine + `
                   </ul>`;
            this.update();
        }
    },
    created() {
        if (localStorage.subNavItem) {
            var db = JSON.parse(localStorage.subNavItem);
            var state = [];
            for (let i = 0; i < db.length; i++) {
                if (db[i].parent === this.$route.params.name) {
                    state.push(db[i]);
                }
            }
            this.subNavItem = state;
        }
    }
}
</script>

<style lang="scss" scoped>
input {
    width: 90%;
    margin-bottom: 5px;
}

input:first-child {
    margin-top: 5px;
}

hr {
    width: 100%;
    height: 5px;
}

th,
td,
input,
tr {
    background-color: white;
    font-size: 17px;
}

textarea {
    width: 100%;
    height: 500px;
}

table {
    width: 100%;
}

button {
    margin-bottom: 20px;
}

.navitems {
    background-color: white;
    border: 1px solid black;
    border-radius: 2px;
    padding: 10px;
    p {
        display: inline-block;
    }
}

.actions {
    width: 100%;
    display: flex;
    justify-content: space-between;
}
</style>