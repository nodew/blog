(self.webpackChunkblog=self.webpackChunkblog||[]).push([[823],{7484:function(t){t.exports=function(){"use strict";var t=1e3,e=6e4,n=36e5,r="millisecond",i="second",s="minute",a="hour",u="day",o="week",c="month",l="quarter",f="year",h="date",d="Invalid Date",m=/^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,$=/\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,M={name:"en",weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_"),ordinal:function(t){var e=["th","st","nd","rd"],n=t%100;return"["+t+(e[(n-20)%10]||e[n]||e[0])+"]"}},v=function(t,e,n){var r=String(t);return!r||r.length>=e?t:""+Array(e+1-r.length).join(n)+t},g={s:v,z:function(t){var e=-t.utcOffset(),n=Math.abs(e),r=Math.floor(n/60),i=n%60;return(e<=0?"+":"-")+v(r,2,"0")+":"+v(i,2,"0")},m:function t(e,n){if(e.date()<n.date())return-t(n,e);var r=12*(n.year()-e.year())+(n.month()-e.month()),i=e.clone().add(r,c),s=n-i<0,a=e.clone().add(r+(s?-1:1),c);return+(-(r+(n-i)/(s?i-a:a-i))||0)},a:function(t){return t<0?Math.ceil(t)||0:Math.floor(t)},p:function(t){return{M:c,y:f,w:o,d:u,D:h,h:a,m:s,s:i,ms:r,Q:l}[t]||String(t||"").toLowerCase().replace(/s$/,"")},u:function(t){return void 0===t}},p="en",D={};D[p]=M;var y=function(t){return t instanceof b},S=function t(e,n,r){var i;if(!e)return p;if("string"==typeof e){var s=e.toLowerCase();D[s]&&(i=s),n&&(D[s]=n,i=s);var a=e.split("-");if(!i&&a.length>1)return t(a[0])}else{var u=e.name;D[u]=e,i=u}return!r&&i&&(p=i),i||!r&&p},w=function(t,e){if(y(t))return t.clone();var n="object"==typeof e?e:{};return n.date=t,n.args=arguments,new b(n)},Y=g;Y.l=S,Y.i=y,Y.w=function(t,e){return w(t,{locale:e.$L,utc:e.$u,x:e.$x,$offset:e.$offset})};var b=function(){function M(t){this.$L=S(t.locale,null,!0),this.parse(t)}var v=M.prototype;return v.parse=function(t){this.$d=function(t){var e=t.date,n=t.utc;if(null===e)return new Date(NaN);if(Y.u(e))return new Date;if(e instanceof Date)return new Date(e);if("string"==typeof e&&!/Z$/i.test(e)){var r=e.match(m);if(r){var i=r[2]-1||0,s=(r[7]||"0").substring(0,3);return n?new Date(Date.UTC(r[1],i,r[3]||1,r[4]||0,r[5]||0,r[6]||0,s)):new Date(r[1],i,r[3]||1,r[4]||0,r[5]||0,r[6]||0,s)}}return new Date(e)}(t),this.$x=t.x||{},this.init()},v.init=function(){var t=this.$d;this.$y=t.getFullYear(),this.$M=t.getMonth(),this.$D=t.getDate(),this.$W=t.getDay(),this.$H=t.getHours(),this.$m=t.getMinutes(),this.$s=t.getSeconds(),this.$ms=t.getMilliseconds()},v.$utils=function(){return Y},v.isValid=function(){return!(this.$d.toString()===d)},v.isSame=function(t,e){var n=w(t);return this.startOf(e)<=n&&n<=this.endOf(e)},v.isAfter=function(t,e){return w(t)<this.startOf(e)},v.isBefore=function(t,e){return this.endOf(e)<w(t)},v.$g=function(t,e,n){return Y.u(t)?this[e]:this.set(n,t)},v.unix=function(){return Math.floor(this.valueOf()/1e3)},v.valueOf=function(){return this.$d.getTime()},v.startOf=function(t,e){var n=this,r=!!Y.u(e)||e,l=Y.p(t),d=function(t,e){var i=Y.w(n.$u?Date.UTC(n.$y,e,t):new Date(n.$y,e,t),n);return r?i:i.endOf(u)},m=function(t,e){return Y.w(n.toDate()[t].apply(n.toDate("s"),(r?[0,0,0,0]:[23,59,59,999]).slice(e)),n)},$=this.$W,M=this.$M,v=this.$D,g="set"+(this.$u?"UTC":"");switch(l){case f:return r?d(1,0):d(31,11);case c:return r?d(1,M):d(0,M+1);case o:var p=this.$locale().weekStart||0,D=($<p?$+7:$)-p;return d(r?v-D:v+(6-D),M);case u:case h:return m(g+"Hours",0);case a:return m(g+"Minutes",1);case s:return m(g+"Seconds",2);case i:return m(g+"Milliseconds",3);default:return this.clone()}},v.endOf=function(t){return this.startOf(t,!1)},v.$set=function(t,e){var n,o=Y.p(t),l="set"+(this.$u?"UTC":""),d=(n={},n[u]=l+"Date",n[h]=l+"Date",n[c]=l+"Month",n[f]=l+"FullYear",n[a]=l+"Hours",n[s]=l+"Minutes",n[i]=l+"Seconds",n[r]=l+"Milliseconds",n)[o],m=o===u?this.$D+(e-this.$W):e;if(o===c||o===f){var $=this.clone().set(h,1);$.$d[d](m),$.init(),this.$d=$.set(h,Math.min(this.$D,$.daysInMonth())).$d}else d&&this.$d[d](m);return this.init(),this},v.set=function(t,e){return this.clone().$set(t,e)},v.get=function(t){return this[Y.p(t)]()},v.add=function(r,l){var h,d=this;r=Number(r);var m=Y.p(l),$=function(t){var e=w(d);return Y.w(e.date(e.date()+Math.round(t*r)),d)};if(m===c)return this.set(c,this.$M+r);if(m===f)return this.set(f,this.$y+r);if(m===u)return $(1);if(m===o)return $(7);var M=(h={},h[s]=e,h[a]=n,h[i]=t,h)[m]||1,v=this.$d.getTime()+r*M;return Y.w(v,this)},v.subtract=function(t,e){return this.add(-1*t,e)},v.format=function(t){var e=this,n=this.$locale();if(!this.isValid())return n.invalidDate||d;var r=t||"YYYY-MM-DDTHH:mm:ssZ",i=Y.z(this),s=this.$H,a=this.$m,u=this.$M,o=n.weekdays,c=n.months,l=function(t,n,i,s){return t&&(t[n]||t(e,r))||i[n].slice(0,s)},f=function(t){return Y.s(s%12||12,t,"0")},h=n.meridiem||function(t,e,n){var r=t<12?"AM":"PM";return n?r.toLowerCase():r},m={YY:String(this.$y).slice(-2),YYYY:this.$y,M:u+1,MM:Y.s(u+1,2,"0"),MMM:l(n.monthsShort,u,c,3),MMMM:l(c,u),D:this.$D,DD:Y.s(this.$D,2,"0"),d:String(this.$W),dd:l(n.weekdaysMin,this.$W,o,2),ddd:l(n.weekdaysShort,this.$W,o,3),dddd:o[this.$W],H:String(s),HH:Y.s(s,2,"0"),h:f(1),hh:f(2),a:h(s,a,!0),A:h(s,a,!1),m:String(a),mm:Y.s(a,2,"0"),s:String(this.$s),ss:Y.s(this.$s,2,"0"),SSS:Y.s(this.$ms,3,"0"),Z:i};return r.replace($,(function(t,e){return e||m[t]||i.replace(":","")}))},v.utcOffset=function(){return 15*-Math.round(this.$d.getTimezoneOffset()/15)},v.diff=function(r,h,d){var m,$=Y.p(h),M=w(r),v=(M.utcOffset()-this.utcOffset())*e,g=this-M,p=Y.m(this,M);return p=(m={},m[f]=p/12,m[c]=p,m[l]=p/3,m[o]=(g-v)/6048e5,m[u]=(g-v)/864e5,m[a]=g/n,m[s]=g/e,m[i]=g/t,m)[$]||g,d?p:Y.a(p)},v.daysInMonth=function(){return this.endOf(c).$D},v.$locale=function(){return D[this.$L]},v.locale=function(t,e){if(!t)return this.$L;var n=this.clone(),r=S(t,e,!0);return r&&(n.$L=r),n},v.clone=function(){return Y.w(this.$d,this)},v.toDate=function(){return new Date(this.valueOf())},v.toJSON=function(){return this.isValid()?this.toISOString():null},v.toISOString=function(){return this.$d.toISOString()},v.toString=function(){return this.$d.toUTCString()},M}(),L=b.prototype;return w.prototype=L,[["$ms",r],["$s",i],["$m",s],["$H",a],["$W",u],["$M",c],["$y",f],["$D",h]].forEach((function(t){L[t[1]]=function(e){return this.$g(e,t[0],t[1])}})),w.extend=function(t,e){return t.$i||(t(e,b,w),t.$i=!0),w},w.locale=S,w.isDayjs=y,w.unix=function(t){return w(1e3*t)},w.en=D[p],w.Ls=D,w.p={},w}()},6176:function(t){t.exports=function(){"use strict";var t={LTS:"h:mm:ss A",LT:"h:mm A",L:"MM/DD/YYYY",LL:"MMMM D, YYYY",LLL:"MMMM D, YYYY h:mm A",LLLL:"dddd, MMMM D, YYYY h:mm A"};return function(e,n,r){var i=n.prototype,s=i.format;r.en.formats=t,i.format=function(e){void 0===e&&(e="YYYY-MM-DDTHH:mm:ssZ");var n=this.$locale().formats,r=function(e,n){return e.replace(/(\[[^\]]+])|(LTS?|l{1,4}|L{1,4})/g,(function(e,r,i){var s=i&&i.toUpperCase();return r||n[i]||t[i]||n[s].replace(/(\[[^\]]+])|(MMMM|MM|DD|dddd)/g,(function(t,e,n){return e||n.slice(1)}))}))}(e,void 0===n?{}:n);return s.call(this,r)}}}()},6885:function(t,e,n){"use strict";n.r(e);var r=n(7294),i=n(7484),s=n.n(i),a=n(6176),u=n.n(a),o=n(1903),c=n(507);s().extend(u()),e.default=t=>{let{data:e}=t;return r.createElement(o.Z,{activeNavItem:"books"},r.createElement("div",{className:"max-w-5xl mx-auto"},r.createElement(c.h,{title:"All publications"}),r.createElement("h1",{className:"text-3xl font-bold block mb-8 mt-12"},"All publications"),r.createElement("ul",{className:"grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-4"},e.books.edges.map((t=>t.node.childMdx)).map((t=>{var e,n,i;return r.createElement("li",{key:t.id},r.createElement("a",{href:"/books/"+(null==t||null===(e=t.frontmatter)||void 0===e?void 0:e.slug)},r.createElement("div",{className:"rounded overflow-hidden shadow-lg dark:bg-gray-700 hover:dark:text-gray-300"},r.createElement("img",{className:"w-full",src:(null==t||null===(n=t.frontmatter)||void 0===n?void 0:n.cover)||"",alt:"Cover of framework design guidelines"}),r.createElement("div",{className:"px-6 py-4"},r.createElement("div",{className:"font-bold text-xl mb-2"},null==t||null===(i=t.frontmatter)||void 0===i?void 0:i.name)))))})))))}}}]);
//# sourceMappingURL=component---src-pages-books-tsx-49c51938ed3b4ea6ad0e.js.map