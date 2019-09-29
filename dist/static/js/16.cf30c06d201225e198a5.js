webpackJsonp([16],{NIKe:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s={components:{BScroll:n("rZ/o").a},data:function(){return{managerType:1,synergyCandidateList:[],synergyContentList:[],text:"",show:!1,showText:""}},computed:{_setActive:function(){return function(t){var e="";return this.managerType===t&&(e="active"),e}},_showText:function(){var t=this,e=!1;return this.synergyContentList.forEach(function(n,s){n.active&&s===t.synergyContentList.length-1&&(e=!0)}),e||(this.text=""),e}},mounted:function(){this._getListApi()},methods:{_chooseContent:function(t){this.synergyContentList.forEach(function(e,n){n===t&&(e.active=!e.active)})},_chooseCandidate:function(t){this.synergyCandidateList.forEach(function(e,n){e.active=n===t})},_saveApi:function(){var t=this,e=JSON.parse(localStorage.getItem("role")),n={address:t.$route.params.address,branch:e.branch,gridding:e.gridding,handlerAccount:"",issue:"",issueAddition:t.text};t.synergyCandidateList.filter(function(t){return t.active}).forEach(function(t){n.handlerAccount=t.managerAccount}),t.synergyContentList.filter(function(t){return t.active}).forEach(function(t){""===n.issue?n.issue+=t.text:n.issue+=","+t.text}),""!==n.handlerAccount?""!==n.issue?t.$dialog.confirm({title:"提示",message:"是否确定发起协同工单？"}).then(function(){t.$post("/synergyorder/save",n).then(function(){t.$toast.success({mask:!0,duration:1e3,message:"协同工单提交成功",onClose:function(){t.$router.go(-1)}})})}).catch(function(){}):t.$dialog.alert({message:"请选择协同内容"}):t.$dialog.alert({message:"请选择协同人员"})},_getListApi:function(){var t=this,e=JSON.parse(localStorage.getItem("role"));t.$post("/synergy/findSynergyContent",{branch:e.branch,gridding:e.gridding,managerType:t.managerType}).then(function(e){t.synergyCandidateList=e.synergyCandidateList.map(function(t){return{active:!1,text:t.managerName,managerAccount:t.managerAccount}}),t.synergyContentList=e.synergyContentList.map(function(t){return{active:!1,text:t}})})}},watch:{managerType:function(){this._getListApi()}}},i={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"synergy-wrap common-width"},[n("div",{staticClass:"top-bar-wrap"},[n("div",{staticClass:"top-items",class:t._setActive(1)},[n("span",{on:{click:function(e){t.managerType=1}}},[t._v("网络经理")])]),t._v(" "),n("div",{staticClass:"top-items",class:t._setActive(2)},[n("span",{on:{click:function(e){t.managerType=2}}},[t._v("销售经理")])]),t._v(" "),n("div",{staticClass:"top-items",class:t._setActive(3)},[n("span",{on:{click:function(e){t.managerType=3}}},[t._v("商企经理")])])]),t._v(" "),n("div",{staticClass:"synergy-content-wrap"},[n("b-scroll",[n("div",{staticClass:"synergy-content"},[n("div",{staticClass:"synergy-candidate-list-wrap"},[n("div",{staticClass:"title"},[t._v("协同备选人员")]),t._v(" "),t.synergyCandidateList.length?n("div",{staticClass:"synergy-candidate-list-items"},t._l(t.synergyCandidateList,function(e,s){return n("div",{key:s,staticClass:"list-items",on:{click:function(e){return t._chooseCandidate(s)}}},[n("i",{class:{active:e.active}}),t._v(" "),n("p",{domProps:{textContent:t._s(e.text)}})])}),0):n("div",{staticClass:"not-candidateList"},[t._v("没有找到相关协同备选人员")])]),t._v(" "),n("div",{staticClass:"synergy-content-list-wrap"},[n("div",{staticClass:"title"},[t._v("协同内容项")]),t._v(" "),t._l(t.synergyContentList,function(e,s){return n("div",{key:s,staticClass:"synergy-content-list-items",on:{click:function(e){return t._chooseContent(s)}}},[n("i",{class:{active:e.active}}),t._v(" "),n("p",{domProps:{textContent:t._s(e.text)}})])})],2),t._v(" "),t._showText?n("div",{staticClass:"synergy-text-wrap"},[n("textarea",{directives:[{name:"model",rawName:"v-model",value:t.text,expression:"text"}],attrs:{placeholder:"请输入内容"},domProps:{value:t.text},on:{input:function(e){e.target.composing||(t.text=e.target.value)}}})]):t._e()])])],1),t._v(" "),n("div",{staticClass:"synergy-btn-wrap",on:{click:t._saveApi}},[t._v("提 交")])])},staticRenderFns:[]};var a=n("VU/8")(s,i,!1,function(t){n("VxHs")},"data-v-d67e574c",null);e.default=a.exports},VxHs:function(t,e){}});