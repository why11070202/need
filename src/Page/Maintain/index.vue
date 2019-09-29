<template>
  <div class="maintain-wrap common-width">
    <headers showRight />
    <div class="maintain-view-wrap">
      <div class="maintain-tabs-wrap">
        <div
          v-for="(items, index) in tabsData"
          :key="index"
          :class="items.active ? `${items.className} active` : items.className"
          @click="_tabClick(items, index)"
        >
          <i></i>
          <span v-text="items.name"></span>
        </div>
      </div>

      <div class="view-wrap">
        <Single v-show="!tabIndex" />
        <Report v-show="tabIndex === 1" />
      </div>

      <transition name="slide">
        <router-view />
      </transition>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import Headers from "Element/Headers";
import Single from "./Single";
import Report from "./Report";
export default {
  components: {
    Headers,
    Single,
    Report
  },
  data() {
    return {
      tabIndex: 0,
      tabsData: [
        {
          name: "营装维进度",
          active: true,
          tabIndex: 0,
          className: "a"
        },
        {
          name: "报表统计",
          active: false,
          tabIndex: 1,
          className: "b"
        }
      ]
    };
  },
  methods: {
    _tabClick(obj) {
      this.tabsData.forEach(items => {
        items.name === obj.name
          ? (items.active = true)
          : (items.active = false);
      });
      this.tabIndex = obj.tabIndex;
    }
  }
};
</script>
<style lang='less' scoped>
 @import "../../Common/Less/index";

  .maintain-wrap {
    .maintain-view-wrap {
      height: calc(100% - 45px);
      position: relative;

      .maintain-tabs-wrap {
        padding: 10px 5px;
        display: flex;
        user-select: none;
        cursor: pointer;

        div {
          flex: 1;
          margin-right: 5px;
          text-align: center;
          line-height: 35px;
          border-radius: 5px;
          background: #d4e3ee;
          color: #333333;
          font-size: 0;

          i, span {
            display: inline-block;
            vertical-align: middle;
          }

          i {
            width: 16px;
            height: 16px;
            margin-right: 5px;
            background-repeat: no-repeat;
            background-position: center center;
            background-size: auto 16px;
          }

          span {
            font-size: @font-12;
          }

          &.a {
            i {
              .bg-img('/static/img/btn/handshake-black');
            }

            &.active {
              i {
                .bg-img('/static/img/btn/handshake-white');
              }
            }
          }

          &.b {
            i {
              .bg-img('/static/img/btn/backlog-black');
            }

            &.active {
              i {
                .bg-img('/static/img/btn/backlog-white');
              }
            }
          }

          &.c {
            i {
              .bg-img('/static/img/btn/already-black');
            }

            &.active {
              i {
                .bg-img('/static/img/btn/already-white');
              }
            }
          }

          &.active {
            background: linear-gradient(#31c6ee, #299ce6);
            color: white;
          }

          &:last-child {
            margin-right: 0;
          }
        }
      }

      .view-wrap {
        height: calc(100% - 55px);
        position: relative;
      }
    }
  }
</style>
