import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import { state, trigger, style, transition, animate } from '@angular/animations';
import { Subscription } from 'rxjs/Subscription';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DialogService } from '../../../widgets/ngx-components/dialog/dialog.service';
import { DishSyncService } from '../../../services/dish-sync.service';
import { AppLoadingService } from '../../../widgets/app-loading/app-loadding.service';
import { PlatformsColors } from '../../../app.config';
import { Tool } from '../../../utils/tool';

@Component({
  selector: 'app-sync-content',
  templateUrl: './sync-content.component.html',
  styleUrls: ['./sync-content.component.scss'],
  animations: [
    trigger('visibilityTransition', [
      state('void => *', style({
        opacity: 1,
        transform: 'scale3d(1, 1, 1)',
      })),
      transition('void => *', [
        style({
          opacity: 0,
          transform: 'scale3d(1.2, 1.2, 1.2)',
        }),
        animate('0.2s ease-out'),
      ]),
      transition('* => void', [
        style({
          opacity: 1,
          transform: 'scale3d(1, 1, 1)',
        }),
        animate('0.2s ease-out', style({
          transform: 'scale3d(0.9, 0.9, 1)',
          opacity: 0,
        })),
      ]),
    ]),
  ],
})
export class SyncContentComponent implements OnInit {

  @Input() selfDefinedName: string;
  @Input()  nextButton: boolean;
  @Output() nextStep: EventEmitter<any> = new EventEmitter();

  @ViewChild('container') container;
  public subscriptions: Subscription[] = [];

  public platformColors = PlatformsColors;

  public  state = {
    sync: [],
    unSync: [],
  };

  public unSyncDishesSelc: Array<{
    platform: string,
    id: number,
    name: string,
    norms: any[],
  }> = [];

  public unSolvedName = [];
  public dishNameForm: FormGroup;

  public syncDishesSelc;

  constructor(
    private tool: Tool,
    private fb: FormBuilder,
    public dialog: DialogService,
    public dishService: DishSyncService,
    private loading: AppLoadingService,
  ) {
    this.dishNameForm = this.fb.group({
      // tslint:disable-next-line
      unSolvedName: [ null , [Validators.required] ],
      selfDefinedName: '',
    });
  }

  ngOnInit() {
    this.viewInit();
  }

  public viewInit() {

    const flag = this.loading.start(this.container);

    this.dishService.getDishes().subscribe(
      (data) => {
        this.loading.complete({ container: this.container, index: flag });
        this.state = this.tool.deepCopy(data);
      },
      (err) => {
        this.loading.complete({ container: this.container, index: flag });
        // Api.handleError(err);
      },
    );
  }

  public selectUnSyncDish(dish , flag) {
    // 清空菜品名称选中值
    if ( this.unSolvedName.indexOf(this.dishNameForm.get('unSolvedName').value) === -1) {
      this.dishNameForm.patchValue({
        unSolvedName: null,
      });
    }
    const matchItemIndex = this.unSyncDishesSelc.findIndex( (item) => {
      return ( item.platform === flag );
    });

    if ( matchItemIndex !== -1) {
      // 平台已有选中菜品
      if (this.unSyncDishesSelc[matchItemIndex].id === dish.id) {
        // 再次点击选中的菜品, 则取消菜品的选中
        this.unSyncDishesSelc.splice(matchItemIndex, 1);
      } else {
        // 未选中的菜品, 则将已选中清除, 当前点击菜品选中
        this.unSyncDishesSelc.splice(matchItemIndex, 1);
        const newSelc = {
          platform: flag,
          id: dish.id,
          name: dish.name,
          norms: dish.norms,
        };
        this.unSyncDishesSelc.push(newSelc);
      }
    } else {
      // 平台未有已选中菜品
      const newSelc = {
        platform: flag,
        id: dish.id,
        name: dish.name,
        norms: dish.norms,
      };
      this.unSyncDishesSelc.push(newSelc);
    }
    this.autoSyncComplete();
    this.getUnsolvedDishName('unSync');
  }

  // 模糊匹配排序菜品
  public autoSyncComplete() {
    // 匹配目标
    let matchTarget = '';
    this.unSyncDishesSelc.map( (platform) => {
      if (matchTarget === platform.name) {
        return ;
      }
      matchTarget += platform.name;
    });

    this.state.unSync.map( (platform) => {
      const maxPercent = 0.99;
      // 平台菜品未选中的重新排序
      const isIn = this.unSyncDishesSelc.find((item) => {
        return item.platform === platform.platform;
      });
      if (!isIn) {
        // 计算该平台每道菜的匹配度
        platform.unMatch_dishes.map( (dish) => {
          dish['match_percent'] = this.tool.getMatching(dish.name, matchTarget);
          if (dish['match_percent'] > maxPercent) {
            this.unSyncDishesSelc.push({
              platform: platform.platform,
              id: dish.id,
              name: dish.name,
              norms: dish.norms,
            });
          }
        });
        // 根据匹配度重新排序
        platform.unMatch_dishes.sort(
          (a, b) => {
            return b.match_percent - a.match_percent;
          },
        );
        // 删除匹配度
        platform.unMatch_dishes.map( (dish) => {
          delete dish.match_percent;
        });
        // 重新排序的菜品面板滚动到顶部
        this.container.nativeElement.ownerDocument.getElementById(platform.platform).scrollTop = 0;
      }
    });
  }

  public isUnSyncDishSelected(dish , flag) {
    const matchItem = this.unSyncDishesSelc.find( (item) => {
      return ( item.platform === flag && item.id === dish.id);
    });

    return !!matchItem;
  }

  public selectSyncDish(dish) {
    if ( !this.syncDishesSelc ) {
      this.syncDishesSelc = {};
    }
    // 非空对象
    if ( Object.keys(this.syncDishesSelc).length ) {
      if (this.syncDishesSelc.id === dish.id) {

        this.syncDishesSelc = null;
        this.unSyncDishesSelc = [];
        this.dishNameForm.patchValue({
          unSolvedName: null,
        });
        this.getUnsolvedDishName('');

        return;
      }
    }
    this.syncDishesSelc = this.tool.deepCopy(dish);
    console.log(this.tool.deepCopy(this.syncDishesSelc));
    this.getUnsolvedDishName('sync');
  }

  public syncDishesBlur() {
    this.syncDishesSelc = null;
    this.unSyncDishesSelc = [];
    this.dishNameForm.patchValue({
      unSolvedName: null,
    });
    this.getUnsolvedDishName('');
  }

  public getUnsolvedDishName(type) {
    const firstName = 0;
    let dishList = [];
    switch (type) {
      case 'unSync' : dishList = this.unSyncDishesSelc; break;
      case 'sync' :
        dishList = this.tool.deepCopy(this.syncDishesSelc.match);
        dishList.unshift({ name: this.syncDishesSelc.name});
        this.dishNameForm.patchValue({
          unSolvedName: this.syncDishesSelc.name,
        });
        break;
      default: break;
    }
    this.unSolvedName = [];
    dishList.map( (dish) => {
      if (this.unSolvedName.indexOf(dish.name) === -1 ) {
        this.unSolvedName.push(dish.name);
      }
    });

    this.dishNameForm.patchValue({
      unSolvedName: this.unSolvedName[firstName],
    });
  }

  public resetUnSyncDishesSelected() {
    if (!this.unSyncDishesSelc.length) {

      return;
    }
    this.unSyncDishesSelc = [];
    this.unSolvedName = [];
  }

  public confirmUnSynDishesSelected() {
    if (!this.unSyncDishesSelc.length ) {

      return;
    }

    if (!this.dishNameForm.valid) {
      this.dialog.create({
        content: '请确认菜品名称！',
      });

      return;
    }

    this.syncDishes(this.unSyncDishesSelc, this.dishNameForm.get('unSolvedName').value );
  }

  public syncDishes(dishes, newName) {
    const flag = this.loading.start(this.container);
    this.dishService.syncDishes(dishes, newName).subscribe(
      (res) => {
        this.loading.complete({ container: this.container, index: flag });
        this.state = res;
        this.unSyncDishesSelc = [];
        this.unSolvedName = [];
        this.dishNameForm.patchValue({
          unSolvedName: null,
        });
        this.selfDefinedName = '';
      },
      (error) => {
        this.loading.complete({ container: this.container, index: flag });
        // Api.handleError(error);
      },
    );
  }

  public resetSyncDishesSelected() {
    this.dishService.reSycnDishes(this.syncDishesSelc).subscribe( (res) => {
      this.state = res;
      this.syncDishesSelc = null;
      this.unSyncDishesSelc = [];
      this.unSolvedName = [];
      this.dishNameForm.patchValue({
        unSolvedName: null,
      });
      this.selfDefinedName = '';
    }, (err) => {
      // Api.handleError(err);
    });

  }

  public dishReName(param) {
    const dish = this.state.sync.find( (item) => {
      return item.id === param.id;
    });

    dish.name = param.new_name;

    this.syncDishesSelc.name = this.dishNameForm.get('unSolvedName').value;
    this.getUnsolvedDishName('sync');
    this.selfDefinedName = '';
  }

  public changeUnSolvedName(val) {
    this.dishNameForm.patchValue({
      unSolvedName: val,
    });
  }

  public isNeedForce() {
    return this.state.unSync.find((platform) => {
      return !!platform.unMatch_dishes.length;
    });
  }

  public syncForce() {
    // this.dialog.create({
    //   title: '注意!',
    //   content: '强制匹配可能导致菜品匹配不准确,是否继续？',
    //   okButton: true,
    //   okText: '确定',
    //   cancelButton: true,
    //   closeOnBlur: false,
    // }).instance.ok.subscribe( () => {
    //   const flag = this.loading.start(this.container);
    //   this.dishService.AutoSync().subscribe( (res) => {
    //     this.loading.complete({ container: this.container, index: flag });
    //     this.state = res;
    //   }, (err) => {
    //     this.loading.complete({ container: this.container, index: flag });
    //     // Api.handleError(err);
    //   });
    // });
  }

  public goNext() {
    this.nextStep.emit();
  }
}
