<template>
  <section>
    <div class="login">
      <h2>Username</h2>
      <input type="text">
      <h2>Password</h2>
      <input type="password">
      <br>
      <br>
      <button class="btn btn-success"> Login</button>
    </div>
  </section>
</template>

<script>
export default{
  data() {
    return {
    }
  }
}
</script>

<style lang="scss" scoped>
  section{
    width: 100vw;
    height: 80vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  input{
    width: 100%;
  }
  .login{
    border: 1px solid black;
    padding:20px;
    display:inline-block;
    width: 30vw;

    button{
      display:block;
      margin:auto;
    }
  }
</style>