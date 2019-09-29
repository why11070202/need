<template>
  <div class="add-time-street-wrap common-width">
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
  import { getAddTimeFromStreetApi } from '../../../../../../../Fetch/port';
  
  export default {
    components: {
      NewTable
    },
    data() {
      const _self = this;
      let { role, gridding } = JSON.parse(localStorage.getItem('role'));
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
              if (params.row.isFooter) {
                return h(
                  'div',
                  {
                    attrs: {
                      class: 'table-total'
                    }
                  },
                  params.row.name
                )
              }
              return h(
                'div',
                {
                  attrs: {
                    class: role === 1 ? 'can-click' : role === 2 ? params.row.name === gridding ? 'can-click' : '' : ''
                  },
                  on: {
                    click: () => {
                      if (role === 1 || (role === 2 && params.row.name === gridding)) {
                        _self._trClick(params.row);
                      }
                    }
                  }
                },
                params.row.name
              )
            }
          },
          {
            "title": "一周",
            "key": "one",
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
                params.row.one ? params.row.one.toFixed(3) : '-'
              )
            }
          },
          {
            "title": "两周",
            "key": "two",
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
                params.row.two ? params.row.two.toFixed(3) : '-'
              )
            }
          },
          {
            "title": "三周",
            "key": "three",
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
                params.row.three ? params.row.three.toFixed(3) : '-'
              )
            }
          },
          {
            "title": "四周",
            "key": "four",
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
                params.row.four ? params.row.four.toFixed(3) : '-'
              )
            }
          },
          {
            "title": "五周",
            "key": "five",
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
                params.row.five ? params.row.five.toFixed(3) : '-'
              )
            }
          }
        ],
        updateText: ''
      }
    },
    mounted() {
      const _self = this;
      getAddTimeFromStreetApi({
        branch: _self.$route.params.district
      }, res => {
        _self.updateText = res.description;
        _self.tBody = [...res.data.map(items => {
          let obj = {
            name: items.name,
            one: items.timeProgress[0],
            two: items.timeProgress[1],
            three: items.timeProgress[2],
            four: items.timeProgress[3],
            five: items.timeProgress[4]
          };
          return obj;
        }), {
          isFooter: true,
          name: '合计',
          one: res.statistics.timeProgress[0],
          two: res.statistics.timeProgress[1],
          three: res.statistics.timeProgress[2],
          four: res.statistics.timeProgress[3],
          five: res.statistics.timeProgress[4]
        }];
        _self.columns[0].fixed = 'left';
      })
    },
    methods: {
      _trClick(obj) {
        let { path } = this.$route;
        this.$router.push(`${path}/person/${obj.name}`);
      }
    }
  }
</script>

<style scoped lang="less">
  .add-time-street-wrap {
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
