<template>
  <div class="business-detail-wrap common-width">
    <b-scroll>
      <div class="table-wrap">
        <table class="content-table">
          <tbody>
          <tr>
            <td :class="{'activeStatus': _setStatus(0)}">集中预约</td>
            <td :class="{'activeStatus': _setStatus(1)}">调度中心</td>
            <td :class="{'activeStatus': _setStatus(2)}">管理资源配置</td>
            <td :class="{'activeStatus': _setStatus(3)}">内外层VLAN配置</td>
            <td :class="{'activeStatus': _setStatus(4)}">数据制作</td>
          </tr>
          <tr>
            <td :class="{'activeStatus': _setStatus(5)}">现场勘查</td>
            <td :class="{'activeStatus': _setStatus(6)}">外线施工</td>
            <td :class="{'activeStatus': _setStatus(7)}">上门测试</td>
            <td :class="{'activeStatus': _setStatus(8)}">收费</td>
            <td v-html="_setNowStatus"></td>
          </tr>
          <tr>
            <td>退单原因({{getBackCause}})</td>
            <td :class="{'activeStatus': _setStatus(11)}" style="border-right: 1px solid #e0e0e0;">完成退单</td>
          </tr>
          </tbody>
        </table>
        <table class="content-table">
          <tbody>
          <tr>
            <td>派单人</td>
            <td>{{detailObj.sendOrderMan}}</td>
          </tr>
          <tr>
            <td>宽带帐号</td>
            <td>{{detailObj.broadbandAccount}}</td>
          </tr>
          <tr>
            <td>标准地址</td>
            <td>{{detailObj.standardAddress}}</td>
          </tr>
          <tr>
            <td>工单号</td>
            <td>{{detailObj.workNum}}</td>
          </tr>
          <tr>
            <td>CRM工单号</td>
            <td>{{detailObj.crmWorkNum}}</td>
          </tr>
          <tr>
            <td>操作类型</td>
            <td>{{detailObj.operateType}}</td>
          </tr>
          <tr>
            <td>用户实际速率</td>
            <td>{{detailObj.actualUserRate}}</td>
          </tr>
          <tr>
            <td>宽带提供方</td>
            <td>{{detailObj.broadbandProvider}}</td>
          </tr>
          <tr>
            <td>产品名称</td>
            <td>{{detailObj.productName}}</td>
          </tr>
          <tr>
            <td>产品业务属性</td>
            <td>{{detailObj.productBusinessAttributes}}</td>
          </tr>
          <tr>
            <td>电视账号</td>
            <td>{{detailObj.tvAccount}}</td>
          </tr>
          <tr>
            <td>客户需求带宽</td>
            <td>{{detailObj.customerDemandBandwidth}}</td>
          </tr>
          <tr>
            <td>服务厅</td>
            <td>{{detailObj.servicesAgency}}</td>
          </tr>
          <tr>
            <td>派单日期</td>
            <td>{{detailObj.sendDate}}</td>
          </tr>
          <tr>
            <td>归档时间</td>
            <td>{{detailObj.fileDate}}</td>
          </tr>
          <tr>
            <td>当前环节</td>
            <td>{{detailObj.currentLink}}</td>
          </tr>
          <tr>
            <td>处理渠道</td>
            <td>{{detailObj.processingChannel}}</td>
          </tr>
          <tr>
            <td>工单处理时长</td>
            <td>{{detailObj.workOrderCost}}</td>
          </tr>
          <tr>
            <td>新阶段回复</td>
            <td>{{detailObj.newStageRecovery}}</td>
          </tr>
          <tr>
            <td>五级地址名称</td>
            <td>{{detailObj.fiveLevelAddressName}}</td>
          </tr>
          <tr>
            <td>客户原因缓装原因</td>
            <td>{{detailObj.customerDelayedReason}}</td>
          </tr>
          <tr>
            <td>客户原因缓装状态</td>
            <td>{{detailObj.customerDelayedStatus}}</td>
          </tr>
          <tr>
            <td>最近一次的拨号开始时间</td>
            <td>{{detailObj.lastDialingStartTime}}</td>
          </tr>
          <tr>
            <td>最近一次的拨号结束时间</td>
            <td>{{detailObj.lastDialingEndTime}}</td>
          </tr>
          <tr>
            <td>是否上门收费</td>
            <td>{{detailObj.doorCharge}}</td>
          </tr>
          <tr>
            <td>支付金额</td>
            <td>{{detailObj.payoutMoney}}</td>
          </tr>
          <tr>
            <td>工单状态</td>
            <td>{{detailObj.workOrderStatus}}</td>
          </tr>
          <tr>
            <td>装维组/用户班</td>
            <td>{{detailObj.installSafeguardGroup}}</td>
          </tr>
          <tr>
            <td>装维人员/用户班人员</td>
            <td>{{detailObj.installSafeguardStaff}}</td>
          </tr>
          </tbody>
        </table>
      </div>
    </b-scroll>
  </div>
</template>

<script type="text/ecmascript-6">
  import BScroll from "Element/BScroll";
  import { searchBusinessDetailApi } from "../../../../../../../../Fetch/business";

  const headerObj = [
    {
      name: '集中预约',
      active: []
    },
    {
      name: '调度中心',
      active: []
    },
    {
      name: '管理资源配置',
      active: []
    },
    {
      name: '内外层VLAN配置',
      active: []
    },
    {
      name: '数据制作',
      active: []
    },
    {
      name: '现场勘查',
      active: []
    },
    {
      name: '外线施工',
      active: ['服务开通中']
    },
    {
      name: '上门测试',
      active: []
    },
    {
      name: '收费',
      active: []
    },
    {
      name: '退单审批',
      active: ['家客退单审核', '家客退单审批', '部分退单审核', '家客退单审批-技术审核', '部分退单审核-技术审核', '家客退单审批-容量审核']
    },
    {
      name: '归档',
      active: ['归档']
    },
    {
      name: '完成退单',
      active: ['营销退单', '装维退单', '前端退单', '前端撤单']
    }
  ];
  export default {
    components: {
      BScroll
    },
    data() {
      return {
        detailObj: {},
        orderBol: false,
        getBackCause: ''
      }
    },
    computed: {
      _setStatus() {
        let { detailObj } = this;
        return function (index) {
          if (detailObj) {
            if (detailObj.currentLink !== '' && detailObj.workOrderStatus === '') {
              return headerObj[index].name === detailObj.currentLink;
            } else {
              return headerObj[index].active.indexOf(detailObj.workOrderStatus) > -1;
            }
          }
        }
      },
      _setNowStatus() {
        let {detailObj} = this;
        let newHeaderArr = JSON.parse(JSON.stringify(headerObj)).splice(9);
        let html = `<span>退单审批</span> / <span>归档</span>`;
        if (detailObj.workOrderStatus !== '') {
          newHeaderArr.forEach((items, index) => {
            if (items.active.indexOf(detailObj.workOrderStatus) > -1 && index < newHeaderArr.length - 1) {
              html = `<span class="activeStatus">${items.name}</span>`
            }
          })
        }
        return html;
      }
    },
    mounted() {
      const _self = this;
      searchBusinessDetailApi(_self.$route.params.id, res => {
        _self.detailObj = res;
        _self.orderBol = _self.detailObj.workOrderStatus.indexOf('退单') > -1;
        let str = _self.detailObj.newStageRecovery;
        let regex2 = /\【(.+?)\】/g;
        let newArr = str.match(regex2) || [];
        _self.getBackCause = newArr.length ? newArr[0].replace('【', '').replace('】', '') : '';
      });
    }
  }
</script>

<style scoped lang="less">
  @import "../../../../../../../../Common/Less/index";
  
  .business-detail-wrap {
    .table-wrap {
      height: 100%;
      padding: 0 10px;
      position: relative;
      overflow: hidden;
    
      table {
        width: 100%;
        border-collapse: collapse;
        table-layout: fixed;
        font-size: @font-12;
        text-align: center;
        border: 1px solid @border-color;
      
        &.content-table {
          &:last-child {
            margin-top: 10px;
          }
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
              // text-align: center;
              &:first-child {
                text-align: center;
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
