<template>
  <div class="home" ref="homeRef">
    <home-nav-bar />
    <div class="banner">
      <img src="@/assets/img/home/banner.webp" alt="">
    </div>
    <home-search-box />
    <home-categories />
    <div class="search-bar" v-if="isShowSearchBar">
      <search-bar :start-date="9.26" :end-date="10.3" />
    </div>
    <home-content />

    <!-- <button @click="moreBtnClick">加载更多</button> -->
  </div>
</template>

<script setup>
import { ref, watch, computed, onActivated } from 'vue'
import useHomeStore from '@/stores/modules/home'
import HomeNavBar from './cpns/home-nav-bar.vue'
import HomeSearchBox from './cpns/home-search-box.vue'
import HomeCategories from './cpns/home-categories.vue'
import HomeContent from './cpns/home-content.vue'
import SearchBar from '@/components/search-bar/search-bar.vue'

import useScroll from '@/hooks/useScroll'

// 发送网络请求
const homeStore = useHomeStore()
homeStore.getHotSuggest()
homeStore.getCategories()
homeStore.getHouseListData()

// 监听window窗口的滚动
/* 
    1. 当离开页面时，需要移除监听
    2. 如果别的页面也进行类似的监听，会编写重复的代码
*/
const homeRef = ref()
const { isReachBottom, scrollTop } = useScroll(homeRef)
watch(isReachBottom, (newValue) => {
  if (newValue){
    homeStore.getHouseListData().then(() => {
      isReachBottom.value = false
    })
  }
})

// 搜索框显示
const isShowSearchBar = computed(() => {
  return scrollTop.value >= 300 
})

// 跳转回home时，保留原来的位置
onActivated(() => {
  homeRef.value?.scrollTo({
    top: scrollTop.value
  })
})

</script>

<style lang="less" scoped>
.home {
  padding-bottom: 60px;
  height: 100vh;
  overflow-y: auto;
  box-sizing: border-box;

  .banner {
    img {
      width: 100%;
    }
  }
}
.search-bar {
  position: fixed;
  z-index: 9;
  top: 0;
  left: 0;
  right: 0;
  padding: 16px 16px 10px;
  background-color: #fff;
}
</style>
