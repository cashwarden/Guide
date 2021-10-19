# 定时记账

这个使用场景有很多，比方说：

- 每天的通勤地铁费用都说固定的，而且一般都是在法定工作日。
- 配合支付宝定期存钱
- 基金定期扣款
- ……

## 如何添加定时记账

- 先添加一笔记录，然后在记录列表找到「添加定时记账」按钮。

![20200912RPOALI](https://blog-1251237404.cos.ap-guangzhou.myqcloud.com/20200912RPOALI.png)

- 目前支持的频率有：每天、每周、每月、工作日（周一至周五）、中国大陆的法定工作日。如果不够用欢迎反馈。

![20200912GBYMDN](https://blog-1251237404.cos.ap-guangzhou.myqcloud.com/20200912GBYMDN.png)

- 每天记账统一是 UTC+8 时区 9 点执行（暂时简单粗暴）。

- 如果想要 Telegram 定时记账成功的通知，之前**绑定过 Telegram 的用户**需要重新绑定一次，没绑定的去绑定就可以了，效果如下（标题不一样）：

![20200912UWlhko](https://blog-1251237404.cos.ap-guangzhou.myqcloud.com/20200912UWlhko.png)