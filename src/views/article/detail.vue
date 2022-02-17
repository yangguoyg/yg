<template>
  <div class="detail">
    <h1>{{article.title}}</h1>
    <p>作者：{{article.author}}</p>
    <p>{{article.introduce}}</p>
    <div v-html="article.content"></div>
  </div>
</template>

<script>
import { selectOneArticle } from "@/api/http";
export default {
  data() {
    return {
      article: {},
    };
  },
  components: {},
  created() {
    this.getData();
  },
  computed: {},
  methods: {
    async getData() {
      //获取当前文章的id
      let { articleId } = this.$route.query;
      let res = await selectOneArticle(articleId);
      if (res.data.code === 0) {
        this.article = res.data.list[0];
      }
    },
  },
};
</script>

<style lang="scss" scoped>
</style>