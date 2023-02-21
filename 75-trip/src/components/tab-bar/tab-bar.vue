<template>
    <div class="tab-bar">
        <van-tabbar 
        v-model="currentIndex" 
        active-color="#ff9854" 
        route
        @change="onChange"
        >
            <template v-for="(item,index) in tabbarData">
                <van-tabbar-item :to="item.path">
                    <span>{{ item.text }}</span>
                    <template #icon>
                        <img v-if="currentIndex !== index" :src="getAssetURL(item.image)" alt="">
                        <img v-else :src="getAssetURL(item.imageActive)" alt="">
                    </template>
                </van-tabbar-item>
            </template>
        </van-tabbar>
    </div>
</template>

<script setup>
import tabbarData from '@/assets/data/tabbar'
import { getAssetURL } from '@/utils/get_asset'
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router'

const route = useRoute()
const currentIndex = ref(0)
watch(route, (newRoute) => {
    const index = tabbarData.findIndex(item => item.path === newRoute.path)
    if (index === -1) return 
    currentIndex.value = index
})

</script>
 
<style lang="less" scoped>
.tab-bar {
    img{
        height: 25px;    
    }

}
</style>