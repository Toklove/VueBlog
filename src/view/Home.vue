<template>
<div>
  <Header/>
  <main>
    <div class="container">
      <section class="my">
        <div class="content">
          <p>Here is a blog. Halo my Friends</p>
          <div class="bio-social">
          </div>
        </div>
      </section>
    </div>
    <div class="container">
      <section>
        <h2>
          News Articles
          <router-link class="section-button" to="articles">View all</router-link>
        </h2>
        <div class="posts">
          <div class="post animate__animated animate__fadeIn" v-for="item in postList" :key="item.id">
            <router-link :to='`/articles/${item.id}`'>
              <div class="post-row">
                <time>{{ item.time }}</time>
                <h3>{{ item.title }}</h3>
              </div>
            </router-link>
          </div>
        </div>
      </section>
    </div>
    <Footer/>
  </main>
</div>
</template>

<script setup>
import Header from "../layout/Header.vue";
import Footer from "../layout/Footer.vue";
import {get} from '../config/request'
import { getTime } from "../config/utils";
import {reactive} from "vue";
const postList = reactive([])
const getPosts = ( async () => {
  await get('/content/posts').then((result) => {
    if (result.status === 200) {
      const content = result.data.content
      for (let i = 0; i < content.length;i++) {
        const obj = content[i]
        postList.push({
          'id' : obj.id,
          'title' : obj.title,
          'time' : getTime(obj.createTime),
        })
      }
    }
  })
})
getPosts()
</script>
