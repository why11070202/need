<template>
  <div class="source-wrap common-width">
    <headers showRight/>
    <div class="other-title-wrap" v-html="_setTitle"></div>
    <div class="next-content-wrap">
      <v-table
        :tHeader="tHead"
        :tBody="tBody"
        :isLinkNumberMax="isLinkNumberMax"
        @trClick="_trClick"
      />
    </div>
    <transition name="slide">
      <router-view/>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
  import Headers from 'Element/Headers';
  import VTable from 'Element/VTable';
  import {numberComma} from 'Common/Js';

  export default {
    components: {
      Headers,
      VTable,
    },
    data() {
      return {
        isLinkNumberMax: 100,
        year: this.$route.params.month.split('-')[0],
        month: this.$route.params.month.split('-')[1],
        tHead: ['', '目标值', '完成值', '完成率'],
        tBody: []
      }
    },
    computed: {
      _setTitle() {
        return `
          <p>${this.$route.params.user} ${this.month}月 销售收入</p>
          <p>-- ${this.$route.params.incomeItem}</p>
          <p>-- ${this.$route.params.source}</p>
        `;
      }
    },
    mounted() {
      this._getApi();
    },
    methods: {
      _trClick(obj) {
        this.$router.push(`${this.$route.path}/${obj.name}`)
      },
      _getApi() {
        const _self = this;
        _self.$post('/incomecheckprogress/findSalesGroupByTrenchType', {
          month: `${_self.year}-${_self.month}`,
          branch: _self.$route.params.name,
          gridding: _self.$route.params.street,
          managerAccount: localStorage.getItem('name'),
          incomeItem: _self.$route.params.incomeItem,
          checkItem: _self.$route.params.source
        }).then(res => {
          _self.tHead[0] = res.boxhead;
          _self.tBody = [];
          res.data.forEach(items => {
            _self.tBody.push({
              name: items.name,
              text: [
                items.name,
                numberComma(items.goal),
                numberComma(items.complete),
                _self._setColor(items.percentageComplete, items.timeProgressType)
              ]
            })
          })
        })
      },
      _setColor (n, i) {
        if (i === 1) {
          if (!n) {
            return '-';
          }
          return `<i class="icon-color green-color"></i><span class="green-color">${numberComma(n)}%</span>`;
        } else if (i === 2) {
          if (!n) {
            return '-';
          }
          return `<i class="icon-color yellow-color"></i><span class="yellow-color">${numberComma(n)}%</span>`;
        } else if (i === 3) {
          if (!n) {
            return '-';
          }
          return `<i class="icon-color red-color"></i><span class="red-color">${numberComma(n)}%</span>`;
        }
      }
    }
  }
</script>

<style scoped lang="less">
  .source-wrap {
    display: flex;
    flex-direction: column;
    .other-title-wrap {
      width: 100%;
      height: auto;
      padding: 10px;
      text-align: center;
      font-size: 14px;
      line-height: 1.7em;
    }
    .next-content-wrap {
      flex: 1;
    }
  }
</style>
