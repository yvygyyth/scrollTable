import { ref } from 'vue';

export const useCacheList = (props) => {
    const cacheListData = ref([]);

    function moveFirstToLast(arr) {
        let firstElement = {};
        
        if (cacheListData.value && cacheListData.value.length > 0) {
        // 使用 filter 来获取第一个元素，并生成新数组
            firstElement = cacheListData.value[0]; // 获取第一个元素
            cacheListData.value = cacheListData.value.filter((_, index) => index !== 0); // 过滤掉第一个元素
        } else if (props.dataSource.length > 0) {
            cacheListData.value = [...props.dataSource]; // 如果 cacheListData 为空，赋值为 props 中的 dataSource
            firstElement = cacheListData.value[0]; // 获取第一个元素
            cacheListData.value = cacheListData.value.filter((_, index) => index !== 0); // 过滤掉第一个元素
        } else {
            console.warn("Both cacheListData and dataSource are empty.");
            return;
        }

        // 对目标数组 arr 做类似的操作
        arr.value = arr.value.filter((_, index) => index !== 0); // 移除目标数组的第一个元素
        arr.value.push(firstElement); // 将第一个元素添加到目标数组的末尾
    }

    return {
        cacheListData,
        moveFirstToLast,
    };
};
