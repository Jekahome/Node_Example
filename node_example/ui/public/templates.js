!function(){var n=Handlebars.template,l=Handlebars.templates=Handlebars.templates||{};l.example=n({compiler:[8,">= 4.3.0"],main:function(n,l,e,a,t){var o=n.lookupProperty||function(n,l){if(Object.prototype.hasOwnProperty.call(n,l))return n[l]};return"Handlebars <b>"+n.escapeExpression("function"==typeof(o=null!=(o=o(e,"doesWhat")||(null!=l?o(l,"doesWhat"):l))?o:n.hooks.helperMissing)?o.call(null!=l?l:n.nullContext||{},{name:"doesWhat",hash:{},data:t,loc:{start:{line:1,column:14},end:{line:1,column:26}}}):o)+"</b> precompiled!"},useData:!0}),l.nurseryRhymeTemplate=n({compiler:[8,">= 4.3.0"],main:function(n,l,e,a,t){var o=null!=l?l:n.nullContext||{},u=n.hooks.helperMissing,r="function",c=n.escapeExpression,i=n.lookupProperty||function(n,l){if(Object.prototype.hasOwnProperty.call(n,l))return n[l]};return"у Мэри был маленький <b>"+c(typeof(n=null!=(n=i(e,"animal")||(null!=l?i(l,"animal"):l))?n:u)==r?n.call(o,{name:"animal",hash:{},data:t,loc:{start:{line:1,column:24},end:{line:1,column:34}}}):n)+"</b>, его <b>"+c(typeof(n=null!=(n=i(e,"bodyPart")||(null!=l?i(l,"bodyPart"):l))?n:u)==r?n.call(o,{name:"bodyPart",hash:{},data:t,loc:{start:{line:1,column:47},end:{line:1,column:59}}}):n)+"</b>\nбыл <b>"+c(typeof(n=null!=(n=i(e,"adjective")||(null!=l?i(l,"adjective"):l))?n:u)==r?n.call(o,{name:"adjective",hash:{},data:t,loc:{start:{line:2,column:7},end:{line:2,column:20}}}):n)+"</b>, как <b>"+c(typeof(n=null!=(n=i(e,"noun")||(null!=l?i(l,"noun"):l))?n:u)==r?n.call(o,{name:"noun",hash:{},data:t,loc:{start:{line:2,column:33},end:{line:2,column:41}}}):n)+"</b>."},useData:!0})}();