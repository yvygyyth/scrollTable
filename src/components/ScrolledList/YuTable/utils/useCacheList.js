import { ref } from 'vue';

export const useCacheList = (props) => {
    const cacheListData = ref([]);

    function moveFirstToLast(arr) {
        let firstElement = {};
        
        if (cacheListData.value && cacheListData.value.length > 0) {
            firstElement = cacheListData.value[0]; // 获取数组并移除第一个元素
            cacheListData.value = cacheListData.value.filter((_, index) => index !== 0);
        } else if (props.dataSource.length > 0) {
            cacheListData.value = [...props.dataSource]; // 如果 cacheListData 为空，赋值为 props 中的 dataSource
            firstElement = cacheListData.value[0];
            cacheListData.value = cacheListData.value.filter((_, index) => index !== 0); // 移除 dataSource 的第一个元素
        } else {
            console.warn("Both cacheListData and dataSource are empty.");
            return;
        }

        arr.value = arr.value.filter((_, index) => index !== 0);  // 同样操作目标数组
        arr.value.push(firstElement); // 将第一个元素添加到目标数组的末尾
    }

    return {
        cacheListData,
        moveFirstToLast,
    };
};
