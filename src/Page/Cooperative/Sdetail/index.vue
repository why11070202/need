<template>
  <div class="traction-wrap common-width">
    <headers showRight/>
    <div class="table-wrap">
      <table class="header-table">
        <thead>
        <tr border="0">
          <th>五级地址名称</th>
          <th>宽带帐号</th>
          <th>装维退单原因（客户原因缓装原因字段数据</th>
        </tr>
        </thead>
      </table>
      <div class="table-scroll-wrap">
        <b-scroll :pullup="true" @scrollToEnd="_scrollEnd">
          <table class="content-table">
            <thead class="hide-header">
            <tr border="0">
              <th>五级地址名称</th>
              <th>宽带帐号</th>
              <th>装维退单原因（客户原因缓装原因字段数据</th>
            </tr>
            </thead>
            <tbody>
            <tr v-if="tBody.length === 0">
              <td class="not-date" colspan="5">没有数据</td>
            </tr>
            <tr v-else v-for="(item, index) in tBody" :key="index">
              <td v-text="item.fiveLevelAddressName"></td>
              <td v-text="item.broadbandAccount"></td>
              <td v-text="item.customerDelayedReason"></td>
            </tr>
            </tbody>
          </table>
        </b-scroll>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import Headers from 'Element/Headers'
  import BScroll from 'Element/BScroll'
  
  export default {
    components: {
      Headers,
      BScroll
    },
    data() {
      return {
        tBody: [],
        pageNum: 0,
        total: 0
      }
    },
    mounted() {
      this.pageNum += 1;
    },
    methods: {
      _scrollEnd() {
        if (this.pageNum < this.total) {
          this.pageNum += 1;
        }
      },
      _hendle() {
        this.$router.push('/menu/cooperative');
      },
      jumpStatiscal() {
        this.$router.go(-1);
      },
      queryList() {
        const _self = this;
        _self.$newpost("/serveOpen/findChargeBacksByOrderStatus", {
          address: _self.$route.params.address,
          customerType: _self.$route.params.customerType,
          pageNum: _self.pageNum,
          pageSize: _self.pageSize,
          workOrderStatus: _self.$route.params.workOrderStatus
        }).then(res => {
          _self.total = res.data.totalPage;
          _self.tBody = [..._self.tBody.map(items => (items)), ...res.data.data];
        });
      }
    },
    watch: {
      pageNum () {
        this.queryList();
      }
    }
  }
</script>

<style scoped lang="less">
  @import "../../../Common/Less/index";
  
  .table-wrap {
    width: 100%;
    height: calc(100% - 45px);
    overflow: hidden;
    position: relative;
    padding: 10px;
    display: flex;
    flex-direction: column;
    
    .table-scroll-wrap {
      flex: 1;
    }
    
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
            border-bottom: 1px solid @border-color;
            border-right: 1px solid @border-color;
            word-wrap: break-word;
            
            &:first-child {
              text-align: left;
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
          
          &:last-child {
            td {
              border-bottom: 0;
            }
          }
        }
      }
    }
  }
</style>
