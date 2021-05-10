(this["webpackJsonpburger-builder"]=this["webpackJsonpburger-builder"]||[]).push([[3],{101:function(e,t,a){"use strict";var r=a(102),n=a.n(r),i=a(0);t.a=function(e){var t=null,a=[n.a.InputElement];switch(e.shouldValidate&&e.isTouched&&!e.valid&&a.push(n.a.InvalidInput),e.inputType){case"input":t=Object(i.jsx)("input",{className:a.join(" "),type:e.dataType,placeholder:e.placeholder,value:e.value,onChange:e.changed});break;case"textarea":t=Object(i.jsx)("textarea",{className:a.join(" "),type:e.dataType,placeholder:e.placeholder,value:e.value,onChange:e.changed});break;case"select":t=Object(i.jsx)("select",{className:a.join(" "),value:e.value,onChange:e.changed,children:e.options.map((function(e){return Object(i.jsx)("option",{value:e.value,children:e.display},e.value)}))});break;default:t=Object(i.jsx)("input",{className:a.join(" "),type:e.dataType,placeholder:e.placeholder,value:e.value,onChange:e.changed})}return Object(i.jsxs)("div",{className:n.a.Input,children:[Object(i.jsx)("p",{className:n.a.InputLabel,children:e.label}),t]})}},102:function(e,t,a){e.exports={Input:"Input_Input__31Juv",InputElement:"Input_InputElement__cbdRJ",InvalidInput:"Input_InvalidInput__3gTQ0",InputLabel:"Input_InputLabel__2ICCP"}},103:function(e,t,a){e.exports={CheckoutSummary:"CheckoutSummary_CheckoutSummary__2T2uz"}},104:function(e,t,a){e.exports={Form:"ContactOrder_Form__3Qb-i"}},109:function(e,t,a){"use strict";a.r(t);var r=a(6),n=a(7),i=a(9),o=a(8),l=a(1),c=a(5),d=a(53),s=a(33),u=a(103),p=a.n(u),h=a(17),b=a(0),j=function(e){return Object(b.jsxs)("div",{className:p.a.CheckoutSummary,children:[Object(b.jsx)("h1",{children:"I hope it tastes well!"}),Object(b.jsx)(d.a,{ingredients:e.ingredients}),Object(b.jsxs)("p",{children:["Total price: ",Object(b.jsxs)("strong",{children:["USD ",e.totalPrice.toFixed(2)]})]}),Object(b.jsx)(s.a,{btnType:"Danger",clicked:e.orderCancelled,children:"Cancel"}),Object(b.jsx)(s.a,{btnType:"Success",clicked:e.orderContinued,children:"Continue"})]})},v=a(25),m=a(10),O=a(34),g=a(101),y=a(20),f=a(13),x=a(43),C=a(104),T=a.n(C),I=a(18),k=a(4),_=function(e){Object(i.a)(a,e);var t=Object(o.a)(a);function a(){var e;Object(r.a)(this,a);for(var n=arguments.length,i=new Array(n),o=0;o<n;o++)i[o]=arguments[o];return(e=t.call.apply(t,[this].concat(i))).state={orderForm:{name:{value:"",configurations:{inputType:"input",dataType:"text",label:"Full Name",placeholder:"Name"},validations:{required:!0,minLength:3},shouldValidate:!0,validity:!1,touched:!1},email:{value:"",configurations:{inputType:"input",dataType:"email",label:"Email",placeholder:"Email"},validations:{required:!0,isEmail:!0},shouldValidate:!0,validity:!1,touched:!1},country:{value:"",configurations:{inputType:"input",dataType:"text",label:"Country",placeholder:"Country"},validations:{required:!0,minLength:3},shouldValidate:!0,validity:!1,touched:!1},city:{value:"",configurations:{inputType:"input",dataType:"text",label:"City",placeholder:"City"},validations:{required:!0,minLength:3},shouldValidate:!0,validity:!1,touched:!1},zip:{value:"",configurations:{inputType:"input",dataType:"text",label:"Zip Code",placeholder:"Zip Code"},validations:{required:!0,minLength:3,maxLength:8},shouldValidate:!0,validity:!1,touched:!1},deliveryMethod:{value:"fastest",configurations:{inputType:"select",label:"Delivery Method",options:[{value:"fastest",display:"Fastest"},{value:"cheapest",display:"Cheapest"}]},shouldValidate:!1,validity:!0}},formValidity:!1},e.completeOrder=function(t){t.preventDefault();var a={};for(var r in e.state.orderForm)a[r]=e.state.orderForm[r].value;var n={orderData:a,ingredients:e.props.ingredients,price:e.props.totalPrice.toFixed(2),userId:e.props.userId};e.props.onCompleteOrder(n,e.props.idToken)},e.inputChangeHandler=function(t,a){var r=Object(k.a)(Object(m.a)({},e.state.orderForm),Object(v.a)({},a,Object(k.a)(Object(m.a)({},e.state.orderForm[a]),{value:t.target.value,validity:Object(k.c)(t.target.value,e.state.orderForm[a].validations,e.state.orderForm[a].shouldValidate),touched:!0}))),n=Object(k.b)(r);e.setState({formValidity:n}),e.setState({orderForm:r})},e}return Object(n.a)(a,[{key:"render",value:function(){var e=this,t=[];for(var a in this.state.orderForm)t.push({id:a,config:this.state.orderForm[a]});var r=t.map((function(t){return Object(b.jsx)(g.a,Object(m.a)(Object(m.a)({value:t.config.value,changed:function(a){return e.inputChangeHandler(a,t.id)}},t.config.configurations),{},{valid:t.config.validity,shouldValidate:t.config.shouldValidate,isTouched:t.config.touched}),t.id)})),n=Object(b.jsxs)("form",{className:T.a.Form,children:[Object(b.jsx)("h1",{children:"Order form"}),r,Object(b.jsx)(s.a,{btnType:"Success",clicked:this.completeOrder,disabled:!this.state.formValidity,children:"Order"})]});this.props.isLoading&&(n=Object(b.jsx)(O.a,{}));var i=this.props.error?Object(b.jsx)("p",{className:"ErrorTab",children:this.props.error}):null;return Object(b.jsxs)(f.a,{children:[n,i]})}}]),a}(l.Component),F=Object(h.b)((function(e){return{ingredients:e.burgerBuilder.ingredients,totalPrice:e.burgerBuilder.totalPrice,isLoading:e.order.isLoading,error:e.order.error,userId:e.auth.userId,idToken:e.auth.idToken}}),(function(e){return{onCompleteOrder:function(t,a){return e(Object(I.i)(t,a))}}}))(Object(c.g)(Object(x.a)(_,y.a))),V=function(e){Object(i.a)(a,e);var t=Object(o.a)(a);function a(){var e;Object(r.a)(this,a);for(var n=arguments.length,i=new Array(n),o=0;o<n;o++)i[o]=arguments[o];return(e=t.call.apply(t,[this].concat(i))).cancelOrderHandler=function(){e.props.history.replace("/")},e.continueOrderHandler=function(){e.props.history.push(e.props.match.url+"/contact-order")},e}return Object(n.a)(a,[{key:"render",value:function(){var e=Object(b.jsx)(c.a,{to:"/"});if(this.props.ingredients){var t=this.props.purchased?Object(b.jsx)(c.a,{to:"/"}):null;e=Object(b.jsxs)(f.a,{children:[t,Object(b.jsx)(j,{ingredients:this.props.ingredients,totalPrice:this.props.totalPrice,orderCancelled:this.cancelOrderHandler,orderContinued:this.continueOrderHandler}),Object(b.jsx)(c.b,{path:"/checkout/contact-order",exact:!0,component:F})]})}return e}}]),a}(l.Component);t.default=Object(h.b)((function(e){return{ingredients:e.burgerBuilder.ingredients,totalPrice:e.burgerBuilder.totalPrice,purchased:e.order.purchased}}))(V)}}]);
//# sourceMappingURL=3.c552a1ac.chunk.js.map