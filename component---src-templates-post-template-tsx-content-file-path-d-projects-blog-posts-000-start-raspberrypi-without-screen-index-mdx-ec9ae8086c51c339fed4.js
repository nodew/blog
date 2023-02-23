"use strict";(self.webpackChunkblog=self.webpackChunkblog||[]).push([[290],{7660:function(e,n,a){a.r(n),a.d(n,{default:function(){return b}});var t=a(3677),l=a(9953);function s(e){const n=Object.assign({p:"p",h2:"h2",ul:"ul",li:"li",a:"a",span:"span",h3:"h3"},(0,t.ah)(),e.components);return l.createElement(l.Fragment,null,l.createElement(n.p,null,"最近倒腾东西，翻出了几年前入手的一个 raspberry pi 2 代 b+ 的板子，上面都蒙了一层灰，开机后发现还能用。发挥环保主义的精神，废物再利用起来。但是现在遇到的问题是：一、手边上没有显示器，二、网上经常检索到的另一种方法是通过网线直连，共享 pc 的网络给树莓派，然后再通过 ssh 登录树莓派，这种方法的问题在于我一台 mac，一台 surface 都没有网线的端口，又不想专门为这个再买一个适配器。"),"\n",l.createElement(n.p,null,"那就完全没有方法了吗？当然不是的。"),"\n",l.createElement(n.h2,null,"环境"),"\n",l.createElement(n.ul,null,"\n",l.createElement(n.li,null,"\n",l.createElement(n.p,null,"2 代树莓派（3 代树莓派和 Pi Zero W 应该都是可以的）"),"\n"),"\n",l.createElement(n.li,null,"\n",l.createElement(n.p,null,"USB Wi-Fi 适配器 (如果是 3 代的话，内置 Wi-Fi 支持，这个不是必须的)"),"\n"),"\n",l.createElement(n.li,null,"\n",l.createElement(n.p,null,"8GB SD 卡"),"\n"),"\n",l.createElement(n.li,null,"\n",l.createElement(n.p,null,"电源"),"\n"),"\n",l.createElement(n.li,null,"\n",l.createElement(n.p,null,"个人 Wi-Fi"),"\n"),"\n"),"\n",l.createElement(n.h2,null,"安装镜像"),"\n",l.createElement(n.p,null,"在树莓派的",l.createElement(n.a,{href:"https://www.raspberrypi.org/downloads/"},"官网"),"上下载最新的 ",l.createElement(n.span,{dangerouslySetInnerHTML:{__html:'<code class="language-text">Raspbian Jessie</code>'}})," 的镜像或者 ",l.createElement(n.span,{dangerouslySetInnerHTML:{__html:'<code class="language-text">Raspbian Stretch</code>'}})," 的镜像。我这里下使用的是最新的 ",l.createElement(n.span,{dangerouslySetInnerHTML:{__html:'<code class="language-text">2018-06-07-raspbian-stretch.img</code>'}}),"。如果后面只想在终端中使用的话，完全可以下载对应的 lite 版本。"),"\n",l.createElement(n.p,null,"镜像下载好了之后，写到你的 SD 卡里面就可以了。Windows 下可以使用比较经典的 ",l.createElement(n.span,{dangerouslySetInnerHTML:{__html:'<code class="language-text">Win32DiskImager</code>'}}),"，Mac 下推荐开源的 ",l.createElement(n.a,{href:"https://github.com/resin-io/etcher"},"Etcher"),"，或者直接使用 ",l.createElement(n.span,{dangerouslySetInnerHTML:{__html:'<code class="language-text">diskutil</code>'}})," 也是可以的，相关使用这里不再赘述。"),"\n",l.createElement(n.h2,null,"配置 Wi-Fi 和 SSH"),"\n",l.createElement(n.p,null,"镜像写入之后会挂载一个 ",l.createElement(n.span,{dangerouslySetInnerHTML:{__html:'<code class="language-text">boot</code>'}})," 的卷。Windows 下可以直接通过资源管理工具打开。Mac 下建议使用命令行。"),"\n",l.createElement(n.h3,null,"启用 SSH"),"\n",l.createElement(n.p,null,"树莓派默认情况下是没有打开 SSH 连接的，在 ",l.createElement(n.span,{dangerouslySetInnerHTML:{__html:'<code class="language-text">boot</code>'}})," 卷的根路径下新建一个名叫 ",l.createElement(n.span,{dangerouslySetInnerHTML:{__html:'<code class="language-text">ssh</code>'}})," 的空文件，树莓派启动的时候就会开启 SSH 的功能。"),"\n",l.createElement(n.span,{dangerouslySetInnerHTML:{__html:'<div class="gatsby-highlight" data-language="bash"><pre class="language-bash"><code class="language-bash">$ <span class="token function">touch</span> <span class="token function">ssh</span></code></pre></div>'}}),"\n",l.createElement(n.h3,null,"Wi-Fi 连接设置"),"\n",l.createElement(n.p,null,"在 ",l.createElement(n.span,{dangerouslySetInnerHTML:{__html:'<code class="language-text">boot</code>'}})," 卷的根路径下新建一个名叫 ",l.createElement(n.span,{dangerouslySetInnerHTML:{__html:'<code class="language-text">wpa_supplicant.conf</code>'}}),"的文件。树莓派启动之后，发现 ",l.createElement(n.span,{dangerouslySetInnerHTML:{__html:'<code class="language-text">boot</code>'}})," 下面有这个文件的话，会把这个文件拷贝到 ",l.createElement(n.span,{dangerouslySetInnerHTML:{__html:'<code class="language-text">/etc/wpa_supplicant/</code>'}})," 路径下面，这就是我们树莓派的 Wi-Fi 连接的配置文件。"),"\n",l.createElement(n.p,null,"下面来看一下这个文件应该怎么写。"),"\n",l.createElement(n.p,null,"如果你的系统是 ",l.createElement(n.span,{dangerouslySetInnerHTML:{__html:'<code class="language-text">Raspbian Jessie</code>'}})," 的话，填入以下配置"),"\n",l.createElement(n.span,{dangerouslySetInnerHTML:{__html:'<div class="gatsby-highlight" data-language="bash"><pre class="language-bash"><code class="language-bash"><span class="token assign-left variable">network</span><span class="token operator">=</span><span class="token punctuation">{</span>\r\n    <span class="token assign-left variable">ssid</span><span class="token operator">=</span><span class="token string">"你的Wi-Fi名称"</span>\r\n    <span class="token assign-left variable">psk</span><span class="token operator">=</span><span class="token string">"Wi-Fi密码"</span>\r\n    <span class="token assign-left variable">key_mgmt</span><span class="token operator">=</span>WPA-PSK\r\n<span class="token punctuation">}</span></code></pre></div>'}}),"\n",l.createElement(n.p,null,"如果是系统是 ",l.createElement(n.span,{dangerouslySetInnerHTML:{__html:'<code class="language-text">Raspbian Stretch</code>'}})," 的话，配置如下"),"\n",l.createElement(n.span,{dangerouslySetInnerHTML:{__html:'<div class="gatsby-highlight" data-language="bash"><pre class="language-bash"><code class="language-bash"><span class="token assign-left variable">ctrl_interface</span><span class="token operator">=</span>DIR<span class="token operator">=</span>/var/run/wpa_supplicant <span class="token assign-left variable">GROUP</span><span class="token operator">=</span>netdev\r\n<span class="token assign-left variable">network</span><span class="token operator">=</span><span class="token punctuation">{</span>\r\n    <span class="token assign-left variable">ssid</span><span class="token operator">=</span><span class="token string">"你的Wi-Fi名称"</span>\r\n    <span class="token assign-left variable">psk</span><span class="token operator">=</span><span class="token string">"Wi-Fi密码"</span>\r\n    <span class="token assign-left variable">key_mgmt</span><span class="token operator">=</span>WPA-PSK\r\n<span class="token punctuation">}</span></code></pre></div>'}}),"\n",l.createElement(n.p,null,"多了一行 ctrl_interface 的配置，但是目前我还不太清楚这个到底是什么含义。有知道的朋友可以在评论区指出。"),"\n",l.createElement(n.p,null,"注意：这里填写的 Wi-Fi 应该和 PC 当前连接的 Wi-Fi 保持一致。"),"\n",l.createElement(n.h3,null,"发现 IP"),"\n",l.createElement(n.p,null,"到这里我们距离连接上树莓派就之差一步之遥了，通过 SSH 的方式登录树莓派还需要知道树莓派在局域网中的 IP 地址。"),"\n",l.createElement(n.p,null,"我们把 SD 卡插到树莓派上，然后通电。这时候红色指示灯亮起，表示说已通电。绿色指示灯闪烁，表示树莓派在往 SD 卡读写数据。等绿灯闪烁一段时间基本不闪之后，就说明我们的树莓派已经开机成功。"),"\n",l.createElement(n.p,null,"这时候，如果我们的 PC 是 Windows，一个简单的方法就是在 powershell 输入 ",l.createElement(n.span,{dangerouslySetInnerHTML:{__html:'<code class="language-text">arp -a</code>'}}),"，其中，返回的列表后面类型对应是动态类型的，就是我们接入的设备。"),"\n",l.createElement(n.p,null,"分别在树莓派开机和关机的状态下执行，多出来的那个动态连接地址就是树莓派的 IP 地址。"),"\n",l.createElement(n.p,null,"如果喜欢图形化界面的话，Windows 下可以使用 ",l.createElement(n.span,{dangerouslySetInnerHTML:{__html:'<code class="language-text">Advanced Ip Scanner</code>'}}),"，Mac 下有 ",l.createElement(n.span,{dangerouslySetInnerHTML:{__html:'<code class="language-text">LanScan</code>'}}),", 可以直接从 hostname 辨别出 raspberry pi。"),"\n",l.createElement(n.h3,null,"SSH 登录"),"\n",l.createElement(n.span,{dangerouslySetInnerHTML:{__html:'<div class="gatsby-highlight" data-language="bash"><pre class="language-bash"><code class="language-bash">$ <span class="token function">ssh</span> pi@ip_address_of_your_raspberry_pi</code></pre></div>'}}),"\n",l.createElement(n.p,null,"然后用默认密码 ",l.createElement(n.span,{dangerouslySetInnerHTML:{__html:'<code class="language-text">raspberry</code>'}})," 就可以登录设备了。"),"\n",l.createElement(n.h2,null,"使用串口连接树莓派"),"\n",l.createElement(n.p,null,"树莓派作为一款功能强大的开源硬件，肯定是支持串口通信的。但是也有两个问题，第一，树莓派本身并没有默认开启串口通信功能，第二，很多开发者如果本身不是做硬件的，可能不会有 USB 转 TTL 的连接线。我这里是刚好有一根上古遗留下来的（如果没有，但是对这种方式敢兴趣，也可以直接在万能的淘宝上淘一根，10 块钱左右）"),"\n",l.createElement(n.h3,null,"USB 转 TTL 线说明"),"\n",l.createElement(n.p,null,"一端是 USB 接口，另一端 4 根出线，颜色不同。"),"\n",l.createElement(n.ul,null,"\n",l.createElement(n.li,null,"\n",l.createElement(n.p,null,"红色，电源供电，一般是 3V 或者 5V，如果要用它给树莓派供电的话，树莓派的工作电压是 5V"),"\n"),"\n",l.createElement(n.li,null,"\n",l.createElement(n.p,null,"黑色，接地"),"\n"),"\n",l.createElement(n.li,null,"\n",l.createElement(n.p,null,"白色，信号输入"),"\n"),"\n",l.createElement(n.li,null,"\n",l.createElement(n.p,null,"绿色，信号输出"),"\n"),"\n"),"\n",l.createElement(n.h3,null,"开启 UART"),"\n",l.createElement(n.p,null,"分两种情况："),"\n",l.createElement(n.p,null,"一、通过上面的方法或者其他方式，已经能连接使用树莓派了。这种情况下，直接在树莓派对终端中输入"),"\n",l.createElement(n.span,{dangerouslySetInnerHTML:{__html:'<div class="gatsby-highlight" data-language="bash"><pre class="language-bash"><code class="language-bash">$ <span class="token function">sudo</span> raspi-config</code></pre></div>'}}),"\n",l.createElement(n.p,null,"在弹出对对话框中选择 ",l.createElement(n.span,{dangerouslySetInnerHTML:{__html:'<code class="language-text">Interfacing Options</code>'}}),"，进入下一个对话框，然后选择 ",l.createElement(n.span,{dangerouslySetInnerHTML:{__html:'<code class="language-text">Serial</code>'}}),"，最后选择 ",l.createElement(n.span,{dangerouslySetInnerHTML:{__html:'<code class="language-text">YES</code>'}}),"，回到命令行后重启树莓派就可以了。"),"\n",l.createElement(n.p,null,"二、回到我的使用场景，按上面的步骤安装好了镜像，但是还没有启动系统。"),"\n",l.createElement(n.p,null,"这种时候的一个解决方案是，在 ",l.createElement(n.span,{dangerouslySetInnerHTML:{__html:'<code class="language-text">boot</code>'}})," 卷的根路径下找到 ",l.createElement(n.span,{dangerouslySetInnerHTML:{__html:'<code class="language-text">cmdline.text</code>'}})," 和 ",l.createElement(n.span,{dangerouslySetInnerHTML:{__html:'<code class="language-text">config.text</code>'}})," 两个文件。首先打开 ",l.createElement(n.span,{dangerouslySetInnerHTML:{__html:'<code class="language-text">cmdline.text</code>'}}),"，检查文件里面是不是有 ",l.createElement(n.span,{dangerouslySetInnerHTML:{__html:'<code class="language-text">console=serial0,115200</code>'}})," 的这个配置，115200 是树莓派的波特率，一般都是已经有的，如果没有，行尾加上这个配置。接下来打开 ",l.createElement(n.span,{dangerouslySetInnerHTML:{__html:'<code class="language-text">config.text</code>'}})," 这个文件，在新行追加 ",l.createElement(n.span,{dangerouslySetInnerHTML:{__html:'<code class="language-text">enable_uart=1</code>'}}),"，0 - 关闭，1 - 开启。"),"\n",l.createElement(n.p,null,"然后把 SD 卡插入树莓派，开机。接下来就可以开始连接我们的树莓派了。"),"\n",l.createElement(n.h3,null,"UART 连接"),"\n",l.createElement(n.p,null,l.createElement(n.a,{href:"https://pinout.xyz/"},"https://pinout.xyz/")," 这是一个很有用的网站，上面列出了树莓派的 GPIO 各个管脚的作用，点击管脚我们可以查看相应的说明，对我们做 GPIO 相关的开发很用帮助。"),"\n",l.createElement(n.p,null,"这里先打开这个网站，找到标注为 ",l.createElement(n.span,{dangerouslySetInnerHTML:{__html:'<code class="language-text">RXD</code>'}})," 和 ",l.createElement(n.span,{dangerouslySetInnerHTML:{__html:'<code class="language-text">TXD</code>'}})," 的这两个管脚的位置。",l.createElement(n.span,{dangerouslySetInnerHTML:{__html:'<code class="language-text">TXD</code>'}})," 是树莓派 UART 的输出，",l.createElement(n.span,{dangerouslySetInnerHTML:{__html:'<code class="language-text">RXD</code>'}})," 是树莓派的输入。"),"\n",l.createElement(n.p,null,"然后把 USB 转 TTL 线的黑色线接树莓派的 ",l.createElement(n.span,{dangerouslySetInnerHTML:{__html:'<code class="language-text">Ground</code>'}}),"，白色接 ",l.createElement(n.span,{dangerouslySetInnerHTML:{__html:'<code class="language-text">TXD</code>'}}),"，绿色接 ",l.createElement(n.span,{dangerouslySetInnerHTML:{__html:'<code class="language-text">RXD</code>'}}),"，如果已经有电源供电，红线可以不接。"),"\n",l.createElement(n.p,null,"连接好了之后，如果我们在 Windows 环境下，可以使用 putty。打开 putty，选择串口通信，Serial line 输入 ",l.createElement(n.span,{dangerouslySetInnerHTML:{__html:'<code class="language-text">COM3</code>'}}),"，Speed 输入 ",l.createElement(n.span,{dangerouslySetInnerHTML:{__html:'<code class="language-text">115200</code>'}}),"，即树莓派的波特率。进去之后，我们看到一个小黑窗，这时候，键盘输入回车，树莓派就会让我们输入用户名以及密码，输入正确之后我们就可以为所欲为了。"),"\n",l.createElement(n.p,null,"如果是在 Mac 环境下的话，我们把 USB 插入 Mac 之后，我们的 ",l.createElement(n.span,{dangerouslySetInnerHTML:{__html:'<code class="language-text">/dev</code>'}})," 路径下就会多出一个设备，假如叫做 ",l.createElement(n.span,{dangerouslySetInnerHTML:{__html:'<code class="language-text">cu.usbserial</code>'}}),"，这时候我们可以借助两个命令行工具。一个是 ",l.createElement(n.span,{dangerouslySetInnerHTML:{__html:'<code class="language-text">minicom</code>'}}),"，另一个是 ",l.createElement(n.span,{dangerouslySetInnerHTML:{__html:'<code class="language-text">screen</code>'}}),"。"),"\n",l.createElement(n.span,{dangerouslySetInnerHTML:{__html:'<div class="gatsby-highlight" data-language="bash"><pre class="language-bash"><code class="language-bash">$ brew <span class="token function">install</span> minicom\r\n\r\n<span class="token comment"># or</span>\r\n\r\n$ brew <span class="token function">install</span> <span class="token function">screen</span></code></pre></div>'}}),"\n",l.createElement(n.p,null,"安装好之后，如下，使用相应的命令行"),"\n",l.createElement(n.span,{dangerouslySetInnerHTML:{__html:'<div class="gatsby-highlight" data-language="bash"><pre class="language-bash"><code class="language-bash">$ minicom <span class="token parameter variable">-o</span> <span class="token parameter variable">-D</span> /dev/cu.usbserial <span class="token parameter variable">-b</span> <span class="token number">115200</span>\r\n\r\n<span class="token comment"># or</span>\r\n\r\n$ <span class="token function">screen</span> /dev/cu.usbserial <span class="token number">115200</span></code></pre></div>'}}),"\n",l.createElement(n.p,null,"再和 Windows 一样，输入用户名密码就可以连接使用了。"),"\n",l.createElement(n.p,null,"以上。"),"\n",l.createElement(n.h2,null,"Reference"),"\n",l.createElement(n.p,null,"1、 ",l.createElement(n.a,{href:"https://styxit.com/2017/03/14/headless-raspberry-setup.html"},"Headless Raspberry Pi setup with wifi")),"\n",l.createElement(n.p,null,"2、 ",l.createElement(n.a,{href:"https://www.thepolyglotdeveloper.com/2017/02/connect-raspberry-pi-pi-zero-usb-ttl-serial-cable/"},"Connect To A Raspberry Pi And Pi Zero With A USB To TTL Serial Cable")))}var r=function(e){void 0===e&&(e={});const{wrapper:n}=Object.assign({},(0,t.ah)(),e.components);return n?l.createElement(n,e,l.createElement(s,e)):s(e)},c=a(1915),o=a.n(c),p=a(4408),m=a(9199),u=a.n(m),g=a(6411),d=a.n(g),i=a(3561),h=a(3945),E=a(9549);u().extend(d());const _=e=>{var n;let{data:{mdx:a},children:t}=e;return null===a?null:l.createElement(i.Z,null,l.createElement("div",{className:"max-w-5xl mx-auto"},l.createElement(h.h,{title:a.frontmatter.title||"",description:a.frontmatter.excerpt||"",type:"article",extras:[{name:"keywords",content:a.frontmatter.keywords.join(",")}]}),l.createElement("div",{className:"prose xl:prose-xl dark:prose-dark dark:xl:prose-dark-xl max-w-none"},l.createElement("h1",{className:"mb-0 xl:mb-2"},null===(n=a.frontmatter)||void 0===n?void 0:n.title),l.createElement("ul",{className:"list-none flex flex-wrap p-0 xl:p-0 my-0 xl:my-0"},a.frontmatter.tags.map((e=>l.createElement("li",{key:e,className:"flex-none ml-0 mr-4"},l.createElement(p.rU,{to:"/tags/"+o()(e||"")},l.createElement("div",{className:"flex flex-row items-center"},l.createElement(E.l,null),l.createElement("span",{className:"ml-1"},e))))))),l.createElement("div",{className:"text-gray-400 dark:text-gray-700 italic mb-12"},u()(a.frontmatter.date).format("LL")),t)))};function b(e){return l.createElement(_,e,l.createElement(r,e))}}}]);
//# sourceMappingURL=component---src-templates-post-template-tsx-content-file-path-d-projects-blog-posts-000-start-raspberrypi-without-screen-index-mdx-ec9ae8086c51c339fed4.js.map