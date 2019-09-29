<template>
  <div class="list-wrap bg-wrap">
    <div class="list-items-wrap">
      <div
        class="list-items"
        v-for="(items, index) in menuList[0].route" :key="index">
        <div class="menu" @click.stop="_click(items, index)">
          <i></i>
          <span v-text="items.meta.title"></span>
          <b></b>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      isLink: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        menuList: [
          {
            name: '智慧生产',
            active: false,
            route: this.$router.options.routes[0].children[0].children[0].children.filter(items => {
              return items.path !== '/' && items.path !== 'test' && items.path !== '*';
            })
          },
          {
            name: '智慧应用',
            active: false,
            route: []
          }
        ]
      }
    },
    mounted() {
      this._getYearAndMonthApi();
    },
    methods: {
      _clickMenu(obj, n) {
        if (obj.route.length) {
          this.menuList.forEach((items, index) => {
            index === n ? items.active = !items.active : items.active = false;
          })
        } else {
          this.menuList.forEach(items => {
            items.active = false;
          })
        }
      },
      _click(obj, n) {
        let roleData = JSON.parse(localStorage.getItem('role')) || null;
        let level = this._setRole(roleData);
        let month = new Date().getMonth() + 1 < 10 ? '0' + (new Date().getMonth() + 1) : new Date().getMonth() + 1;
        let date = `${new Date().getFullYear()}-${month}`;
        let path = '';
        switch (level) {
          case 1:
            path = obj.path;
            break;
          case 2:
            path = `${obj.path}/${date}/0/${roleData.branch}`;
            break;
          case 3:
            path = `${obj.path}/${date}/0/${roleData.branch}/grid/${roleData.gridding}`;
            break;
        }
        if (n) {
          this.$router.push(`/menu/index/${obj.path}`);
        } else {
          this.$router.push(`/menu/index/${path}`);
        }
      },
      _setRole(obj) {
        if (obj.role === 1) {
          return 1;
        }
        if (obj.role === 2 && obj.branch && obj.branch.trim() !== '' && obj.gridding && obj.gridding.trim() !== '' && !obj.field) {
          return 2;
        }
        return 3;
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
  @import "../../Less/index.less";
  
  .list-wrap {
    width: 100%;
    height: calc(100% - 45px);
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center center;
    display: flex;
    justify-content: center;
    align-items: center;
    
    .list-items-wrap {
      width: 80%;
      
      .list-items {
        width: 100%;
        
        color: @color-white;
        position: relative;
        border-radius: 5px;
        overflow: hidden;
        cursor: pointer;
        user-select: none;
        margin-top: 9%;
        
        .menu {
          height: 70px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          
          i, span, b {
            display: inline-block;
            vertical-align: middle;
          }
          
          i {
            width: 25px;
            height: 25px;
            margin: 0 5% 0 10%;
            background-repeat: no-repeat;
            background-size: 100% 100%;
          }
          
          span {
            flex: 1;
            font-size: @font-17;
            text-align: left;
          }
          
          b {
            width: 10px;
            height: 20%;
            margin: 0 7% 0 2%;
            background-repeat: no-repeat;
            background-size: 100% auto;
            background-position: center center;
            .bg-img('/static/img/next');
            &.active {
              transform: rotate(90deg);
            }
          }
        }
        
        .items {
          padding: 10px 20px;
          p {
            height: 40px;
            line-height: 40px;
            font-size: 14px;
            position: relative;
            &:after {
              display: block;
              content: '';
              width: 6px;
              height: 12px;
              position: absolute;
              top: 14px;
              right: 0;
              background-repeat: no-repeat;
              background-size: 100% auto;
              background-position: center center;
              .bg-img('/static/img/next');
            }
          }
        }
        
        
        &:nth-child(1) {
          background: linear-gradient(#fce55c, #fdbc4f);
          
          i {
            .bg-img('/static/img/btn/icon-gridding');
          }
        }
        
        &:nth-child(2) {
          background: linear-gradient(#43d0fb, #40acf7);
          
          i {
            .bg-img('/static/img/btn/icon-wait');
          }
        }
      }
    }
  }
</style>
