webpackJsonp([38],{"/ZR0":function(t,a,e){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var n=e("IhBI"),o=e("rZ/o"),s=e("4AKl"),r=e("FeFv"),i=e("tRgf"),c={components:{Headers:n.a,BScroll:o.a,TopBar:s.a,VTable:r.a},data:function(){return{barData:[],tabsIndex:Number(this.$route.params.type),year:this.$route.params.month.split("-")[0],month:"",tHead:["","目标值","完成值","完成率","排名"],tBody:[],tFoot:[],show:!1,columns:[]}},computed:{_setTitle:function(){return this.tabsIndex?this.$route.params.name+"销售收入考核进度表(万元)":this.$route.params.name+"全量收入考核进度表(万元)"}},mounted:function(){var t=this,a=JSON.parse(localStorage.getItem("yearData"));a.length&&a.forEach(function(a){t.columns.push(a.name),a.name===t.year&&(t.barData=a.children.map(function(a){return a.str===t.$route.params.month.split("-")[1]&&(a.active=!0),a}))})},methods:{onCancel:function(){this.show=!1},onConfirm:function(t){this.year=t,this.onCancel()},_barClick:function(t){t&&(this.month=t.str)},_changeTabs:function(t){this.tabsIndex!==t&&(this.tabsIndex=t,this._getApi())},_getApi:function(){var t=this,a=this,e=a.tabsIndex?"/incomecheckprogress/findSalesGroupByGridding":"/incomecheckprogress/findAllGroupByGridding";a.$post(e,{month:a.year+"-"+a.month,branch:a.$route.params.name}).then(function(e){a.tHead[0]=e.boxhead,a.tBody=[],e.data.forEach(function(e){a.tBody.push({name:e.name,text:[e.name,""+Object(i.c)(e.goal),""+Object(i.c)(e.complete),""+t._setColor(e.percentageComplete,e.timeProgressType),e.ranking]})})})},_trClick:function(){var t=this.$route.params.name,a=this.year,e=this.month,n=this.tabsIndex;this.$router.push("/menu/traction/"+a+"-"+e+"/"+n+"/"+t+"/grid")},_setColor:function(t,a){return 1===a?t?'<i class="icon-color green-color"></i><span class="green-color">'+Object(i.c)(t)+"%</span>":"-":2===a?t?'<i class="icon-color yellow-color"></i><span class="yellow-color">'+Object(i.c)(t)+"%</span>":"-":3===a?t?'<i class="icon-color red-color"></i><span class="red-color">'+Object(i.c)(t)+"%</span>":"-":void 0}},watch:{month:function(){this._getApi()},year:function(t,a){var e=this;t!==a&&JSON.parse(localStorage.getItem("yearData")).forEach(function(a){a.name===t&&(e.year=a.name,e.barData=a.children)})}}},l={render:function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"traction-wrap common-width"},[e("headers",{attrs:{showRight:""}}),t._v(" "),e("div",{staticClass:"top-date-wrap"},[e("div",{staticClass:"year-wrap",on:{click:function(a){t.show=!0}}},[t._v(t._s(t.year)+"年")]),t._v(" "),e("div",{staticClass:"month-wrap"},[e("top-bar",{attrs:{data:t.barData},on:{barClick:t._barClick}})],1)]),t._v(" "),e("div",{staticClass:"tabs-wrap"},[e("div",{staticClass:"tabs-items",class:{active:0===t.tabsIndex},on:{click:function(a){return t._changeTabs(0)}}},[t._v("全量收入")]),t._v(" "),e("div",{staticClass:"tabs-items",class:{active:1===t.tabsIndex},on:{click:function(a){return t._changeTabs(1)}}},[t._v("销售收入")])]),t._v(" "),e("div",{staticClass:"title-wrap",domProps:{textContent:t._s(t._setTitle)}}),t._v(" "),e("div",{staticClass:"next-content-wrap"},[e("v-table",{attrs:{seniority:"",clickHeade:"",clickHeaderNumber:[0],tHeader:t.tHead,tBody:t.tBody,tFoot:t.tFoot},on:{headClick:t._trClick}})],1),t._v(" "),e("van-popup",{attrs:{position:"bottom"},model:{value:t.show,callback:function(a){t.show=a},expression:"show"}},[e("van-picker",{attrs:{"show-toolbar":"",columns:t.columns},on:{cancel:t.onCancel,confirm:t.onConfirm}})],1),t._v(" "),e("transition",{attrs:{name:"slide"}},[e("router-view")],1)],1)},staticRenderFns:[]};var h=e("VU/8")(c,l,!1,function(t){e("7CZ6")},"data-v-5e03ff5f",null);a.default=h.exports},"7CZ6":function(t,a){}});