<template>
  <div class="address-wrap common-width">
    <headers showRight/>
    <div class="other-title-wrap" v-html="_setTitle"></div>
    <div class="next-content-wrap" v-if="false">
      <v-table
        :tHeader="tHead"
        :tBody="tBody"
        :isLinkNumberMax="isLinkNumberMax"
      />
    </div>
    <div class="problem-wrap">
      <div class="title" v-if="problemData.length">社区涉及问题：</div>
      <ul v-if="problemData.length">
        <li v-for="(items, index) in problemData" :key="index" v-text="items"></li>
      </ul>
    </div>
    <div class="btn-wrap" @click="_next">
      <i></i>
      <span>发起协同</span>
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
        isLinkNumberMax: 1,
        tHead: ['工单号', '状态', '当前处理人', '联系方式'],
        tBody: [],
        problemData: []
      }
    },
    computed: {
      _setTitle() {
        const nowDate = this.$route.params.month.split('-');
        return `
          <p>${this.$route.params.user} ${Number(nowDate[1])}月 销售收入</p>
          <p>-- ${this.$route.params.incomeItem}</p>
          <p>-- ${this.$route.params.source}</p>
          <p>-- ${this.$route.params.sourceType}</p>
          <p>-- ${this.$route.params.address}</p>
        `;
      }
    },
    mounted() {
      this._getAddressProblemApi();
    },
    methods: {
      _next() {
        this.$router.push(`${this.$route.path}/synergia`)
      },
      _getAddressProblemApi(){
        const _self = this;
        _self.$post('/communityissue/find', {
          branch: _self.$route.params.name,
          gridding: _self.$route.params.street,
          trenchType: _self.$route.params.sourceType,
          addressId: localStorage.getItem('addressId')
        }).then(res => {
          _self.problemData = res;
        })
      },
      _getApi() {
        const _self = this;
        _self.$post('/incomecheckprogress/findSalesGroupByTrenchName', {
          month: _self.$route.params.month,
          branch: _self.$route.params.name,
          gridding: _self.$route.params.street,
          managerAccount: localStorage.getItem('name'),
          incomeItem: _self.$route.params.incomeItem,
          checkItem: _self.$route.params.source,
          trenchType: _self.$route.params.sourceType
        }).then(res => {
          _self.tBody = [];
          res.data.forEach(items => {
            _self.tBody.push({
              name: items.name,
              text: [
                items.name,
                numberComma(items.goal),
                numberComma(items.complete),
                numberComma(items.percentageComplete)
              ]
            })
          })
        })
      }
    }
  }
</script>

<style scoped lang="less">
  @import "../../../../Common/Less/index";
  .address-wrap {
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
      height: 150px;
    }
    .problem-wrap {
      flex: 1;
      padding: 0 10px;
      .title {
        font-size: @font-14;
        line-height: 1.7;
      }
      ul {
        padding-left: 5px;
        li {
          margin-top: 5px;
          font-size: @font-13;
          color: #333;
        }
      }
    }
    .btn-wrap {
      width: 100%;
      height: 45px;
      line-height: 45px;
      text-align: center;
      background: #2572d8;
      color: white;
      user-select: none;
      cursor: pointer;
      i, span {
        display: inline-block;
        vertical-align: middle;
      }
      i {
        width: 20px;
        height: 20px;
        background-size: 100%;
        background-position: center center;
        background-repeat: no-repeat;
        .bg-img('/static/img/btn/hard');
      }
      span {
        font-size: @font-13;
        padding-left: 5px;
      }
    }
  }
</style>
