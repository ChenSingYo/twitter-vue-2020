(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-001fd77e"],{"3bb6":function(t,s,e){"use strict";var a=function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{staticClass:"nav-container"},[a("div",{staticClass:"nav-wrapper"},[t._m(0),a("nav",[a("ul",[a("li",[a("router-link",{attrs:{to:"/admin/tweets",custom:""},scopedSlots:t._u([{key:"default",fn:function(s){var i=s.navigate,r=s.isActive,n=s.isExactActive;return[a("a",{class:[r&&"router-link-active",n&&"router-link-exact-active"],on:{click:i}},[a("img",{attrs:{src:[e(r?"c35a":"af0c")],alt:""}}),a("span",[t._v("推文清單")])])]}}])})],1),a("li",[a("router-link",{attrs:{to:{name:"admin-users"},custom:""},scopedSlots:t._u([{key:"default",fn:function(s){var i=s.navigate,r=s.isActive,n=s.isExactActive;return[a("a",{class:[r&&"router-link-active",n&&"router-link-exact-active"],on:{click:i}},[a("img",{attrs:{src:[e(r?"98b3":"a866")],alt:""}}),a("span",[t._v("使用者列表")])])]}}])})],1)])]),a("div",{staticClass:"logout"},[a("button",{staticClass:"btn",on:{click:t.logout}},[a("img",{attrs:{src:e("a3c9"),alt:""}}),a("span",[t._v("登出")])])])])])},i=[function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{staticClass:"logo"},[a("img",{attrs:{src:e("808a"),alt:""}})])}],r={name:"AdminSiderBar",data:function(){return{isActive:!1}},methods:{logout:function(){this.$store.commit("revokeCurrentUser"),this.$router.push("/admin")}}},n=r,c=(e("c135"),e("2877")),o=Object(c["a"])(n,a,i,!1,null,"7a328185",null);s["a"]=o.exports},6135:function(t,s,e){"use strict";e.r(s);var a=function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{staticClass:"wrapper"},[e("AdminSidebar",{staticClass:"admin-sidebar"}),e("div",{staticClass:"center-column"},[t._m(0),e("div",{staticClass:"card-wrapper"},[t.isLoading?e("Spinner"):t._l(t.users,(function(t){return e("AdminUserCard",{key:t.id,attrs:{user:t}})}))],2)])],1)},i=[function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{staticClass:"header"},[e("div",{staticClass:"header-title"},[t._v("使用者列表")])])}],r=e("1da1"),n=(e("96cf"),e("3bb6")),c=function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{staticClass:"user-card"},[a("img",{staticClass:"user-cover",attrs:{src:t._f("emptyImage")(t.user.cover)}}),a("div",{staticClass:"avatar-container"},[a("img",{attrs:{src:t.user.avatar}})]),a("div",{staticClass:"user-profile"},[a("div",{staticClass:"user-name"},[t._v(t._s(t.user.name))]),a("div",{staticClass:"user-account"},[t._v("@"+t._s(t.user.account))]),a("div",{staticClass:"activity"},[a("div",{staticClass:"activity-reply"},[a("img",{attrs:{src:e("b863"),alt:"relpy"}}),a("span",{staticClass:"reply-count"},[t._v(t._s(t.user.tweetCount))])]),a("div",{staticClass:"activity-like"},[a("img",{attrs:{src:e("bdcd"),alt:"like"}}),a("span",{staticClass:"like-count"},[t._v(t._s(t.user.tweetsLikedCount))])])]),a("div",{staticClass:"followship"},[a("div",{staticClass:"followings-info"},[a("span",{staticClass:"followship-count"},[t._v(t._s(t.user.followingsCount)+" 個")]),a("span",{staticClass:"followship-unit"},[t._v("跟隨中 ")])]),a("div",{staticClass:"followers-info"},[a("span",{staticClass:"followship-count"},[t._v(t._s(t.user.followersCount)+" 位")]),a("span",{staticClass:"followship-unit"},[t._v("跟隨者")])])])])])},o=[],u=e("2708"),l={mixins:[u["b"]],name:"AdminUserCard",props:{user:{type:Object,required:!0}}},d=l,v=(e("8f75"),e("2877")),f=Object(v["a"])(d,c,o,!1,null,"3659d21d",null),m=f.exports,p=e("2375"),C=e("be6c"),g=e("2fa3"),_={name:"AdminUsers",data:function(){return{isLoading:!1,users:[]}},components:{AdminSidebar:n["a"],AdminUserCard:m,Spinner:p["a"]},created:function(){this.fetchUserCards()},methods:{fetchUserCards:function(){var t=this;return Object(r["a"])(regeneratorRuntime.mark((function s(){var e,a;return regeneratorRuntime.wrap((function(s){while(1)switch(s.prev=s.next){case 0:return s.prev=0,t.isLoading=!0,s.next=4,C["a"].getUsers();case 4:if(e=s.sent,a=e.data,console.log(a),"error"!==a.status){s.next=9;break}throw new Error(a.message);case 9:t.users=a,t.isLoading=!1,s.next=17;break;case 13:s.prev=13,s.t0=s["catch"](0),g["a"].fire({icon:"error",title:"無法取得使用者名單: ".concat(s.t0.message)}),t.isLoading=!1;case 17:case"end":return s.stop()}}),s,null,[[0,13]])})))()}}},b=_,w=(e("f6f5"),Object(v["a"])(b,a,i,!1,null,"3138e780",null));s["default"]=w.exports},"86ed":function(t,s,e){},"8f75":function(t,s,e){"use strict";e("c5b8")},b863:function(t,s,e){t.exports=e.p+"img/icon_reply.9303315f.svg"},bdcd:function(t,s,e){t.exports=e.p+"img/icon_like.c9316101.svg"},be6c:function(t,s,e){"use strict";var a=e("2fa3");s["a"]={getTweets:function(){return a["b"].get("/tweets")},deleteTweet:function(t){var s=t.tweetId;return a["b"].delete("/admin/tweets/".concat(s))},getUsers:function(){return a["b"].get("/admin/users")}}},c135:function(t,s,e){"use strict";e("ec5c")},c5b8:function(t,s,e){},ec5c:function(t,s,e){},f6f5:function(t,s,e){"use strict";e("86ed")}}]);
//# sourceMappingURL=chunk-001fd77e.e2b4f502.js.map