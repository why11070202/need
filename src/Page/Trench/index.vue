<template>
  <div class="trench-wrap common-width">
    <headers showRight/>
    
    <div class="top-date-wrap">
      <div class="year-wrap" @click="show = true">{{year}}年</div>
      <div class="month-wrap">
        <top-bar :data="barData" @barClick="_barClick" ref="vbar1"/>
      </div>
    </div>
    
    <div class="search-wrap">
      <div class="items-wrap">
        <span>分公司：</span>
        <div class="select-wrap">
          <select>
            <option value="0">请选择</option>
          </select>
        </div>
      </div>
      <div class="items-wrap">
        <span>网格：</span>
        <div class="select-wrap">
          <select>
            <option value="0">请选择</option>
          </select>
        </div>
      </div>
    </div>
    
    <div class="trench-view-wrap">
      <div class="new-table-list-wrap">
        <new-table :columns="columns" :data="tBody"/>
      </div>
    </div>
    
    
    <van-popup v-model="show" position="bottom">
      <van-picker
        show-toolbar
        :columns="dateList"
        @cancel="onCancel"
        @confirm="onConfirm"
      />
    </van-popup>
  
  </div>
</template>

<script type="text/ecmascript-6">
  import Headers from 'Element/Headers';
  import TopBar from 'Element/TopBar';
  import NewTable from 'Element/NewTable';
  import { findMonthApi, getListApi } from "../../Fetch/trench";
  
  export default {
    components: {
      Headers,
      TopBar,
      NewTable,
    },
    data() {
      return {
        yearAndmonthData: [],
        barData: [],
        year: new Date().getFullYear(),
        month: '',
        show: false,
        dateList: [],
        columns: [
          {
            title: '分类',
            key: 'classification',
            fixed: 'left',
            width: 90,
            colspan: '2',
            align: 'center',
            render: (h, params) => {
              return h(
                'div',
                {},
                !params.row.oIndex ? params.row.classification : ''
              )
            }
          },
          {
            title: '指标项',
            key: 'indicatorItem',
            width: 200,
            align: 'center',
            render: (h, params) => {
              return h(
                'div',
                {
                  style: {
                    'text-align': 'left',
                    'padding-left': '5px'
                  }
                },
                params.row.indicatorItem
              )
            }
          },
          {
            title: '占比 / 总量',
            key: 'indicatorProgress',
            width: 80,
            align: 'center',
            render: (h, params) => {
              return h(
                'div',
                {},
                params.row.indicatorProgress
              )
            }
          },
          {
            title: '月环比%',
            key: 'monthChainRelativeRatio',
            width: 80,
            align: 'center',
            render: (h, params) => {
              return h(
                'div',
                {},
                params.row.monthChainRelativeRatio
              )
            }
          }
        ],
        tBody: []
      }
    },
    created() {
      const _self = this;
      findMonthApi(res => {
        let allYear = [];
        res.forEach((items, index) => {
          let itemsData = items.split('-');
          let year = itemsData[0];
          let month = itemsData[1];
          let hasData = allYear.find(item => {
            return item.name === year
          });
          if (hasData) {
            allYear.forEach(it => {
              it.name === year ? it.children.push(
                {
                  id: index,
                  name: `${month}月`,
                  str: month,
                  active: false
                }
              ) : ''
            })
          } else {
            allYear.unshift({
              name: year,
              children: [
                {
                  id: index,
                  name: `${month}月`,
                  str: month,
                  active: false
                }
              ]
            })
          }
        });
        allYear.forEach((items, index) => {
          _self.dateList.push(items.name);
          if (!index) {
            _self.barData = items.children;
          }
        });
      });
    },
    methods: {
      onCancel() {
        this.show = false;
      },
      onConfirm(value) {
        this.year = value;
        this.onCancel();
      },
      _barClick(obj) {
        if (obj) {
          this.month = obj.str;
        }
      },
      _getListApi() {
        const _self = this;
        getListApi({
          month: `${_self.year}-${_self.month}`
        }, res => {
          let titleArr = [];
          let oIndex = 0;
          res.forEach(items => {
            let hasData = titleArr.find(item => {
              return item === items.classification;
            });
            if (!hasData) {
              oIndex = 0;
              titleArr.push(items.classification)
            } else {
              oIndex++;
            }
            items.oIndex = oIndex
          });
          _self.tBody = [...res];
        })
      }
    },
    watch: {
      month() {
        this._getListApi();
      },
      year(newValue, oldValue) {
        const _self = this;
        if (newValue !== oldValue && oldValue !== '') {
          let yearData = JSON.parse(localStorage.getItem('yearData')) || [];
          yearData.forEach((items) => {
            if (items.name === newValue) {
              _self.barData = items.children;
            }
          });
        }
      }
    }
  }
</script>

<style scoped lang="less">
  .trench-wrap {
    display: flex;
    flex-direction: column;
    
    .search-wrap {
      display: flex;
      padding: 10px 10px 0;
      
      .items-wrap {
        flex: 1;
        display: flex;
        height: 35px;
        margin-right: 10px;
        
        &:last-child {
          margin-right: 0;
        }
        
        span {
          line-height: 35px;
          margin-right: 5px;
        }
        .select-wrap {
          flex: 1;
          border: 1px solid #e8e8e8;
          border-radius: 5px;
          
          select {
            width: 100%;
            height: 33px;
          }
        }
      }
    }
    
    .trench-view-wrap {
      flex: 1;
      padding: 10px 0 0;
    }
  }
</style>
