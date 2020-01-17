[Задание Лабы 3](https://docs.google.com/document/d/14hto8S6sv59NBj44W-5AqfIct2itG380TzUuskEI6NA/edit)

### **Название проекта:** TableHub

### **Описание**

Настольные игры, как и многие другие развлечения, созданы для живого общения, для того, чтобы проводить время в компании людей, которые заинтересованы в том же, в чем и Вы. Однако далеко не каждый человек в наше время может быстро и удобно найти такую компанию, да и количество игр в разных жанрах поражает воображение. Так как же выбрать и найти людей с которыми совпадают Ваши вкусы? В эпоху развития технологий процесс поиска интересной компании для совместного времяпрепровождения так же должен быть современным. Данное web-приложение создано для поиска человека/компании, с целью поиграть в настольную игру и хорошо провести время. Для этого пользователи будут создавать соответствующие объявления или откликаться на уже созданные, знакомиться и играть. Основными критериями для поиска людей или компании будут: геолокация, возраст, пол, жанры игр.

### **Роли пользователя**

![](https://sun9-49.userapi.com/c858220/v858220737/b1308/cmyNZqMq3U8.jpg)

### **Сущности предметной области**

![](https://sun9-22.userapi.com/c858220/v858220737/b131c/gxSXS0dq4Ko.jpg)

### **Прототип интерфейса**

Главная страница

![](https://sun9-7.userapi.com/c858220/v858220737/b137a/TP-UEqOExq0.jpg)

![](https://sun9-4.userapi.com/c858220/v858220737/b13c0/whemP9Rw2eQ.jpg)

Настройки профиля
![](https://sun9-56.userapi.com/c858220/v858220737/b13a2/wOXoyj3YudY.jpg)

Авторизация и регистрация
![](https://sun9-17.userapi.com/c858132/v858132570/b44e3/iaHpV32DE58.jpg)

Свой профиль
![](https://sun9-70.userapi.com/c858220/v858220737/b13ca/87A9QPvEwl4.jpg)

Чужой профиль
![](https://sun9-4.userapi.com/c858220/v858220737/b138e/iGm-saPH7lo.jpg)

Страница доски
![](https://sun9-13.userapi.com/c858220/v858220737/b1398/ea6-Ieqz_Hk.jpg)

Страница создания доски
![](https://sun9-52.userapi.com/c858220/v858220737/b13b6/ZZ5wQTgoKXE.jpg)

Чаты
![](https://sun9-64.userapi.com/c858220/v858220737/b1384/CZB6xNcWWi8.jpg)

### **Архитектура приложения**

Архитектура: **SPA**

Диаграмма взаимодействия Backend-Frontend

![](https://sun9-19.userapi.com/c858036/v858036271/bb01c/JNo0VbKeWF4.jpg)

![](https://sun9-45.userapi.com/c858036/v858036271/bb007/bFUl1hcJ9g4.jpg)

![](https://sun9-71.userapi.com/c858036/v858036271/bb015/4GktId5LAzg.jpg)

![](https://sun9-33.userapi.com/c858036/v858036271/bb00e/y1DoOCu9k-A.jpg)

Описание протокола взаимодействия Backend-Frontend / Rest API - при наличии

**_Главная_** \
**Frontend:** GET /?gender="male/female/any"&age=18 40&city=Moscow Ответ: 200 OK \
**Backend:** GET /api/desks?gender="male/female/any"&age=18 40&city=Moscow Ответ: 200 OK Если пустой ответ 404 Not Found

**_Авторизация_** \
**Frontend:** GET /signin Ответ: 200 OK \
**Backend:** POST /api/signin \
Тело:

```json
{
    "username": "text",
    "password": "text"
}
```

Ответ: 200 Ошибка: 400 Bad Request

**_Регистрация_** \
**Frontend:** GET /signup Ответ: 200 OK \
**Backend:** POST /api/signup \
Тело:

```json
{
    "username": "text",
    "email": "text",
    "password": "text",
    "birthDate": "YYYY-MM-DD",
    "gender": "int(0, 1)"
}
```

Ответ: 201 Created Ошибка: 409 Conflict

**_Профиль_** \
**Frontend:** GET /profile/{username} Ответ: 200 OK \
**Backend:** GET /api/users/{username}/profile Ответ: 200 Ошибка: 404 Not Found \
GET /api/users/id/desks?isOwner="true/false" Ответ: 200 Ошибка: 404 Not Found

**_Профиль настройки_** \
**Frontend:** GET /profile/{username}/settings Ответ: 200 OK \
**Backend:** PUT /api/users/username/profile \
Тело:

```json
 {
 	"newEmail": "text",
 	"newUsername": "text",
 	"newPassword": "text",
 	"newName": "text",
 	"newSurname": "text",
 	"newBirthDate": "YYYY-MM-DD",
 	"newGender": "int(0, 1)",
 	"newCity": "text",
 	"newAboutMe": "text",
 	"newFavoriteGenres": "{"text", "text"}",
 	"newFavoriteGames": "{"text", "text"}"
 }
```

Ответ: 200 Ошибка: 404 Not Found

**_Доска_** \
**Frontend:** GET /desk/{id} Ответ: 200 OK \
**Backend:** GET /api/desks/{id} Ответ: 200 Ошибка: 404 Not Found

**_Доска изменение_** \
**Frontend:** GET /desk/{id}/settings Ответ: 200 OK \
**Backend:** PUT /api/desks/{id}? Ответ: 200 Ошибка: 404 Not Found \
Тело:

```json
{
    "target": "",
    "newTitle": "",
    "newPrivacy": "",
    "newGender": "",
    "newAges": ["", ""],
    "newCity": "",
    "newGenres": [],
    "newGames": []
}
```

**_Доска создание_** \
**Frontend:** GET /desk/new Ответ: 200 OK \
**Backend:** POST /api/desks Ответ: 200 Ошибка: 404 Not Found \
Тело:

```json
{
    "target": "",
    "title": "",
    "privacy": "",
    "gender": "",
    "ages": ["", ""],
    "city": "",
    "genres": [],
    "games": []
}
```

**_Сообщения_** \
**Frontend:** GET /messages Ответ: 200 OK \
**Backend:** GET /api/users/id/chats?id= Ответ: 200 Ошибка: 404 Not Found

**_Чат_** \
**Frontend:** GET /messages/chat_id Ответ: 200 OK \
**Backend:** GET /api/chat/id Ответ: 200 Ошибка: 404 Not Found

Структура модулей/классов для Backend и Frontend

**Frontend**

![](https://sun9-63.userapi.com/c853524/v853524583/149812/bbz678cAiYs.jpg)

**Backend**

![](https://sun9-67.userapi.com/c854016/v854016693/14a9ec/Ej4xxNAwzFQ.jpg)

### **Технические детали реализации**

Web-приложение развернуто в Docker контейнере. \
База данных: **PostgreSQL** \
backend: **NodeJS + fastify** \
frontend: **ReactJS**

_Команда_ \
Backend: [Морозов Алексей](https://git.iu7.bmstu.ru/iu7-web-2019/iu7-web-2019-morozov-alexey) \
Frontend: [Мхитарян Виктория](https://git.iu7.bmstu.ru/iu7-web-2019/iu7-web-2019-mkhitaryan-victoria),
[Романова Екатерина](https://git.iu7.bmstu.ru/iu7-web-2019/iu7-web-2019-romanova-ekaterina)

### **Структура и подход к CI/CD для проекта**

Будет реализовано 2 самостоятельных сервера. Pipeline разделен на build, test, deploy. В build и test по 2 задачи(по одной на сервер) и 1 на deploy. Выполнение задач - параллельное, выполнение стадий - последовательное. Все стадии будет выполняться с использованием Docker и GitLab CI/CD.
