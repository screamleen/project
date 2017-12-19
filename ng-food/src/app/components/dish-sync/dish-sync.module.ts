import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DishSyncComponent } from './dish-sync.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SyncContentComponent } from './sync-content/sync-content.component';
import { DialogModule } from '../../widgets/ngx-components/dialog/dialog.module';
import { AppLoadingService } from '../../widgets/app-loading/app-loadding.service';
import { RouterModule } from '@angular/router';
import { DishSyncRouting } from './dish-sync.routing';
import { Tool } from '../../utils/tool';
import { DishSyncService } from '../../services/dish-sync.service';
import { UtilsModule } from '../../utils/utils.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DialogModule,
    RouterModule.forChild(DishSyncRouting),
    UtilsModule,
  ],
  declarations: [
    DishSyncComponent,
    SyncContentComponent,
  ],
  exports: [
    SyncContentComponent,
  ],
  providers: [
    AppLoadingService,
    DishSyncService,
    Tool,
  ],
})
export class DishSyncModule { }
