<template>
  <Header/>
  <main class="animate__animated animate__fadeIn">
    <div class="container shadow">
      <article>
        <header class="article-header">
          <div class="thumb">
            <div>
              <n-skeleton v-if="skeleton" height="40px" width="60vh" :sharp="false"/>
              <h1 v-else>{{ ArticlesConfig.title }}</h1>
              <div class="post-meta">
                <n-skeleton v-if="skeleton" height="20px" width="40%" :sharp="false"/>
                <div v-else>
                  {{ ArticlesConfig.visits }}<time>{{ ArticlesConfig.time }}</time>
                </div>
                <div class="tags">
                </div>
              </div>
            </div>
          </div>
        </header>
      </article>
      <n-skeleton v-if="skeleton" height="40px" width="113vh" :sharp="false" style="margin: .8rem 0"/>
      <n-skeleton v-if="skeleton" height="40px" width="113vh" :sharp="false" style="margin: .8rem 0"/>
      <n-skeleton v-if="skeleton" height="40px" width="113vh" :sharp="false" style="margin: .8rem 0"/>
      <div v-else class="article-post" v-html="ArticlesConfig.content">
      </div>
    </div>
    <div class="container">
      <nav class="flex container suggested">
        <a rel="prev" href="#/home" title="Previous post (older)">
          <span>Previous</span>
        </a>
        <a rel="next" href="#/home" title="Next post (newer)">
          <span>Next</span>
        </a>
      </nav>
    </div>
    <div class="container">
      <div style="text-align: center" id="comments">
      </div>
    </div>
  </main>
  <Footer/>
</template>

<script>
import {ref,onMounted} from "vue";
import router from "../router";
import Header from "../layout/Header.vue";
import Footer from "../layout/Footer.vue";
import {get} from "../config/request";
import {exactTime} from "../config/utils";
import markdown from 'markdown'
import 'gitalk/dist/gitalk.css'
import Gitalk from 'gitalk'
import {NSkeleton} from "naive-ui";

export default {
  name: "Archives",
  props: ['id'],
  components: {Header,Footer,NSkeleton},
  setup(props) {
    const skeleton = ref(true)
    const ArticlesConfig = ref({})
    const commentOptions = new Gitalk({
      clientID: '31de3aba975fab6c41f1',
      clientSecret: 'b186b5c2dca2759a4f83051a34c7b485855ff0af',
      owner: 'Toklove',
      repo: 'Blog',
      admin:  'Toklove',
      id: props.id,      // Ensure uniqueness and length less than 50
      distractionFreeMode: true  // Facebook-like distraction free mode

    })
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
              skeleton.value = false
            } else {
              router.push({path: '/404'})
            }
          })
          .catch((err) => {
            console.log(err)
            router.push({path: '/404'})
          } )
    })
    onMounted(() => {
      getArticles()
      commentOptions.render('comments')
    })
    return {
      ArticlesConfig,skeleton
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
.gt-container .gt-avatar img {
  border-radius: 5px;
}
</style>
