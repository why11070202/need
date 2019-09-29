<template>
  <div class="new-table-wrap" ref="pWrap">
    <Table :height="tableHeight" :columns="columns" :data="data" border size="small" ref="cTable"></Table>
  </div>
</template>

<script type="text/ecmascript-6">
  import { Table } from 'iview';
  import 'iview/dist/styles/iview.css';
  
  export default {
    components: {
      Table
    },
    props: {
      columns: {
        type: Array,
        default: () => []
      },
      data: {
        type: Array,
        default: () => []
      },
    },
    data() {
      return {
        tableHeight: null
      }
    },
    mounted() {
    
    },
    methods: {},
    watch: {
      data() {
        if ((this.$refs.pWrap.clientHeight - 20) / 40 < this.data.length) {
          this.tableHeight = this.$refs.pWrap.clientHeight;
        }
      },
      columns(newValue, oldValue) {
      
      }
    }
  }
</script>

<style lang="less">
  @import "../../Less/index";
  
  .new-table-wrap {
    width: 100%;
    height: 100%;
    overflow: hidden;
    
    .ivu-table-wrapper {
      .ivu-table-cell {
        padding-left: 5px;
        padding-right: 5px;
      }
      
      .ivu-table {
        &:before {
          z-index: 9;
        }
        
        table {
          th, td {
            font-size: 12px;
          }
          
          th {
            font-weight: normal;
          }
          
          .can-click {
            color: #2a71cf;
            user-select: none;
            cursor: pointer;
          }
          
          .table-total {
            color: #210694;
          }
          
          .lamp {
            line-height: 16px;
            position: relative;
            vertical-align: bottom;
            
            &:before {
              content: '';
              display: inline-block;
              width: 15px;
              height: 15px;
              vertical-align: top;
              background-position: center;
              background-size: 15px;
              background-repeat: no-repeat;
              margin-right: 5px;
            }
            
            &.lamp-1 {
              &:before {
                .bg-img('/static/img/lamp/green');
              }
            }
            
            &.lamp-2 {
              &:before {
                .bg-img('/static/img/lamp/yellow');
              }
            }
            
            &.lamp-3 {
              &:before {
                .bg-img('/static/img/lamp/red');
              }
            }
          }
        }
      }
    }
  }
</style>
