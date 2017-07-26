<template>
  <div class="home">
    <h1>Navigation</h1>
    <a class="btn-success">Add Nav</a>
    <hr>
    <div class="container-fluid">
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
                  <td v-for="key in gridColumns">
                    {{entry[key]}}
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
      gridColumns: ['name', 'power'],
      gridData: [
        { name: 'Chuck Norris', power: Infinity },
        { name: 'Bruce Lee', power: 9000 },
        { name: 'Jackie Chan', power: 7000 },
        { name: 'Jet Li', power: 8000 }
      ]
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
  }
</style>
