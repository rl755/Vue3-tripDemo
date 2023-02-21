<template>
    <div class="search-box">
        <!-- 位置信息 -->
        <div class="location bottom-gray-line">
            <div class="city" @click="cityClick">{{ currentCity.cityName }}</div>
            <div class="position" @click="positionClick">
                <span class="text">我的位置</span>
                <img src="@/assets/img/home/icon_location.png" alt="">
            </div>
        </div>

        <!-- 日期范围 -->
        <div class="section date-range bottom-gray-line" @click="showCalender=true">
            <div class="start">
                <div class="date">
                    <span class="tip">入住</span>
                    <span class="time">{{ startDateStr }}</span>
                </div>
            </div>
            <div class="stay">共{{ stayCount }}天</div>
            <div class="end">
                <div class="date">
                    <span class="tip">离店</span>
                    <span class="time">{{ endDateStr }}</span>
                </div>
            </div>
        </div>
        <!-- 日历 -->
        <van-calendar
            type="range"
            :round="false"
            v-model:show="showCalender"
            @confirm="onConfirm"
            :show-confirm="false"
        />
        <div class="section price-counter bottom-gray-line">
            <div class="start">价格不限</div>
            <div class="end">人数不限</div>
        </div>
        <div class="section keyword">关键字/位置/民宿名</div>
        <!-- 热门建议 -->
        <div class="section hot-suggest">
            <template v-for="(item, index) in hotSuggest" :key="index">
                <div 
                class="item"
                :style="{ color: item.tagText.color, background: item.tagText.background.color}"
                >
                {{ item.tagText.text }}
            </div>
            </template>
        </div>
        <!-- 搜索功能 -->
        <div class="section search-btn">
            <div class="btn" @click="searchBtnClick">开始搜索</div>
        </div>
    </div>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router'
import { ref, computed } from 'vue'
import useCityStore from '@/stores/modules/city';
import useHomeStore from '@/stores/modules/home'
import { formatMonday, getDiffDays } from '@/utils/format_date'
import useMainStore from '@/stores/modules/main';

const router = useRouter()

// 位置 / 城市
const cityClick = () => {
    router.push('/city')
}

const positionClick = () => {
    navigator.geolocation.getCurrentPosition(res => {
        console.log("获取位置成功:,", res);
    }, err => {
        console.log("获取位置失败:", err);
    },
    )
}

// 获取当前城市
const cityStore = useCityStore()
const { currentCity } = storeToRefs(cityStore)

// 日期范围的处理
/* const nowDate = new Date()
const newDate = new Date()
newDate.setDate(nowDate.getDate() + 1) */
const mainStore = useMainStore()
const { startDate, endDate } = storeToRefs(mainStore)

const startDateStr = computed(() => formatMonday(startDate.value))
const endDateStr = computed(() => formatMonday(endDate.value))

const stayCount = ref(getDiffDays(startDate.value, endDate.value))
// 日历组件
const showCalender = ref(false)
const onConfirm = (value) => {
    // 设置日期
    const selectStartDate = value[0]
    const selectEndDate = value[1]
    mainStore.startDate = selectStartDate
    mainStore.endDate = selectEndDate
    stayCount.value = getDiffDays(selectStartDate, selectEndDate)
    // 隐藏日历
    showCalender.value = false
}

// 热门建议
const homeStore = useHomeStore()
const { hotSuggest } = storeToRefs(homeStore)

// 开始搜索
const searchBtnClick = () => {
    router.push({
        path: '/search',
        query: {
            startDate: startDate.value,
            endDate: endDate.value,
            currentCity: currentCity.value.cityName
        }
    })
}


</script>

<style lang="less" scoped>
.search-box {
    --van-calendar-popup-height: 100% !important;
}

.location {
    display: flex;
    align-items: center;
    height: 44px;
    padding: 0 20px;

    .city {
        flex: 1;
        color: #333;
        font-size: 15px;
    }

    .position {
        width: 74px;
        display: flex;
        align-items: center;

        .text {
            position: relative;
            top: 2px;
            color: #666;
            font-size: 12px;
        }

        img {
            margin-left: 5px;
            width: 15px;
            height: 15px;
        }
    }
}

.section {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    padding: 0 20px;
    color: #999;
    height: 44px;

    .start {
        flex: 1;
        display: flex;
        height: 44px;
        align-items: center;
    }

    .end {
        min-width: 30%;
        padding-left: 20px;
    }

    .date {
        display: flex;
        flex-direction: column;
    }

    .tip {
        font-size: 12px;
        color: #999;
    }

    .time {
        margin-top: 3px;
        color: #333;
        font-size: 15px;
        font-weight: 500;
    }
}
.date-range {
    height: 44px;
    .stay {
        flex: 1;
        text-align: center;
        font-size: 12px;
        color: #666;
    }
}
.price-counter {
  .start {
    border-right: 1px solid #f8f7f6;
  }
}

.hot-suggest {
  margin: 10px 0;
  height: auto;
  .item {
    padding: 4px 8px;
    margin: 4px;
    border-radius: 14px;
    font-size: 12px;
    line-height: 1;
  }
}
.hot-suggest {
    margin: 10px 0;
    .item {
        padding: 4px 8px;
        margin: 4px;
        border-radius: 14px;
        font-size: 12px;
        line-height: 1;
    }
}

.search-btn {
  .btn {
    width: 342px;
    height: 38px;
    max-height: 50px;
    font-weight: 500;
    font-size: 18px;
    line-height: 38px;
    text-align: center;
    border-radius: 20px;
    color: #fff;
    background-image: var(--theme-linear-gradient);
  }
}
</style>