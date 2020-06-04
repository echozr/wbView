<template>
  <transition name="side">
    <div class="allContainer">
      123
    </div>
  </transition>
</template>
<script>
export default {
  name: 'blogInfo'
}
</script>

<style lang="less" scoped>
.allContainer {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #ffffff;
  z-index: 1;
  }
</style>
