webpackJsonp([18],{"8RPv":function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=r("IhBI"),s=r("FeFv"),n=r("tRgf"),o={components:{Headers:a.a,VTable:s.a},data:function(){return{isLinkNumberMax:1,tHead:["工单号","状态","当前处理人","联系方式"],tBody:[],problemData:[]}},computed:{_setTitle:function(){var e=this.$route.params.month.split("-");return"\n        <p>"+this.$route.params.user+" "+Number(e[1])+"月 销售收入</p>\n        <p>-- "+this.$route.params.incomeItem+"</p>\n        <p>-- "+this.$route.params.source+"</p>\n        <p>-- "+this.$route.params.sourceType+"</p>\n        <p>-- "+this.$route.params.address+"</p>\n      "}},mounted:function(){this._getAddressProblemApi()},methods:{_next:function(){this.$router.push(this.$route.path+"/synergia")},_getAddressProblemApi:function(){var e=this;e.$post("/communityissue/find",{branch:e.$route.params.name,gridding:e.$route.params.street,trenchType:e.$route.params.sourceType,addressId:localStorage.getItem("addressId")}).then(function(t){e.problemData=t})},_getApi:function(){var e=this;e.$post("/incomecheckprogress/findSalesGroupByTrenchName",{month:e.$route.params.month,branch:e.$route.params.name,gridding:e.$route.params.street,managerAccount:localStorage.getItem("name"),incomeItem:e.$route.params.incomeItem,checkItem:e.$route.params.source,trenchType:e.$route.params.sourceType}).then(function(t){e.tBody=[],t.data.forEach(function(t){e.tBody.push({name:t.name,text:[t.name,Object(n.c)(t.goal),Object(n.c)(t.complete),Object(n.c)(t.percentageComplete)]})})})}}},i={render:function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"address-wrap common-width"},[r("headers",{attrs:{showRight:""}}),e._v(" "),r("div",{staticClass:"other-title-wrap",domProps:{innerHTML:e._s(e._setTitle)}}),e._v(" "),e._e(),e._v(" "),r("div",{staticClass:"problem-wrap"},[e.problemData.length?r("div",{staticClass:"title"},[e._v("社区涉及问题：")]):e._e(),e._v(" "),e.problemData.length?r("ul",e._l(e.problemData,function(t,a){return r("li",{key:a,domProps:{textContent:e._s(t)}})}),0):e._e()]),e._v(" "),r("div",{staticClass:"btn-wrap",on:{click:e._next}},[r("i"),e._v(" "),r("span",[e._v("发起协同")])]),e._v(" "),r("transition",{attrs:{name:"slide"}},[r("router-view")],1)],1)},staticRenderFns:[]};var p=r("VU/8")(o,i,!1,function(e){r("wWfo")},"data-v-b77414b8",null);t.default=p.exports},wWfo:function(e,t){}});