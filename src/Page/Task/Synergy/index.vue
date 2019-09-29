<template>
  <div class="backlog-synergy-wrap common-width">
    <div class="backlog-synergy-content-wrap">
      <b-scroll>
        <div class="backlog-synergy">

          <div class="list-items-wrap">
            <p class="title">五级地址:</p>
            <div class="list-items">
              <div class="text-wrap" v-text="address"></div>
            </div>
          </div>

          <div class="list-items-wrap" v-if="problemData.length">
            <p class="title">协同内容:</p>
            <div class="list-items">
              <div class="text-wrap" v-for="(items, index) in problemData" :key="index">
                <span>{{index + 1}},</span>
                <span>{{items}}</span>
              </div>
            </div>
          </div>

          <div class="list-items-wrap" v-if="problemData.length">
            <p class="title">处理意见:</p>
            <div class="list-items">
              <div class="opinion-wrap">
                <textarea placeholder="请输入处理意见(选填)" v-model="text"></textarea>
              </div>
            </div>
          </div>

          <div class="btn-wrap">
            <span class="error" @click="_doSomeApi(1)">驳 回</span>
            <span @click="_doSomeApi(0)">完 成</span>
          </div>
        </div>
      </b-scroll>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'Element/BScroll';

  export default {
    components: {
      BScroll,
    },
    data() {
      return {
        address: '',
        problemData: [],
        text: ''
      }
    },
    computed: {},
    mounted() {
      let sendData = JSON.parse(localStorage.getItem('sendData')) || null;
      if (sendData) {
        this.address = sendData.address;
        this.problemData = sendData.issue.split(',');
      }
    },
    methods: {
      _doSomeApi(n) {
        const _self = this;
        let url = n ? '/synergyorder/reject' : '/synergyorder/handle';
        if (n) {
          if (_self.text.trim() === '') {
            _self.$dialog.alert({
              message: '请填写驳回的理由'
            });
            return;
          }
        }
        _self.$post(url, {
          handlingSuggestion: _self.text,
          id: JSON.parse(localStorage.getItem('sendData')).id
        }).then(() => {
          localStorage.setItem('removeSendData', true);
          _self.$router.go(-1);
        })
      }
    }
  }
</script>

<style scoped lang="less">
  @import "../../../Common/Less/index";

  .backlog-synergy-wrap {
    display: flex;
    flex-direction: column;

    .backlog-synergy-content-wrap {
      flex: 1;
      padding: 10px;

      .backlog-synergy {
        .list-items-wrap {
          line-height: 1.7;
          margin-top: 20px;

          &:first-child {
            margin-top: 0;
          }

          .title {
            font-size: @font-14;
          }

          .list-items {
            background: #f2f3f7;
            padding: 5px;
            border-radius: 8px;

            .text-wrap {
              padding-left: 5px;
              font-size: @font-14;
              color: @not-data-color;
              margin-bottom: 5px;

              &:last-child {
                margin-bottom: 0;
              }
            }

            .opinion-wrap {
              textarea {
                width: 100%;
                height: 150px;
                resize: none;
                border: 0;
                padding: 5px 8px;
                font-size: @font-14;
              }
            }

            &:last-child {
              padding-bottom: 0;
            }
          }
        }
      }

      .btn-wrap {
        display: flex;
        justify-content: center;
        padding: 10px;

        span {
          display: inline-block;
          padding: 8px 20px;
          border-radius: 5px;
          font-size: @font-12;
          background: #2572d8;
          color: @color-white;
          user-select: none;
          cursor: pointer;
          margin-right: 30px;

          &.error {
            /*background: red;*/
          }

          &:last-child {
            margin-right: 0;
          }
        }
      }
    }
  }
</style>
