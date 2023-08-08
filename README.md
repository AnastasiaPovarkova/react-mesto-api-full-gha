[![Tests](https://github.com/yandex-praktikum/react-mesto-api-full-gha/actions/workflows/tests.yml/badge.svg)](https://github.com/yandex-praktikum/react-mesto-api-full-gha/actions/workflows/tests.yml)
# Проект Mesto на Реакте (frontend + backend, на домене)

<a href="https://mestofront.anstpov.nomoredomains.monster" target="_blank">
    <img src="https://github.com/AnastasiaPovarkova/react-mesto-api-full-gha/blob/main/frontend/src/images/screensaverr.png?raw=true" width="900" title="Mesto https" alt="Mesto https"/>
</a>

Репозиторий для приложения проекта `Mesto`, включающий фронтенд и бэкенд части приложения со следующими возможностями: авторизации и регистрации пользователей, операции с карточками и пользователями.

## На этом сайте пользватель может:

    Зарегистрироваться под любым мейлом (даже выдуманным)
    Редактировать свой профиль (аватар, ник, род деятельности)
    Добавлять и удалять фотографии из путешествий
    Лайкать и анлайкать свои и чужие карточки
    Открывать и просматривать фотокарточки
____

## Технологии

Технологии, использованные в проекте

### React

Использованы хуки use.State и use.Effect. Прописан UserContext. Всплывающие уведомления при успешной регистрации или ошибке регистрации и логина.

### react-router-dom

HashRouter, Routes, Route, Link, useNavigate, Navigate. Роут главной страницы защищен ProtectedRoute.

### REST API

Работа с сервером для получения данных пользователя и отображения карточек студентов.

### Authorization

Все запросы на авторизацию, регистрацию работают через бэкенд `https://api.mesto.anstpov.nomoredomains.monster`. Авторизация работает через cookie.

### Backend 
CORS, MongoDB, JWT

## Команды для сборки и запуска проекта

В папке проекта вы можете запустить команды:

### `npm start`

Запустить проект в режиме разработки.
Страничка будет автоматически обновляться при изменении кода, ошибки отслеживаются в консоли.
Адрес страницы: http://localhost:3000/

### `npm run build`

Скрипт сгенерирует оптимизированную сборку проекта. Внутри проекта появится новая папка `build`. Внутри `build/static` можно найти оптимизированные версии всего написанного кода, наряду с другими ресурсами: JS, CSS и шрифтами. 

### `npm run deploy`

Размещение проекта на сервере. В команде уже прописан predeploy: build.


## Ссылки 

IP 158.160.98.150

Frontend https://mestofront.anstpov.nomoredomains.monster

Backend https://api.mesto.anstpov.nomoredomains.monster

Адрес репозитория https://github.com/AnastasiaPovarkova/react-mesto-api-full-gha
