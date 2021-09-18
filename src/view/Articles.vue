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
      <n-skeleton v-if="skeleton" height="40px" width="90%" :sharp="false" style="margin: .8rem 0"/>
      <n-skeleton v-if="skeleton" height="40px" width="90%" :sharp="false" style="margin: .8rem 0"/>
      <n-skeleton v-if="skeleton" height="40px" width="90%" :sharp="false" style="margin: .8rem 0"/>
      <div v-else class="article-post" v-html="ArticlesConfig.content">
      </div>
    </div>
    <div class="container">
      <div id="comments">
      </div>
    </div>
  </main>
  <Footer/>
</template>

<script>
import {ref, onMounted} from "vue";
import router from "../router";
import Header from "../layout/Header.vue";
import Footer from "../layout/Footer.vue";
import {get} from "../config/request";
import {exactTime} from "../config/utils";
import marked from 'marked'
import 'gitalk/dist/gitalk.css'
import Gitalk from 'gitalk'
import {NSkeleton} from "naive-ui";
import hljs from "highlight.js";
import 'highlight.js/styles/nord.css'

export default {
  name: "Archives",
  props: ['id'],
  components: {Header,Footer,NSkeleton},

  setup(props) {
    let rendererMD = new marked.Renderer();
    marked.setOptions({
      renderer: rendererMD,
      highlight: function (code) {
        return hljs.highlightAuto(code).value;
      },
      gfm: true, //默认为true。 允许 Git Hub标准的markdown.
      tables: true, //默认为true。 允许支持表格语法。该选项要求 gfm 为true。
      breaks: true, //默认为false。 允许回车换行。该选项要求 gfm 为true。
      pedantic: false, //默认为false。 尽可能地兼容 markdown.pl的晦涩部分。不纠正原始模型任何的不良行为和错误。
      sanitize: true, //对输出进行过滤（清理）
      smartLists: true,
      smartypants: true, //使用更为时髦的标点，比如在引用语法中加入破折号。
      langPrefix:"hljs language-"
    });
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
                'content' : marked(result.data.originalContent),
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
pre {
  border-radius: 5px;
}
</style>
