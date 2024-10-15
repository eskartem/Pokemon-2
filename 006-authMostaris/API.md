# Описание API
Здесь описано всё АПИ, используемое в приложении, с описанием структур данных


**Содержание**
1. Общее
    * 1.1. Адрес сервера
    * 1.2. Используемый протокол
2. Структуры данных
    * 2.1. Общий формат ответа
    * 2.2. Пользователь
    * 2.3. Сообщение
3. Список запросов
    * 3.1. Общие ошибки
4. Подробно
    * 4.1. login
    * 4.2. logout
    * 4.3. registration
    * 4.4. sendMessage
    * 4.5. getMessages


## 1. Общее
### 1.1. Адрес сервера
`http://nopainnogame.local/api`

### 1.2. Используемый протокол
API полностью реализовано на http(s). 

Формат возвращаемых значений `JSON`.

Все методы, если это особо не оговорено, имеют тип `GET`.


## 2. Структуры данных
### 2.1. Общий формат ответа
`T` - какие-то данные. В случае успешного ответа возвращается `result = 'ok'` и поле `data` с данными.

В случае ошибки возвращается `result = 'error'` и поле `error` с кодом и текстом ошибки
```
Answer<T>: {
    result: 'ok' | 'error';
    data?: T;
    error?: {
        code: number;
        text: string;
    };
}
```

### 2.2. Пользователь
```
User: {
    id: number;
    token: string;
    name: string;
}
```

### 2.3. Сообщение
```
Message: {
    message: string;
    author: string;
    created: string;
}
```


## 3. Список запросов
| Название | О чем |
| - | - |
| login | Авторизация пользователя |
| logout | Логаут пользователя |
| registration | Регистрация пользователя |
| sendMessage | Отправить сообщение в чат |
| getMessages | Получить сообщения в чате |

### 3.1. Общие ошибки
* `101` - если не передан параметр `method`
* `102` - если переданное значение в параметре `method` не обрабатывается
* `242` - не переданы все необходимые параметры


## 4. Подробно
### 4.1. login
Авторизация пользователя в системе

**Параметры**
```
{
    login: string; - логин пользователя
    hash: string; - контрольная сумма, равная hash = md5(nd5(login + password) + rnd)
    rnd: number; - случайно целое число
}
```
**Успешный ответ**
```
    Answer<User>
```
**Ошибки**
* `1002` - неверный пароль
* `1005` - неверный логин


### 4.2. logout
Вылогин пользователя из системы

**Параметры**
```
{
    token: string
}
```
**Успешный ответ**
```
    Answer<true>
```
**Ошибки**
* `1003` - неверный пароль


### 4.3. registration
Зарегистрировать нового ползователя

**Параметры**
```
{
    login: string; - логин пользователя
    password: string; - хеш пароля: md5(login + password)
    name: string; - имя пользователя
}
```
**Успешный ответ**
```
    Answer<User>
```
**Ошибки**
* `1001` - такой логин уже существует
* `1004` - ошибка при регистрации пользователя


### 4.4. sendMessage
Послать сообщение в чат

**Параметры**
```
{
    token: string; - токен
    message: string; - текст сообщения
}
```
**Успешный ответ**
```
    Answer<true>
```
**Ошибки**
* `705` - невалидный токен. Пользователь не авторизован


### 4.5. getMessages
Получить все сообщения чата

**Параметры**
```
{
    token: string; - токен
    hash: string; - хеш-сумма чата
}
```
**Успешный ответ**
```
    Answer<{
        messages: Message[]; - список сообщений
        hash: string; - новый хеш чата
    }>
```
**Примечание**: в случае отсутствия новых сообщений будет ответ:
```
    Answer<
        hash: string; - новый хеш чата
    >
```
**Ошибки**
* `705` - невалидный токен. Пользователь не авторизован
