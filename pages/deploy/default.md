# 分开部署方案

## 搭建基本环境

API 项目是基于 Yii2 开发的，所以使用 [Yii2 部署方式](https://www.yiiframework.com/doc/guide/2.0/en/start-installation)就可以了。这里我就拿 Ubuntu 19 做示例部署一遍。

### 安装 PHP7.4

```shell
sudo apt install php7.4-fpm php7.4-common php7.4-mysql \ 
    php7.4-xml php7.4-xmlrpc php7.4-curl php7.4-gd \ 
    php7.4-imagick php7.4-cli php7.4-dev php7.4-imap \ 
    php7.4-mbstring php7.4-opcache php7.4-redis php7.4-bcmath \ 
    php7.4-soap php7.4-zip -y
```

### 安装 Composer

可以参考官网 [Download Composer](https://getcomposer.org/download/)，或者这样安装：

```shell
curl -sS https://getcomposer.org/installer | php
sudo mv composer.phar /usr/local/bin/composer
```

### 安装 MySQL

这里安装的是 MySQL 8， 使用 5.7 也是可以的，而且 5.7 安装会比较省事一点。

```shell
sudo apt-get install mysql-server
sudo mysql_secure_installation
sudo mysql
```

然后会有一系列问题，这里可以参考我的回应：

```shell
* Press y|Y for Yes, any other key for No: Y
* Please enter 0 = LOW, 1 = MEDIUM and 2 = STRONG: 1 // 密码强度
* Please set the password for root here.
New password:
Re-enter new password:
* Remove anonymous users? (Press y|Y for Yes, any other key for No) : y
* Disallow root login remotely? (Press y|Y for Yes, any other key for No) : N
* Remove test database and access to it? (Press y|Y for Yes, any other key for No) : Y
* Reload privilege tables now? (Press y|Y for Yes, any other key for No) : Y
```

为 root 设置密码（下面 password 为新密码，要求最高强度）：

```sql
SELECT user,authentication_string,plugin,host FROM mysql.user;
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';
FLUSH PRIVILEGES;
```

添加新用户（下面 newuser 是新用户，password 为新密码，要求最高强度）：

```sql
ALTER USER 'newuser'@'%' IDENTIFIED WITH mysql_native_password BY 'password’;
```

### 删除 Apache

如果你需要的话

```shell
sudo service apache2 stop

sudo apt-get purge apache2 apache2-utils apache2.2-bin apache2-common
sudo apt-get autoremove —purge
whereis apache2

sudo rm -Rf 多个文件路径
```

## API 项目

### 安装

```shell
git clone https://github.com/cashwarden/api.git cashwarden-api
cd cashwarden-api
cp .env.example .env
composer install
chmod 777 -R runtime/
chmod 777 -R web/uploads/
chmod 777 -R web/assets
php yii migrate
php yii queue-migrate
php yii migrate --migrationPath=@yiier/userSetting/migrations/
php yii generate/key # optional 
```

### 配置 Nginx

```shell
vim /etc/nginx/conf.d/api.cashwarden.com.conf
```

代码：

```conf
server {
    charset utf-8;
    client_max_body_size 128M; ## listen for ipv4
    server_name youname.com;
    index index.html index.htm index.php;
    root /root/www/cashwarden-api/web;

    location ~ \.php$ {
        try_files $uri =404;
        fastcgi_split_path_info ^(.+\.php)(/.+)$;
        fastcgi_pass unix:/var/run/php/php7.4-fpm.sock;
        fastcgi_index index.php;
        fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
        include fastcgi_params;
    }


    location / {
        # Redirect everything that isn't a real file to index.php
        try_files $uri $uri/ /index.php?$args;
    }


    location ~ .*\.(gif|jpg|jpeg|png|bmp|swf)$ {
        expires 30d;
    }

    location ~ .*\.(js|css)?$ {
        expires 1h;
    }
}
```

`server_name` 和 `root` 的值需要根据情况修改。

然后重启 nginx

```shell
sudo service nginx reload
```

### 配置定时任务

推送 telegram 报告和配置定时记账

```

```


## WEB 项目

### 安装

**方式一：使用已编译好的代码（推荐）**

WEB 项目部署可以直接拿 build 好的代码，自己 build 非常耗时，而且需要至少 2G 的内存：

```shell
git clone -b gh-pages https://github.com/cashwarden/web.git cashwarden-web
```

**方式二：自己编译**

```shell
git clone https://github.com/cashwarden/web.git cashwarden-web
```

本地确保有 [nodejs](https://nodejs.org/) 14.x 以上环境

```shell
npm ci
npm install -g @angular/cli
ng build --prod
```

`dist` 目录就是编译好的代码，是拿来部署的代码。

### 配置 Nginx

```shell
vim /etc/nginx/conf.d/cashwarden.com.conf
```

代码：

```conf
server {
    charset utf-8;
    client_max_body_size 128M; ## listen for ipv4
    server_name www.cashwarden.com cashwarden.com;
    index index.html index.htm index.php;
    root /root/www/cashwarden-web;

    gzip on;
    gzip_min_length 1000;
    gzip_proxied expired no-cache no-store private auth;
    gzip_types text/plain text/css application/json application/javascript application/x-javascript text/xml application/xml application/xml+rss
text/javascript;

    location /api {
        rewrite /api/(.*) /v1/$1  break;
        proxy_pass https://api.cashwarden.com;
    }

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

`server_name` 和 `root` 的值需要根据情况修改。


## 支持 HTTPS 

使用 [Certbot](https://certbot.eff.org/lets-encrypt/ubuntufocal-nginx) 

```shell
sudo apt install snapd
sudo snap install core; sudo snap refresh core
sudo snap install --classic certbot
sudo ln -s /snap/bin/certbot /usr/bin/certbot
```

自动安装 SSL 证书

```shell
sudo certbot --nginx
```

配置系统定时任务：

```shell
sudo crontab -e
```

添加

```shell
1 0 1 * * sudo certbot renew --dry-run
```

## Telegram 支持

### 申请 Telegram Bot

### 初始化 telegram

在 API 项目根目录执行 

```shell
php yii init/telegram
```