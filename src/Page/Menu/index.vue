<template>
  <div class="menu-wrap common-width" @click.stop="_wrapClick">
    <headers :leftClick="_leftClick"/>
    <div class="menu-content-wrap">
      <div class="menu-items">
        <div
          v-for="(items, index) in list"
          :key="index"
          :class="{'items': true, 'active': items.active}">
          <div class="items-title" @click.stop="_clickItems(items)">
            <i :class="items.class"></i>
            <span v-text="items.name"></span>
            <b v-if="items.route.length" :class="{'active': items.active}"></b>
          </div>
          
          <div class="items-list-wrap" v-if="items.route.length && items.active">
            <b-scroll :scrollbar="false">
              <div>
                <p v-for="(item, indexs) in items.route" :key="indexs" @click.stop="_toPage(item)">
                  <i :class="item.icon"></i>
                  <span v-text="item.name"></span>
                </p>
              </div>
            </b-scroll>
          </div>
        </div>
      </div>
    </div>
    <transition name="slide">
      <router-view/>
    </transition>
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
        list: [
          {
            name: '智慧生产',
            class: 'production',
            active: false,
            route: [
              {
                name: '网格收入牵引',
                icon: 'orthogon',
                canClick: true,
                toPage: 'traction'
              },
              {
                name: '业务进度评估诊断',
                icon: 'orthogon',
                toPage: 'business'
              },
              {
                name: '营装维协同作业',
                icon: 'orthogon',
                toPage: 'business-install-maintain'
              },
              {
                name: '家集客覆盖营销协同',
                icon: 'orthogon',
                toPage: 'mark'
              },
              {
                name: '跨线条生产协同',
                icon: 'orthogon',
                toPage: 'task'
              },
              {
                name: '渠道转型跟踪分析',
                icon: 'orthogon',
                toPage: 'trench'
              },
              {
                name: '渠道资源信息查询及预警（开发中）',
                icon: 'orthogon',
                toPage: null
              },
              {
                name: '中小微企业客户画像（开发中）',
                icon: 'orthogon',
                toPage: null
              }
            ]
          },
          {
            name: '智慧应用',
            class: 'application',
            active: false,
            route: [
              {
                name: '客户消费特征画像',
                icon: 'orthogon',
                toPage: 'portrayal',
              },
              {
                name: '同行号码聚集区导图',
                icon: 'orthogon',
                toPage: 'peer',
              },
              {
                name: '客流及交易聚集区导图',
                icon: 'orthogon',
                toPage: 'passenger-deal',
              },
              {
                name: '异网业务挖掘（开发中）',
                icon: 'orthogon',
                toPage: null,
              }
            ]
          }
        ]
      }
    },
    mounted() {
      this._getYearAndMonthApi();
    },
    methods: {
      _leftClick() {
        window.parent.postMessage({
          msg: 'close'
        }, '*');
      },
      _clickItems(obj) {
        this.list.forEach((items) => {
          if (obj.name === items.name) {
            items.active = !items.active;
          } else {
            items.active = false;
          }
        });
      },
      _toPage(obj) {
        if (obj.toPage) {
          this.$router.push(`/menu/${obj.toPage}`);
        }
      },
      _wrapClick() {
        this.list.forEach((items) => {
          items.active = false;
        });
      },
      _getYearAndMonthApi() {
        const _self = this;
        _self.$post('/system/findMonth').then(res => {
          let allYear = [];
          res.forEach((items, index) => {
            let itemsData = items.split('-');
            let year = itemsData[0];
            let month = itemsData[1];
            let hasData = allYear.find(item => {
              return item.name === year
            });
            if (hasData) {
              allYear.forEach(it => {
                it.name === year ? it.children.push(
                  {
                    id: index,
                    name: `${month}月`,
                    str: month,
                    active: false
                  }
                ) : ''
              })
            } else {
              allYear.unshift({
                name: year,
                children: [
                  {
                    id: index,
                    name: `${month}月`,
                    str: month,
                    active: false
                  }
                ]
              })
            }
          });
          if (allYear.length) {
            localStorage.setItem('yearData', JSON.stringify(allYear));
          }
        })
      }
    }
  }
</script>

<style scoped lang="less">
  @import "../../Common/Less/index";
  
  .menu-wrap {
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center center;
    .bg-img('/static/img/body-bg/1');
    
    .menu-content-wrap {
      height: calc(100% - 44px);
      position: relative;
      
      .menu-items {
        padding: 0 10px;
        width: 100%;
        height: 43%;
        position: absolute;
        top: 55%;
        display: flex;
        
        .items {
          height: 100%;
          flex: 1;
          margin-right: 10px;
          position: relative;
          display: flex;
          flex-direction: column;
          
          .items-title {
            height: 55px;
            line-height: 55px;
            border-radius: 50px;
            padding-right: 8%;
            position: relative;
            display: flex;
            align-items: center;
            z-index: 99;
            
            i, b {
              display: inline-block;
              vertical-align: middle;
            }
            
            i {
              width: 32px;
              height: 32px;
              margin: 0 8% 0 10%;
              border-radius: 50%;
              background-repeat: no-repeat;
              background-position: center;
              
              &.production {
                background-color: #215ACB;
                background-size: 24px 21px;
                .bg-img('/static/img/menu/production');
              }
              
              &.application {
                background-color: #D39010;
                background-size: 20px 19px;
                .bg-img('/static/img/menu/application');
              }
            }
            
            span {
              flex: 1;
              font-size: @font-16;
              text-align: left;
              color: white;
              z-index: 1;
              @media screen and (max-width: 325px) {
                font-size: 12px;
              }
            }
            
            b {
              width: 10px;
              height: 10px;
              background-repeat: no-repeat;
              background-size: 100% auto;
              background-position: center center;
              .bg-img('/static/img/menu/select');
              transform: rotate(-90deg);
              
              &.active {
                transform: rotate(0deg);
              }
            }
          }
          
          .items-list-wrap {
            overflow: hidden;
            background: #2656b5;
            position: absolute;
            left: 0;
            right: 0;
            top: 35px;
            bottom: 0;
            padding-top: 25px;
            border-radius: 0 0 23px 23px;
            z-index: 10;
            
            p {
              height: 40px;
              color: white;
              text-align: left;
              padding-left: 20px;
              display: flex;
              justify-content: center;
              align-items: center;
              @media screen and (max-width: 325px) {
                padding-left: 10px;
              }
              
              i {
                display: inline-block;
              }
              
              i {
                width: 15px;
                height: 15px;
                margin-right: 10px;
                background-size: 15px;
                background-position: center;
                background-repeat: no-repeat;
                @media screen and (max-width: 325px) {
                  margin-right: 5px;
                }
                
                &.orthogon {
                  .bg-img('/static/img/menu/orthogon')
                }
              }
              
              span {
                flex: 1;
              }
            }
          }
          
          
          &:first-child {
            .items-title {
              background-color: #3F7FFF;
            }
          }
          
          &:last-child {
            margin-right: 0;
            
            .items-title {
              background-color: #FFC410;
            }
            
            background-image: none;
          }
        }
      }
    }
  }
</style>
