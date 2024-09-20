<template>
    <div :style="cellStyle(column)">
        <template v-if="isVNode(cachedCell)">
            <component :is="cachedCell"></component>
        </template>
        <template v-else>
            <div class="ellipsis">{{ cachedCell || '-' }}</div>  
        </template>
    </div>
</template>

<script setup>
import { computed } from 'vue';
import { cellStyle } from './utils';

const props = defineProps({
    row: Object,
    column: Object
});

// 判断是否是VNode
const isVNode = (obj) => {
    return obj && obj.__v_isVNode === true;
};

// 渲染单元格内容
const renderCell = (row, column) => {
    const getDataFromIndex = (dataIndex, rowData) => {
        if (Array.isArray(dataIndex)) {
            return dataIndex.reduce((acc, key) => (acc ? acc[key] : undefined), rowData);
        }
        return rowData[dataIndex];
    };
    
    const value = getDataFromIndex(column.dataIndex, row);
    
    if (column.customRender) {
        return column.customRender(value, row);
    }

    return value;
};

// 缓存单元格内容
const cachedCell = computed(() => renderCell(props.row, props.column));

</script>

<style lang="scss" scoped>
.ellipsis {
    width: fit-content;
    text-align: center;
    display: inline-block; 
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
</style>
