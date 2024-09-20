<template>
    <div class="ScrolledList">
        <ScrolledList
        :columns="columns"
        :dataSource="listData"
        :scroll="{
            y:200,
            limit:params.limit
        }"
        />
    </div>
    
</template>
  
<script setup lang="js">
import { ref, nextTick } from 'vue';
import { pollingInterface } from '@/api/screenVisualization';
import { basicProps } from './props'
import ScrolledList from '../components/ScrolledList'
defineProps({
    ...basicProps
})
const params = {
    recycle_store_id: 0,
    limit:15
}

const listData = ref([]);
const getData = () =>{
    pollingInterface(
        {
            path:'recycle/order/list',
            params
        },
        10 * 60 * 1000,
        (res)=>{
            listData.value = res.data.map((item,index)=>{
                return{
                    ...item,
                    '1':index
                }
            })
        }
    )
}

getData()

</script>

<style lang="scss" scoped>
.ScrolledList{
    width: 100%;
}
</style>
