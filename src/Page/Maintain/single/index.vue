<template>
<!-- 营装维进度 -->
  <div class="single-wrap common-width" :style="_setResult">
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
    <div class="table-wrap">
      <table>
        <thead>
          <tr border="0">
            <th>标准地址：</th>
          </tr>
        </thead>
      </table>
      <b-scroll>
        <table class="content-table">
          <thead class="hide-header">
            <tr border="0">
              <th>标准地址：</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="tBody.length === 0">
              <td class="not-date" colspan="5">没有数据</td>
            </tr>
            <tr v-else v-for="(item, index) in tBody" :key="index">
              <td v-text="item" @click="_hendle(item)"></td>
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
      tBody: ["珠江新城1", "珠江新城2", "珠江新城3", "珠江新城4", "珠江新城5"]
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
    _hendle(obj) {
    
    }
  }
};
</script>
<style lang='less' scoped>
@import "../../../Common/Less/index";
.single-wrap {
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
