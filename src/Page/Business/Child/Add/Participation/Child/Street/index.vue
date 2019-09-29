<template>
  <div class="street-wrap common-width">
  
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
  import { getAddPathFromCapacityStreetApi } from "../../../../../../../Fetch/port";
  
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
            "title": "网格",
            "key": "name",
            "fixed": "",
            "width": 90,
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
      getAddPathFromCapacityStreetApi({
        branch: _self.$route.params.district
      },res => {
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
      })
    },
    methods: {
      _trClick(obj) {
        let { path } = this.$route;
        let name = obj.name.replace(/#/g, '@').replace(/\//g, '-');
        this.$router.push(`${path}/person/${name}`);
      }
    }
  }
</script>

<style scoped lang="less">
  .street-wrap {
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
