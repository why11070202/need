webpackJsonp([39],{Iqj8:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=s("IhBI"),r=s("rZ/o"),i={components:{Headers:a.a,BScroll:r.a},data:function(){return{tBody:[]}},mounted:function(){this.queryList()},methods:{_leftClick:function(){this.$router.push("/menu")},_hendle:function(){this.$router.push("/menu/cooperative")},jumpDetail:function(t){var e=this.$route.path;this.$router.push(e+"/sdetail/"+t.customerType+"/"+t.workOrderStatus)},queryList:function(){var t=this;t.$newpost("/serveOpen/statisticServeopen",{pageNum:1,pageSize:9999}).then(function(e){t.tBody=e.data})}}},c={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"traction-wrap common-width"},[s("headers",{attrs:{leftClick:t._leftClick,showRight:""}}),t._v(" "),s("div",[s("div",{staticClass:"tab"},[s("div",{staticClass:"btn",on:{click:function(e){return t._hendle()}}},[t._v("营装维进度")]),t._v(" "),s("div",{staticClass:"btn active"},[t._v("报表统计")])])]),t._v(" "),s("div",{staticClass:"table-wrap"},[s("b-scroll",[s("table",[s("thead",[s("tr",{attrs:{border:"0"}},[s("th",[t._v("工单状态")]),t._v(" "),s("th",[t._v("客户类型")]),t._v(" "),s("th",[t._v("工单数量")])])])]),t._v(" "),s("table",{staticClass:"content-table"},[s("thead",{staticClass:"hide-header"},[s("tr",{attrs:{border:"0"}},[s("th",[t._v("工单状态")]),t._v(" "),s("th",[t._v("客户类型")]),t._v(" "),s("th",[t._v("工单数量")])])]),t._v(" "),s("tbody",t._l(t.tBody,function(e,a){return"个人客户"===e.customerType?s("tr",{key:a,on:{click:function(s){return t.jumpDetail(e)}}},[s("td",{staticClass:"can-click"},[t._v(t._s(e.workOrderStatus))]),t._v(" "),s("td",{staticClass:"can-click"},[t._v(t._s(e.customerType))]),t._v(" "),s("td",{staticClass:"can-click"},[t._v(t._s(e.workOrderNum))])]):t._e()}),0)]),t._v(" "),s("table",{staticStyle:{"margin-top":"10px"}},[s("thead",[s("tr",{attrs:{border:"0"}},[s("th",[t._v("工单状态")]),t._v(" "),s("th",[t._v("客户类型")]),t._v(" "),s("th",[t._v("工单数量")])])])]),t._v(" "),s("table",{staticClass:"content-table"},[s("thead",{staticClass:"hide-header"},[s("tr",{attrs:{border:"0"}},[s("th",[t._v("工单状态")]),t._v(" "),s("th",[t._v("客户类型")]),t._v(" "),s("th",[t._v("工单数量")])])]),t._v(" "),s("tbody",t._l(t.tBody,function(e,a){return"商业客户"===e.customerType?s("tr",{key:a,on:{click:function(s){return t.jumpDetail(e)}}},[s("td",{staticClass:"can-click"},[t._v(t._s(e.workOrderStatus))]),t._v(" "),s("td",{staticClass:"can-click"},[t._v(t._s(e.customerType))]),t._v(" "),s("td",{staticClass:"can-click"},[t._v(t._s(e.workOrderNum))])]):t._e()}),0)])])],1),t._v(" "),s("transition",{attrs:{name:"slide"}},[s("router-view")],1)],1)},staticRenderFns:[]};var n=s("VU/8")(i,c,!1,function(t){s("sJlR")},"data-v-5bae300e",null);e.default=n.exports},sJlR:function(t,e){}});