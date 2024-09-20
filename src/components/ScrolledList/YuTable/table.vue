<template>
    <div class="custom-table" >
        <div class="table-container" ref="rollRef" :style="{ height: scrollHeight, width: scrollWidth }">
            <table class="table">
                <thead class="table-head">
                    <tr>
                        <th
                            v-for="(column, index) in columns"
                            :key="index"
                            :style="{ width: column.width || 'auto' }"
                            :class="column?.class"
                        >   
                            <div :style="cellStyle(column)">
                                {{ column.title }}
                            </div>
                        </th>
                    </tr>
                </thead>
                <tbody class="table-body" ref="entireListRef">
                    <tr v-for="row in showList" :key="row[forKey]">
                        <td v-for="(column, colIndex) in columns" :key="colIndex" :class="column.cellClass">
                            <TableCell
                            :column="column"
                            :row="row"
                            ></TableCell>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
  
<script setup>
import { onMounted,computed,ref } from 'vue'
import { basicProps } from './props'
import { useSeamlessScrolling } from './utils/useSeamlessScrolling'
import { cellStyle } from './utils'
import { useMouseHover } from './utils/useMouseHover';
import TableCell from './cell.vue'
    const props = defineProps({
        ...basicProps
    }); 

    const scrollHeight = computed(() => props.scroll.y ? `${props.scroll.y}px` : 'auto');
    const scrollWidth = computed(() => props.scroll.x ? `${props.scroll.x}px` : 'auto');

    const rollRef = ref()
    const entireListRef = ref()
    const { showList, animation } = useSeamlessScrolling(rollRef,entireListRef,props)

    useMouseHover(rollRef, {
        onEnter: ()=>animation.pause(),
        onLeave: ()=>animation.start()
    });
    
    
   
    onMounted(()=>{
        
    })
</script>
  
<style scoped lang="scss">
@import './index.scss';
</style>
  
  