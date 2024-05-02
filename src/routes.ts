import {
  createHashRouter,
  createPanel,
  createRoot,
  createView,
  RoutesConfig,
} from '@vkontakte/vk-mini-apps-router';

export const ROOT = 'root';
export const VIEW = 'view';
export const VIEW_PANELS = {
  NEWS: 'news',
  STORY_PAGE: 'story-page',
} as const;

export const routes = RoutesConfig.create([
  createRoot(ROOT, [
    createView(VIEW, [
      createPanel(VIEW_PANELS.NEWS, '/', []),
      createPanel(VIEW_PANELS.STORY_PAGE, `/${VIEW_PANELS.STORY_PAGE}/:id`, []),
    ]),
  ]),
]);

export const router = createHashRouter(routes.getRoutes());
