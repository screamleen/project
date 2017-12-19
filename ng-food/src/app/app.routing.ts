export const AppRouting = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'dish',
  },
  {
    path: 'dish',
    loadChildren: './components/dish-sync/dish-sync.module#DishSyncModule'
  }
];
