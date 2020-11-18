function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _defineProperties(e,t){for(var a=0;a<t.length;a++){var n=t[a];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}function _createClass(e,t,a){return t&&_defineProperties(e.prototype,t),a&&_defineProperties(e,a),e}(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{XWda:function(e,t,a){"use strict";a.r(t);var n=a("ofXK"),o=a("tyNb"),s=a("bTqV"),r=a("Wp6s"),c=a("NFeN"),i=a("MutI"),b=a("Qu3c"),l=a("YUcS"),u=a("bFKe"),d=a("3sEA"),m=a("rmxa"),f=a("qP9D"),p=a("fXoL"),g=a("XiUz");function h(e,t){1&e&&(p.bc(0,"div",16),p.bc(1,"button",17),p.Pc(2,"Register"),p.ac(),p.Wb(3,"span",18),p.bc(4,"a",19),p.bc(5,"button",20),p.Pc(6,"Login"),p.ac(),p.ac(),p.ac())}function v(e,t){1&e&&(p.bc(0,"div",16),p.bc(1,"button",21),p.Pc(2,"Go to Dashboard"),p.ac(),p.ac())}var y,w=[{path:"",component:(y=function(){function e(t,a,n,o){_classCallCheck(this,e),this.router=t,this.loader=a,this.layout=n,this.state=o,this.loggedin=!1,this.versions=[{name:"Dark sidebar",photo:"assets/images/screenshots/black_sidebar.png",dest:"dashboard/analytics",conf:'{\n        "navigationPos": "side",\n        "sidebarStyle": "full",\n        "sidebarColor": "slate",\n        "topbarColor": "white",\n        "footerColor": "slate",\n        "dir": "ltr",\n        "useBreadcrumb": true,\n        "topbarFixed": false,\n        "breadcrumb": "simple",\n        "matTheme": "egret-navy"\n      }'},{name:"Light Sidebar",photo:"assets/images/screenshots/white_sidebar.png",dest:"dashboard/default",conf:'{\n        "navigationPos": "side",\n        "sidebarStyle": "full",\n        "sidebarColor": "white",\n        "topbarColor": "white",\n        "footerColor":"slate",\n        "dir": "ltr",\n        "useBreadcrumb": true,\n        "topbarFixed": false,\n        "breadcrumb": "simple",\n        "matTheme": "egret-blue"\n      }'},{name:"Dark Theme",photo:"assets/images/screenshots/dark_theme.png",dest:"dashboard/crypto",conf:'{\n        "navigationPos": "side",\n        "sidebarStyle": "compact",\n        "sidebarColor": "slate",\n        "topbarColor": "slate",\n        "footerColor":"slate",\n        "dir": "ltr",\n        "useBreadcrumb": true,\n        "topbarFixed": false,\n        "breadcrumb": "simple",\n        "matTheme": "egret-dark-purple"\n      }'}]}return _createClass(e,[{key:"ngOnInit",value:function(){var e=this;this.mainVersion=this.versions[0],this.state.loggedIn.subscribe((function(t){return e.loggedin=t}))}},{key:"ngOnDestroy",value:function(){this.loader.close()}},{key:"ngAfterViewInit",value:function(){}},{key:"goToDashboard",value:function(e){var t=window.location.origin;window.location.href="".concat(t,"/").concat(e.dest,"/?layout=").concat(e.conf)}},{key:"goToMainDash",value:function(){this.loader.open(),this.router.navigateByUrl("/dashboard/analytics")}}]),e}(),y.\u0275fac=function(e){return new(e||y)(p.Vb(o.g),p.Vb(d.a),p.Vb(m.a),p.Vb(f.a))},y.\u0275cmp=p.Pb({type:y,selectors:[["app-home"]],decls:33,vars:2,consts:[[1,"scrollable",3,"perfectScrollbar"],[1,"home-section","section-intro","text-center"],[1,"container"],[1,"egret"],["src","assets/images/5-star.png","alt",""],["fxLayout","row","fxLayout.lt-sm","column","fxLayoutAlign","center center","class","mb-48",4,"ngIf"],["id","demos",1,"home-section","section-demos"],[1,"text-center"],[1,"text-20","mt-0","mb-1"],["fxLayout","row wrap","fxLayout.lt-sm","column"],["fxFlex","33.33",1,"demo-box-wrap"],["matTooltipPosition","above",1,"text-center","demo-box"],[1,"p-0","screenshot"],["src","assets/images/naky.png"],["src","assets/images/ebs.png"],[3,"src"],["fxLayout","row","fxLayout.lt-sm","column","fxLayoutAlign","center center",1,"mb-48"],["mat-raised-button","","mat-lg-button","","routerLink","/sessions/signup4"],["fxFlex","8px"],["routerLink","/sessions/signin4"],["mat-raised-button","","mat-lg-button","",1,"pink","pink-500-fg"],["mat-raised-button","","mat-lg-button","","routerLink","/profile/overview"]],template:function(e,t){1&e&&(p.bc(0,"div",0),p.bc(1,"section",1),p.bc(2,"div",2),p.bc(3,"span",3),p.Pc(4,"Ghana Bookstore"),p.ac(),p.Wb(5,"img",4),p.bc(6,"h1"),p.Pc(7,"Your Number Book Sales shop in Ghana"),p.ac(),p.bc(8,"p"),p.Pc(9,"Register with us to watch your publishing "),p.bc(10,"strong"),p.Pc(11,"house "),p.ac(),p.Pc(12," grow."),p.ac(),p.Nc(13,h,7,0,"div",5),p.Nc(14,v,3,0,"div",5),p.ac(),p.ac(),p.bc(15,"section",6),p.bc(16,"div",2),p.bc(17,"div",7),p.bc(18,"h2",8),p.Pc(19,"Our Happy Customers "),p.ac(),p.ac(),p.bc(20,"div",9),p.bc(21,"div",10),p.bc(22,"div",11),p.bc(23,"div",12),p.Wb(24,"img",13),p.ac(),p.ac(),p.ac(),p.bc(25,"div",10),p.bc(26,"div",11),p.bc(27,"div",12),p.Wb(28,"img",14),p.ac(),p.ac(),p.ac(),p.bc(29,"div",10),p.bc(30,"div",11),p.bc(31,"div",12),p.Wb(32,"img",15),p.ac(),p.ac(),p.ac(),p.ac(),p.ac(),p.ac(),p.ac()),2&e&&(p.Gb(13),p.tc("ngIf",!t.loggedin),p.Gb(1),p.tc("ngIf",t.loggedin))},directives:[u.b,n.m,g.c,g.a,g.b,s.b,o.h,o.j],encapsulation:2}),y)}];a.d(t,"HomeModule",(function(){return x}));var k,x=((k=function e(){_classCallCheck(this,e)}).\u0275mod=p.Tb({type:k}),k.\u0275inj=p.Sb({factory:function(e){return new(e||k)},imports:[[n.c,i.c,r.c,s.c,c.b,b.b,l.a,u.c,o.k.forChild(w)]]}),k)}}]);