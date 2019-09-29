<template>
  <div class="business-home-wrap common-width">
    <div class="top-bar-wrap">
      <span :class="{'active': topBarBool}" @click="_changeTab(true)">指标进度</span>
      <span :class="{'active': !topBarBool}" @click="_changeTab(false)">提升路径</span>
    </div>
    <div class="list-view-wrap">
      <indicator-plan v-if="topBarBool" />
      <improving-path v-else />
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import ImprovingPath from './ImprovingPath';
  import IndicatorPlan from './IndicatorPlan';
  
  export default {
    components: {
      ImprovingPath,
      IndicatorPlan
    },
    data() {
      return {
        topBarBool: true
      }
    },
    mounted() {
      const _self = this;
      if (localStorage.getItem('leaveTab')) {
        _self.topBarBool = localStorage.getItem('leaveTab') === '0';
      }
      let { role, branch, gridding } = JSON.parse(localStorage.getItem('role'));
      switch (role) {
        case 1:
      
          break;
        case 2:
          _self.$router.replace(`/menu/business/home/street/${branch}`);
          break;
        case 3:
          _self.$router.replace(`/menu/business/home/street/${branch}/person/${gridding}`);
          break;
      }
    },
    methods: {
      _changeTab (bol) {
        this.topBarBool = bol;
        localStorage.setItem('leaveTab', bol ? 0 : 1);
      }
    },
    destroyed() {
      localStorage.removeItem('leaveTab');
    }
  }
</script>

<style scoped lang="less">
  @import "../../../../Common/Less/index";
  .business-home-wrap {
    .top-bar-wrap {
      padding: 10px 20px;
      display: flex;
      span {
        flex: 1;
        line-height: 35px;
        text-align: center;
        border-radius: 5px;
        overflow: hidden;
        margin-right: 10px;
        font-size: 12px;
        background: #d4e3ee;
        color: #333333;
        &.active {
          background: linear-gradient(#31c6ee, #299ce6);
          color: white;
        }
        &:last-child {
          margin-right: 0;
        }
      }
    }
    .list-view-wrap {
      height: calc(100% - 55px);
      position: relative;
    }
  }
</style>
