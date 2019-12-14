<template>
  <router-view></router-view>
  <!-- <el-button type="success">成功按钮</el-button> -->
</template>

<script>
export default {
  created() {
    this.$router.push('/login')
  }
}
</script>

<style>

</style>