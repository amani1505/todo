import{a as L,b as R,c as x,d as E}from"./chunk-NFP7UPPJ.js";import{c as _,e as S,f as k,g as M,i as b,p as C}from"./chunk-R7UVPGSW.js";import{Ea as d,Fa as u,Va as c,ab as i,bb as r,eb as w,ga as v,lb as a,ob as m,pb as g,qb as f,sb as y,tb as h}from"./chunk-4C2JV3MG.js";var A=()=>["/sign-up"],P=(()=>{let o=class o{constructor(l,t,e){this._authService=l,this._activatedRoute=t,this._router=e,this.email="",this.password=""}login(l,t){this._authService.signIn(l,t).subscribe({next:e=>{let s=this._activatedRoute.snapshot.queryParamMap.get("redirectURL")||"/signed-in-redirect";this._router.navigateByUrl(s)},error:e=>{alert("Please check your Email Or Password")}})}};o.\u0275fac=function(t){return new(t||o)(u(C),u(_),u(S))},o.\u0275cmp=v({type:o,selectors:[["app-sigin"]],standalone:!0,features:[y],decls:22,vars:6,consts:[[1,"w-full","h-full","flex","items-center","justify-center"],[1,"bg-white","w-1/2","px-7","py-5","rounded","drop-shadow-lg"],[1,"mb-3"],[1,"font-bold","text-center","text-[2rem]","font-serif"],[1,"text-sm","font-light"],["routerLinkActive","router-link-active",1,"text-sky-500","underline",3,"routerLink"],["type","email","placeholder","Email",1,"border-2","border-sky-500","rounded","p-3","w-full","focus:outline-none",3,"ngModelChange","ngModel"],["type","password","placeholder","Password",1,"border-2","border-sky-500","rounded","p-3","w-full","focus:outline-none",3,"ngModelChange","ngModel"],["routerLinkActive","router-link-active",1,"text-sky-500","underline","capitalize",3,"routerLink"],[1,"bg-green-400","hover:bg-green-500","rounded","text-white","p-2","w-full",3,"click"]],template:function(t,e){t&1&&(i(0,"section",0)(1,"div",1)(2,"div",2)(3,"h1",3),a(4," Sign in"),r()(),i(5,"div",2)(6,"p",4),a(7,"I don't have an Account? "),i(8,"a",5),a(9,"signup"),r()()(),i(10,"div",2)(11,"input",6),f("ngModelChange",function(n){return g(e.email,n)||(e.email=n),n}),r()(),i(12,"div",2)(13,"input",7),f("ngModelChange",function(n){return g(e.password,n)||(e.password=n),n}),r()(),i(14,"div")(15,"div",2)(16,"p",4)(17,"a",8)(18,"em"),a(19,"forget password ?"),r()()()(),i(20,"button",9),w("click",function(){return e.login(e.email,e.password)}),a(21," Login "),r()()()()),t&2&&(d(8),c("routerLink",h(4,A)),d(3),m("ngModel",e.email),d(2),m("ngModel",e.password),d(4),c("routerLink",h(5,A)))},dependencies:[E,L,R,x,b,k,M]});let p=o;return p})();var N=[{path:"",component:P}];export{N as default};
