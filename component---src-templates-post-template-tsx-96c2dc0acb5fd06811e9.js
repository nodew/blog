(window.webpackJsonp=window.webpackJsonp||[]).push([[11],{177:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n(181),o=n(56),i=n(222),l=n.n(i),u=n(178),s=function(e){var t=e.postTitle,n=e.postSlug,r=Object(u.b)(),o=r.url,i=r.disqusShortname;return i?a.createElement(l.a,{shortname:i,identifier:t,title:t,url:o+n}):null},c=n(168),d=n.n(c),m=function(e){var t=e.body,n=e.title;return a.createElement("div",{className:d.a.content},a.createElement("h1",{className:d.a.content__title},n),a.createElement("div",{className:d.a.content__body,dangerouslySetInnerHTML:{__html:t}}))},f=n(193),p=n.n(f),g=n(169),h=n.n(g),y=function(e){var t=e.date;return a.createElement("div",{className:h.a.meta},a.createElement("p",{className:h.a.meta__date},"Published at ",p()(t).format("D MMM YYYY")))},v=n(170),b=n.n(v),w=function(e){var t=e.tags,n=e.tagSlugs;return a.createElement("div",{className:b.a.tags},a.createElement("ul",{className:b.a.tags__list},n&&n.map(function(e,n){return a.createElement("li",{className:b.a["tags__list-item"],key:t[n]},a.createElement(o.Link,{to:e,className:b.a["tags__list-item-link"]},t[n]))})))},E=n(171),_=n.n(E),k=function(e){var t=e.post,n=t.html,r=t.fields,i=r.tagSlugs,l=r.slug,u=t.frontmatter,c=u.tags,d=u.title,f=u.date;return a.createElement("div",{className:_.a.post},a.createElement(o.Link,{className:_.a["post__home-button"],to:"/"},"All Articles"),a.createElement("div",{className:_.a.post__content},a.createElement(m,{body:n,title:d})),a.createElement("div",{className:_.a.post__footer},a.createElement(y,{date:f}),c&&i&&a.createElement(w,{tags:c,tagSlugs:i})),a.createElement("div",{className:_.a.post__comments},a.createElement(s,{postSlug:l,postTitle:t.frontmatter.title})))};n.d(t,"query",function(){return N});var N="2166023545";t.default=function(e){var t=e.data,n=Object(u.b)(),o=n.title,i=n.subtitle,l=t.markdownRemark.frontmatter,s=l.title,c=l.description,d=null!==c?c:i;return a.createElement(r.a,{title:s+" - "+o,description:d},a.createElement(k,{post:t.markdownRemark}))}},178:function(e,t,n){"use strict";var a=n(182),r=function(){return a.data.site.siteMetadata},o=n(183),i=function(){return o.data.allMarkdownRemark.group},l=n(184),u=function(){return l.data.allMarkdownRemark.group};n.d(t,"b",function(){return r}),n.d(t,"a",function(){return i}),n.d(t,"c",function(){return u})},181:function(e,t,n){"use strict";var a=n(0),r=n(189),o=n.n(r),i=n(154),l=n.n(i),u=function(e){var t=e.children,n=e.title,r=e.description;return a.createElement("div",{className:l.a.layout},a.createElement(o.a,null,a.createElement("html",{lang:"en"}),a.createElement("title",null,n),a.createElement("meta",{name:"description",content:r}),a.createElement("meta",{property:"og:site_name",content:n}),a.createElement("meta",{name:"twitter:card",content:"summary"}),a.createElement("meta",{name:"twitter:title",content:n})),t)};n.d(t,"a",function(){return u})},182:function(e){e.exports={data:{site:{siteMetadata:{author:{name:"夜色残阳",bio:"谁非过客，花是主人",photo:"/image/avatar.jpg",contacts:{email:"wangqiao11@hotmail.com",twitter:"sirqiao",github:"nodew"}},menu:[{label:"Articles",path:"/"},{label:"About me",path:"/pages/about"}],url:"https://wangqiao.me",title:"夜色残阳的个人博客",subtitle:"夜色残阳的个人博客",copyright:"WANGQIAO.ME © All rights reserved.",disqusShortname:""}}}}},183:function(e){e.exports={data:{allMarkdownRemark:{group:[{fieldValue:"JavaScript",totalCount:1},{fieldValue:"collection",totalCount:1},{fieldValue:"raspberrypi",totalCount:1}]}}}},184:function(e){e.exports={data:{allMarkdownRemark:{group:[{fieldValue:"Generator",totalCount:1},{fieldValue:"Iterator",totalCount:1},{fieldValue:"JavaScript",totalCount:1},{fieldValue:"Lazy List",totalCount:1},{fieldValue:"poetry",totalCount:1},{fieldValue:"raspberry-pi",totalCount:1}]}}}},222:function(e,t,n){"use strict";e.exports=n(223)},223:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(e[a]=n[a])}return e},r=function(){function e(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,n,a){return n&&e(t.prototype,n),a&&e(t,a),t}}(),o=l(n(0)),i=l(n(1));function l(e){return e&&e.__esModule?e:{default:e}}var u=["shortname","identifier","title","url","category_id","onNewComment","language"],s=!1;function c(e,t){var n=t.onNewComment,a=t.language,r=function(e,t){var n={};for(var a in e)t.indexOf(a)>=0||Object.prototype.hasOwnProperty.call(e,a)&&(n[a]=e[a]);return n}(t,["onNewComment","language"]);for(var o in r)e.page[o]=r[o];e.language=a,n&&(e.callbacks={onNewComment:[n]})}var d=function(e){function t(){return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,o.default.Component),r(t,[{key:"componentDidMount",value:function(){this.loadDisqus()}},{key:"componentDidUpdate",value:function(){this.loadDisqus()}},{key:"shouldComponentUpdate",value:function(e,t){return e.identifier!==this.props.identifier}},{key:"render",value:function(){var e=this,t=Object.keys(this.props).reduce(function(t,n){return u.some(function(e){return e===n})?t:a({},t,function(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}({},n,e.props[n]))},{});return o.default.createElement("div",t,o.default.createElement("div",{id:"disqus_thread"}))}},{key:"addDisqusScript",value:function(){if(!s){var e=this.disqus=document.createElement("script"),t=document.getElementsByTagName("head")[0]||document.getElementsByTagName("body")[0];e.async=!0,e.type="text/javascript",e.src="//"+this.props.shortname+".disqus.com/embed.js",t.appendChild(e),s=!0}}},{key:"loadDisqus",value:function(){var e=this,t={};u.forEach(function(n){"shortname"!==n&&e.props[n]&&(t[n]=e.props[n])}),"undefined"!=typeof DISQUS?DISQUS.reset({reload:!0,config:function(){c(this,t),this.page.url=this.page.url.replace(/#/,"")+"#!newthread"}}):(window.disqus_config=function(){c(this,t)},this.addDisqusScript())}}]),t}();d.displayName="DisqusThread",d.propTypes={id:i.default.string,shortname:i.default.string.isRequired,identifier:i.default.string,title:i.default.string,url:i.default.string,category_id:i.default.string,onNewComment:i.default.func,language:i.default.string},d.defaultProps={url:"undefined"==typeof window?null:window.location.href},t.default=d}}]);
//# sourceMappingURL=component---src-templates-post-template-tsx-96c2dc0acb5fd06811e9.js.map