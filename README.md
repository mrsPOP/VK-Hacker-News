# Мини-приложение на платформе VK Mini Apps | VK Mini App Platform


## App ID: 51914429

Ссылка на приложение/App link: [https://vk.com/app51914429](https://vk.com/app51914429)

## 🚀 Запуск мини приложения | How to Start the Mini App

### Предварительные условия | Prerequisites

Убедитесь, что на вашем компьютере установлены:

Ensure that your computer has the following software installed:

- Node.js
- Yarn (npm install --global yarn для установки)
- Git

## Инструкция по запуску | Launch Instructions

### Клонировать репозиторий | Clone the Repository:

```sh
git clone https://github.com/mrsPOP/VK-Hacker-News.git
```

### Перейти в папку проекта | Go to the Project Folder:

```sh
cd VK-Hacker-News
```

### Установить зависимости | Install Dependencies:

```sh
 yarn install
```

### Запустить сервер разработки | Start the Development Server:

```sh
 yarn start
```

После запуска, открывайте [http://localhost:3000](http://localhost:3000) для просмотра приложения в режиме разработки.

After starting, open [http://localhost:3000](http://localhost:3000) to view the app in development mode.

Разработан интерфейс, включающий две основные страницы: главную страницу с новостями и страницу отдельной новости.

The interface includes two main pages: a homepage with news and an individual news page.

### Главная страница
 
- Показывает последние 100 новостей в списке, отсортированном по дате с самыми свежими сверху.
- Каждая новость содержит:
  - Название
  - Рейтинг
  - Ник автора
  - Дату публикации
- Переход на страницу новости по клику
- Автоматическое обновление списка новостей каждую минуту
- Кнопка для ручного обновления списка новостей

### Home Page

- Displays the latest 100 news stories in a list, sorted by date with the freshest at the top.
- Each news story includes:
  - Title
  - Rating
  - Author's nickname
  - Publication date
- Click to navigate to the news page
- Automatic news list refresh every minute
- Button for manual news list refresh

### Страница новости

- Содержит:
  - Ссылку на новость
  - Заголовок
  - Дату
  - Автора
  - Счётчик комментариев
  - Список комментариев в виде дерева
- Корневые комментарии подгружаются при входе, вложенные по клику на корневой
- Кнопка для обновления комментариев
- Кнопка для возврата к новостям

### News Page

- Contains:
  - Link to the news
  - News headline
  - Date
  - Author
  - Comment counter
  - Comment tree list
- Root comments are loaded upon page entry, nested comments on click at root
- Button for comments refresh
- Button to return to the news list

## STACK

- React
- TypeScript
- Feature Sliced Design
- vk-mini-apps-router (для роутинга)
- VKUI
- CSS Modules
- Vite
- yarn
