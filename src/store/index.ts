import { defineStore } from "pinia";

type User = {
  name: string;
  age: number;
};

const user: User = {
  name: "飞机",
  age: 20,
};

const login = (): Promise<User> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        name: "火箭",
        age: 200,
      });
    }, 2000);
  });
};

export const useTestStore = defineStore("Test", {
  state: () => {
    return {
      user: <User>{},
      current: 0,
    };
  },

  // computed 修饰处理一些值
  getters: {
    getCur (): number {
      return this.current;
    },
  },

  // methods 可以做同步 异步操作   提交state
  actions: {
    setCurrent (num: number) {
      this.current = num;
    },

    async setUser () {
      const res = await login();
      this.user = res;
    },
  },
});
