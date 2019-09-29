<template>
  <div class="participation-wrap common-width">
  
    <div class="update-wrap" v-if="updateText !== ''" v-text="updateText"></div>
  
    <div class="content-wrap">
      <div class="new-table-list-wrap">
        <new-table :columns="columns" :data="tBody"/>
      </div>
    </div>
    
    <transition name="slide">
      <router-view/>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
  import NewTable from 'Element/NewTable';
  import { numberComma } from "Common/Js";
  import { getAddPathFromCapacityDitchApi } from '../../../../../Fetch/port';
  
  export default {
    components: {
      NewTable
    },
    data() {
      const _self = this;
      return {
        tBody: [],
        columns: [
          {
            "title": "分公司",
            "key": "name",
            "fixed": "",
            "width": 100,
            "align": "center",
            render: (h, params) => {
              return h(
                'div',
                params.row.isFooter ? {
                  attrs: {
                    class: 'table-total'
                  }
                } : {
                  attrs: {
                    class: 'can-click'
                  },
                  on: {
                    click: () => {
                      _self._trClick(params.row);
                    }
                  }
                },
                params.row.name
              )
            }
          },
          {
            "title": "渠道总数",
            "key": "trenchAmount",
            "width": 80,
            "align": "center",
            render: (h, params) => {
              return h(
                'div',
                params.row.isFooter ? {
                  attrs: {
                    class: 'table-total'
                  }
                } : {},
                numberComma(params.row.trenchAmount)
              )
            }
          },
          {
            "title": "零产能渠道数",
            "key": "zeroCapacityTrenchAmount",
            "width": 90,
            "align": "center",
            render: (h, params) => {
              return h(
                'div',
                params.row.isFooter ? {
                  attrs: {
                    class: 'table-total'
                  }
                } : {},
                numberComma(params.row.zeroCapacityTrenchAmount)
              )
            }
          },
          {
            "title": "占比%",
            "key": "proportion",
            "width": 60,
            "align": "center",
            render: (h, params) => {
              return h(
                'div',
                params.row.isFooter ? {
                  attrs: {
                    class: 'table-total'
                  }
                } : {},
                numberComma(params.row.proportion)
              )
            }
          },
          {
            "title": "月环比%",
            "key": "monthChainRelativeRatio",
            "width": 80,
            "align": "center",
            render: (h, params) => {
              return h(
                'div',
                params.row.isFooter ? {
                  attrs: {
                    class: 'table-total'
                  }
                } : {},
                numberComma(params.row.monthChainRelativeRatio)
              )
            }
          }
        ],
        updateText: ''
      }
    },
    mounted() {
      const _self = this;
      getAddPathFromCapacityDitchApi(res => {
        _self.updateText = res.description;
        _self.tBody = [...res.data, {
          isFooter: true,
          name: '合计',
          trenchAmount: res.statistics.trenchAmount,
          zeroCapacityTrenchAmount: res.statistics.zeroCapacityTrenchAmount,
          proportion: res.statistics.proportion,
          monthChainRelativeRatio: res.statistics.monthChainRelativeRatio
        }];
        _self.columns[0].fixed = 'left';
      });
      
      let { role, branch, gridding } = JSON.parse(localStorage.getItem('role'));
      let { path } = _self.$route;
      switch (role) {
        case 1:
      
          break;
        case 2:
          _self.$router.replace(`${path}/street/${branch}`);
          break;
        case 3:
          _self.$router.replace(`${path}/street/${branch}/person/${gridding}`);
          break;
      }
    },
    methods: {
      _trClick(obj) {
        let { path } = this.$route;
        this.$router.push(`${path}/street/${obj.name}`)
      }
    }
  }
</script>

<style scoped lang="less">
  .participation-wrap {
    display: flex;
    flex-direction: column;
    
    .update-wrap {
      padding: 0 10px 5px;
      text-align: right;
    }
    
    .content-wrap {
      flex: 1;
    }
  }
</style>
