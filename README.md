# medical

<h4>Реализованная функциональность</h4>
<ul>
    <li>Кабинет эксперта (dashboard)</li>
    <ul>
    	<li>Отображение сводной статистики за выбранный период и генерация отчета</li>
    	<li>Отображение выполненных критериев оценки качества мед. помощи для конкретного случая</li>
    	<li>Отображение подобных случаев для сравнения назначенного лечения</li>
    	<li>Отображение возможных противопоказаний для назначенного лечения</li>
    </ul>
    <li>Кабинет врача (виртуальный помощник)</li>
    <ul>
    	<li>Отображение выполненных критериев оценки качества мед. помощи</li>
    	<li>Отображение подобных случаев для сравнения назначенного лечения</li>
    	<li>Отображение возможных противопоказаний для назначенного лечения</li>
    </ul>
</ul> 
<h4>Особенность проекта в следующем:</h4>
<ul>
 <li>Функционал позволяет предотвращать ошибки на этапе лечения;</li>
 <li>По схожим случаям заболеваний система может подсказать оптимальное лечение (при достаточной базе случаев)</li>
 <li>Система подскажет, если на показанный препарат/процедуру у пациента имеются противопоказания</li>  
 </ul>
<h4>Основной стек технологий:</h4>
<ul>
    <li>Figma</li>
	<li>HTML, CSS, JavaScript, Vue.js</li>
	<li>MySQL</li>
	<li>Java</li>
	<li>Git</li>
 </ul>
<h4>Демо</h4>
<p>Демо сервиса доступно по адресу: https://medcode-2021.web.app/</p>

СРЕДА ЗАПУСКА
------------
1) развертывание сервиса производится на debian-like linux (debian 9+);
2) требуется установленный web-сервер с поддержкой PHP(версия 7.4+) интерпретации (apache, nginx);
3) требуется установленная СУБД MariaDB (версия 10+);
4) требуется установленный пакет name1 для работы с...;


УСТАНОВКА
------------
### Установка пакета name

Выполните
~~~
sudo apt-get update
sudo apt-get upgrade
sudo apt-get install name1
sudo apt-get install mariadb-client mariadb-server
git clone https://github.com/Sinclear/default_readme
cd default_readme
...
~~~
### База данных

Необходимо создать пустую базу данных, а подключение к базе прописать в конфигурационный файл сервиса по адресу: папка_сервиса/...
~~~
sudo systemctl restart mariadb
sudo mysql_secure_installation
mysql -u root -p
mypassword
CREATE DATABASE mynewdb;
quit
~~~
### Выполнение миграций

Для заполнения базы данных системной информацией выполните в корневой папке сервиса:
~~~
mysql -u root -p -f mynewdb < папка_сервиса/...
mypassword
~~~
и согласитесь с запросом

### Установка зависимостей проекта

Установка зависимостей осуществляется с помощью [Composer](http://getcomposer.org/). Если у вас его нет вы можете установить его по инструкции
на [getcomposer.org](http://getcomposer.org/doc/00-intro.md#installation-nix).

После этого выполнить команду в директории проекта:

~~~
composer install
~~~

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


РАЗРАБОТЧИКИ

<h4>Кувшинов Егор frontend @eakuvshinov </h4>
<h4>Силич Александр backend @AlexanderSilich </h4>
<h4>Галкина Юлия design @julia_galkina </h4>
<h4>Гринкевич Павел dba @grk717 </h4>
