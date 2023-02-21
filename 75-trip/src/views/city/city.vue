<template>
    <div class="city top-page">
        <!-- 1. 搜索框 -->
        <div class="top">
            <van-search 
            v-model="value" 
            placeholder="城市/区域/位置" 
            shape="round" 
            show-action 
            @cancel="cancelClick" />

            <!-- 2. tab标签页 -->
            <van-tabs v-model:active="tabActive" color="#ff9854" line-height="3">
                <template v-for="(value, key, index) in allCites" :key="key">
                    <van-tab :title="value.title" :name="key"></van-tab>
                </template>
            </van-tabs>
        </div>
        <div class="content">
            <!-- <city-group :group-data="currentGroup" /> -->
            <template v-for="(value, key, index) in allCites">
                <city-group-item v-show="tabActive === key" :group-data="value" />
            </template>
        </div>

    </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia';
import useCityStore from '@/stores/modules/city'

import CityGroupItem from './cpns/city-group-item.vue'

const router = useRouter()
const value = ref("")

const cancelClick = () => {
    router.back()
}

// tab标签页的切换
const tabActive = ref()

// 网络请求
// 从store中获取数据
const cityStore = useCityStore()
cityStore.getAllCitesData()
const { allCites } = storeToRefs(cityStore);

/* 获取选中标签后的数据
    1. 获取正确的key： 将tabs中绑定的tabActive正确绑定
    2. 根据key从allCites获取数据，默认直接获取的数据不是响应式的，所以必须包裹computed
*/
const currentGroup = computed(() => allCites.value[tabActive.value])
</script>

<style lang="less" scoped>
.city {

    .top {
        position: relative;
        z-index: 9;
    }

    // 布局滚动
    .content {
        height: calc(100vh - 98px);
        overflow-y: auto;
    }
}
</style>