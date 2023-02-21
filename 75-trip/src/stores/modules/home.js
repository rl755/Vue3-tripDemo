import { getHomeHotSuggest, getHomeCategories, getHouseList } from "@/service";
import { defineStore } from "pinia";

const useHomeStore = defineStore('home', {
    state: () => ({
        hotSuggest: [],
        categories: [],
        currentPage: 1,
        houseList: []
    }),
    actions: {
        async getHotSuggest() {
           const res = await getHomeHotSuggest()
           this.hotSuggest = res.data || []
        },
        async getCategories() {
            const res = await getHomeCategories()
            this.categories = res.data || []
        },
        async getHouseListData() {
            const res = await getHouseList(this.currentPage)
            this.houseList.push(...res.data)
            this.currentPage++
        }
    }
})

export default useHomeStore