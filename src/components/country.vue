<template>
    <template>
        <div :id="'flag' + timeId" style="width: 20px; height: 16px;"></div>
    </template>
</template>

<script setup>

import { nextTick, onMounted, ref, watch } from 'vue';
const props = defineProps({
    code: {
        type: String,
        default: '',
    }
})

const timeId = ref(Math.floor(new Date().getTime() * Math.random())); // 使该图表保持唯一id
const countryCode = ref(props.code); // 国家编码
function generateFlagIcon(code) {
    const flagContainer = document.getElementById(`flag${timeId.value}`);
    if (!flagContainer) return
    flagContainer.classList.add('fi');
    flagContainer.classList.add(`fi-${code.toLowerCase()}`);
}

watch(() => props.code, (val) => {
    // console.log('国家编号', val);

    countryCode.value = val
    nextTick(() => {
        // 调用函数生成国旗图标
        generateFlagIcon(countryCode.value);
    })
})
onMounted(() => {
    nextTick(() => {
        // 调用函数生成国旗图标
        generateFlagIcon(countryCode.value);
    })
})
</script>

<style lang="less" scoped></style>