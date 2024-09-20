import { ref, onMounted, onUnmounted } from 'vue';

export function useMouseHover(elementRef, { onEnter = null, onLeave = null } = {}) {
  const isHovered = ref(false);

  const handleMouseEnter = () => {
    isHovered.value = true;
    if (typeof onEnter === 'function') {
      onEnter(); // 调用外部传入的回调
    }
  };

  const handleMouseLeave = () => {
    isHovered.value = false;
    if (typeof onLeave === 'function') {
      onLeave(); // 调用外部传入的回调
    }
  };

  onMounted(() => {
    if (elementRef.value) {
      elementRef.value.addEventListener('mouseenter', handleMouseEnter);
      elementRef.value.addEventListener('mouseleave', handleMouseLeave);
    }
  });

  onUnmounted(() => {
    if (elementRef.value) {
      elementRef.value.removeEventListener('mouseenter', handleMouseEnter);
      elementRef.value.removeEventListener('mouseleave', handleMouseLeave);
    }
  });

  return {
    isHovered
  };
}
