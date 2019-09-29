<template>
  <div class="business-wrap common-width">
    <headers :leftClick="_leftClick" showRight/>
    <div class="business-topbar-wrap">
      <router-link tag="span" to="/menu/business/add">新增指标</router-link>
      <router-link tag="span" to="/menu/business/home">家宽指标</router-link>
    </div>
    <div class="children-view-wrap">
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
        let { path, params } = this.$route;
        let routerArray = [
          '/menu/business/add/time',
          '/menu/business/add/street',
          '/menu/business/home/time',
          '/menu/business/home/street'
        ];
        if (routerArray.indexOf(path) > -1 || params.district) {
          this.$router.go(-1);
        } else {
          this.$router.push('/menu');
        }
      }
    }
  }
</script>

<style scoped lang="less">
  @import "../../Common/Less/index";
  
  .business-wrap {
    .business-topbar-wrap {
      display: flex;
      background: #4ca5f1;
      padding: 0 10px 1px 10px;
      
      span {
        flex: 1;
        line-height: 35px;
        text-align: center;
        border-bottom: 2px solid transparent;
        color: #666;
        font-size: @font-14;
        
        &.router-link-active {
          color: white;
          border-color: white;
        }
      }
    }
    .children-view-wrap {
      height: calc(100% - 83px);
      position: relative;
    }
  }
</style>
