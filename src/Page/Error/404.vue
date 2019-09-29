<template>
  <div class="not-find-wrap common-width">
    <headers />
    404
  </div>
</template>

<script type="text/ecmascript-6">
  import Headers from 'Element/Headers';
  export default {
    components: {
      Headers
    },
    data() {
      return {
        
      }
    },
    mounted() {
      
    },
    methods: {
      _leftClick() {
        window.parent.postMessage({
          msg: 'close'
        }, '*');
      }
    }
  }
</script>

<style scoped lang="less">

</style>
