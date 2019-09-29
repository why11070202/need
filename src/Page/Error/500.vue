<template>
  <div class="error-wrap common-width">
    <headers :leftClick="_leftClick"/>
    <div class="error-text">
      参数异常，请返回重新尝试！
    </div>
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
  .error-wrap {
    .error-text {
      text-align: center;
      line-height: 32px;
      font-size: 14px;
    }
  }
</style>
