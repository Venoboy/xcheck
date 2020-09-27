## X Check App / RS Assessment Tool

**Перечень использованных технологий**.

Проект создан с помощью create-react-app. Для разработки данного приложения были использованы следующие технологии:

- React
  - react-router
  - react-router-dom
- TypeScript
- Redux
  - react-redux
  - redux-thunk

Для поддержания качества кода использовались:

- Prettier
- Eslint airbnb
- Husky pre-commit hook

"Иные" технологии:

- Firebase (используется в качестве сервера)
- Ant Design (внешний вид приложения создан с использованием компонентов из данной библиотеки)
- SimpleMDE Markdown Editor (для создания заданий)

**Инструкция для начала разработки**:

- npm start
- Заменить ссылку в REDIRECT_URL, которая находится в src/Actions/authGithub.tsx, с ссылки на хостинге на http://localhost:3000

**Инструкции для деплоя продакшн версии**:

- npm run build
- Заменить ссылку в REDIRECT_URL, которая находится в src/Actions/authGithub.tsx, с http://localhost:3000 на ссылку на хостинге

**Дополнительный функционал**:

- Header:

  - отображение github имени пользователя после авторизации
  - кнопка выхода из приложения (возврат на страницу авторизации)

- CrossCheck Sessions (создание кросс-чек сессии и список со всем кросс-чек сессиями):

  - кнопка создания сессии активна только выбора опубликованного таска
  - отдельная страница с созданием кросс-чек сессии
  - навигация в блоке между страницами
  - кнопка обновления данных об активных сессиях

- Dispute (оспаривание оценки):

  - отдельный модуль выбора спора из нескольких возможных сессий проверки.
  - возможность оставить как текстовый отзыв о проверяющем, так и поставить от 1 до 5 звезд.
