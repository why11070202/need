webpackJsonp([46],{CaQy:function(t,e){},iFQP:function(t,e,o){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=o("Gu7T"),n=o.n(r),a=o("zjrN"),i=o("/DwW"),s={components:{NewTable:a.a},data:function(){return{tBody:[],columns:[{title:"网格",key:"name",fixed:"",width:90,align:"center",render:function(t,e){return t("div",e.row.isFooter?{attrs:{class:"table-total"}}:{},e.row.name)}},{title:"渠道总数",key:"trenchAmount",width:80,align:"center",render:function(t,e){return t("div",e.row.isFooter?{attrs:{class:"table-total"}}:{},e.row.trenchAmount?e.row.trenchAmount.toFixed(3):e.row.trenchAmount)}},{title:"零产能渠道数",key:"zeroCapacityTrenchAmount",width:90,align:"center",render:function(t,e){return t("div",e.row.isFooter?{attrs:{class:"table-total"}}:{},e.row.zeroCapacityTrenchAmount?e.row.zeroCapacityTrenchAmount.toFixed(3):e.row.zeroCapacityTrenchAmount)}},{title:"占比%",key:"proportion",width:60,align:"center",render:function(t,e){return t("div",e.row.isFooter?{attrs:{class:"table-total"}}:{},e.row.proportion?e.row.proportion.toFixed(3):e.row.proportion)}},{title:"月环比%",key:"monthChainRelativeRatio",width:80,align:"center",render:function(t,e){return t("div",e.row.isFooter?{attrs:{class:"table-total"}}:{},e.row.monthChainRelativeRatio?e.row.monthChainRelativeRatio.toFixed(3):e.row.monthChainRelativeRatio)}}],updateText:""}},mounted:function(){var t=this;Object(i.f)({branch:t.$route.params.district,gridding:t.$route.params.street.replace(/@/g,"#").replace(/-/g,"/")},function(e){t.updateText=e.description,t.tBody=[].concat(n()(e.data),[{isFooter:!0,name:"合计",trenchAmount:e.statistics.trenchAmount,zeroCapacityTrenchAmount:e.statistics.zeroCapacityTrenchAmount,proportion:e.statistics.proportion,monthChainRelativeRatio:e.statistics.monthChainRelativeRatio}]),t.columns[0].fixed="left"})}},c={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"person-wrap common-width"},[""!==this.updateText?e("div",{staticClass:"update-wrap",domProps:{textContent:this._s(this.updateText)}}):this._e(),this._v(" "),e("div",{staticClass:"content-wrap"},[e("div",{staticClass:"new-table-list-wrap"},[e("new-table",{attrs:{columns:this.columns,data:this.tBody}})],1)])])},staticRenderFns:[]};var l=o("VU/8")(s,c,!1,function(t){o("CaQy")},"data-v-4795ca95",null);e.default=l.exports}});