export class AnimationLoop {
    constructor(callBack) {
      this.isPaused = true;
      this.animationFrameId = null;
      this.callBack = callBack
    }
  
    // 启动循环
    start() {
      if (this.isPaused) {
        this.isPaused = false;
        this.loop();
      }
    }
  
    // 暂停循环
    pause() {
      if (!this.isPaused) {
        this.isPaused = true;
      }
    }
  
    // 内部的循环逻辑
    loop() {
      if (!this.isPaused) {
        this.animationFrameId = requestAnimationFrame(() => {
          // 每一帧执行的代码
          this.callBack()
  
          // 继续下一帧执行
          this.loop();
        });
      }
    }

    clear(){
        cancelAnimationFrame(this.animationFrameId);
    }
  }

  export function handleScroll(animation, el, config, cacheListData, showList) {
    const elRef = unref(el);
    
    // 累加滚动的浮点数值
    animation.accumulatedScroll += config.speed;
  
    // 当累加值大于等于1时，滚动
    if (animation.accumulatedScroll >= 1) {
      elRef.scrollTop += Math.floor(animation.accumulatedScroll); // 只增加整数部分
      animation.accumulatedScroll = animation.accumulatedScroll % 1; // 保留小数部分
    }
  
    console.log("滚动", elRef.scrollTop, config);
  
    // 如果滚动达到最大高度，执行相应逻辑
    if (elRef.scrollTop >= config.scroolMaxHeight - 1) {
      moveFirstToLast(cacheListData.value, showList.value);
      elRef.scrollTop -= config.childrenHeight;
    }
  }
  