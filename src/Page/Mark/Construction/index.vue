<template>
  <!-- 详情页 -->
  <div class="construction-wrap common-width">
    <headers showRight/>
    <div class="construction-view-wrap">
      <div class="construction-tabs-wrap">
        <div
          v-for="(items, index) in tabsData"
          :key="index"
          :class="items.active ? `${items.className} active` : items.className"
          @click="_tabClick(items, index)"
        >
          <i></i>
          <span v-text="items.name"></span>
        </div>
      </div>
      <div class="view-wrap">
        <div class="search-wrap">
          <span class="search-title">社区名称:</span>
          <div class="input-wrap" :class="{'active': active}">
            <van-icon name="search"/>
            <input
              type="text"
              placeholder="珠江帝景（模糊查询）"
              v-model="value"
              @blur="_blur"
              @focus="_focus"
            />
          </div>
          <span class="search-btn" @click="_oncommunity">搜 索</span>
        </div>
        <div class="table-wrap">
          <b-scroll>
            <table class="content-table other-table-wrap">
              <thead class="hide-header">
              <tr border="0">
                <th>当前进度状态</th>
                <th>当前进度状态</th>
                <th>顺序编号</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td :class="detailObj.progressStatus==='未洽谈'?'activeStatus':''">未洽谈</td>
                <td :class="detailObj.progressStatus==='洽谈中'?'activeStatus':''">洽谈中</td>
                <td :class="detailObj.progressStatus==='存在瓶颈'?'activeStatus':''">存在瓶颈</td>
                <td :class="detailObj.progressStatus==='需求提交'?'activeStatus':''">需求提交</td>
                <td :class="detailObj.progressStatus==='预委托'?'activeStatus':''">预委托</td>
              </tr>
              <tr>
                <td :class="detailObj.progressStatus==='设计出图'?'activeStatus':''">设计出图</td>
                <td :class="detailObj.progressStatus==='接入平台审核'?'activeStatus':''">接入平台审核</td>
                <td :class="detailObj.progressStatus==='会审'?'activeStatus':''">会审</td>
                <td :class="detailObj.progressStatus==='工程总预算审核'?'activeStatus':''">工程总预算审核</td>
                <td :class="detailObj.progressStatus==='正式委托'?'activeStatus':''">正式委托</td>
              </tr>
              <tr>
                <td :class="detailObj.progressStatus==='物资准备'?'activeStatus':''">物资准备</td>
                <td :class="detailObj.progressStatus==='入场确认'?'activeStatus':''">入场确认</td>
                <td :class="detailObj.progressStatus==='物理施工'?'activeStatus':''">物理施工</td>
                <td :class="detailObj.progressStatus==='建站及纤芯方案'?'activeStatus':''">建站及纤芯方案</td>
                <td :class="detailObj.progressStatus==='管线录入及跳纤对光'?'activeStatus':''">管线录入及跳纤对光</td>
              </tr>
              <tr>
                <td :class="detailObj.progressStatus==='光路录入'?'activeStatus':''">光路录入</td>
                <td :class="detailObj.progressStatus==='服开流转及验收准备'?'activeStatus':''">服开流转及验收准备</td>
                <td :class="detailObj.progressStatus==='现场验收'?'activeStatus':''">现场验收</td>
                <td :class="detailObj.progressStatus==='地址录入'?'activeStatus':''">地址录入</td>
                <td :class="detailObj.progressStatus==='业务挂测'?'activeStatus':''">业务挂测</td>
              </tr>
              <tr>
                <td :class="detailObj.progressStatus==='投产报竣'?'activeStatus':''">投产报竣</td>
                <td :class="detailObj.progressStatus==='已投产'?'activeStatus':''">已投产</td>
              </tr>
              </tbody>
            </table>
          </b-scroll>
        </div>
        <div class="table-wrap1">
          <table>
            <thead>
            <tr border="0">
              <th>社区名单</th>
              <th>社区名单</th>
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
              <tr>
                <td>社区名单</td>
                <td>{{detailObj.communityName}}</td>
              </tr>
              <tr>
                <td>提单人</td>
                <td>{{detailObj.leader}}</td>
              </tr>
              <tr>
                <td>分公司</td>
                <td>{{detailObj.branch}}</td>
              </tr>
              <tr>
                <td>综合网格</td>
                <td>{{detailObj.grid}}</td>
              </tr>
              <tr>
                <td>编号</td>
                <td>{{detailObj.no}}</td>
              </tr>
              <tr>
                <td>户数</td>
                <td>{{detailObj.houseHolds}}</td>
              </tr>
              <tr>
                <td>销售经理</td>
                <td>{{detailObj.salesManager}}</td>
              </tr>
              <tr>
                <td>销售经理联系方式</td>
                <td>{{detailObj.salesManMobile}}</td>
              </tr>
              <tr>
                <td>入场时间</td>
                <td>{{detailObj.enterTime}}</td>
              </tr>
              <tr>
                <td>谈楼情况</td>
                <td>{{detailObj.talkFloorSit}}</td>
              </tr>
              <tr>
                <td>瓶颈分类</td>
                <td>{{detailObj.bottleneckType}}</td>
              </tr>
              <tr>
                <td>情况描述</td>
                <td>{{detailObj.caseDes}}</td>
              </tr>
              <tr>
                <td>责任田</td>
                <td>{{detailObj.dutyField}}</td>
              </tr>
              <tr>
                <td>当前进度状态</td>
                <td>{{detailObj.progressStatus}}</td>
              </tr>
              <tr>
                <td>需推动工程传输建设内容</td>
                <td>{{detailObj.tranconsContent}}</td>
              </tr>
              <tr>
                <td>入场确认时间</td>
                <td>{{detailObj.inConfirmTime}}</td>
              </tr>
              <tr>
                <td>物理施工处理时间</td>
                <td>{{detailObj.phyProTime}}</td>
              </tr>
              <tr>
                <td>S3瓶颈类型</td>
                <td>{{detailObj.ssBottType}}</td>
              </tr>
              <tr>
                <td>S3瓶颈类型状态</td>
                <td>{{detailObj.ssBottTypeStatus}}</td>
              </tr>
              <tr>
                <td>施工队长</td>
                <td>{{detailObj.constructCaptain}}</td>
              </tr>
              <tr>
                <td>施工队长联系方式</td>
                <td>{{detailObj.constructCaptainMobile}}</td>
              </tr>
              </tbody>
            </table>
          </b-scroll>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import Headers from "Element/Headers";
  import BScroll from "Element/BScroll";
  import Particular from "./particular";
  
  export default {
    components: {
      Headers,
      BScroll,
      Particular
    },
    data() {
      return {
        value: "",
        result: "",
        resultClass: "",
        active: false,
        canNext: false,
        tabIndex: 0,
        detailObj: {},
        tabsData: [
          {
            name: "预覆盖施工进度",
            active: true,
            tabIndex: 0,
            className: "a"
          },
          {
            name: "报表统计",
            active: false,
            tabIndex: 1,
            className: "b"
          }
        ]
      };
    },
    // beforeRouteUpdate(to, from, next) {
    //   console.log(to);
    //   console.log("====");
    //   console.log(from);
    
    //   // next();
    //   this.getData();
    // },
    mounted() {
      this.getData()
    },
    methods: {
      _tabClick(obj) {
        this.tabsData.forEach(items => {
          items.name === obj.name
            ? (items.active = true)
            : (items.active = false);
        });
        this.tabIndex = obj.tabIndex;
        this.$router.go(-1);
      },
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
      },
      _oncommunity() {
        this._findAddressResultApi();
      },
      _findAddressResultApi() {
        const _self = this;
        _self
          .$newpost("/coveredInAdvance/searchCommunity", {
            communityName: _self.value,
            pageNum: 1,
            pageSize: 9999
          })
          .then(res => {
            // console.log(res);
            this.$router.go(-1);
          });
      },
      getData() {
        // console.log(id);
        let id = JSON.parse(localStorage.getItem('sendDataobj'))
        //  console.log(id);
        
        const _self = this;
        _self.$newpost("/coveredInAdvance/searchCommunityDetail", {
          id: id
        })
          .then(res => {
            // console.log(res.data);
            
            _self.detailObj = res.data;
          });
      }
    }
  };
</script>

<style lang='less' scoped>
  @import "../../../Common/Less/index";
  
  .activeStatus {
    color: red;
    font-weight: bold;
  }
  
  .construction-wrap {
    .construction-view-wrap {
      height: calc(100% - 45px);
      
      .construction-tabs-wrap {
        padding: 10px 5px;
        display: flex;
        user-select: none;
        cursor: pointer;
        
        div {
          flex: 1;
          margin-right: 5px;
          text-align: center;
          line-height: 35px;
          border-radius: 5px;
          background: #d4e3ee;
          color: #333333;
          font-size: 0;
          
          i,
          span {
            display: inline-block;
            vertical-align: middle;
          }
          
          i {
            width: 16px;
            height: 16px;
            margin-right: 5px;
            background-repeat: no-repeat;
            background-position: center center;
            background-size: auto 16px;
          }
          
          span {
            font-size: @font-12;
          }
          
          &.a {
            i {
              .bg-img("/static/img/btn/handshake-black");
            }
            
            &.active {
              i {
                .bg-img("/static/img/btn/handshake-white");
              }
            }
          }
          
          &.b {
            i {
              .bg-img("/static/img/btn/backlog-black");
            }
            
            &.active {
              i {
                .bg-img("/static/img/btn/backlog-white");
              }
            }
          }
          
          &.c {
            i {
              .bg-img("/static/img/btn/already-black");
            }
            
            &.active {
              i {
                .bg-img("/static/img/btn/already-white");
              }
            }
          }
          
          &.active {
            background: linear-gradient(#31c6ee, #299ce6);
            color: white;
          }
          
          &:last-child {
            margin-right: 0;
          }
        }
      }
      
      .view-wrap {
        height: calc(100% - 100px);
        padding: 0 5px;
        margin-top: 15px;
        
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
      }
      
      .table-wrap {
        width: 100%;
        height: 36%;
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
          
          &.other-table-wrap {
            tr {
              &:last-child {
                td {
                  border-right: 1px solid #e8e8e8;
                }
              }
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
      
      .table-wrap1 {
        width: 100%;
        height: 60%;
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
  }
</style>
