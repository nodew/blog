"use strict";(self.webpackChunkblog=self.webpackChunkblog||[]).push([[317],{1903:function(e,t,a){a.d(t,{A:function(){return d},Z:function(){return u}});var l=a(7294),r=a(1597),n="theme",o=function(){if("undefined"!=typeof window&&window.localStorage){var e=window.localStorage.getItem(n);if("string"==typeof e)return e;if(window.matchMedia("(prefers-color-scheme: dark)").matches)return"dark"}return"light"},c=l.createContext({}),m=function(e){var t=l.useState(o),a=t[0],r=t[1];return l.useEffect((function(){var e,t,l;e=a,t=window.document.documentElement,l="dark"===e,t.classList.remove(l?"light":"dark"),t.classList.add(e),localStorage.setItem(n,e)}),[a]),l.createElement(c.Provider,{value:{theme:a,setTheme:r}},e.children)},s=function(e){var t=e.activeNavItem,a=void 0===t?"":t,n=(0,l.useContext)(c),o=n.theme,m=n.setTheme;return l.createElement("header",{className:"text-base mb-14"},l.createElement("div",{className:"max-w-5xl flex flex-col lg:flex-row items-center text-center lg:text-left m-auto"},l.createElement("div",{className:"leading-none flex flex-grow items-center"},l.createElement("div",{className:"block select-none py-1 font-bold text-xl text-gray-800 dark:text-gray-100"},l.createElement(r.rU,{to:"/"},"Qiao@www:~$"))),l.createElement("div",{className:"flex flex-row items-center"},l.createElement("nav",{className:"select-none mt-4 lg:mt-0"},l.createElement("ul",{className:"text-xl text-gray-700 dark:text-gray-200 flex"},l.createElement("li",{className:"w-24 text-center hover:font-semibold "+("home"===a?"font-bold hover:font-bold":"")},l.createElement(r.rU,{to:"/"},"Home")),l.createElement("li",{className:"w-24 text-center hover:font-semibold "+("posts"===a?"font-bold hover:font-bold":"")},l.createElement(r.rU,{to:"/posts"},"Posts")),l.createElement("li",{className:"w-24 text-center hover:font-semibold "+("about"===a?"font-bold hover:font-bold":"")},l.createElement(r.rU,{to:"/about"},"About")))),l.createElement("div",{className:"mx-3 select-none mt-4 lg:mt-0 cursor-pointer",onClick:function(){m("light"===o?"dark":"light")},title:"Toggle theme"},l.createElement("svg",{width:"20",height:"20",fill:"currentColor",viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg"},l.createElement("path",{d:"M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10Zm0-2V4a8 8 0 1 1 0 16Z"}))))))},i=function(){var e,t,a=(new Date).getFullYear(),n=(0,r.K2)("4065915896").site;null==n||null===(e=n.siteMetadata)||void 0===e||null===(t=e.author)||void 0===t||t.name;return l.createElement("footer",{className:"text-base mt-32 text-gray-400 dark:text-gray-600"},l.createElement("div",{className:"max-w-5xl text-center m-auto"},l.createElement("p",null,"© ",a," • WANGQIAO.ME • ALL RIGHTS RESERVED"),l.createElement("p",null,"Powered by "," ",l.createElement("a",{className:"text-blue-400 hover:text-blue-800",href:"https://www.gatsbyjs.com"},"Gatsby"))))},d=function(e){var t=e.children,a=e.activeNavItem;return l.createElement(m,null,l.createElement("div",{className:"bg-white dark:bg-dark dark:antialiased text-base text-gray-700 dark:text-gray-200 p-8 min-h-screen flex flex-col"},l.createElement(s,{activeNavItem:a}),l.createElement("div",{className:"flex-1"},t),l.createElement(i,null)))},u=d},7166:function(e,t,a){a.r(t);var l=a(7294),r=a(1903);t.default=function(){return l.createElement(r.Z,{activeNavItem:"projects"},l.createElement("h1",null,"Hello World"))}}}]);
//# sourceMappingURL=component---src-pages-projects-tsx-b7723211e52e77378615.js.map