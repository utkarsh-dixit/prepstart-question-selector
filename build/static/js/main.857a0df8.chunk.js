(this["webpackJsonpquestion-selector"]=this["webpackJsonpquestion-selector"]||[]).push([[0],{40:function(e,t,n){e.exports=n(79)},45:function(e,t,n){},46:function(e,t,n){},78:function(e,t,n){},79:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),s=n(15),c=n.n(s),o=(n(45),n(8)),i=n(9),u=n(11),l=n(10),p=n(12),d=(n(46),n(16)),m=n(5),h=n(35),f=n.n(h),b=n(24),v=n(36),y=n.n(v),O=n(37),g=n(4),j=n(1),k=n.n(j),E=n(6),w=n(17),x=n.n(w),S=n(23),C=n.n(S);x.a.defaults.headers.common.Authorization="Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxMSwicm9sZSI6InN0YW5kYXJkIiwiaWF0IjoxNTcwOTcyMzU1fQ.GP0vPy5R5UqFcrLSg_EovQAZkgeoszAR6OdTg1oJYHU";var I,P=function(){var e=Object(E.a)(k.a.mark((function e(t,n){var a,r;return k.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=0===Object.entries(n).length?x.a.get(C.a.resolve("https://backend.prepstart.co/",t)):x.a.post(C.a.resolve("https://backend.prepstart.co/",t),n),e.next=3,r.then((function(e){a=e})).catch((function(e){throw alert("Your Internet is not on"),e}));case 3:return e.abrupt("return",a);case 4:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}(),N="RESET_ALL",T="CHANGE_STATE",D="REMOVE_STEP",_=1,A=2,Y=3,L=4,M=5,X=6,R=7,B=(I={},Object(g.a)(I,_,A),Object(g.a)(I,A,Y),Object(g.a)(I,Y,L),Object(g.a)(I,L,M),Object(g.a)(I,M,X),Object(g.a)(I,X,R),I),J=1,H=2;function U(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function z(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?U(n,!0).forEach((function(t){Object(g.a)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):U(n).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var K={values:{},step:_};var q=Object(m.c)({app:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:K,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case T:return z({},e,{step:t.step,values:z({},e.values,Object(g.a)({},t.currentStep,t.values))});case D:return z({},e,{values:z({},e.values,Object(g.a)({},t.step,null))});case N:return K;default:return e}}}),F={key:"parser",storage:y.a},W=Object(b.a)(F,q),Q=Object(m.d)(W,{},Object(m.a)(O.a,f.a)),G=Object(b.b)(Q,null),V=n(38),Z=n(2),$=function(e){function t(){return Object(o.a)(this,t),Object(u.a)(this,Object(l.a)(t).apply(this,arguments))}return Object(p.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){var e=this.props,t=e.text,n=e.callback,a=e.destroyProgressCallback,s=e.completed,c=e.selected,o=[ee.container];return c&&o.push(ee.selected),r.a.createElement("div",{className:Z.b.apply(void 0,o),onClick:n},r.a.createElement("div",{className:Object(Z.b)(ee.text)},t),s&&r.a.createElement("div",{className:Object(Z.b)(ee.cancel),onClick:a}))}}]),t}(r.a.Component),ee=Z.a.create({container:{display:"flex",background:"#272727",padding:"0.8rem 2rem",fontSize:"1.1rem",borderRadius:"1px",marginBottom:"1rem",justifyContent:"center",cursor:"pointer"},selected:{background:"green"},text:{color:"#fff"},cancel:{color:"#fff"}}),te=n(39),ne=n.n(te),ae=(n(78),function(e){function t(e){return Object(o.a)(this,t),Object(u.a)(this,Object(l.a)(t).call(this,e))}return Object(p.a)(t,e),Object(i.a)(t,[{key:"handleChange",value:function(e){this.props.callback(e.target.value)}},{key:"render",value:function(){return r.a.createElement("div",{className:"text-input"},r.a.createElement("input",{type:"text",onChange:this.handleChange.bind(this),value:this.props.value,placeholder:this.props.placeholder}),r.a.createElement("label",{htmlFor:"input1"},this.props.title))}}]),t}(r.a.Component));Z.a.create({});function re(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function se(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?re(n,!0).forEach((function(t){Object(g.a)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):re(n).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var ce=function(e){function t(e){var n;return Object(o.a)(this,t),(n=Object(u.a)(this,Object(l.a)(t).call(this,e))).pdfRef=void 0,n.metadata=void 0,n.pdfRef=r.a.createRef(),n.state={cropping:{value:!1},mousePos:{X:0,Y:0},values:{},config:{subject_id:1,topic_id:19,difficulty:"easy",summary:"Empty summary"}},n.metadata={},n}return Object(p.a)(t,e),Object(i.a)(t,[{key:"componentDidMount",value:function(){document.addEventListener("mousemove",this.onMouseMove.bind(this),!1),document.addEventListener("keydown",this.onKeyDown.bind(this),!1),document.addEventListener("keyup",this.onKeyUp.bind(this),!1)}},{key:"componentDidUpdate",value:function(){if(this.props.step===X){var e=parseInt(prompt("Which is the correct answer?"));this.moveToNextStep(e,J)}if(this.props.step===R){this.props.values[_];var t={1:this.props.values[A],2:this.props.values[Y],3:this.props.values[L],4:this.props.values[M]},n=this.props.values[X],a={title:this.props.values[_].mode===J?this.props.values[_].content:null,mode:this.props.values[_].mode,difficulty:this.state.difficulty,metadata:JSON.stringify(this.metadata),image:this.props.values[_].mode===H?this.props.values[_].content:null,topic_id:parseInt(this.state.topic_id),subject_id:parseInt(this.state.subject_id),summary:this.state.summary,options:[{optionText:t[1].content,mode:t[1].mode,isCorrect:1===n},{optionText:t[2].content,mode:t[2].mode,isCorrect:2===n},{optionText:t[3].content,mode:t[3].mode,isCorrect:3===n},{optionText:t[4].content,mode:t[4].mode,isCorrect:4===n}]};console.log(a);this.props.submit(a)}}},{key:"cropCanvas",value:function(e,t,n,a,r){var s=document.createElement("canvas");return s.width=a,s.height=r,s.getContext("2d").drawImage(e,t,n,a,r,0,0,a,r),s}},{key:"onMouseMove",value:function(){var e=Object(E.a)(k.a.mark((function e(t){return k.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:this.setState({mousePos:{X:t.clientX,Y:t.clientY}});case 1:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}()},{key:"onKeyUp",value:function(){var e=Object(E.a)(k.a.mark((function e(t){var n,a,r,s,c;return k.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!this.state.cropping.value||16!=t.keyCode){e.next=12;break}return n=Math.abs(this.state.mousePos.X-this.state.cropping.clientX),a=Math.abs(this.state.mousePos.Y-this.state.cropping.clientY),document.body.style.cursor="default",(r=document.getElementById("myStyle"))&&(r.textContent=""),e.next=8,ne()(document.querySelector("body"),{scale:1});case 8:s=e.sent,c=this.cropCanvas(s,1*this.state.cropping.clientX,1*this.state.cropping.clientY,1*n,1*a),this.moveToNextStep(c.toDataURL("image/png"),H),this.setState({cropping:{value:!1}});case 12:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}()},{key:"moveToNextStep",value:function(e,t){this.props.step!==R&&this.props.moveToNextStep(this.props.step,{content:e,mode:t})}},{key:"onKeyDown",value:function(){var e=Object(E.a)(k.a.mark((function e(t){var n,a,r;return k.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(console.log("Presesd"),n=t.keyCode,!(t.ctrlKey||t.metaKey)||67!=n){e.next=11;break}return console.log("LAA"),e.next=7,navigator.clipboard.readText();case 7:a=e.sent,this.moveToNextStep(a,J),e.next=12;break;case 11:16==n&&(this.setState({cropping:{value:!0,clientX:this.state.mousePos.X,clientY:this.state.mousePos.Y}}),document.body.style.cursor="crosshair",(r=document.getElementById("myStyle")?document.getElementById("myStyle"):document.createElement("style")).id="myStyle",r.textContent="\n                .textLayer > span{\n                    cursor: crosshair;\n                    -webkit-touch-callout: none; /* iOS Safari */\n                    -webkit-user-select: none; /* Safari */\n                     -khtml-user-select: none; /* Konqueror HTML */\n                       -moz-user-select: none; /* Old versions of Firefox */\n                        -ms-user-select: none; /* Internet Explorer/Edge */\n                            user-select: none; /* Non-prefixed version, currently\n                                                  supported by Chrome, Opera and Firefox */\n                }\n            ",document.getElementById("myStyle")||document.body.appendChild(r));case 12:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}()},{key:"updateTopicId",value:function(e){this.setState(se({},this.state,{config:se({},this.state.config,{topic_id:e})}))}},{key:"updateSubjectId",value:function(e){this.setState(se({},this.state,{config:se({},this.state.config,{subject_id:e})}))}},{key:"updateSummary",value:function(e){this.setState(se({},this.state,{config:se({},this.state.config,{summary:e})}))}},{key:"updateDifficulty",value:function(e){this.setState(se({},this.state,{config:se({},this.state.config,{difficulty:e})}))}},{key:"render",value:function(){var e=this.props.step===_,t=this.props.step===A,n=this.props.step===Y,a=this.props.step===L,s=this.props.step===M,c=this.props.step===X;return r.a.createElement("div",{className:Object(Z.b)(oe.container)},r.a.createElement("div",{className:Object(Z.b)(oe.stepsSection)},r.a.createElement("div",{className:Object(Z.b)(oe.stepsHeading)},"Config"),r.a.createElement("div",{className:Object(Z.b)(oe.buttonsContainer)},r.a.createElement(ae,{placeholder:"Enter topic_id",title:"Topic",value:this.state.config.topic_id,callback:this.updateTopicId.bind(this)}),r.a.createElement(ae,{placeholder:"Enter subject_id",title:"Subject",value:this.state.config.subject_id,callback:this.updateSubjectId.bind(this)}),r.a.createElement(ae,{placeholder:"Enter difficulty",title:"Difficulty",value:this.state.config.difficulty,callback:this.updateDifficulty.bind(this)}),r.a.createElement(ae,{placeholder:"Enter summary",title:"Summary",value:this.state.config.summary,callback:this.updateSummary.bind(this)})),r.a.createElement("div",{className:Object(Z.b)(oe.stepsHeading)}),r.a.createElement("div",{className:Object(Z.b)(oe.stepsHeading)}),r.a.createElement("div",{className:Object(Z.b)(oe.stepsHeading)},"Steps"),r.a.createElement("div",{className:Object(Z.b)(oe.buttonsContainer)},r.a.createElement($,{text:"Select Question",selected:e}),r.a.createElement($,{text:"Select Answer 1",selected:t}),r.a.createElement($,{text:"Select Answer 2",selected:n}),r.a.createElement($,{text:"Select Answer 3",selected:a}),r.a.createElement($,{text:"Select Answer 4",selected:s}),r.a.createElement($,{text:"Select Correct Answer",selected:c}))))}}]),t}(a.Component),oe=Z.a.create({container:{display:"flex",background:"#fff"},stepsSection:{flex:1,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",width:"100%",height:"100vh",fontSize:"1.3rem"},buttonsContainer:{},stepsHeading:{marginBottom:"1rem"}}),ie={moveToNextStep:function(e,t){return function(){var n=Object(E.a)(k.a.mark((function n(a){return k.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:a({type:T,values:t,currentStep:e,step:B[e]});case 1:case"end":return n.stop()}}),n)})));return function(e){return n.apply(this,arguments)}}()},resetAll:function(){return function(){var e=Object(E.a)(k.a.mark((function e(t){return k.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:t({type:N});case 1:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()},submit:function(e,t){return function(){var n=Object(E.a)(k.a.mark((function n(a){var r;return k.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return a({type:N}),n.next=3,P("/createQuestion",e);case 3:r=n.sent,t(r.data);case 5:case"end":return n.stop()}}),n)})));return function(e){return n.apply(this,arguments)}}()}},ue=Object(d.b)((function(e){var t=e.app;return{step:t.step,values:t.values}}),ie)(ce),le=function(e){function t(e){return Object(o.a)(this,t),Object(u.a)(this,Object(l.a)(t).call(this,e))}return Object(p.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){return r.a.createElement(d.a,{store:Q},r.a.createElement(V.a,{loading:r.a.createElement("div",null,"Loading..."),persistor:G},r.a.createElement(ue,null)))}}]),t}(r.a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(r.a.createElement(le,null),document.getElementById("sidebarElement")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}},[[40,1,2]]]);
//# sourceMappingURL=main.857a0df8.chunk.js.map