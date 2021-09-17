<template>
  <Header/>
  <main>
    <header>
      <div class="container">
        <h1>Articles</h1>
        <p class="subtitle">Posts, tutorials, snippets, musings, and everything else.</p>
      </div>
    </header>
    <section>
      <div class="container">
        <input id="search-query" type="search" placeholder="Search for anything...">
        <div id="search-results">
        </div>
        <section id="articles-list">
          <section>
            <h2>All Articles</h2>
            <div class="projects">
              <div class="project">
                <div>
                  <a href="#" target="_blank">
                    <div class="icon">📝</div>
                    <h3>Theme Demo</h3>
                  </a>
                  <div class="description">Make a blog with theme!</div>
                </div>
                <div class="flex">
                  <a href="#" class="button" target="_blank">Source</a>
                </div>
              </div>
            </div>
          </section>
        </section>
      </div>
    </section>
  </main>
  <Footer/>
</template>

<script setup>
import Header from "../layout/Header.vue";
import Footer from "../layout/Footer.vue";
</script>
