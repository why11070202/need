<template>
  <div class="business-search-wrap common-width">
    
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
        <span class="search-title">五级地址:</span>
        <div class="input-wrap">
          <van-icon name="search"/>
          <input type="text" placeholder="精准查询" v-model="address"  @keyup.enter="_searchClick"/>
        </div>
        <span class="search-btn" @click="_searchClick">搜 索</span>
      </div>
    </div>
  
    <div class="search-table-view-wrap">
      <div class="table-wrap">
        <table>
          <thead>
          <tr border="0">
            <th v-text="isFiveAddress ? '五级地址：' : '标准地址：'"></th>
          </tr>
          </thead>
        </table>
        <div class="scroll-list-wrap">
          <b-scroll :pullup="true" @scrollToEnd="_scrollEnd">
            <table class="content-table">
              <thead class="hide-header">
                <tr border="0">
                  <th v-text="isFiveAddress ? '五级地址：' : '标准地址：'"></th>
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
                  @click="_toDetal(item)">
                  <td class="can-click">{{isFiveAddress ? item : item.standardAddress}}</td>
                </tr>
              </tbody>
            </table>
          </b-scroll>
        </div>
      </div>
  
      <transition name="slide">
        <router-view/>
      </transition>
    </div>
    
    
  </div>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'Element/BScroll';
  import { searchAddressByNameApi, searchStandardAddressByNameApi } from "../../../../Fetch/business";

  export default {
    components: {
      BScroll
    },
    data() {
      return {
        sendOrderMan: '',
        broadbandAccount: '',
        address: '',
        tBody: [],
        pageNum: 1,
        total: 0,
        isSearch: true,
        isFiveAddress: true
      }
    },
    mounted() {
    
    },
    methods: {
      _toDetal (obj) {
        let { path } = this.$route;
        if (this.isFiveAddress) {
          this.$router.push(`${path}/address/${obj}`);
        } else {
          this.$router.push(`${path}/order-detail/${obj.crmWorkNum}`);
        }
      },
      _searchClick () {
        this.isSearch = true;
        let { address, type, status, id } = this.$route.params;
        let { path } = this.$route;
        if ((address || type || status || id) && path !== '/menu/business-install-maintain/search' ) {
          this.$router.push('/menu/business-install-maintain/search');
        }
        if (this.pageNum !== 1) {
          this.pageNum = 1;
        } else {
          this._getList();
        }
      },
      _scrollEnd() {
        if (this.pageNum < this.total) {
          this.isSearch = false;
          this.pageNum += 1;
        }
      },
      _getList () {
        const _self = this;
        _self.isFiveAddress = _self.address !== '';
        if (_self.isFiveAddress) {
          searchAddressByNameApi({
            address: _self.address,
            broadbandAccount: _self.broadbandAccount,
            sendOrderMan: _self.sendOrderMan,
            pageNum: _self.pageNum,
            pageSize: _self.pageSize,
            workOrderStatus: _self.workOrderStatus
          }, res => {
            _self.total = res.totalPage;
            _self.tBody = _self.isSearch ? [...res.data] : [..._self.tBody.slice(0), ...res.data];
          });
        } else {
          searchStandardAddressByNameApi({
            standardAddress: _self.address,
            broadbandAccount: _self.broadbandAccount,
            sendOrderMan: _self.sendOrderMan,
            pageNum: _self.pageNum,
            pageSize: _self.pageSize,
            workOrderStatus: _self.workOrderStatus
          }, res => {
            _self.total = res.totalPage;
            _self.tBody = _self.isSearch ? [...res.data] : [..._self.tBody.slice(0), ...res.data];
          });
        }
      }
    },
    watch: {
      pageNum () {
        this._getList();
      }
    }
  }
</script>

<style scoped lang="less">
  @import "../../../../Common/Less/index";
  
  .business-search-wrap {
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
  
    .search-table-view-wrap {
      margin-top: 5px;
      flex: 1;
      position: relative;
    
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
  
                &.can-click {
                  color: @table-header-color;
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
