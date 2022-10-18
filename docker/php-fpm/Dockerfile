FROM php:8.1.4-fpm

RUN apt-get update && apt-get install -y \
    libpq-dev \
    wget \
    zlib1g-dev \
    libmcrypt-dev \
    libzip-dev

RUN rm /etc/localtime
RUN ln -s /usr/share/zoneinfo/Asia/Yekaterinburg /etc/localtime
RUN "date"

RUN docker-php-ext-install pdo pdo_mysql pdo_pgsql
RUN sed "s/;session.save_path/session.save_path/" "$PHP_INI_DIR/php.ini-development" > "$PHP_INI_DIR/php.ini"

WORKDIR /symfony