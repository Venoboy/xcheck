## X Check App / RS Assessment Tool

Для разработки данного приложения были использованы следующие технологии:

- React
  - react-router
  - react-router-dom
- TypeScript
- Redux
  - react-redux
  - redux-thunk

Для качества кода использовались:

- Prettier
- Eslint airbnb
- Husky pre-commit hook

Другие технологии:

- Firebase (используется в качестве сервера)
- Ant Design (Внешний вид приложения создан с использованием компонентов из данной библиотеки)
- SimpleMDE Markdown Editor (для создания заданий)

Инструкция для начала разработки:

- npm start
- Заменить ссылку в src/Actions/authGithub.tsx с ссылки на хостинге на http://localhost:3000

Инструкции для деплоя продакшн версии:

- npm run build
- Заменить ссылку в src/Actions/authGithub.tsx с http://localhost:3000 на ссылку на хостинге
