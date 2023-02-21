import dayjs from "dayjs";

export function formatMonday(date, formatStr = "MM月DD日") {
    return dayjs(date).format(formatStr)  
}

// 计算时间差
export function getDiffDays(startDate, endDate) {
    return dayjs(endDate).diff(startDate, "day")
}