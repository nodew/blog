---
title: 树莓派折腾笔记 - 无显示器情况下连接使用树莓派
date: "2018-08-02"
tags: raspberry-pi
keywords: "树莓派, Raspberry Pi, Wi-Fi, TTL"
description: "最近倒腾东西，翻出了几年前入手的一个raspberry pi 2代 b+的板子，上面都蒙了一层灰，开机后发现还能用。发挥环保主义的精神，废物再利用起来。本文主要讲笔者怎么在没有显示器、不借助网线直连的情况下通过Wi-Fi连接以及通过串口连接的方式来连接到树莓派的，记录下来一是方便日后折腾，二来是希望能帮助遇到过同样问题的朋友。"
---

最近倒腾东西，翻出了几年前入手的一个raspberry pi 2代 b+的板子，上面都蒙了一层灰，开机后发现还能用。发挥环保主义的精神，废物再利用起来。但是现在遇到的问题是：一、手边上没有显示器，二、网上经常检索到的另一种方法是通过网线直连，共享pc的网络给树莓派，然后再通过ssh登录树莓派，这种方法的问题在于我一台mac，一台surface都没有网线的端口，又不想专门为这个再买一个适配器。

那就完全没有方法了吗？当然不是的。

## 环境

- 2代树莓派（3代树莓派和 Pi Zero W 应该都是可以的）

- USB Wi-Fi 适配器 (如果是3代的话，内置Wi-Fi支持，这个不是必须的)

- 8GB SD卡

- 电源

- 个人 Wi-Fi

## 安装镜像

在树莓派的[官网](https://www.raspberrypi.org/downloads/)上下载最新的 `Raspbian Jessie` 的镜像或者 `Raspbian Stretch` 的镜像。我这里下使用的是最新的 `2018-06-07-raspbian-stretch.img`。如果后面只想在终端中使用的话，完全可以下载对应的 lite 版本。

镜像下载好了之后，写到你的SD卡里面就可以了。Windows下可以使用比较经典的 `Win32DiskImager`，Mac下推荐开源的 [Etcher](https://github.com/resin-io/etcher)，或者直接使用 `diskutil` 也是可以的，相关使用这里不再赘述。

## 配置 Wi-Fi 和 SSH

镜像写入之后会挂载一个`boot`的卷。Windows下可以直接通过资源管理工具打开。Mac下建议使用命令行。

### 启用 SSH

树莓派默认情况下是没有打开ssh连接的，在 `boot` 卷的根路径下新建一个名叫 `ssh`的空文件，树莓派启动的时候就会开启ssh的功能。

```bash
$ touch ssh
```

### Wi-Fi 连接设置

在 `boot` 卷的根路径下新建一个名叫 `wpa_supplicant.conf`的文件。树莓派启动之后，发现 `boot` 下面有这个文件的话，会把这个文件拷贝到 `/etc/wpa_supplicant/`路径下面，这就是我们树莓派的 Wi-Fi 连接的配置文件。

下面来看一下这个文件应该怎么写。

如果你的系统是 `Raspbian Jessie`的话，填入以下配置

```bash
network={
    ssid="你的Wi-Fi名称"
    psk="Wi-Fi密码"
    key_mgmt=WPA-PSK
}
```

如果是系统是 `Raspbian Stretch` 的话，配置如下

```bash
ctrl_interface=DIR=/var/run/wpa_supplicant GROUP=netdev
network={
    ssid="你的Wi-Fi名称"
    psk="Wi-Fi密码"
    key_mgmt=WPA-PSK
}
```

多了一行 ctrl_interface 的配置，但是目前我还不太清楚这个到底是什么含义。有知道的朋友可以在评论区指出。

注意：这里填写的 Wi-Fi 应该和 PC 当前连接的 Wi-Fi 保持一致。

### 发现 IP

到这里我们距离连接上树莓派就之差一步之遥了，通过 SSH 的方式登录树莓派还需要知道树莓派在局域网中的 IP 地址。

我们把SD卡插到树莓派上，然后通电。这时候红色指示灯亮起，表示说已通电。绿色指示灯闪烁，表示树莓派在往SD卡读写数据。等绿灯闪烁一段时间基本不闪之后，就说明我们的树莓派已经开机成功。

这时候，如果我们的PC是 Windows，一个简单的方法就是在 powershell 输入`arp -a`，其中，返回的列表后面类型对应是动态类型的，就是我们接入的设备。

分别在树莓派开机和关机的状态下执行，多出来的那个动态连接地址就是树莓派的 IP 地址。

如果喜欢图形化界面的话，Windows 下可以使用`Advanced Ip Scanner`，Mac下有 `LanScan`, 可以直接从 hostname 辨别出raspberry pi。

### SSH 登录

```bash
$ ssh pi@ip_address_of_your_raspberry_pi
```

然后用默认密码`raspberry`就可以登录设备了。

## 使用串口连接树莓派

树莓派作为一款功能强大的开源硬件，肯定是支持串口通信的。但是也有两个问题，第一、树莓派本身并没有默认开启串口通信功能，第二，很多开发者如果本身不是做硬件的，可能不会有 USB 转 TTL 的连接线。我这里是刚好有一根上古遗留下来的（如果没有，但是对这种方式敢兴趣，也可以直接在万能的淘宝上淘一根，10块钱左右）

### USB 转 TTL 线说明

一端是USB接口，另一端4根出线，颜色不同。

- 红色，电源供电，一般是3V或者5V，如果要用它给树莓派供电的话，树莓派的工作电压是5V

- 黑色，接地

- 白色，信号输入

- 绿色，信号输出

### 开启 UART

分两种情况：

一、通过上面的方法或者其他方式，已经能连接使用树莓派了。这种情况下，直接在树莓派对终端中输入

```bash
$ sudo raspi-config
```

在弹出对对话框中选择 `Interfacing Options`，进入下一个对话框，然后选择`Serial`，最后选择 `YES`，回到命令行后重启树莓派就可以了。

二、回到我的使用场景，按上面的步骤安装好了镜像，但是还没有启动系统。

这种时候的一个解决方案是，在 `boot` 卷的根路径下找到 `cmdline.text` 和 `config.text`两个文件。首先打开 `cmdline.text`，检查文件里面是不是有 `console=serial0,115200` 的这个配置，115200是树莓派的波特率，一般都是已经有的，如果没有，行尾加上这个配置。接下来打开 `config.text` 这个文件，在新行追加 `enable_uart=1`，0 - 关闭，1 - 开启。

然后把 SD 卡插入树莓派，开机。接下来就可以开始连接我们的树莓派了。

### UART 连接

[https://pinout.xyz/](https://pinout.xyz/) 这是一个很有用的网站，上面列出了树莓派的GPIO各个管脚的作用，点击管脚我们可以查看相应的说明，对我们做GPIO相关的开发很用帮助。

这里先打开这个网站，找到标注为 `RXD` 和 `TXD` 的这两个管脚的位置。`TXD`是树莓派 UART 的输出，`RXD`是树莓派的输入。

然后把USB转TTL线的黑色线接树莓派的`Ground`，白色接`TXD`，绿色接`RXD`，如果已经有电源供电，红线可以不接。

连接好了之后，如果我们在 Windows 环境下，可以使用 putty。打开 putty，选择串口通信，Serial line 输入 `COM3`，Speed 输入 `115200`，即树莓派的波特率。进去之后，我们看到一个小黑窗，这时候，键盘输入回车，树莓派就会让我们输入用户名以及密码，输入正确之后我们就可以为所欲为了。

如果是在 Mac 环境下的话，我们把 USB 插入 Mac之后，我们的`/dev`路径下就会多出一个设备，假如叫做 `cu.usbserial`，这时候我们可以借助两个命令行工具。一个是 `minicom`，另一个是 `screen`。
```bash
$ brew install minicom

# or

$ brew install screen
```

安装好之后，如下，使用相应的命令行

```bash
$ minicom -o -D /dev/cu.usbserial -b 115200

# or

$ screen /dev/cu.usbserial 115200
```
再和 Windows 一样，输入用户名密码就可以连接使用了。

以上。

## Reference

1、 [Headless Raspberry Pi setup with wifi](https://styxit.com/2017/03/14/headless-raspberry-setup.html)

2、 [Connect To A Raspberry Pi And Pi Zero With A USB To TTL Serial Cable](https://www.thepolyglotdeveloper.com/2017/02/connect-raspberry-pi-pi-zero-usb-ttl-serial-cable/)

