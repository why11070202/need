<template>
  <div class="business-wrap common-width">
    <div class="search-all-wrap">
      <div class="search-wrap">
        <span class="search-title">派单人:</span>
        <div class="input-wrap">
          <van-icon name="search"/>
          <input type="text" placeholder="精准查询" v-model="sendOrderMan"/>
        </div>
        <span class="search-title">宽带账号:</span>
        <div class="input-wrap">
          <van-icon name="search"/>
          <input type="text" placeholder="精准查询" v-model="broadbandAccount"/>
        </div>
      </div>
      <div class="search-wrap" style="margin-top:5px;">
        <span class="search-title">标准地址:</span>
        <div class="input-wrap">
          <van-icon name="search"/>
          <input type="text" placeholder="精准查询" v-model="standardAddress"/>
        </div>
        <span class="search-btn" @click="_searchClick">搜 索</span>
      </div>
    </div>
  
    <div class="business-table-view-wrap">
      <div class="table-wrap">
        <table>
          <thead>
            <tr border="0">
              <th>标准地址：</th>
            </tr>
          </thead>
        </table>
        <div class="scroll-list-wrap">
          <b-scroll :pullup="true" @scrollToEnd="_scrollEnd">
            <table class="content-table">
              <thead class="hide-header">
                <tr border="0">
                  <th>标准地址</th>
                </tr>
              </thead>
              <tbody>
                <tr v-if="tBody.length === 0">
                  <td class="not-date" colspan="5">没有数据</td>
                </tr>
                <tr
                  v-else
                  v-for="(item, index) in tBody"
                  :key="index"
                  @click="_toDetal(item.crmWorkNum)">
                  <td>{{item.standardAddress}}</td>
                </tr>
              </tbody>
            </table>
          </b-scroll>
        </div>
      </div>
    </div>
    <transition name="slide">
      <router-view/>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'Element/BScroll';
  import { searchBusinessApi } from "../../../../Fetch/business";
  
  export default {
    components: {
      BScroll
    },
    data() {
      return {
        sendOrderMan: '',
        broadbandAccount: '',
        standardAddress: '',
        tBody: [],
        pageNum: 1,
        total: 0,
        isSearch: true
      }
    },
    mounted() {
    
    },
    methods: {
      _searchClick () {
        this.isSearch = true;
        if (this.pageNum !== 1) {
          this.pageNum = 1;
        } else {
          this._getListFn();
        }
      },
      _scrollEnd() {
        if (this.pageNum < this.total) {
          this.isSearch = false;
          this.pageNum += 1;
        }
      },
      _toDetal (id) {
        let { path } = this.$route;
        this.$router.push(`${path}/detail/${id}`);
      },
      _getListFn () {
        const _self = this;
        searchBusinessApi({
          broadbandAccount: _self.broadbandAccount,
          pageNum: _self.pageNum,
          pageSize: _self.pageSize,
          sendOrderMan: _self.sendOrderMan,
          standardAddress: _self.standardAddress
        }, res => {
          _self.total = res.totalPage;
          _self.tBody = _self.isSearch ? [...res.data] : [..._self.tBody.slice(0), ...res.data];
        });
      }
    },
    watch: {
      pageNum () {
        this._getListFn();
      }
    }
  }
</script>

<style scoped lang="less">
  @import "../../../../Common/Less/index";
  
  .business-wrap {
    display: flex;
    flex-direction: column;
    
    .search-all-wrap {
      .search-wrap {
        display: flex;
        padding: 0 10px;
        
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
          
          i, input {
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
    }
    
    .business-table-view-wrap {
      flex: 1;
      
      .table-wrap {
        height: 100%;
        padding: 10px;
        position: relative;
        overflow: hidden;
        display: flex;
        flex-direction: column;
    
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
  
        .scroll-list-wrap {
          flex: 1;
        }
      }
    }
  }
</style>
