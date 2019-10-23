<template>
  <div class="hello">
    这是首页
  </div>
</template>

<script>
export default {
  props: {
  },
  mounted() {
    this.$axios.get("/user")
    .then(res=>{
      console.log(res);
    })
    .catch(error=>{
      console.log(error);
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


</style>
