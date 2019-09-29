<template>
  <div class="index-wrap common-width">
    <headers />
    <list />
    <transition name="slide">
      <router-view/>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
  import Headers from 'Element/Headers';
  import List from 'Element/List';

  export default {
    components: {
      Headers,
      List
    }
  }
</script>

<style scoped lang="less">
  .index-wrap {

  }
</style>
