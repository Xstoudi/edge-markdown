## Codeblocks

```ts title=start/routes.ts
import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'
const SessionController = () => import('#controllers/session_controller') // [!code ++]

router
  .group(() => {
    router.get('/login', [SessionController, 'store']) // [!code highlight]
  })
  .use(middleware.auth()) // [!code --]
```
