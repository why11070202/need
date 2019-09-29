<template>
  <div class="business-add-wrap common-width">
    <div class="top-bar-wrap">
      <span :class="{'active': topBarBool}" @click="topBarBool=true">指标进度</span>
      <span :class="{'active': !topBarBool}" @click="topBarBool=false">
        <b>提升路径：</b>
        <i v-if="topBarBool">{{selectName}}</i>
        <select v-else v-model="tabSelect" @change="_changePage">
          <option v-for="(items, index) in selectList" :key="index" :value="items.value">{{items.name}}</option>
        </select>
      </span>
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
        topBarBool: true,
        tabSelect: '1',
        selectName: '渠道参与',
        selectList: [
          {
            name: '渠道参与',
            value: '1',
            toPage: 'participation'
          },
          {
            name: '渠道产能',
            value: '2',
            toPage: 'capacity'
          },
          {
            name: '新增质量',
            value: '3',
            toPage: 'quality'
          }
        ]
      }
    },
    mounted() {
      let { path } = this.$route;
      this.selectList.forEach(items => {
        if (path.indexOf(items.toPage) > -1) {
          this.topBarBool = false;
          this.tabSelect = items.value;
        }
      });
    },
    methods: {
      _changePage(event) {
        let { value } = event.target;
        this.selectList.forEach(items => {
          if (items.value === value) {
            this.$router.push(`/menu/business/add/${items.toPage}`);
          }
        })
      }
    },
    watch: {
      tabSelect (val) {
        this.selectList.forEach(items => {
          if (items.value === val) {
            this.selectName = items.name;
          }
        })
      },
      topBarBool (val) {
        if (!val) {
          this.selectList.forEach(items => {
            if (items.value === this.tabSelect) {
              let { path } = this.$route;
              if (path !== `/menu/business/add/${items.toPage}`) {
                this.$router.push(`/menu/business/add/${items.toPage}`);
              }
            }
          })
        } else {
          this.$router.push('/menu/business/add');
        }
      },
      $route(to){
        if (to.path === '/menu/business/add') {
          this.topBarBool = true;
        }
      }
    }
  }
</script>

<style scoped lang="less">
  @import "../../../../Common/Less/index";
  .business-add-wrap {
    .top-bar-wrap {
      padding: 10px 20px;
      display: flex;
      span {
        flex: 1;
        height: 35px;
        line-height: 35px;
        border-radius: 5px;
        overflow: hidden;
        margin-right: 10px;
        font-size: 12px;
        background: #d4e3ee;
        color: #333333;
        display: flex;
        justify-content: center;
        align-items: center;
        @media screen and (max-width: 325px) {
          &:first-child {
            flex: 0 0 120px;
            width: 120px;
          }
        }
        b {
          padding: 0 5px 0 10px;
          color: #666666;
        }
        i {
          flex: 1;
          font-style: normal;
          color: #666666;
        }
        select {
          flex: 1;
          height: 35px;
          vertical-align: middle;
          border: 0;
          background: transparent;
          color: #666666;
        }
        &.active {
          background: linear-gradient(#31c6ee, #299ce6);
          color: white;
          b, select {
            color: white;
            background: linear-gradient(#31c6ee,#299ce6);
          }
          select {
            option {
              color: #666666;
            }
          }
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
