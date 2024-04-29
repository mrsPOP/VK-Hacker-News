import {
  createHashRouter,
  createPanel,
  createRoot,
  createView,
  RoutesConfig,
} from '@vkontakte/vk-mini-apps-router';

export const DEFAULT_ROOT = 'default_root';

export const DEFAULT_VIEW = 'default_view';

export const DEFAULT_VIEW_PANELS = {
  NEWS: 'news',
  STORY_PAGE: 'story-page',
} as const;

export const routes = RoutesConfig.create([
  createRoot(DEFAULT_ROOT, [
    createView(DEFAULT_VIEW, [
      createPanel(DEFAULT_VIEW_PANELS.NEWS, '/', []),
      createPanel(DEFAULT_VIEW_PANELS.STORY_PAGE, `/${DEFAULT_VIEW_PANELS.STORY_PAGE}`, []),
    ]),
  ]),
]);

export const router = createHashRouter(routes.getRoutes());
