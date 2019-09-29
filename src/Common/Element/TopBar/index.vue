<template>
  <div class="bar-wrap" ref="barWrap">
    <div class="nav-wrap" ref="navWrap">
      <div
        class="nav-items"
        v-for="(items, index) in data"
        v-text="items.name"
        :key="index"
        :class="{'active': items.active}"
        @click="_barClick(index)">
      </div>
      <div class="nav-line" ref="line" :style="{width: `${width}px`}"></div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import BScroll from "better-scroll";

  const REFRESHWIDTH = 60;
  let WINDOW_WIDTH = document.body.clientWidth, moveX = 0, WIDTH = Math.floor(WINDOW_WIDTH / 5);
  export default {
    props: {
      data: {
        type: Array,
        default: () => []
      }
    },
    data() {
      return {
        width: WIDTH
      }
    },
    mounted() {
      const _self = this;
      _self.$nextTick(() => {
        _self.personScroll();
      });
    },
    methods: {
      personScroll() {
        let _self = this, len = _self.data.length;
        let childrenNode = _self.$refs.navWrap.querySelectorAll('.nav-items');
        for (let i = 0; i < len; i++) {
          childrenNode[i].style.width = `${WIDTH}px`;
        }
        let width = len * WIDTH;
        _self.$refs.navWrap.style.width = width + "px";
        _self.$nextTick(() => {
          _self.scroll = new BScroll(this.$refs.barWrap, {
            probeType: 1,
            startX: moveX,
            click: true,
            scrollX: true,
            scrollY: false
          });
          if (_self.data.length) {
            let activeIndex = null;
            _self.data.forEach((item, index) => {
              if (item.active) {
                activeIndex = index;
              }
            });
            if (activeIndex === null) {
              activeIndex = len - 1;
            }
            _self._barClick(activeIndex);
          }
        });
      },
      _barClick(n) {
        n < 0 ? n = 0 : '';
        const _self = this;
        _self.data.forEach((items, index) => {
          index === n ? items.active = true : items.active = false
        });
        if (n > 1) {
          moveX = (-n) * WIDTH;
        } else {
          moveX = 0;
        }
        if (moveX < _self.scroll.maxScrollX) {
          moveX = _self.scroll.maxScrollX;
        }
        _self.$refs.line.style.left = `${n * WIDTH}px`;
        _self.scroll.scrollTo(moveX, 0, 200);
        _self.$emit('barClick', _self.data[n]);
      }
    },
    destroyed () {
      this.scroll.destroy();
    },
    watch: {
      data() {
        const _self = this;
        setTimeout(() => {
          _self.personScroll();
        }, 20);
      }
    }
  }
</script>

<style scoped lang="less">
  @import '../../Less/index.less';

  .bar-wrap {
    width: 100%;
    position: relative;

    .nav-wrap {
      height: 35px;
      overflow: hidden;
      font-size: 0;
      position: relative;

      .nav-items {
        display: inline-block;
        font-size: 14px;
        height: 35px;
        line-height: 35px;
        text-align: center;
        color: rgba(255, 255, 255, 0.5);
        cursor: pointer;
        user-select: none;

        &.active {
          color: rgba(255, 255, 255, 1);
        }
      }

      .nav-line {
        position: absolute;
        left: 0;
        bottom: 1px;
        height: 2px;
        background: @color-white;
        transition: left 300ms ease-in;
      }
    }
  }
</style>
