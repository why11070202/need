webpackJsonp([65],{EkSX:function(t,e){},VfIk:function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=r("Gu7T"),a=r.n(o),i=r("zjrN"),n=r("/DwW"),s={components:{NewTable:i.a},data:function(){var t=this,e=JSON.parse(localStorage.getItem("role")),r=e.role,o=(e.gridding,localStorage.getItem("name"));return{tBody:[],columns:[{title:"一线经理",key:"name",fixed:"",width:80,align:"center",render:function(e,a){return a.row.isFooter?e("div",{attrs:{class:"table-total"}},a.row.name):e("div",{attrs:{class:1===r?"can-click":3===r&&a.row.account===o?"can-click":""},on:{click:function(){(1===r||2===r||3===r&&a.row.account===o)&&t._trClick(a.row)}}},a.row.name)}},{title:"目标值",key:"goal",width:80,align:"center",render:function(t,e){return t("div",e.row.isFooter?{attrs:{class:"table-total"}}:{},e.row.goal?e.row.goal.toFixed(3):e.row.goal)}},{title:"完成值",key:"complete",width:80,align:"center",render:function(t,e){return t("div",e.row.isFooter?{attrs:{class:"table-total"}}:{},e.row.complete?e.row.complete.toFixed(3):e.row.complete)}},{title:"完成率%",key:"percentageComplete",width:80,align:"center",render:function(t,e){return t("div",e.row.isFooter?{attrs:{class:"table-total"}}:{},e.row.percentageComplete?e.row.percentageComplete.toFixed(3):e.row.percentageComplete)}},{title:"时间进度%",key:"timeProgress",width:90,align:"center",renderHeader:function(e,r){return e("div",{attrs:{class:t.tBody.length?"can-click":""},on:{click:function(){t.tBody.length&&t._headClick()}}},r.column.title)},render:function(t,e){return t("div",e.row.isFooter?{attrs:{class:"table-total"}}:{attrs:{class:"lamp lamp-"+e.row.timeProgressType}},e.row.timeProgress?e.row.timeProgress.toFixed(3):e.row.timeProgress)}},{title:"月环比%",key:"monthChainRelativeRatio",width:80,align:"center",render:function(t,e){return t("div",e.row.isFooter?{attrs:{class:"table-total"}}:{},e.row.monthChainRelativeRatio)}}],updateText:""}},mounted:function(){var t=this;Object(n.c)({branch:t.$route.params.district,gridding:t.$route.params.street},function(e){t.updateText=e.description,t.tBody=[].concat(a()(e.data),[{isFooter:!0,name:"合计",goal:e.statistics.goal,complete:e.statistics.complete,percentageComplete:e.statistics.percentageComplete,timeProgress:e.statistics.timeProgress,monthChainRelativeRatio:e.statistics.monthChainRelativeRatio,ranking:"-"}]),t.columns[0].fixed="left"})},methods:{_headClick:function(){var t=this.$route.params,e=t.district,r=t.street;this.$router.push("/menu/business/add/time/street/"+e+"/person/"+r)},_trClick:function(t){var e=this.$route.path;this.$router.push(e+"/ditch/"+t.account)}}},c={render:function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"add-person-wrap common-width"},[""!==t.updateText?r("div",{staticClass:"update-wrap",domProps:{textContent:t._s(t.updateText)}}):t._e(),t._v(" "),r("div",{staticClass:"content-wrap"},[r("div",{staticClass:"new-table-list-wrap"},[r("new-table",{attrs:{columns:t.columns,data:t.tBody}})],1)]),t._v(" "),r("transition",{attrs:{name:"slide"}},[r("router-view")],1)],1)},staticRenderFns:[]};var l=r("VU/8")(s,c,!1,function(t){r("EkSX")},"data-v-15316e24",null);e.default=l.exports}});