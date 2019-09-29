<template>
  <div class="particular-wrap common-width" :style="_setResult">
    <div class="search-wrap">
      <span class="search-title">社区名称:</span>
      <div class="input-wrap" :class="{'active': active}">
        <van-icon name="search"/>
        <input type="text" placeholder="珠江帝景（模糊查询）" v-model="value" @blur="_blur" @focus="_focus"/>
      </div>
      <span class="search-btn" @click="_onSearch">搜 索</span>
    </div>
    <div class="table-wrap">
      <table>
        <thead>
        <tr border="0">
          <th>当前进度状态</th>
          <th>顺序编号</th>
        </tr>
        </thead>
      </table>
      <b-scroll>
        <table class="content-table">
          <thead class="hide-header">
          <tr border="0">
            <th>当前进度状态</th>
            <th>顺序编号</th>
          </tr>
          </thead>
          <tbody>
          <tr v-if="tBody.length === 0">
            <td class="not-date" colspan="5">没有数据</td>
          </tr>
          <tr v-else v-for="(item, index) in tBody" :key="index">
            <td v-text="item"></td>
            <td v-text="item"></td>
          </tr>
          </tbody>
        </table>
      </b-scroll>
    </div>
    <div class="table-wrap">
      <table>
        <thead>
        <tr border="0">
          <th>当前进度状态</th>
          <th>顺序编号</th>
        </tr>
        </thead>
      </table>
      <b-scroll>
        <table class="content-table">
          <thead class="hide-header">
          <tr border="0">
            <th>社区名单</th>
            <th>珠江帝景1</th>
          </tr>
          </thead>
          <tbody>
          <tr v-if="tBody.length === 0">
            <td class="not-date" colspan="5">没有数据</td>
          </tr>
          <tr v-else v-for="(item, index) in tAody" :key="index">
            <td v-text="item"></td>
            <td v-text="item"></td>
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
        tBody: [
          "未洽谈",
          "洽谈中",
          "存在瓶颈",
          "需求提交",
          "预委托",
          "设计出图",
          "接入平台审核",
          "会审",
          "工程总预算审核",
          "正式委托",
          "物资准备",
          "入场确认",
          "物理施工",
          "建站及纤芯方案",
          "管线录入及跳纤对光",
          "光路录入",
          "服开流转及验收准备",
          "现场验收",
          "地址录入",
          "业务挂测",
          "投产报竣",
          "已投产"
        ],
        tAody: [
          "提单人",
          "分公司",
          "综合网格",
          "编号",
          "户数",
          "销售经理",
          "销售经理联系方式",
          "入场时间",
          "谈楼情况",
          "瓶颈分类",
          "情况描述",
          "责任田",
          "当前进度状态",
          "需推动工程传输建设内容",
          "入场确认时间",
          "物理施工处理时间",
          "S3瓶颈类型",
          "S3瓶颈类型状态"
        ]
      };
    },
    computed: {
      _setResult() {
        if (this.value.trim() === "") {
          this.result = "";
          this.resultClass = "";
        }
        return "";
      },
      _focus() {
        this.active = true;
      },
      _blur() {
        this.active = false;
      }
      //  _onSearch() {
      //   this._findAddressResultApi();
      // },
      // _findAddressResultApi() {
      //   const _self = this;
      //   if (_self.value.trim() === "") {
      //     return;
      //   }
      //   _self
      //     .$post("/address/isAddressCover", {
      //       address: _self.value
      //     })
      //     .then(res => {
      //       if (res.addressCover) {
      //         _self.resultClass = "happy";
      //       } else {
      //         _self.resultClass = "sad";
      //       }
      //       let roleData = JSON.parse(localStorage.getItem("role"));
      //       if (roleData.role === 1) {
      //         _self.canNext = false;
      //       } else {
      //         _self.canNext = true;
      //       }
      //       _self.result = res.message;
      //     });
      // },
    }
  };
</script>
<style lang='less' scoped>
  @import "../../../../Common/Less/index";
  
  .particular-wrap {
    padding: 10px;
    // position: relative;
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
