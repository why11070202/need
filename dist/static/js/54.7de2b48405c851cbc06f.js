webpackJsonp([54],{O8jz:function(e,t){},utNi:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=n("mvHQ"),s=n.n(o),r=n("IhBI"),a=n("tRgf"),i={components:{Headers:r.a},data:function(){return{tokenList:[]}},mounted:function(){var e=Object(a.b)("accessToken"),t=Object(a.b)("userName");e&&t?this._toLogin({token:e,name:t}):this._getUserList()},methods:{_getUserList:function(){var e=this;e.$post("/sso/listMockUser",{}).then(function(t){e.tokenList=t.map(function(e){return e.name=e.userName+" "+e.role,e})})},_toLogin:function(e){var t=this;localStorage.removeItem("role"),localStorage.removeItem("name");var n={token:null,userName:null};n=e?{token:e.token,userName:e.name}:{token:Object(a.b)("accessToken"),userName:Object(a.b)("userName")};t.$post("/sso/mockLogin",n).then(function(e){localStorage.setItem("role",s()(e.role)),localStorage.setItem("name",e.userAccount),t.$router.replace("/menu")})},_leftClick:function(){window.parent.postMessage({msg:"close"},"*")}}},c={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"home-wrap common-width"},[n("headers",{attrs:{leftClick:e._leftClick,refreshPage:!0}}),e._v(" "),e.tokenList.length?n("div",{staticClass:"v-van-cell-wrap"},[n("van-cell-group",{attrs:{title:""}},e._l(e.tokenList,function(t,o){return n("van-cell",{key:o,attrs:{title:t.name,"is-link":""},on:{click:function(n){return e._toLogin(t)}}})}),1)],1):e._e(),e._v(" "),n("transition",{attrs:{name:"slide"}},[n("router-view")],1)],1)},staticRenderFns:[]};var l=n("VU/8")(i,c,!1,function(e){n("O8jz")},"data-v-3d496020",null);t.default=l.exports}});