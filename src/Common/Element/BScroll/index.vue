<template>
  <div class="wrapper" ref="wrapper">
    <div class="scroll-content">
      <slot></slot>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll'
  
  export default {
    props: {
      probeType: {
        type: Number,
        default: 1
      },
      click: {
        type: Boolean,
        default: true
      },
      scrollX: {
        type: Boolean,
        default: false
      },
      listenScroll: {
        type: Boolean,
        default: false
      },
      data: {
        type: Array,
        default: () => []
      },
      pullup: {
        type: Boolean,
        default: false
      },
      pulldown: {
        type: Boolean,
        default: false
      },
      beforeScroll: {
        type: Boolean,
        default: false
      },
      refreshDelay: {
        type: Number,
        default: 20
      },
      scrollbar: {
        type: Boolean,
        default: true
      }
    },
    mounted() {
      setTimeout(() => {
        this._initScroll()
      }, 20)
    },
    methods: {
      _initScroll() {
        if (!this.$refs.wrapper) {
          return
        }
        this.scroll = new BScroll(this.$refs.wrapper, {
          probeType: this.probeType,
          click: this.click,
          scrollX: this.scrollX,
          scrollbar: this.scrollbar ? {
            fade: true,
            interactive: false
          } : null
        });
        
        if (this.listenScroll) {
          let me = this;
          this.scroll.on('scroll', (pos) => {
            me.$emit('scroll', pos, me.scroll.maxScrollY)
          })
        }
        
        if (this.pullup) {
          this.scroll.on('scrollEnd', () => {
            if (this.scroll.y <= this.scroll.maxScrollY) {
              this.$emit('scrollToEnd')
            }
          })
        }
        
        if (this.pulldown) {
          this.scroll.on('touchend', (pos) => {
            if (pos.y > 20) {
              this.$emit('pulldown')
            }
          })
        }
        
        if (this.beforeScroll) {
          this.scroll.on('beforeScrollStart', () => {
            this.$emit('beforeScroll')
          })
        }
      },
      disable() {
        this.scroll && this.scroll.disable()
      },
      enable() {
        this.scroll && this.scroll.enable()
      },
      refresh() {
        this.scroll && this.scroll.refresh()
      },
      scrollTo() {
        this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments)
      },
      scrollToElement() {
        this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments)
      }
    },
    watch: {
      data() {
        let { refresh, refreshDelay } = this;
        setTimeout(() => {
          refresh()
        }, refreshDelay);
      }
    }
  }
</script>

<style scoped lang="less">
  .wrapper {
    width: 100%;
    height: 100%;
    overflow: hidden;
    position: relative;
    
    .scroll-content {
      padding-bottom: 20px;
      width: 100%;
      position: absolute;
    }
  }
</style>
