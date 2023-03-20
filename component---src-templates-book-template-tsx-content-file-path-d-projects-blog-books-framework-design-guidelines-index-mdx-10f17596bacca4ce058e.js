(self.webpackChunkblog=self.webpackChunkblog||[]).push([[96],{7484:function(t){t.exports=function(){"use strict";var t=1e3,e=6e4,n=36e5,r="millisecond",i="second",s="minute",a="hour",u="day",l="week",o="month",c="quarter",h="year",f="date",m="Invalid Date",d=/^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,p=/\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,$={name:"en",weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_"),ordinal:function(t){var e=["th","st","nd","rd"],n=t%100;return"["+t+(e[(n-20)%10]||e[n]||e[0])+"]"}},M=function(t,e,n){var r=String(t);return!r||r.length>=e?t:""+Array(e+1-r.length).join(n)+t},g={s:M,z:function(t){var e=-t.utcOffset(),n=Math.abs(e),r=Math.floor(n/60),i=n%60;return(e<=0?"+":"-")+M(r,2,"0")+":"+M(i,2,"0")},m:function t(e,n){if(e.date()<n.date())return-t(n,e);var r=12*(n.year()-e.year())+(n.month()-e.month()),i=e.clone().add(r,o),s=n-i<0,a=e.clone().add(r+(s?-1:1),o);return+(-(r+(n-i)/(s?i-a:a-i))||0)},a:function(t){return t<0?Math.ceil(t)||0:Math.floor(t)},p:function(t){return{M:o,y:h,w:l,d:u,D:f,h:a,m:s,s:i,ms:r,Q:c}[t]||String(t||"").toLowerCase().replace(/s$/,"")},u:function(t){return void 0===t}},E="en",v={};v[E]=$;var D=function(t){return t instanceof Y},y=function t(e,n,r){var i;if(!e)return E;if("string"==typeof e){var s=e.toLowerCase();v[s]&&(i=s),n&&(v[s]=n,i=s);var a=e.split("-");if(!i&&a.length>1)return t(a[0])}else{var u=e.name;v[u]=e,i=u}return!r&&i&&(E=i),i||!r&&E},w=function(t,e){if(D(t))return t.clone();var n="object"==typeof e?e:{};return n.date=t,n.args=arguments,new Y(n)},S=g;S.l=y,S.i=D,S.w=function(t,e){return w(t,{locale:e.$L,utc:e.$u,x:e.$x,$offset:e.$offset})};var Y=function(){function $(t){this.$L=y(t.locale,null,!0),this.parse(t)}var M=$.prototype;return M.parse=function(t){this.$d=function(t){var e=t.date,n=t.utc;if(null===e)return new Date(NaN);if(S.u(e))return new Date;if(e instanceof Date)return new Date(e);if("string"==typeof e&&!/Z$/i.test(e)){var r=e.match(d);if(r){var i=r[2]-1||0,s=(r[7]||"0").substring(0,3);return n?new Date(Date.UTC(r[1],i,r[3]||1,r[4]||0,r[5]||0,r[6]||0,s)):new Date(r[1],i,r[3]||1,r[4]||0,r[5]||0,r[6]||0,s)}}return new Date(e)}(t),this.$x=t.x||{},this.init()},M.init=function(){var t=this.$d;this.$y=t.getFullYear(),this.$M=t.getMonth(),this.$D=t.getDate(),this.$W=t.getDay(),this.$H=t.getHours(),this.$m=t.getMinutes(),this.$s=t.getSeconds(),this.$ms=t.getMilliseconds()},M.$utils=function(){return S},M.isValid=function(){return!(this.$d.toString()===m)},M.isSame=function(t,e){var n=w(t);return this.startOf(e)<=n&&n<=this.endOf(e)},M.isAfter=function(t,e){return w(t)<this.startOf(e)},M.isBefore=function(t,e){return this.endOf(e)<w(t)},M.$g=function(t,e,n){return S.u(t)?this[e]:this.set(n,t)},M.unix=function(){return Math.floor(this.valueOf()/1e3)},M.valueOf=function(){return this.$d.getTime()},M.startOf=function(t,e){var n=this,r=!!S.u(e)||e,c=S.p(t),m=function(t,e){var i=S.w(n.$u?Date.UTC(n.$y,e,t):new Date(n.$y,e,t),n);return r?i:i.endOf(u)},d=function(t,e){return S.w(n.toDate()[t].apply(n.toDate("s"),(r?[0,0,0,0]:[23,59,59,999]).slice(e)),n)},p=this.$W,$=this.$M,M=this.$D,g="set"+(this.$u?"UTC":"");switch(c){case h:return r?m(1,0):m(31,11);case o:return r?m(1,$):m(0,$+1);case l:var E=this.$locale().weekStart||0,v=(p<E?p+7:p)-E;return m(r?M-v:M+(6-v),$);case u:case f:return d(g+"Hours",0);case a:return d(g+"Minutes",1);case s:return d(g+"Seconds",2);case i:return d(g+"Milliseconds",3);default:return this.clone()}},M.endOf=function(t){return this.startOf(t,!1)},M.$set=function(t,e){var n,l=S.p(t),c="set"+(this.$u?"UTC":""),m=(n={},n[u]=c+"Date",n[f]=c+"Date",n[o]=c+"Month",n[h]=c+"FullYear",n[a]=c+"Hours",n[s]=c+"Minutes",n[i]=c+"Seconds",n[r]=c+"Milliseconds",n)[l],d=l===u?this.$D+(e-this.$W):e;if(l===o||l===h){var p=this.clone().set(f,1);p.$d[m](d),p.init(),this.$d=p.set(f,Math.min(this.$D,p.daysInMonth())).$d}else m&&this.$d[m](d);return this.init(),this},M.set=function(t,e){return this.clone().$set(t,e)},M.get=function(t){return this[S.p(t)]()},M.add=function(r,c){var f,m=this;r=Number(r);var d=S.p(c),p=function(t){var e=w(m);return S.w(e.date(e.date()+Math.round(t*r)),m)};if(d===o)return this.set(o,this.$M+r);if(d===h)return this.set(h,this.$y+r);if(d===u)return p(1);if(d===l)return p(7);var $=(f={},f[s]=e,f[a]=n,f[i]=t,f)[d]||1,M=this.$d.getTime()+r*$;return S.w(M,this)},M.subtract=function(t,e){return this.add(-1*t,e)},M.format=function(t){var e=this,n=this.$locale();if(!this.isValid())return n.invalidDate||m;var r=t||"YYYY-MM-DDTHH:mm:ssZ",i=S.z(this),s=this.$H,a=this.$m,u=this.$M,l=n.weekdays,o=n.months,c=function(t,n,i,s){return t&&(t[n]||t(e,r))||i[n].slice(0,s)},h=function(t){return S.s(s%12||12,t,"0")},f=n.meridiem||function(t,e,n){var r=t<12?"AM":"PM";return n?r.toLowerCase():r},d={YY:String(this.$y).slice(-2),YYYY:this.$y,M:u+1,MM:S.s(u+1,2,"0"),MMM:c(n.monthsShort,u,o,3),MMMM:c(o,u),D:this.$D,DD:S.s(this.$D,2,"0"),d:String(this.$W),dd:c(n.weekdaysMin,this.$W,l,2),ddd:c(n.weekdaysShort,this.$W,l,3),dddd:l[this.$W],H:String(s),HH:S.s(s,2,"0"),h:h(1),hh:h(2),a:f(s,a,!0),A:f(s,a,!1),m:String(a),mm:S.s(a,2,"0"),s:String(this.$s),ss:S.s(this.$s,2,"0"),SSS:S.s(this.$ms,3,"0"),Z:i};return r.replace(p,(function(t,e){return e||d[t]||i.replace(":","")}))},M.utcOffset=function(){return 15*-Math.round(this.$d.getTimezoneOffset()/15)},M.diff=function(r,f,m){var d,p=S.p(f),$=w(r),M=($.utcOffset()-this.utcOffset())*e,g=this-$,E=S.m(this,$);return E=(d={},d[h]=E/12,d[o]=E,d[c]=E/3,d[l]=(g-M)/6048e5,d[u]=(g-M)/864e5,d[a]=g/n,d[s]=g/e,d[i]=g/t,d)[p]||g,m?E:S.a(E)},M.daysInMonth=function(){return this.endOf(o).$D},M.$locale=function(){return v[this.$L]},M.locale=function(t,e){if(!t)return this.$L;var n=this.clone(),r=y(t,e,!0);return r&&(n.$L=r),n},M.clone=function(){return S.w(this.$d,this)},M.toDate=function(){return new Date(this.valueOf())},M.toJSON=function(){return this.isValid()?this.toISOString():null},M.toISOString=function(){return this.$d.toISOString()},M.toString=function(){return this.$d.toUTCString()},$}(),b=Y.prototype;return w.prototype=b,[["$ms",r],["$s",i],["$m",s],["$H",a],["$W",u],["$M",o],["$y",h],["$D",f]].forEach((function(t){b[t[1]]=function(e){return this.$g(e,t[0],t[1])}})),w.extend=function(t,e){return t.$i||(t(e,Y,w),t.$i=!0),w},w.locale=y,w.isDayjs=D,w.unix=function(t){return w(1e3*t)},w.en=v[E],w.Ls=v,w.p={},w}()},6176:function(t){t.exports=function(){"use strict";var t={LTS:"h:mm:ss A",LT:"h:mm A",L:"MM/DD/YYYY",LL:"MMMM D, YYYY",LLL:"MMMM D, YYYY h:mm A",LLLL:"dddd, MMMM D, YYYY h:mm A"};return function(e,n,r){var i=n.prototype,s=i.format;r.en.formats=t,i.format=function(e){void 0===e&&(e="YYYY-MM-DDTHH:mm:ssZ");var n=this.$locale().formats,r=function(e,n){return e.replace(/(\[[^\]]+])|(LTS?|l{1,4}|L{1,4})/g,(function(e,r,i){var s=i&&i.toUpperCase();return r||n[i]||t[i]||n[s].replace(/(\[[^\]]+])|(MMMM|MM|DD|dddd)/g,(function(t,e,n){return e||n.slice(1)}))}))}(e,void 0===n?{}:n);return s.call(this,r)}}}()},1911:function(t,e,n){"use strict";n.r(e),n.d(e,{default:function(){return d}});var r=n(1151),i=n(7294);function s(t){const e=Object.assign({p:"p",strong:"strong",a:"a",ol:"ol",li:"li",h2:"h2"},(0,r.ah)(),t.components);return i.createElement(i.Fragment,null,i.createElement("img",{src:"/images/framework-design-guidelines-cover.png",alt:"Book cover",width:"600px",height:"600px",className:"mx-auto"}),"\n",i.createElement(e.p,null,i.createElement(e.strong,null,i.createElement(e.a,{href:"https://u.jd.com/isdgk8D"},"立即前往京东购买"))),"\n",i.createElement(e.p,null,"《框架设计指南：构建可复用 .NET 库的约定、惯例和模式（第三版）》（简称 《框架设计指南》）由 Krzysztof Cwalina、Jeremy Barton 和 Brad Abrams 共同编写，基于作者设计 .NET Framework 的经验，并融入了其他资深软件开发者和设计师的反馈和见解，从最基本的设计原则和准则出发，全方位地介绍了设计框架的最佳实践，是微软的工程师从 .NET Framework 开发伊始到现如今的 .NET 这二十来年间宝贵经验的总结。"),"\n",i.createElement(e.p,null,"本书以清晰简明的方式编写，非常易于阅读和理解。书中的每一条准则都有清晰的解释，更提供了大量基于实际场景的示例代码，这使得这些指导准则不再是干巴巴的教条，能有效加深读者对内容的理解。"),"\n",i.createElement(e.p,null,"与第二版发布的 2008 年相比，今天的软件开发范式用翻天覆地来形容也不为过，容器化、云服务、跨平台、DevOps 等等，都对今天的软件开发者和框架设计者提出了更高的要求。本书对第二版的内容进行了全面的更新，以适应当下发展的潮流。"),"\n",i.createElement(e.p,null,"总的来说，任何想要设计高质量的、易于维护和扩展的框架及软件库的开发者都应该阅读这本书。如果能够遵循这本书中的准则，开发者可以："),"\n",i.createElement(e.ol,null,"\n",i.createElement(e.li,null,"\n",i.createElement(e.p,null,"提升框架设计能力：本书以设计高质量且易于维护的框架和可重用库为目标，提供了一套全面的指南。通过遵循这些准则，开发者可以提升他们的框架设计能力，创建更好的解决方案。"),"\n"),"\n",i.createElement(e.li,null,"\n",i.createElement(e.p,null,"减少开发时间和成本：通过遵循本书中提出的最佳实践和指南，开发者可以避免很多常见的陷阱和设计错误，从而避免浪费时间和增加的开发成本。"),"\n"),"\n",i.createElement(e.li,null,"\n",i.createElement(e.p,null,"提高可重用性：本书中的指南旨在促进可重用性，使开发者更容易创建能够在多个项目中重复使用的组件和库。这可以有效提高生产力并减少开发时间。"),"\n"),"\n",i.createElement(e.li,null,"\n",i.createElement(e.p,null,"提高代码质量：本书可以帮助开发者编写更易读、易于维护和高效的代码。"),"\n"),"\n",i.createElement(e.li,null,"\n",i.createElement(e.p,null,"跟上行业标准：本书的更新反映出了行业标准和框架设计最佳实践的变化。通过阅读本书，开发者可以跟上框架设计的最新趋势和技术。"),"\n"),"\n"),"\n",i.createElement(e.p,null,"本书虽然是面向 .NET 平台上的框架设计的，但对其他平台的框架设计者来说，同样具有非凡的借鉴价值。"),"\n",i.createElement(e.h2,null,"章节介绍"),"\n",i.createElement(e.p,null,"第一章，“导论”，涵盖了本书的简要定位，描述了框架设计的一般理念，这是书中唯一没有准则的章节。"),"\n",i.createElement(e.p,null,"第二章，“框架设计基础”，提供了整体框架设计中最基本的原则和准则。"),"\n",i.createElement(e.p,null,"第三章，“命名准则”，包含了框架中许多方面的通用的设计惯例和命名准则，比如说，命名空间、类型和成员。"),"\n",i.createElement(e.p,null,"第四章，“类型设计准则”，为类型的一般设计提供了指导。"),"\n",i.createElement(e.p,null,"第五章，“成员设计准则”，更进一步地介绍了类型成员的设计准则。"),"\n",i.createElement(e.p,null,"第六章，“可扩展性设计”，介绍的问题和准则对保证框架适当的可扩展性十分重要。"),"\n",i.createElement(e.p,null,"第七章，“异常”，介绍了异常处理相关的的准则与首选的错误报告机制。"),"\n",i.createElement(e.p,null,"第八章，“使用准则”，包含了如何扩展及使用框架中常见类型的准则。"),"\n",i.createElement(e.p,null,"第九章，“通用设计模式”，提供了常见框架设计模式中所涉及的准则和相关代码样例。"),"\n",i.createElement(e.p,null,"附录 A，“C# 代码风格约定”，描述了 .NET 核心团队使用的编码约定。"),"\n",i.createElement(e.p,null,"附录 B，“过时的指南”，包含了在之前版本出现过，本书不再推荐的应用于特定特性或概念的准则。"),"\n",i.createElement(e.p,null,"附录 C，“API 规范示例”，是一份微软的框架设计师们在设计 API 时所创建的 API 规范的部分示例。"),"\n",i.createElement(e.p,null,"附录 D，“不兼容变更”，列出了各种可能会对你的用户产生负面影响的变更。"),"\n",i.createElement(e.h2,null,"Q&A"),"\n",i.createElement(e.p,null,"如果译文中有什么错漏之处，还请大家通过 ",i.createElement(e.a,{href:"https://github.com/nodew/blog/issues"},"issue")," 批评指正。如果有其他任何与本书相关的问题，也可以通过 ",i.createElement(e.a,{href:"https://github.com/nodew/blog/issues"},"issue")," 和 ",i.createElement(e.a,{href:"https://github.com/nodew/framework-design-guidelines-cn-community/discussions"},"discussion")," 来共同探讨。"),"\n",i.createElement(e.h2,null,"其他"),"\n",i.createElement(e.p,null,i.createElement(e.a,{href:"https://github.com/nodew/framework-design-guidelines-cn-community/blob/master/Corrigenda.md"},"勘误表")))}var a=function(t){void 0===t&&(t={});const{wrapper:e}=Object.assign({},(0,r.ah)(),t.components);return e?i.createElement(e,t,i.createElement(s,t)):s(t)},u=n(7484),l=n.n(u),o=n(6176),c=n.n(o),h=n(1903),f=n(507);l().extend(c());const m=t=>{let{data:{mdx:e},children:n}=t;return null===e?null:i.createElement(h.Z,{activeNavItem:"books"},i.createElement("div",{className:"max-w-5xl mx-auto"},i.createElement(f.h,{title:e.frontmatter.name||"",description:e.frontmatter.excerpt||"",type:"article",extras:[{name:"keywords",content:e.frontmatter.keywords.join(",")}]}),i.createElement("div",{className:"prose xl:prose-xl dark:prose-dark dark:xl:prose-dark-xl max-w-none"},i.createElement("h1",{className:"mb-0 xl:mb-2"},e.frontmatter.name),n)))};function d(t){return i.createElement(m,t,i.createElement(a,t))}},1151:function(t,e,n){"use strict";n.d(e,{ah:function(){return s}});var r=n(7294);const i=r.createContext({});function s(t){const e=r.useContext(i);return r.useMemo((()=>"function"==typeof t?t(e):{...e,...t}),[e,t])}}}]);
//# sourceMappingURL=component---src-templates-book-template-tsx-content-file-path-d-projects-blog-books-framework-design-guidelines-index-mdx-10f17596bacca4ce058e.js.map