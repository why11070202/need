<template>
<!-- 营装维进度 -->
  <div class="prog-wrap common-width" :style="_setResult">
    <div class="search-wrap">
      <span class="search-title">派单人:</span>
      <div class="input-wrap" :class="{'active': active}">
        <van-icon name="search" />
        <input type="text" placeholder="精准查询" v-model="value" @blur="_blur" @focus="_focus" />
      </div>
      <span class="search-title">宽带账号:</span>
      <div class="input-wrap" :class="{'active': active}">
        <van-icon name="search" />
        <input type="text" placeholder="精准查询" v-model="value" @blur="_blur" @focus="_focus" />
      </div>
    </div>
    <div class="search-wrap" style='margin-top:5px;'>
      <span class="search-title" style='width:145px;'>地址（取标准地址字段）:</span>
      <div class="input-wrap" :class="{'active': active}">
        <van-icon name="search" />
        <input type="text" placeholder="精准查询" v-model="value" @blur="_blur" @focus="_focus" />
      </div>
        <span class="search-btn" @click="_onSearch">搜 索</span>
    </div>
    <!-- <div class="result-wrap" v-if="result !== ''" :class="resultClass">
      <span v-text="result"></span>
    </div>
    <div class="btn-wrap" v-if="resultClass === 'sad' && canNext" @click="_next">
      <i></i>
      <span>发起协同</span>
    </div>-->
    <div class="table-wrap">
      <table>
        <thead>
          <tr border="0">
            <th>派单人</th>
            <th></th>
          </tr>
        </thead>
      </table>
      <b-scroll>
        <table class="content-table">
          <thead class="hide-header">
            <tr border="0">
              <th>派单人</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="tBody.length === 0">
              <td class="not-date" colspan="5">没有数据</td>
            </tr>
            <tr v-else v-for="(item, index) in tBody" :key="index">
              <td v-text="item" ></td>
              <td v-text="item" ></td>
            </tr>
          </tbody>
        </table>
      </b-scroll>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import BScroll from "Element/BScroll";
export default {
  components: {
    BScroll
  },
  data() {
    return {
      value: "",
      result: "",
      resultClass: "",
      active: false,
      canNext: false,
      tBody: ["派单人", "宽带帐号", "标准地址", "工单号","CRM工单号","操作类型","用户实际速率","宽带提供方","产品名称","产品业务属性","电视账号","客户需求带宽","服务厅","派单日期","归档时间","当前环节","处理渠道","工单处理时长","新阶段回复","五级地址名称","客户原因缓装原因","客户原因缓装状态","最近一次的拨号开始时间","最近一次的拨号结束时间","是否上门收费","支付金额","工单状态"]
    };
  },
   computed: {
    _setResult() {
      if (this.value.trim() === "") {
        this.result = "";
        this.resultClass = "";
      }
      return "";
    }
  },
   methods: {
    _next() {
      this.$router.push(`/menu/index/task/synergia/${this.value}`);
    },
    _focus() {
      this.active = true;
    },
    _blur() {
      this.active = false;
    },
    _onSearch() {
      this._findAddressResultApi();
    },
    _findAddressResultApi() {
      const _self = this;
      if (_self.value.trim() === "") {
        return;
      }
      _self
        .$post("/address/isAddressCover", {
          address: _self.value
        })
        .then(res => {
          if (res.addressCover) {
            _self.resultClass = "happy";
          } else {
            _self.resultClass = "sad";
          }
          let roleData = JSON.parse(localStorage.getItem("role"));
          if (roleData.role === 1) {
            _self.canNext = false;
          } else {
            _self.canNext = true;
          }
          _self.result = res.message;
        });
    },
   
  }
};
</script>
<style lang='less' scoped>
@import "../../../../../Common/Less/index";
.prog-wrap {
  padding: 10px;
  position: relative;
  .title {
    text-align: center;
    margin-bottom: 15px;
    span {
      display: inline-block;
      padding: 5px 15px;
      background: #efefef;
      border-radius: 8px;
      color: #505050;
      font-size: @font-12;
    }
  }
  .search-wrap {
    display: flex;
    span {
      display: inline-block;
      width: 80px;
      height: 32px;
      text-align: center;
      line-height: 32px;
      border-radius: 5px;
      &.search-title {
        background: #d5e8f5;
        color: #4a545a;
      }
      // &.search-title1{
      //    background: #d5e8f5;
      //   color: #4a545a;
      // }
      &.search-btn {
        background: #4285dc;
        color: white;
        user-select: none;
        cursor: pointer;
      }
    }
    .input-wrap {
      flex: 1;
      margin: 0 5px;
      border-radius: 5px;
      border: 1px solid #e8e8e8;
      overflow: hidden;
      font-size: 0;
      i,
      input {
        vertical-align: middle;
      }
      i {
        display: inline-block;
        font-size: @font-14;
        margin: 0 6px 0 10px;
        color: #9f9f9f;
      }
      input {
        border: 0;
        width: calc(100% - 30px);
        height: 32px;
        line-height: 32px;
        padding: 5px 8px 5px 0;
        font-size: @font-14;
      }
      &.active {
        border-color: #31c6ee;
      }
    }
  }
  .table-wrap {
    width: 100%;
    height: 100%;
    overflow: hidden;
    position: relative;
    padding-bottom: 40px;
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
            border-bottom: 1px solid @border-color;
            border-right: 1px solid @border-color;
            word-wrap: break-word;
            // text-align: center;
            &:first-child {
              text-align: cneter;
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
}
</style>
