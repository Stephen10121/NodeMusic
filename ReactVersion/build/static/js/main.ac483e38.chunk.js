(this.webpackJsonpreactembedwatcher=this.webpackJsonpreactembedwatcher||[]).push([[0],{44:function(e,t,c){},45:function(e,t,c){},51:function(e,t,c){},56:function(e,t,c){},57:function(e,t,c){"use strict";c.r(t);var n=c(0),a=c.n(n),s=c(33),r=c.n(s),i=(c(44),c(25)),u=c(2),j=c(19),o=(c(45),c(1)),m=function(){var e=Object(n.useState)(""),t=Object(j.a)(e,2),c=t[0],a=t[1],s=Object(u.f)(),r=function(){localStorage.setItem("name",c),s.push("/message")};return Object(o.jsx)("div",{className:"NameSet",children:Object(o.jsxs)("div",{className:"setnameform",children:[Object(o.jsx)("input",{type:"text",id:"setnameforminput",className:"setnameform-input",placeholder:"Username.",onKeyPress:function(e){"Enter"===e.key&&r()},onChange:function(e){return a(e.target.value)}}),Object(o.jsx)("button",{className:"setnameform-button",onClick:r,children:"Submit"})]})})},l=(c(51),c(39)),b=Object(l.a)("https://www.gruzservices.com"),h=function(){var e=Object(n.useState)(""),t=Object(j.a)(e,2),c=t[0],a=t[1],s=Object(n.useState)(""),r=Object(j.a)(s,2),i=r[0],m=r[1],l=Object(n.useState)([]),h=Object(j.a)(l,2),d=h[0],O=h[1],f=Object(n.useState)(""),p=Object(j.a)(f,2),x=p[0],g=p[1],v=Object(n.useState)(Object(u.f)()),N=Object(j.a)(v,1)[0],S=function(){b.on("message",(function(e){if(e!==x){!function(e){var t=e.mName,c=e.mText,n=d;n.push({cachedName:t,cachedMessage:c}),O(n)}(e),g(e);var t=document.getElementById("chat-part");t.scrollTop=t.scrollHeight}}))},C=Object(n.useRef)((function(){}));return C.current=function(){S(),""!==localStorage.getItem("name")?a(localStorage.getItem("name")):N.push("/")},Object(n.useEffect)((function(){C.current()}),[]),Object(o.jsxs)("div",{className:"Message",children:[Object(o.jsxs)("div",{className:"chat-part",id:"chat-part",children:[Object(o.jsx)("div",{className:"h1part",children:Object(o.jsx)("h1",{children:"Chat Room"})}),d.map((function(e,t){return Object(o.jsxs)("div",{className:"chatbox",children:[Object(o.jsx)("p",{children:e.cachedName}),Object(o.jsx)("h4",{children:e.cachedMessage})]},t)}))]}),Object(o.jsxs)("form",{className:"submitPart",onSubmit:function(e){e.preventDefault(),""===c?N.push("/"):(b.emit("message",{mName:c,mText:i}),document.getElementById("sendmessinput").value="")},children:[Object(o.jsx)("input",{autoComplete:"off",type:"text",id:"sendmessinput",onChange:function(e){return m(e.target.value)},name:"message",placeholder:"Message:"}),Object(o.jsx)("input",{type:"submit",value:"Send"})]}),Object(o.jsx)("div",{className:"goHome",children:Object(o.jsx)("a",{href:"/",children:"Change Name"})})]})},d=(c(56),function(){return Object(o.jsx)(i.a,{children:Object(o.jsx)("div",{className:"App",children:Object(o.jsxs)(u.c,{children:[Object(o.jsx)(u.a,{exact:!0,path:"/",children:Object(o.jsx)(m,{})}),Object(o.jsx)(u.a,{path:"/message",children:Object(o.jsx)(h,{})})]})})})}),O=function(e){e&&e instanceof Function&&c.e(3).then(c.bind(null,58)).then((function(t){var c=t.getCLS,n=t.getFID,a=t.getFCP,s=t.getLCP,r=t.getTTFB;c(e),n(e),a(e),s(e),r(e)}))};r.a.render(Object(o.jsx)(a.a.StrictMode,{children:Object(o.jsx)(d,{})}),document.getElementById("root")),O()}},[[57,1,2]]]);
//# sourceMappingURL=main.ac483e38.chunk.js.map