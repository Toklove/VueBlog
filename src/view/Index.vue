<template>
  <div class="bg animate__animated animate__fadeIn">
    <div class="wrapper">
      <img src="https://q1.qlogo.cn/g?b=qq&nk=2586438083&s=640" class="avatar" alt="avatar">
      <h1 class="font">下一页的记忆</h1>
      <div class="list animate__animated animate__bounceIn">
        <div class="item" v-for="(item,index) in list" :key="index">
          <router-link :to="item.href">
            <div :class="item.icon"></div>
            <span>{{ item.name }}</span>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const list = [
  {
    name : '主页',
    icon : 'iconfont icon-list',
    href : 'home'
  },
  {
    name : '自言',
    icon : 'iconfont icon-card',
    href : 'home'
  },
  {
    name : '关于',
    icon : 'iconfont icon-about',
    href : 'home'
  },
  {
    name : 'GitHub',
    icon : 'iconfont icon-github',
    href : 'GitHub'
  },
]
</script>

<style scoped>
* {
  color: #FFF;
}
*, :after, :before {
  box-sizing: border-box;
  border: 0 solid #e5e7eb;
}
.bg {
  background-image: url("https://cdn.jsdelivr.net/gh/xzzai/static@master/uPic/wallhaven-eyl1xr.jpg");
  height: 100vh;
  background-position: center center;
  opacity: .95;
  background-size: cover;
}
.wrapper {
  position: absolute;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,.4);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: column wrap;
}
.avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  border: 3px solid #FFF;
  box-shadow: 0 0 1px 1px rgba(0 0 0 .3);
}
.font {
  font-size: 24px;
  margin: 10px;
}
.list {
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-around;
  border-bottom: 1px solid hsla(0,0%,100%,.1);
  border-top: 1px solid hsla(0,0%,100%,.1);
  padding: 40px 0;
}
.item {
  font-size: .8rem;
  padding: 0 1.5rem;
  text-align: center;
  border-left: 1px solid hsla(0,0%,100%,.1);
  border-right: 1px solid hsla(0,0%,100%,.1);
}
@font-face {
  font-family: "iconfont"; /* Project id 2787520 */
  src: url('//at.alicdn.com/t/font_2787520_fn4pg70pqj4.woff2?t=1630642394791') format('woff2'),
  url('//at.alicdn.com/t/font_2787520_fn4pg70pqj4.woff?t=1630642394791') format('woff'),
  url('//at.alicdn.com/t/font_2787520_fn4pg70pqj4.ttf?t=1630642394791') format('truetype');
}

.iconfont {
  font-family: "iconfont",serif !important;
  font-size: 16px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.icon-list:before {
  content: "\e623";
}

.icon-about:before {
  content: "\e605";
}

.icon-card:before {
  content: "\e7c8";
}

.icon-github:before {
  content: "\e600";
}

</style>
