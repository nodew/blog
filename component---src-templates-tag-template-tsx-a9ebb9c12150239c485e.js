(self.webpackChunkblog=self.webpackChunkblog||[]).push([[382],{9199:function(t){t.exports=function(){"use strict";var t=1e3,e=6e4,n=36e5,r="millisecond",i="second",s="minute",a="hour",u="day",o="week",c="month",f="quarter",h="year",l="date",d="Invalid Date",m=/^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,$=/\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,M={name:"en",weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_"),ordinal:function(t){var e=["th","st","nd","rd"],n=t%100;return"["+t+(e[(n-20)%10]||e[n]||e[0])+"]"}},v=function(t,e,n){var r=String(t);return!r||r.length>=e?t:""+Array(e+1-r.length).join(n)+t},g={s:v,z:function(t){var e=-t.utcOffset(),n=Math.abs(e),r=Math.floor(n/60),i=n%60;return(e<=0?"+":"-")+v(r,2,"0")+":"+v(i,2,"0")},m:function t(e,n){if(e.date()<n.date())return-t(n,e);var r=12*(n.year()-e.year())+(n.month()-e.month()),i=e.clone().add(r,c),s=n-i<0,a=e.clone().add(r+(s?-1:1),c);return+(-(r+(n-i)/(s?i-a:a-i))||0)},a:function(t){return t<0?Math.ceil(t)||0:Math.floor(t)},p:function(t){return{M:c,y:h,w:o,d:u,D:l,h:a,m:s,s:i,ms:r,Q:f}[t]||String(t||"").toLowerCase().replace(/s$/,"")},u:function(t){return void 0===t}},p="en",D={};D[p]=M;var y=function(t){return t instanceof L},w=function t(e,n,r){var i;if(!e)return p;if("string"==typeof e){var s=e.toLowerCase();D[s]&&(i=s),n&&(D[s]=n,i=s);var a=e.split("-");if(!i&&a.length>1)return t(a[0])}else{var u=e.name;D[u]=e,i=u}return!r&&i&&(p=i),i||!r&&p},S=function(t,e){if(y(t))return t.clone();var n="object"==typeof e?e:{};return n.date=t,n.args=arguments,new L(n)},Y=g;Y.l=w,Y.i=y,Y.w=function(t,e){return S(t,{locale:e.$L,utc:e.$u,x:e.$x,$offset:e.$offset})};var L=function(){function M(t){this.$L=w(t.locale,null,!0),this.parse(t)}var v=M.prototype;return v.parse=function(t){this.$d=function(t){var e=t.date,n=t.utc;if(null===e)return new Date(NaN);if(Y.u(e))return new Date;if(e instanceof Date)return new Date(e);if("string"==typeof e&&!/Z$/i.test(e)){var r=e.match(m);if(r){var i=r[2]-1||0,s=(r[7]||"0").substring(0,3);return n?new Date(Date.UTC(r[1],i,r[3]||1,r[4]||0,r[5]||0,r[6]||0,s)):new Date(r[1],i,r[3]||1,r[4]||0,r[5]||0,r[6]||0,s)}}return new Date(e)}(t),this.$x=t.x||{},this.init()},v.init=function(){var t=this.$d;this.$y=t.getFullYear(),this.$M=t.getMonth(),this.$D=t.getDate(),this.$W=t.getDay(),this.$H=t.getHours(),this.$m=t.getMinutes(),this.$s=t.getSeconds(),this.$ms=t.getMilliseconds()},v.$utils=function(){return Y},v.isValid=function(){return!(this.$d.toString()===d)},v.isSame=function(t,e){var n=S(t);return this.startOf(e)<=n&&n<=this.endOf(e)},v.isAfter=function(t,e){return S(t)<this.startOf(e)},v.isBefore=function(t,e){return this.endOf(e)<S(t)},v.$g=function(t,e,n){return Y.u(t)?this[e]:this.set(n,t)},v.unix=function(){return Math.floor(this.valueOf()/1e3)},v.valueOf=function(){return this.$d.getTime()},v.startOf=function(t,e){var n=this,r=!!Y.u(e)||e,f=Y.p(t),d=function(t,e){var i=Y.w(n.$u?Date.UTC(n.$y,e,t):new Date(n.$y,e,t),n);return r?i:i.endOf(u)},m=function(t,e){return Y.w(n.toDate()[t].apply(n.toDate("s"),(r?[0,0,0,0]:[23,59,59,999]).slice(e)),n)},$=this.$W,M=this.$M,v=this.$D,g="set"+(this.$u?"UTC":"");switch(f){case h:return r?d(1,0):d(31,11);case c:return r?d(1,M):d(0,M+1);case o:var p=this.$locale().weekStart||0,D=($<p?$+7:$)-p;return d(r?v-D:v+(6-D),M);case u:case l:return m(g+"Hours",0);case a:return m(g+"Minutes",1);case s:return m(g+"Seconds",2);case i:return m(g+"Milliseconds",3);default:return this.clone()}},v.endOf=function(t){return this.startOf(t,!1)},v.$set=function(t,e){var n,o=Y.p(t),f="set"+(this.$u?"UTC":""),d=(n={},n[u]=f+"Date",n[l]=f+"Date",n[c]=f+"Month",n[h]=f+"FullYear",n[a]=f+"Hours",n[s]=f+"Minutes",n[i]=f+"Seconds",n[r]=f+"Milliseconds",n)[o],m=o===u?this.$D+(e-this.$W):e;if(o===c||o===h){var $=this.clone().set(l,1);$.$d[d](m),$.init(),this.$d=$.set(l,Math.min(this.$D,$.daysInMonth())).$d}else d&&this.$d[d](m);return this.init(),this},v.set=function(t,e){return this.clone().$set(t,e)},v.get=function(t){return this[Y.p(t)]()},v.add=function(r,f){var l,d=this;r=Number(r);var m=Y.p(f),$=function(t){var e=S(d);return Y.w(e.date(e.date()+Math.round(t*r)),d)};if(m===c)return this.set(c,this.$M+r);if(m===h)return this.set(h,this.$y+r);if(m===u)return $(1);if(m===o)return $(7);var M=(l={},l[s]=e,l[a]=n,l[i]=t,l)[m]||1,v=this.$d.getTime()+r*M;return Y.w(v,this)},v.subtract=function(t,e){return this.add(-1*t,e)},v.format=function(t){var e=this,n=this.$locale();if(!this.isValid())return n.invalidDate||d;var r=t||"YYYY-MM-DDTHH:mm:ssZ",i=Y.z(this),s=this.$H,a=this.$m,u=this.$M,o=n.weekdays,c=n.months,f=function(t,n,i,s){return t&&(t[n]||t(e,r))||i[n].slice(0,s)},h=function(t){return Y.s(s%12||12,t,"0")},l=n.meridiem||function(t,e,n){var r=t<12?"AM":"PM";return n?r.toLowerCase():r},m={YY:String(this.$y).slice(-2),YYYY:this.$y,M:u+1,MM:Y.s(u+1,2,"0"),MMM:f(n.monthsShort,u,c,3),MMMM:f(c,u),D:this.$D,DD:Y.s(this.$D,2,"0"),d:String(this.$W),dd:f(n.weekdaysMin,this.$W,o,2),ddd:f(n.weekdaysShort,this.$W,o,3),dddd:o[this.$W],H:String(s),HH:Y.s(s,2,"0"),h:h(1),hh:h(2),a:l(s,a,!0),A:l(s,a,!1),m:String(a),mm:Y.s(a,2,"0"),s:String(this.$s),ss:Y.s(this.$s,2,"0"),SSS:Y.s(this.$ms,3,"0"),Z:i};return r.replace($,(function(t,e){return e||m[t]||i.replace(":","")}))},v.utcOffset=function(){return 15*-Math.round(this.$d.getTimezoneOffset()/15)},v.diff=function(r,l,d){var m,$=Y.p(l),M=S(r),v=(M.utcOffset()-this.utcOffset())*e,g=this-M,p=Y.m(this,M);return p=(m={},m[h]=p/12,m[c]=p,m[f]=p/3,m[o]=(g-v)/6048e5,m[u]=(g-v)/864e5,m[a]=g/n,m[s]=g/e,m[i]=g/t,m)[$]||g,d?p:Y.a(p)},v.daysInMonth=function(){return this.endOf(c).$D},v.$locale=function(){return D[this.$L]},v.locale=function(t,e){if(!t)return this.$L;var n=this.clone(),r=w(t,e,!0);return r&&(n.$L=r),n},v.clone=function(){return Y.w(this.$d,this)},v.toDate=function(){return new Date(this.valueOf())},v.toJSON=function(){return this.isValid()?this.toISOString():null},v.toISOString=function(){return this.$d.toISOString()},v.toString=function(){return this.$d.toUTCString()},M}(),x=L.prototype;return S.prototype=x,[["$ms",r],["$s",i],["$m",s],["$H",a],["$W",u],["$M",c],["$y",h],["$D",l]].forEach((function(t){x[t[1]]=function(e){return this.$g(e,t[0],t[1])}})),S.extend=function(t,e){return t.$i||(t(e,L,S),t.$i=!0),S},S.locale=w,S.isDayjs=y,S.unix=function(t){return S(1e3*t)},S.en=D[p],S.Ls=D,S.p={},S}()},6411:function(t){t.exports=function(){"use strict";var t={LTS:"h:mm:ss A",LT:"h:mm A",L:"MM/DD/YYYY",LL:"MMMM D, YYYY",LLL:"MMMM D, YYYY h:mm A",LLLL:"dddd, MMMM D, YYYY h:mm A"};return function(e,n,r){var i=n.prototype,s=i.format;r.en.formats=t,i.format=function(e){void 0===e&&(e="YYYY-MM-DDTHH:mm:ssZ");var n=this.$locale().formats,r=function(e,n){return e.replace(/(\[[^\]]+])|(LTS?|l{1,4}|L{1,4})/g,(function(e,r,i){var s=i&&i.toUpperCase();return r||n[i]||t[i]||n[s].replace(/(\[[^\]]+])|(MMMM|MM|DD|dddd)/g,(function(t,e,n){return e||n.slice(1)}))}))}(e,void 0===n?{}:n);return s.call(this,r)}}}()},9549:function(t,e,n){"use strict";n.d(e,{l:function(){return i}});var r=n(9953);const i=t=>{let{size:e=20}=t;return r.createElement("svg",{width:e,height:e,fill:"currentColor",viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg"},r.createElement("path",{d:"M19.75 2A2.25 2.25 0 0 1 22 4.25v5.462a3.25 3.25 0 0 1-.952 2.298l-8.5 8.503a3.255 3.255 0 0 1-4.597.001L3.489 16.06a3.25 3.25 0 0 1-.003-4.596l8.5-8.51A3.25 3.25 0 0 1 14.284 2h5.465Zm0 1.5h-5.465c-.465 0-.91.185-1.239.513l-8.512 8.523a1.75 1.75 0 0 0 .015 2.462l4.461 4.454a1.755 1.755 0 0 0 2.477 0l8.5-8.503a1.75 1.75 0 0 0 .513-1.237V4.25a.75.75 0 0 0-.75-.75ZM17 5.502a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z"}))}},229:function(t,e,n){"use strict";n.r(e);var r=n(9953),i=n(4408),s=n(9199),a=n.n(s),u=n(6411),o=n.n(u),c=n(3561),f=n(3945),h=n(9549);a().extend(o());e.default=t=>{let{data:e,pageContext:n}=t;return r.createElement(c.Z,null,r.createElement("div",{className:"max-w-5xl mx-auto"},r.createElement(f.h,{title:"Tag - "+n.tag}),r.createElement("h1",{className:"text-3xl font-bold block mb-8 mt-12 flex items-center"},r.createElement(h.l,null),r.createElement("span",{className:"ml-2"},n.tag)),r.createElement("ul",null,e.posts.nodes.map((t=>r.createElement("li",{key:t.id,className:"text-base mb-4"},r.createElement("div",{className:"text-2xl"},r.createElement(i.rU,{to:"/posts/"+(t.frontmatter.slug||"")},t.frontmatter.title)),r.createElement("div",{className:"text-gray-400 dark:text-gray-700 italic"},a()(t.frontmatter.date).format("LL"))))))))}}}]);
//# sourceMappingURL=component---src-templates-tag-template-tsx-a9ebb9c12150239c485e.js.map