import { h } from 'vue';
import {
    QrcodeOutlined,
} from '@ant-design/icons-vue';

const orderStatus = [
    {
        name:'待指派',
        color:'#FFC71C'
    },
    {
        name:'待上门',
        color:'#1E9FF2'
    },
    {
        name:'已完成',
        color:'#5AD8A6'
    },
    {
        name:'已取消',
        color:'#E86452'
    }
]

const orderSource = [
    {
        name:'回收订单'
    },
    {
        name:'京东订单'
    },
    {
        name:'企业订单'
    },
    {
        name:'小米订单'
    },
    {
        name:'京东订单'
    }
]

const tableColumns = [
    { title: '订单编号', dataIndex: 'order_no', width:'16%'},
    { title: '投单地址', dataIndex: 'address', width:'20%'},
    { title: '联系方式', dataIndex: 'phone', width:'16%'},
    { title: '指派回收员', dataIndex: ['store_member','name'] },
    { title: '订单来源', dataIndex: 'source',align:'center' ,
        customRender:(value, row)=>{
            return h('div', orderSource[value].name)
        }
    },
    { title: '状态', dataIndex: 'progress' , align:'center', 
        customRender:(value, row)=>{
            return h('div',{ style: { color: orderStatus[value].color } }, orderStatus[value].name)
        }
    },
    { title: '溯源码', dataIndex: 'id' , align:'center', 
        customRender(value, row){
            return h(QrcodeOutlined,{ style: { color: '#8EA6F1',fontSize:'1rem'} })
        }
    },
];

export const basicProps = {
    columns: {
        type: Array,
        default: () => tableColumns
    }
};