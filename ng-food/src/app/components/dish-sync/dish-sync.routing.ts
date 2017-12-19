import { SyncContentComponent } from './sync-content/sync-content.component';

export const DishSyncRouting = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'sync',
  },
  {
    path: 'sync',
    data: {
      title: '菜品匹配',
    },
    component: SyncContentComponent,
  },
];
