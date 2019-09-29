<template>
  <div class="text-wrap common-width">
    <headers showRight />
    <div class="text-content-wrap">
      <b-scroll>
        <div class="list" v-html="text"></div>
      </b-scroll>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import Headers from 'Element/Headers';
  import BScroll from 'Element/BScroll';
  export default {
    components: {
      Headers,
      BScroll
    },
    data() {
      return {
        text: null
      }
    },
    computed: {
      
    },
    mounted() {
      const _self = this;
      this.$post('/event/findByCheckItemAndTrenchType', {
        checkItem: _self.$route.params.source,
        trenchType: _self.$route.params.sourceType
      }).then(res => {
        if (res && res.eventDetail) {
          _self.text = res.eventDetail;
        }
      })
    },
    methods: {
      
    }
  }
</script>

<style scoped lang="less">
  .text-wrap {
    display: flex;
    flex-direction: column;
    .text-content-wrap {
      flex: 1;
      .list {
        padding: 5px;
        font-size: 14px;
        line-height: 1.7;
      }
    }
  }
</style>
