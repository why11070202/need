<template>
  <div class="already-detail-wrap common-width">
    <div class="already-detail-content-wrap">
      <b-scroll>
        <div class="already-detail">
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
                <span>{{index + 1}}、</span>
                <span>{{items}}</span>
              </div>
            </div>
          </div>

          <div class="list-items-wrap" v-if="problemData.length">
            <p class="title">处理意见:</p>
            <div class="list-items">
              <div class="text-wrap" v-text="text"></div>
            </div>
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
      let sendData = JSON.parse(localStorage.getItem('sendData'));
      this.address = sendData.address;
      this.problemData = sendData.issue.split(',');
      this.text = sendData.handlingSuggestion === '' ? '无' : sendData.handlingSuggestion;
    }
  }
</script>

<style scoped lang="less">
  @import "../../../Common/Less/index";

  .already-detail-wrap {
    display: flex;
    flex-direction: column;

    .already-detail-content-wrap {
      flex: 1;
      padding: 10px;

      .already-detail {
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
            }

            .opinion-wrap {
              textarea {
                width: 100%;
                height: auto;
                resize: none;
                border: 0;
                padding: 5px 8px;
                font-size: @font-14;
                background: #f2f3f7;
                color: #333;
              }
            }
          }
        }
      }
    }
  }
</style>
