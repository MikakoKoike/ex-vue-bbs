<template>
  <div class="bbs">
    <span>投稿者名：</span>
    <input type="text" v-model="articleName" /><br />
    <span>投稿内容：</span>
    <textarea id="" cols="30" rows="10" v-model="articleContent"></textarea
    ><br />
    <button type="button" v-on:click="addArticle">記事投稿</button>
    <hr />
    <div v-for="(article, index) of currentArticleList" v-bind:key="article.id">
      <div>投稿者名： {{ article.name }}</div>
      <div>投稿内容：</div>
      {{ article.content }}<br />
      <button type="button" v-on:click="deleteArticle(index)">記事削除</button>

      <div v-for="comment of article.commentList" v-bind:key="comment.id">
        <div>コメント者名：{{ comment.name }}</div>
        <div>コメント内容：{{ comment.content }}</div>
      </div>
      <div>名前：</div>
      <input type="text" v-model="commentName" />
      <div>コメント：</div>
      <textarea id="" cols="30" rows="10" v-model="commentContent"></textarea
      ><br />
      <button type="button" v-on:click="addComment(article.id)">
        コメント投稿
      </button>
      <hr />
    </div>
  </div>
</template>

<script lang="ts">
import { Article } from "@/types/article";
import { Comment } from "@/types/comment";

import { Component, Vue } from "vue-property-decorator";
@Component
export default class Bbs extends Vue {
  currentArticleList = new Array<Article>(); //現在の記事一覧

  articleName = ""; //投稿者名

  articleContent = ""; //投稿内容

  /**
   * 記事一覧を表示する.
   */
  created(): void {
    this.currentArticleList = this.$store.getters.getArticles;
  }
  /**
   * 記事を追加する.
   */
  addArticle(): void {
    //最新記事IDに1プラスして記事IDを作成する（記事が一つもなければ0をセットする）
    let articleList = this.$store.getters.getArticles;
    //投稿されている記事のうち最新の記事を取得する
    let article = articleList[0];
    //最新の記事のIDを取得する
    let currentId = article.id;
    let newestId = currentId + 1;

    this.$store.commit("addArticle", {
      //payloadで渡すもの
      article: new Article(newestId, this.articleName, this.articleContent, []),
    });
    //入力値をフォームからクリアする
    this.articleName = "";
    this.articleContent = "";
  }
  /**
   * コメントを追加する.
   */
  private commentName = ""; //コメント者名
  private commentContent = ""; //コメント内容

  addComment(articleId: number): void {
    this.$store.commit("addComment", {
      //payloadで渡すもの
      comment: new Comment(
        -1,
        this.commentName,
        this.commentContent,
        articleId
      ),
    });
    //入力値をフォームからクリアする
    this.commentName = "";
    this.commentContent = "";
  }
  /**
   * 記事を削除する.
   */
  deleteArticle(articleIndex: number): void {
    this.$store.commit("deleteArticle", {
      articleIndex, //payloadで渡すもの
    });
  }
}
</script>

<style scoped>
.bbs {
  text-align: left;
}
</style>
