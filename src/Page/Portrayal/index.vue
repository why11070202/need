<template>
  <div class="portrayal-wrap common-width">
    <headers :leftClick="_leftClick" showRight/>
    <div class="portrayal-nav-wrap">
      <router-link tag="span" to="/menu/portrayal/terminal">终端</router-link>
      <router-link tag="span" to="/menu/portrayal/combo">套餐&视频&产品渗透率</router-link>
    </div>
    <div class="portrayal-view-wrap">
      <transition name="slide">
        <router-view/>
      </transition>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import Headers from 'Element/Headers';
  
  export default {
    components: {
      Headers,
    },
    methods: {
      _leftClick() {
        this.$router.push('/menu');
      }
    }
  }
</script>

<style scoped lang="less">
  .portrayal-wrap {
    display: flex;
    flex-direction: column;
    
    .portrayal-nav-wrap {
      height: 55px;
      padding: 10px 5px;
      display: flex;
      
      span {
        flex: 1;
        line-height: 35px;
        text-align: center;
        color: #333;
        border-radius: 5px;
        background: #d4e3ee;
        margin-right: 5px;
        
        &.router-link-active {
          color: white;
          background: linear-gradient(#31c6ee, #299ce6);
        }
        
        &:last-child {
          margin-right: 0;
        }
      }
    }
    
    .portrayal-view-wrap {
      flex: 1;
      position: relative;
    }
  }
</style>
