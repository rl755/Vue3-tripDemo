<template>
    <div class="App">
        <!-- <input type="text" ref="inputRef"> -->
        <input type="text" ref="inputRef">
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

// 方式一：定义ref绑定到input中，调用focus
import useInput from './hooks/useInput'
const { inputRef } = useInput()

</script>

<style scoped>

</style>