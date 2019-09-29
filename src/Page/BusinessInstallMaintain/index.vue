<template>
  <div class="business-install-maintain-wrap common-width">
    <headers :leftClick="_leftClick" showRight/>
    <div class="nav-router-btn-wrap">
      <router-link tag="span" to="/menu/business-install-maintain/search">营装维进度</router-link>
<!--      <router-link tag="span" to="/menu/business-install-maintain/business"></router-link>-->
      <router-link tag="span" to="/menu/business-install-maintain/report-form-statistics">报表统计</router-link>
    </div>
    <div class="business-install-maintain-view">
      <transition name="slide">
        <router-view/>
      </transition>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import Headers from "Element/Headers";
  
  export default {
    components: {
      Headers
    },
    methods: {
      _leftClick() {
        let { id, address, customerType, workOrderStatus } = this.$route.params;
        if (id || address || customerType || workOrderStatus) {
          this.$router.go(-1);
        } else {
          this.$router.push('/menu');
        }
      }
    }
  }
</script>

<style scoped lang="less">
  .business-install-maintain-wrap {
    display: flex;
    flex-direction: column;
    
    .nav-router-btn-wrap {
      margin: 10px 0;
      display: flex;
      padding: 0 5px;
      
      span {
        flex: 1;
        margin-right: 5px;
        line-height: 35px;
        text-align: center;
        border-radius: 5px;
        font-size: 12px;
        color: #666;
        background: #d4e3ee;
        
        &.router-link-active {
          background: linear-gradient(#31c6ee, #299ce6);
          color: white;
        }
        
        &:last-child {
          margin-right: 0;
        }
      }
    }
    
    .business-install-maintain-view {
      flex: 1;
      position: relative;
    }
  }
</style>
