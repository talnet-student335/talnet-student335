(function(a){jQuery.fn.serverCall=function(c){if(typeof c!=="object"){c={method:c,args:a.makeArray(arguments).splice(1,arguments.length-1)}}if(this.data("ajaxAttrs")){return this.each(function(){var e=a(this);var d=b(e.data("ajaxAttrs"),c);var f=e.data("callId");e.data("callId",f+1);d.ep.callId=f;d.sh=[function(){var g=e.data("result"+f);e.removeData("result"+f);if(a.isFunction(c.success)){c.success(g,e)}}];Wicket.Ajax.ajax(d)})}else{return this.bind("serverCallBound",function(d){a(this).serverCall(c).unbind("serverCallBound")})}};function b(e,f){var c=a.extend(true,{},e);c.ep={};var d=0;while(f.args&&d<f.args.length){if(typeof f.args[d]==="object"){c.ep["arg"+d]=JSON.stringify(f.args[d])}else{c.ep["arg"+d]=f.args[d]}d++}c.ep.argCount=d;c.ep.methodName=f.method;return c}jQuery.fn.bindServerCall=function(c){this.data({ajaxAttrs:c.ajax,callId:1});this.triggerHandler("serverCallBound")}})(jQuery);