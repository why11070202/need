<template>
  <div class="synergy-wrap common-width">
    <headers />
    
    <div class="top-bar-wrap">
      <div class="top-items" :class="_setActive(1)">
        <span @click="managerType = 1">网络经理</span>
      </div>
      <div class="top-items" :class="_setActive(2)">
        <span @click="managerType = 2">销售经理</span>
      </div>
      <div class="top-items" :class="_setActive(3)">
        <span @click="managerType = 3">商企经理</span>
      </div>
    </div>
    <div class="synergy-content-wrap">
      <b-scroll>
        <div class="synergy-content">
          
          <div class="synergy-candidate-list-wrap">
            <div class="title">协同备选人员</div>
            <div class="synergy-candidate-list-items" v-if="synergyCandidateList.length">
              <div
                class="list-items"
                v-for="(items, index) in synergyCandidateList"
                :key="index"
                @click="_chooseCandidate(index)">
                <i :class="{'active': items.active}"></i>
                <p v-text="items.text"></p>
              </div>
            </div>
            <div v-else class="not-candidateList">没有找到相关协同备选人员</div>
          </div>
          <div class="synergy-content-list-wrap">
            <div class="title">协同内容项</div>
            <div
              class="synergy-content-list-items"
              v-for="(items, index) in synergyContentList"
              :key="index"
              @click="_chooseContent(index)">
              <i :class="{'active': items.active}"></i>
              <p v-text="items.text"></p>
            </div>
          </div>
          <div class="synergy-text-wrap" v-if="_showText">
            <textarea placeholder="请输入内容" v-model="text"></textarea>
          </div>
        
        </div>
      </b-scroll>
    </div>
    <div class="synergy-btn-wrap" @click="_saveApi">提 交</div>
  </div>
</template>

<script type="text/ecmascript-6">
  import Headers from 'Element/Headers';
  import BScroll from 'Element/BScroll';
  
  export default {
    components: {
      Headers,
      BScroll
    },
    data() {
      return {
        managerType: 1,
        synergyCandidateList: [],
        synergyContentList: [],
        text: '',
        show: false,
        showText: ''
      }
    },
    computed: {
      _setActive() {
        return function (n) {
          let str = '';
          if (this.managerType === n) {
            str = 'active'
          }
          return str;
        }
      },
      _showText() {
        let bol = false;
        this.synergyContentList.forEach((items, index) => {
          if (items.active && index === this.synergyContentList.length - 1) {
            bol = true;
          }
        });
        if (!bol) {
          this.text = '';
        }
        return bol;
      }
    },
    mounted() {
      this._getListApi();
    },
    methods: {
      _chooseContent(n) {
        this.synergyContentList.forEach((items, index) => {
          index === n ? items.active = !items.active : '';
        });
      },
      _chooseCandidate(n) {
        this.synergyCandidateList.forEach((items, index) => {
          index === n ? items.active = true : items.active = false;
        });
      },
      _saveApi() {
        const _self = this;
        let userData = JSON.parse(localStorage.getItem('role'));
        let obj = {
          address: _self.$route.params.address,
          branch: userData.branch,
          gridding: userData.gridding,
          handlerAccount: '',
          issue: '',
          issueAddition: _self.text
        };
        _self.synergyCandidateList.filter(items => items.active).forEach(items => {
          obj.handlerAccount = items.managerAccount;
        });
        _self.synergyContentList.filter(items => items.active).forEach(items => {
          if (obj.issue === '') {
            obj.issue += items.text;
          } else {
            obj.issue += `,${items.text}`;
          }
        });
        if (obj.handlerAccount === '') {
          _self.$dialog.alert({
            message: '请选择协同人员'
          });
          return;
        }
        if (obj.issue === '') {
          _self.$dialog.alert({
            message: '请选择协同内容'
          });
          return;
        }
        _self.$dialog.confirm({
          title: '提示',
          message: '是否确定发起协同工单？'
        }).then(() => {
          _self.$post('/synergyorder/save', obj).then(() => {
            _self.$toast.success({
              mask: true,
              duration: 1000,
              message: '协同工单提交成功',
              onClose: () => {
                _self.$router.go(-1);
              }
            });
          });
        }).catch(() => {
        
        });
      },
      _getListApi() {
        const _self = this;
        let roleData = JSON.parse(localStorage.getItem('role'));
        _self.$post('/synergy/findSynergyContent', {
          branch: roleData.branch,
          gridding: roleData.gridding,
          managerType: _self.managerType
        }).then(res => {
          _self.synergyCandidateList = res.synergyCandidateList.map(items => {
            return {
              active: false,
              text: items.managerName,
              managerAccount: items.managerAccount
            }
          });
          _self.synergyContentList = res.synergyContentList.map(items => {
            return {
              active: false,
              text: items
            }
          });
        })
      }
    },
    watch: {
      managerType() {
        this._getListApi();
      }
    }
  }
</script>

<style scoped lang="less">
  @import "../../Common/Less/index";
  
  .synergy-wrap {
    display: flex;
    flex-direction: column;
    .top-bar-wrap {
      display: flex;
      justify-content: center;
      align-items: center;
      box-shadow: 0 0 5px #dbdbdb;
      
      div {
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        user-select: none;
        cursor: pointer;
        
        span {
          display: inline-block;
          line-height: 35px;
          padding: 0 10px;
          border-bottom: 2px solid transparent;
          color: @not-data-color;
        }
        
        &.active {
          border-color: @theme-color;
          
          span {
            color: @text-color;
            border-color: @theme-color;
          }
        }
      }
    }
    
    .synergy-content-wrap {
      flex: 1;
      
      .synergy-content {
        .title {
          line-height: 40px;
          padding-left: 10px;
          font-size: @font-12;
          color: #666;
          border-bottom: 1px solid #e8e8e8;
          margin-bottom: 10px;
        }
        
        .synergy-candidate-list-wrap {
          .synergy-candidate-list-items {
            padding: 10px;
            font-size: 0;
            
            .list-items {
              display: inline-block;
              width: 33.33%;
              margin-bottom: 10px;
              
              i, p {
                display: inline-block;
                vertical-align: middle;
              }
              
              i {
                width: 20px;
                height: 20px;
                background-size: 100%;
                background-position: left top;
                background-repeat: no-repeat;
                background-image: url("/static/img/check/not-check1.svg");
                
                &.active {
                  background-image: url("/static/img/check/is-check1.svg");
                }
              }
              
              p {
                width: calc(100% - 20px);
                padding-left: 8px;
                line-height: 30px;
                font-size: @font-13;
              }
            }
          }
          
          .not-candidateList {
            text-align: center;
            line-height: 30px;
            font-size: @font-12;
            color: @text-color;
          }
        }
        
        .synergy-content-list-wrap {
          .synergy-content-list-items {
            margin: 0 10px;
            border-bottom: 1px solid #e8e8e8;
            font-size: 0;
            
            i, p {
              display: inline-block;
              vertical-align: middle;
            }
            
            i {
              width: 20px;
              height: 20px;
              background-size: 100%;
              background-position: center center;
              background-repeat: no-repeat;
              background-image: url("/static/img/check/not-check2.svg");
              
              &.active {
                background-image: url("/static/img/check/is-check2.svg");
              }
            }
            
            p {
              width: calc(100% - 20px);
              padding-left: 8px;
              line-height: 40px;
              font-size: @font-13;
            }
          }
        }
        
        .synergy-text-wrap {
          padding: 10px;
          
          textarea {
            width: 100%;
            height: 200px;
            padding: 5px 8px;
            resize: none;
            border: 1px solid #e8e8e8;
            font-size: @font-14;
          }
        }
      }
    }
    
    .synergy-btn-wrap {
      width: 100%;
      height: 45px;
      line-height: 45px;
      text-align: center;
      background: #2572d8;
      color: white;
      user-select: none;
      cursor: pointer;
      font-size: @font-13;
    }
  }
</style>
