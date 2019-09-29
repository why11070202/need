<template>
  <div class="task-wrap common-width">
    <headers showRight />
    <div class="task-view-wrap">

      <div class="task-tabs-wrap">
        <div
          v-for="(items, index) in tabsData"
          :key="index"
          :class="items.active ? `${items.className} active` : items.className"
          @click="_tabClick(items, index)">
          <i></i>
          <span v-text="items.name"></span>
        </div>
      </div>

      <div class="view-wrap">
        <already v-show="tabIndex === 2" />
        <backlog v-show="tabIndex === 1" />
        <find-address  v-show="!tabIndex" />
      </div>

      <transition name="slide">
        <router-view/>
      </transition>

    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import Headers from 'Element/Headers';
  import Already from './Already';
  import Backlog from './Backlog';
  import FindAddress from './FindAddress';

  export default {
    components: {
      Headers,
      Already,
      Backlog,
      FindAddress,
    },
    data() {
      return {
        tabIndex: 0,
        tabsData: [
          {
            name: '协同工作',
            active: true,
            tabIndex: 0,
            className: 'a'
          },
          {
            name: '我的待办',
            active: false,
            tabIndex: 1,
            className: 'b'
          },
          {
            name: '我的已办',
            active: false,
            tabIndex: 2,
            className: 'c'
          }
        ]
      }
    },
    methods: {
      _tabClick(obj) {
        this.tabsData.forEach(items => {
          items.name === obj.name ? items.active = true : items.active = false;
        });
        this.tabIndex = obj.tabIndex;
      }
    }
  }
</script>

<style scoped lang="less">
  @import "../../Common/Less/index";

  .task-wrap {
    .task-view-wrap {
      height: calc(100% - 45px);
      position: relative;

      .task-tabs-wrap {
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
