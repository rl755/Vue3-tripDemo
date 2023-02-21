import { getCityAll } from "@/service";
import { defineStore } from "pinia";

const useCityStore = defineStore("city", {
    state: () => ({
        allCites: {},
        
        // 存储当前城市对象
        currentCity: { cityName: '广州' }
    }),
    actions: {
        async getAllCitesData() {
            const res = await getCityAll()
            this.allCites = res.data
        }
    }
})

export default useCityStore