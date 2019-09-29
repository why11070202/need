<template>
  <!-- 列表页 -->
  <div class="community-wrap common-width" :style="_setResult">
    <!-- <headers showRight/> -->
    <div class="search-wrap">
      <span class="search-title">社区名称:</span>
      <div class="input-wrap" :class="{'active': active}">
        <van-icon name="search"/>
        <input type="text" placeholder="珠江帝景（模糊查询）" v-model="value" @blur="_blur" @focus="_focus"/>
      </div>
      <span class="search-btn" @click="_oncommunity">搜 索</span>
    </div>
    <div class="table-wrap common-width">
      <table>
        <thead>
          <tr border="0">
            <th>社区名称：</th>
          </tr>
        </thead>
      </table>
      <b-scroll>
        <table class="content-table">
          <thead class="hide-header">
            <tr border="0">
              <th>社区名称：</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="tBody.length === 0">
              <td class="not-date" colspan="5">没有数据</td>
            </tr>
            <tr v-else v-for="(item, index) in tBody" :key="index" @click="_hendle(item.id)">
              <td class="data-text" v-text="item.communityName"></td>
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
      BScroll,
    },
    data() {
      return {
        value: "",
        result: "",
        resultClass: "",
        active: false,
        canNext: false,
        tBody: [],
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
    mounted() {
      // this._findAddressResultApi()
    },
    methods: {
      _focus() {
        this.active = true;
      },
      _blur() {
        this.active = false;
      },
      _oncommunity() {
        this._findAddressResultApi();
      },
      _findAddressResultApi() {
        const _self = this;
        _self.$newpost("/coveredInAdvance/searchCommunity", {
          "communityName": _self.value,
          "pageNum": 1,
          "pageSize": 9999
        })
          .then(res => {
            _self.tBody = [...res.data.data];
          });
      },
      _hendle(obj) {
        localStorage.setItem('sendDataobj', JSON.stringify(obj));
        this.$router.push(`/menu/mark/Construction/${obj}`);
        
      }
    }
  };
</script>

<style scoped lang="less">
  @import "../../../Common/Less/index";
  
  .community-wrap {
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
              &.data-text {
                color: @table-header-color;
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
