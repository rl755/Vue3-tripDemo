// vite中 加载动态资源
export const getAssetURL = (image) => {
    // 参数一：本地资源的相对路径进行拼接
    return new URL(`../assets/img/${image}`, import.meta.url).href
}