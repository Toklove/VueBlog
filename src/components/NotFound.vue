<template>
  <Header/>
  <div class="container">
    <main>
      <h1>404 Not Found</h1>
      <p>你好像走丢了哦QaQ！</p>
    </main>
  </div>
  <Footer/>
</template>

<script setup>
import Header from "../layout/Header.vue";
import Footer from "../layout/Footer.vue";
</script>

<style lang="scss" scoped>
@import '../assets/sass/main.scss';
* {
  text-align: center;
}
</style>
