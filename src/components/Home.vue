<template>
  <div class="home">
    <h1>Navigation</h1>
    <a class="btn-success">Add Nav</a>
    <hr>
  </div>
</template>

<script>
export default {
  name: 'hello',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .btn-success{
    padding:5px;
    border-radius: 5px;
  }

</style>
