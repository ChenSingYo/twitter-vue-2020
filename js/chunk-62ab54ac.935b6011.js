(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-62ab54ac"],{"1fba":function(e,t,s){},3519:function(e,t,s){"use strict";s.r(t);var a=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"chatroom-container"},[[s("div",{staticClass:"left-navbar"},[s("NavSidebar")],1),s("div",{staticClass:"user-list"},[s("div",{staticClass:"title"},[e._v("上線使用者 ("+e._s(e.onlineCount)+")")]),e._l(e.onlineUsers,(function(e){return s("OnlineUsers",{key:e.id,attrs:{onlineUser:e}})}))],2),s("div",{staticClass:"chatroom"},[s("div",{staticClass:"title"},[e._v(" 公開聊天室 ")]),s("div",{ref:"messageContainer",staticClass:"message-container"},[e._l(e.chatRecords,(function(e){return s("ChatData",{key:e.id,attrs:{chatRecord:e}})})),s("div",{staticClass:"send-box"},[s("form",{staticClass:"form-container",on:{click:function(t){return t.stopPropagation(),t.preventDefault(),e.handleSendMsg(t)}}},[s("input",{directives:[{name:"model",rawName:"v-model",value:e.chatMessage,expression:"chatMessage"}],staticClass:"text-input",attrs:{type:"text",name:"",placeholder:"輸入訊息..."},domProps:{value:e.chatMessage},on:{input:function(t){t.target.composing||(e.chatMessage=t.target.value)}}}),e._m(0)])])],2)])]],2)},i=[function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("button",{staticClass:"send-btn",attrs:{type:"submit"}},[a("img",{attrs:{src:s("f2ec"),alt:"send"}})])}],n=s("b85c"),c=s("5530"),r=(s("498a"),function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"user-container"},[s("router-link",{attrs:{to:{name:"other-profile",params:{id:e.onlineUser.id}}}},[s("img",{attrs:{src:e.onlineUser.avatar}})]),s("router-link",{attrs:{to:{name:"other-profile",params:{id:e.onlineUser.id}}}},[s("span",{staticClass:"user-name"},[e._v(e._s(e.onlineUser.name))])]),s("router-link",{attrs:{to:{name:"other-profile",params:{id:e.onlineUser.id}}}},[s("span",{staticClass:"user-account"},[e._v("@"+e._s(e.onlineUser.account))])])],1)}),o=[],l={name:"OnlineUsers",props:{onlineUser:{type:Object,required:!0}}},u=l,d=(s("aae8"),s("2877")),h=Object(d["a"])(u,r,o,!1,null,"63190f12",null),f=h.exports,m=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",[e.userIsOnline?s("div",{staticClass:"user-active"},[s("span",{staticClass:"user-active-txt"},[e._v(" "+e._s(e.chatRecord.text))])]):e._e(),e.userIsOffline?s("div",{staticClass:"user-active"},[s("span",{staticClass:"user-active-txt"},[e._v(" "+e._s(e.chatRecord.text)+" ")])]):e._e(),s("div",{staticClass:"message-box"},[e.isRemoteMsg?s("div",{staticClass:"remote-msg"},[s("div",{staticClass:"avatar"},[s("img",{attrs:{src:e.chatRecord.avatar,alt:"avatar"}})]),s("div",{staticClass:"msg-box"},[s("div",{staticClass:"receive-text"},[e._v(" "+e._s(e.chatRecord.text)+" ")]),s("div",{staticClass:"receive-time"},[e._v(" "+e._s(e.chatRecord.time)+" ")])])]):e._e(),e.isLocalMsg?s("div",{staticClass:"local-msg"},[s("div",{staticClass:"send-text"},[e._v(" "+e._s(e.chatRecord.text)+" ")]),s("div",{staticClass:"send-time"},[e._v(" "+e._s(e.chatRecord.time)+" ")])]):e._e()])])},v=[],g={name:"ChatRecords",props:{chatRecord:{type:Object,required:!0}},data:function(){return{msgType:this.chatRecord.msgType,userIsOnline:!1,userIsOffline:!1,isRemoteMsg:!1,isLocalMsg:!1}},created:function(){this.handleData()},methods:{handleData:function(){switch(this.msgType){case"userOnline":this.userIsOnline=!0,this.userIsOffline=!1,this.isRemoteMsg=!1,this.isLocalMsg=!1;break;case"userOffline":this.userIsOnline=!1,this.userIsOffline=!0,this.isRemoteMsg=!1,this.isLocalMsg=!1;break;case"isRemoteMsg":this.userIsOnline=!1,this.userIsOffline=!1,this.isRemoteMsg=!0,this.isLocalMsg=!1;break;case"isLocalMsg":this.userIsOnline=!1,this.userIsOffline=!1,this.isRemoteMsg=!1,this.isLocalMsg=!0;break}}}},p=g,C=(s("9bf9"),Object(d["a"])(p,m,v,!1,null,"328af7f7",null)),_=C.exports,b=s("bb41"),M=s("2f62"),O=s("c1df"),R=s.n(O),x={name:"ChatRoom",components:{NavSidebar:b["a"],OnlineUsers:f,ChatData:_},data:function(){return{onlineCount:0,onlineUsers:[],chatRecords:[],chatMessage:""}},computed:Object(c["a"])({},Object(M["b"])(["currentUser"])),created:function(){this.connectSever()},watch:{chatRecords:function(){var e=this;this.$nextTick((function(){var t=e.$refs.messageContainer;t.scrollTop=t.lastElementChild.offsetTop}))}},methods:{handleSendMsg:function(){if(""!==this.chatMessage.trim()){var e=this.chatMessage;this.$socket.emit("userMsg",e)}this.chatMessage=""},disconnectSever:function(){this.$socket.disconnect()},connectSever:function(){this.$socket.connect(),this.$socket.emit("openPublicRoom")}},sockets:{connect:function(){console.log("socket connected")},disconnect:function(){console.log("socket disconnected...")},userList:function(e){this.onlineUsers=e},onlineCount:function(e){this.onlineCount=e},userOnline:function(e){this.chatRecords.push(Object(c["a"])({},e))},userOffline:function(e){this.chatRecords.push(Object(c["a"])({},e))},chatMsg:function(e){e.text&&this.chatRecords.push({id:e.ChatId,userId:e.UserId,text:e.text,msgType:e.UserId===this.currentUser.id?"isLocalMsg":"isRemoteMsg",name:e.username,avatar:e.avatar,time:R.a.utc().locale("zh_TW").utcOffset("+08:00").format("h:mm a")})},historyMsg:function(e){var t,s=Object(n["a"])(e);try{for(s.s();!(t=s.n()).done;){var a=t.value;this.chatRecords.push({id:a.id,userId:a.UserId,text:a.text,msgType:a.UserId===this.currentUser.id?"isLocalMsg":"isRemoteMsg",name:a.username,avatar:a.avatar,time:a.time})}}catch(i){s.e(i)}finally{s.f()}}},destroyed:function(){console.log("disconnectSever"),this.disconnectSever()}},k=x,U=(s("ac70"),Object(d["a"])(k,a,i,!1,null,"9c45c592",null));t["default"]=U.exports},"5e04":function(e,t,s){},"9bf9":function(e,t,s){"use strict";s("1fba")},aae8:function(e,t,s){"use strict";s("5e04")},ac70:function(e,t,s){"use strict";s("c935")},c935:function(e,t,s){},f2ec:function(e,t,s){e.exports=s.p+"img/icon_message.acdd2302.svg"}}]);
//# sourceMappingURL=chunk-62ab54ac.935b6011.js.map