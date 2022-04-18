
import { defineStore } from "pinia";

export const useTestStore = defineStore('Test', {
  state: () => {
    return {
      current: '111'

    }
  },

  // computed 修饰处理一些值
  getters: {},

  // methods 可以做同步 异步操作   提交state
  actions: {}
});
