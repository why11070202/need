<template>
  <div class="traction-wrap common-width">
    <headers :leftClick="_leftClick" showRight/>
    <div>
      <div class="tab">
        <div class="btn" @click="_hendle()">营装维进度</div>
        <div class="btn active">报表统计</div>
      </div>
    </div>
    <div class="table-wrap">
      <b-scroll>
        <table>
          <thead>
            <tr border="0">
              <th>工单状态</th>
              <th>客户类型</th>
              <th>工单数量</th>
            </tr>
          </thead>
        </table>
        <!-- <b-scroll> -->
        <table class="content-table">
          <thead class="hide-header">
            <tr border="0">
              <th>工单状态</th>
              <th>客户类型</th>
              <th>工单数量</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in tBody" :key="index" @click="jumpDetail(item)" v-if='item.customerType==="个人客户"'>
              <td class="can-click">{{item.workOrderStatus}}</td>
              <td class="can-click">{{item.customerType}}</td>
              <td class="can-click">{{item.workOrderNum}}</td>
            </tr>
          </tbody>
        </table>
        <table style='margin-top:10px'>
          <thead>
            <tr border="0">
              <th>工单状态</th>
              <th>客户类型</th>
              <th>工单数量</th>
            </tr>
          </thead>
        </table>
        <table class="content-table">
          <thead class="hide-header">
            <tr border="0">
              <th>工单状态</th>
              <th>客户类型</th>
              <th>工单数量</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in tBody" :key="index" @click="jumpDetail(item)" v-if="item.customerType==='商业客户'">
              <td class="can-click">{{item.workOrderStatus}}</td>
              <td class="can-click">{{item.customerType}}</td>
              <td class="can-click">{{item.workOrderNum}}</td>
            </tr>
          </tbody>
        </table>
      </b-scroll>
    </div>
    <transition name="slide">
      <router-view/>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
  import Headers from "Element/Headers";
  import BScroll from "Element/BScroll";
  
  export default {
    components: {
      Headers,
      BScroll
    },
    data() {
      return {
        tBody: []
      };
    },
    mounted() {
      this.queryList();
    },
    methods: {
      _leftClick () {
        this.$router.push('/menu');
      },
      _hendle() {
        this.$router.push("/menu/cooperative");
      },
      jumpDetail(obj) {
        let { path } = this.$route;
        this.$router.push(`${path}/sdetail/${obj.customerType}/${obj.workOrderStatus}`);
      },
      queryList() {
        const _self = this;
        _self.$newpost("/serveOpen/statisticServeopen", {
          pageNum: 1,
          pageSize: 9999
        })
          .then(res => {
            _self.tBody = res.data;
          });
      }
    }
  };
</script>

<style scoped lang="less">
  @import "../../../Common/Less/index";
  .traction-wrap {
    .tab {
      padding: 10px;
    
      .btn {
        padding: 5px 10px;
        display: inline-block;
        font-size: 14px;
        color: #fff;
        background: #ccc;
        margin-right: 10px;
      }
    
      .active {
        background: #4285dd;
      }
    }
  
    .title {
      font-size: @font-14;
      background: #ccc;
      color: #fff;
      padding: 10px;
      display: inline-block;
    }
  
    .table-wrap {
      height: calc(100% - 95px);
      padding: 0 10px 20px 10px;
      overflow: hidden;
      position: relative;
      margin-top: 10px;
      
      table {
        width: 100%;
        border-collapse: collapse;
        table-layout: fixed;
        font-size: @font-12;
        text-align: center;
        border: 1px solid @border-color;
      
        &.content-table {
          border-top: 0;
        }
      
        thead {
          display: table-header-group;
          position: relative;
          background: @table-header-bg-color;
          color: #6da8a2;
        
          &.hide-header {
            display: none;
          }
        
          tr {
            th {
              height: 35px;
              padding: 0 5px;
              border-right: 1px solid @border-color;
              font-weight: normal;
              font-size: 12px;
            
              &:last-child {
                border-right: 0;
              }
            }
          }
        }
      
        tbody {
          display: table-header-group;
        
          tr {
            td {
              height: 40px;
              padding: 0 5px;
              border-top: 1px solid @border-color;
              border-bottom: 1px solid @border-color;
              border-right: 1px solid @border-color;
              word-wrap: break-word;
              // text-align: center;
              &:first-child {
                text-align: center;
              }
            
              &.can-click {
                color: @table-header-color;
              }
            
              &.see {
                color: @see-color;
              }
            
              &.error {
                color: @active-color;
              }
            
              &.do {
                color: @do-color;
              }
            
              &:last-child {
                border-right: 0;
              }
            
              &.not-date {
                height: 80px;
                color: @not-data-color;
                text-align: center;
              }
            }
          
            &:first-child {
              td {
                border-top: 0;
              }
            }
          
            &:last-child {
              td {
                border-bottom: 0;
              }
            }
          }
        }
      }
    }
  }
</style>
