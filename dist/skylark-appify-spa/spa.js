/**
 * skylark-appify-spa - An Elegant  HTML5 Single Page Application Framework.
 * @author Hudaokeji Co.,Ltd
 * @version v0.9.5
 * @link www.skylarkjs.org
 * @license MIT
 */
define(["skylark-langx/skylark","skylark-langx/langx","skylark-appify-routers"],function(t,e,r){var n=e.Deferred;function i(t,r){var n=new CustomEvent(t,r);return e.safeMixin(n,r)}var o,a=new r.Router,s=a.Route=a.Route.inherit({klassName:"SpaRoute",init:function(t,r){this.overrided(t,r),this.content=r.content,this.forceRefresh=r.forceRefresh,this.data=r.data;var n=this;["preparing","rendering","rendered"].forEach(function(t){e.isFunction(r[t])&&n.on(t,r[t])})},_entering:function(t){return this.forceRefresh||t.force||!this._prepared?this.prepare():this},getConfigData:function(t){return t?this.data[t]:this.data},getNamedValue:function(){return window.location.pathname.match(this.regex)},prepare:function(){var t=new n,e=this._setting,r=e.controller,o=(this.controller,this);e.content,e.contentPath;return require([r.type],function(e){o.controller=new e(r),t.resolve()}),t.then(function(){var t=i("preparing",{route:o,result:!0});return o.trigger(t),n.when(t.result).then(function(){o._prepared=!0})})},render:function(t){var e=i("rendering",{route:this,context:t,content:this.content});return this.trigger(e),e.content},trigger:function(t){var e=this.controller;return e?e.perform(t):this.overrided(t)}}),u=e.Evented.inherit({klassName:"SpaRouteController",init:function(t,e){e=e||{},this.content=e.content,this.data=e.data},getConfigData:function(t){return t?this.data[t]:this.data},perform:function(t){var e=t.type;if(this[e])return this[e].call(this,t)}}),h=e.Evented.inherit({klassName:"SpaPage",init:function(t){t=e.mixin({routeViewer:"body"},t),this._params=t,this._rvc=document.querySelector(t.routeViewer),this._router=a,a.on("routed",e.proxy(this,"refresh"))},prepare:function(){},refresh:function(){var t=a.current(),r=(a.previous(),t.route.render(t));void 0!==r&&null!==r&&(e.isString(r)?this._rvc.innerHTML=r:(this._rvc.innerHTML="",this._rvc.appendChild(r)),t.route.trigger(i("rendered",{route:t.route,content:r})))}}),c=e.Evented.inherit({klassName:"SpaPlugin",init:function(t,r){this.name=t,e.isString(r.hookers)&&(r.hookers=r.hookers.split(" ")),this._setting=r},isHooked:function(t){return(this._setting.hookers||[]).indexOf(t)>-1},prepare:function(){var t=new n,r=this._setting,o=r.controller,s=this.controller,u=this;return require([o.type],function(n){s=u.controller=new n(o),a.on(r.hookers,{plugin:u},e.proxy(s.perform,s)),t.resolve()}),t.then(function(){var t=i("preparing",{plugin:u,result:!0});return u.trigger(t),n.when(t.result).then(function(){u._prepared=!0})})},trigger:function(t){var e=this.controller;return e?e.perform(t):this.overrided(t)}}),p=e.Evented.inherit({klassName:"SpaPluginController",init:function(t){this.plugin=t},perform:function(t){var e=t.type;if(this[e])return this[e].call(this,t)}}),l=e.Evented.inherit({klassName:"SpaApplication",init:function(t){if(o)return o;var r=this._plugins={};t=this._config=e.mixin({plugins:{}},t,!0),e.each(t.plugins,function(t,e){r[t]=new c(t,e)}),a.routes(t.routes),this._router=a,this._page=new f.Page(t.page),document.title=t.title;var n=t.baseUrl;void 0===n&&(n=t.baseUrl=new e.URL(document.baseURI).pathname),a.baseUrl(n),t.homePath&&a.homePath(t.homePath),o=this},baseUrl:function(){return a.baseUrl()},getConfig:function(t){return t?this._config[t]:this._config},go:function(t,e){return a.go(t,e),this},page:function(){return this._page},prepare:function(){if(this._prepared)return n.resolve();var t=this,r=e.map(this._plugins,function(t,e){if(t.isHooked("starting"))return t.prepare()});return n.all(r).then(function(){a.trigger(i("starting",{spa:t}));var r=e.map(a.routes(),function(t,e){if(!1===t.lazy)return t.prepare()}),o=e.map(t._plugins,function(t,e){if(!t.isHooked("starting"))return t.prepare()});return n.all(r.concat(o)).then(function(){t._prepared=!0})})},run:function(){this._router.start(),a.trigger(i("started",{spa:this}))}}),f=function(t){return o||(window[t.name||"app"]=o=new f.Application(t)),o};return e.mixin(f,{Application:l,Page:h,Plugin:c,PluginController:p,Route:s,router:a,RouteController:u}),t.attach("ajaxify.spa",f)});
//# sourceMappingURL=sourcemaps/spa.js.map
