webpackJsonp([58],{OdxF:function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=r("rZ/o"),s=r("xKmY"),o={components:{BScroll:a.a},data:function(){return{tBody:[]}},mounted:function(){var t=this,e=this.$route.params.address;Object(s.a)(e,function(e){t.tBody=e})},methods:{_toPage:function(t){var e=this.$route.path;this.$router.push(e+"/"+t.customerType+"/"+t.workOrderStatus)}}},n={render:function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"search-detail-wrap common-width"},[r("b-scroll",[t.tBody.length?r("div",{staticClass:"table-wrap"},[r("table",[r("thead",[r("tr",{attrs:{border:"0"}},[r("th",[t._v("工单状态")]),t._v(" "),r("th",[t._v("客户类型")]),t._v(" "),r("th",[t._v("工单数量")])])])]),t._v(" "),r("table",{staticClass:"content-table"},[r("thead",{staticClass:"hide-header"},[r("tr",{attrs:{border:"0"}},[r("th",[t._v("工单状态")]),t._v(" "),r("th",[t._v("客户类型")]),t._v(" "),r("th",[t._v("工单数量")])])]),t._v(" "),r("tbody",t._l(t.tBody,function(e,a){return r("tr",{key:a},[r("td",[t._v(t._s(e.workOrderStatus))]),t._v(" "),r("td",[t._v(t._s(e.customerType))]),t._v(" "),r("td",{staticClass:"can-click",on:{click:function(r){return t._toPage(e)}}},[t._v(t._s(e.workOrderNum))])])}),0)])]):t._e()]),t._v(" "),r("transition",{attrs:{name:"slide"}},[r("router-view")],1)],1)},staticRenderFns:[]};var c=r("VU/8")(o,n,!1,function(t){r("TiJW")},"data-v-313c46e0",null);e.default=c.exports},TiJW:function(t,e){}});