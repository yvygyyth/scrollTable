import { onMounted, onUnmounted , unref, ref, watch, nextTick } from 'vue';
import { useCacheList } from './useCacheList'
import { AnimationLoop } from './AnimationLoop'
export const useSeamlessScrolling = (el,entireListRef,props) => {
    const config = {
        speed:0.3,
        visibleHeight:0,
        childrenHeight:0,
        listHeight:0,
        get scroolMaxHeight() {
            return this.listHeight - this.visibleHeight
        },
        get excessiveHeight() {
            return this.visibleHeight % this.childrenHeight
        }
    }

    const { cacheListData, moveFirstToLast } = useCacheList(props)
    const showList = ref([])

    const animationCallBack = () =>{
        let accumulatedScroll = 0;
        return function(){
            if(config.visibleHeight > 0){
                accumulatedScroll += config.speed;
                // 当累加值大于等于1时，滚动
                if (accumulatedScroll >= 1) {
                    unref(el).scrollTop += Math.floor(accumulatedScroll);
                    accumulatedScroll = accumulatedScroll % 1;
                }
                // console.log('滚动高度',unref(el).scrollTop)
                if (unref(el).scrollTop >= config.scroolMaxHeight - 1) {
                    moveFirstToLast(showList);
                    // unref(el).scrollTop -= config.childrenHeight;
                    console.log('cacheListData',unref(cacheListData),'\nshowList',unref(showList))
                }
            }
            
        };
    }

    const animation = new AnimationLoop(animationCallBack());    

    watch(
        ()=>props.dataSource,
        (newValue)=>{
            showList.value = newValue.slice(0, 10)
        },
        {
            once:true
        }
    )

    watch(
        ()=>props.dataSource,
        (newValue)=>{
            setTimeout(()=>{
                const elRef = unref(el);
                const listRef = unref(entireListRef);
                const tableRef = elRef.firstElementChild
                const firstChildHeight = listRef.children[0].offsetHeight;
                // const previousSiblingHeight = listRef.previousElementSibling.offsetHeight;

                config.visibleHeight = elRef.offsetHeight;
                // config.listHeight = listRef.offsetHeight + previousSiblingHeight;
                config.listHeight = tableRef.offsetHeight;
                config.childrenHeight = firstChildHeight;
                console.log('config',config)
                cacheListData.value = [...newValue]
            },0)   
        }
    )

    onMounted(() => {
        animation.start();
    });

    onUnmounted(()=>{
        animation.clear();
    })
    return {
        showList,
        animation
    };
};
