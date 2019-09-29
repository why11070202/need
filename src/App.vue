<template>
  <div id="app">
    <keep-alive>
      <router-view/>
    </keep-alive>
  </div>
</template>

<style lang="less">
  @import "./Common/Less/style";
  
  #app {
    font: 400 12px 'Avenir', Helvetica, Arial, sans-serif;
    width: 100%;
    height: 100%;
    position: relative;
    
    .van-search {
      background: #f2f3f7 !important;
      
      .van-search__label {
        color: @not-data-color;
        font-size: @font-12;
      }
      
      .van-search__content {
        background: #fff;
      }
    }
    
    .slide-enter-active, .slide-leave-active {
      transition: all .3s;
      z-index: 99;
    }
    
    .slide-enter, .slide-leave-to {
      opacity: 0;
      transform: translate3d(100%, 0, 0);
      z-index: -1;
    }
  
    .amap-logo, .amap-copyright {
      display: none !important;
    }
  
    .activeStatus {
      color: red;
      font-weight: bold;
    }
    
  }
</style>
