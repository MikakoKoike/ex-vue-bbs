import Vue from "vue";
import Vuex from "vuex";
import { Article } from "@/types/article";
import { Comment } from "@/types/comment";

Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,
  actions: {},

  state: {
    articles: [
      new Article(3, "佐藤", "佐藤さんの記事", []),
      new Article(2, "山田", "山田さんの記事", [
        new Comment(13, "山崎", "山崎さんのコメント", 2),
      ]),
      new Article(1, "伊藤", "伊藤さんの記事", [
        new Comment(12, "鈴木", "鈴木さんのコメント", 1),
        new Comment(11, "吉田", "吉田さんのコメント", 1),
      ]),
    ],
  }, //end state
  mutations: {
    /**
     * 記事を追加する.
     */
    addArticle(state, payload) {
      state.articles.unshift(payload.article);
    },
    /**
     * コメントを追加する.
     */
    addComment(state, payload) {
      //articleIdと同じ番号を持っている記事idを探す
      const newArray = state.articles.filter(
        (article) => article.id === payload.comment.articleId
      );
      //newArrayから一件のみ取り出す
      const newArticle = newArray[0];
      newArticle.commentList.unshift(payload.comment);
    },
    /**
     *  記事を削除する.
     */
    deleteArticle(state, payload) {
      state.articles.splice(payload.articleIndex, 1);
    },
  },
  getters: {
    /**
     * 記事の一覧を返す.
     *
     * @returns 記事一覧
     */
    getArticles(state) {
      return state.articles;
    },
  },

  modules: {},
});
