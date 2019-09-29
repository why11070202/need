<template>
  <div class="v-header-wrap">
    <div class="left" v-if="showLeft" @click="_back">
      <span>返回</span>
    </div>
    <!--<div :class="_setTitleClass" v-text="$store.state.title"></div>-->
    <div :class="_setTitleClass">大数据智慧专区</div>
    <div class="right" v-if="showRight" @click="_rightClick">
      <i></i>
      <p>首页</p>
    </div>
    <div class="right-other" v-if="refreshPage" @click="_refreshPage">
      <p>刷新</p>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import { getUrlParam } from 'Common/Js';
  
  export default {
    props: {
      showLeft: {
        type: Boolean,
        default: true
      },
      leftClick: {
        type: Function
      },
      showRight: {
        type: Boolean,
        default: false
      },
      refreshPage: {
        type: Boolean,
        default: false
      }
    },
    computed: {
      _setTitleClass() {
        let str = 'title';
        if (this.showLeft && !this.showRight) {
          str = 'title hide-right'
        } else if (!this.showLeft && this.showRight) {
          str = 'title hide-left'
        }
        return str;
      }
    },
    methods: {
      _back() {
        if (this.leftClick) {
          this.leftClick();
        } else {
          this.$router.go(-1);
        }
      },
      _rightClick() {
        this.$router.push('/');
      },
      _refreshPage () {
        this.$router.go(0)
      }
    }
  }
</script>

<style scoped lang="less">
  @import "../../Less/index.less";

  .v-header-wrap {
    width: 100%;
    height: 45px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: @theme-color;
    color: white;
    .left {
      display: inline-block;
      margin-left: 5px;
      span {
        display: inline-block;
        padding-left: 22px;
        font-size: @font-15;
        cursor: pointer;
      }

      background: url("./prev.png") no-repeat left center / 50% auto;
    }

    .title {
      flex: 1;
      font: 500 16px '';
      text-align: center;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      font-size: @font-18;

      &.hide-left {
        padding-left: 42px;
      }

      &.hide-right {
        padding-right: 40px;
      }
    }

    .right {
      width: 40px;
      height: 45px;
      padding: 5px 0 0 0;
      text-align: center;
      cursor: pointer;
      user-select: none;

      i {
        display: inline-block;
        width: 18px;
        height: 18px;
        margin: 1px 0;
        background-size: auto 100%;
        background-repeat: no-repeat;
        background-position: center center;
        .bg-img('/static/img/icon-index');
      }

      p {
        font-size: @font-12;
        position: relative;
        top: -2px;
      }
    }
    
    .right-other {
      padding-right: 10px;
    }
  }
</style>
