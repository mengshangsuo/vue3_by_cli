<template>
  <div class="about">
    <h1>This is an about page</h1>
    <el-button class="le-btn">Default</el-button>
    <div>Pinia current:{{ current }}</div>
    <div>具有响应式:{{ testStore.current }}</div>

    <div>user: {{ user.name }}-- {{ user.age }}</div>

    <div>testStore.getCur: {{ testStore.getCur }}</div>
    <button type="button" @click="clickFn">change</button>
  </div>
</template>

<style scoped lang="scss">
// 样式穿透
::v-deep {
  // 	.le-btn {
  // 		background-color: red;
  // 	}
}
</style>

<script setup lang="ts">
import { useTestStore } from "@/store";
import { storeToRefs } from "pinia";

// reactive  怎么实现的   Proxy  Reflect
// 跨组件传值  eventBus实现原理
// emit  on

const testStore = useTestStore();

// 结构数据布局与响应式
const { current, user } = storeToRefs(testStore);

const clickFn = () => {
  // 改变state

  //  testStore.current++;

  // testStore.$patch({ current: 22 });

  // testStore.$patch((state) => {
  // 	state.current++;
  // });

  testStore.setCurrent(2222);
  testStore.setUser();
};
</script>
