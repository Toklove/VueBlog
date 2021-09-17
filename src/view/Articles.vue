<template>
  <Header/>
  <main class="animate__animated animate__fadeIn">
    <div class="container shadow">
      <article>
        <header class="article-header">
          <div class="thumb">
            <div>
              <h1>{{ ArticlesConfig.title }}</h1>
              <div class="post-meta">
                <div>
                  {{ ArticlesConfig.visits }}<time>{{ ArticlesConfig.time }}</time>
                </div>
                <div class="tags">
                </div>
              </div>
            </div>
          </div>
        </header>
      </article>
      <div class="article-post" v-html="ArticlesConfig.content">
      </div>
    </div>
    <div class="container">
      <nav class="flex container suggested">
        <a rel="prev" href="#" title="Previous post (older)">
          <span>Previous</span>
        </a>
        <a rel="next" href="#" title="Next post (newer)">
          <span>Next</span>
        </a>
      </nav>
    </div>
    <div class="container">
      <div class="disqus-container">
        <div id="disqus_thread">
        </div>
        评论模块(在开发中啦)
      </div>
    </div>
  </main>
  <Footer/>
</template>

<script>
import {ref} from "vue";
import router from "../router";
import Header from "../layout/Header.vue";
import Footer from "../layout/Footer.vue";
import {get} from "../config/request";
import {exactTime} from "../config/utils";
import markdown from 'markdown'

export default {
  name: "Archives",
  props: ['id'],
  components: {Header,Footer},
  setup(props) {
    const ArticlesConfig = ref({})
    const getArticles = (async () => {
      await get('/content/posts/' + `${props.id}`)
          .then((result) => {
            if (result.status === 200) {
              const data = result.data
              ArticlesConfig.value = {
                'title': data.title,
                'time' : exactTime(data.createTime),
                'visits' : `Visits : ${data.visits} | `,
                'content' : markdown.markdown.toHTML(result.data.originalContent),
              }
            } else {
              router.push({path: '/404'})
            }
          })
          .catch((err) => {
            console.log(err)
            router.push({path: '/404'})
          } )
    })
    getArticles()
    return {
      ArticlesConfig
    }
  }
}
</script>

<style lang="scss">
@media screen and (min-width: 1000px) {
  .shadow {
    border-radius: 10px;
    padding-bottom: 1rem;
    margin-bottom: 2rem;
    box-shadow: 0 1px 2px -2px rgba(0, 0, 0, 0.08), 0 3px 6px 0 rgba(0, 0, 0, 0.06), 0 5px 12px 4px rgba(0, 0, 0, 0.04);
  }
}
</style>
