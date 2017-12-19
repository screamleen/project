import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Tool } from '../utils/tool';
import { RawDishes } from '../mocks/dishes.mock';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/filter';

interface  IsyncDish {
  platform: string;
  platform_name: string;
  image?: string;
  is_dine?: boolean;
  dishes: Array < {
    id: number,
    name: string,
    food_id?: number,
    local_food_id?: number,
  }>;
}

@Injectable()
export class DishSyncService {

  public dishes;

  public idGenerator = 1100;

  constructor(
    private tool: Tool,
  ) { }

  // 外卖平台菜品拉取
  public getDishes(isRefresh?: boolean, is_relation?: boolean) {

    const dine = RawDishes.find( (item) => {
      return item.platform === 'dine';
    });

    const syncDishes = this.tool.deepCopy(dine);

    if ( !syncDishes.is_dine ) {
      const dineIndex = RawDishes.findIndex( (item) => {
        return item.platform === 'dine';
      });
      RawDishes.splice(dineIndex , 1);
    }

    this.dishes = this.dealWithRawDishes(syncDishes, RawDishes);

    return Observable.create( (observer) => {
      observer.next(this.dishes);
      observer.complete();
    });
  }

  // 匹配店铺菜品
  public syncDishes(selected, publicName) {
    const platformDish = [];
    let isUpdate = 0; // 默认创建新的本地菜，不然为更新本地菜
    selected.map( (item) => {
      if (item.platform === 'dine') {
        isUpdate = item.id;

        return;
      }
      platformDish.push({
        remote_food_id: item.id,
        flag_key: item.platform,
      });
    });
    const params = {
      food: { alias: publicName, platform: platformDish },
    };

    if (isUpdate) {
      params.food['id'] = isUpdate;
    }
    // 未匹配菜品列表更新
    selected.map( (dish) => {
      const unSynMes = this.dishes.unSync.find( (item) => {

        return item.platform === dish.platform;
      });
      if (unSynMes) {
        const syncDishIndex = unSynMes.unMatch_dishes.findIndex( (item) => {

          return item.id === dish.id;
        });
        unSynMes.unMatch_dishes.splice( syncDishIndex, 1);
      }
    });

    // 堂食更新
    if (isUpdate) {
      const dine = selected.find((platform) => {
        return platform.platform === 'dine';
      });
      dine.name = publicName;
    }

    // 已匹配菜品列表更新
    this.dishes.sync.unshift({
      id: this.idGenerator ++,
      name: publicName,
      match: this.tool.deepCopy(selected),
    });

    return Observable.create( (observer) => {
      observer.next(this.dishes);
      observer.complete();
    });
  }

  // 处理拉取菜品的数据
  public dealWithRawDishes(syncRaw, rawDishes) {
    const syncDishes = [];
    const dishObservable = Observable.from(rawDishes);
    const terminal = {
      sync: [],
      unSync: [],
    };

    rawDishes.map ( (item) => {
      const temp = [];
      if ( !item.dishes) {
        // todo: 接口调整好之后删除这段
        return;
      }
      item.dishes.map( ( dishItem ) => {
        if (dishItem.food_id === 0 || dishItem.local_food_id === 0) {
          temp.push({
            id: dishItem.id,
            name: dishItem.name,
            norms: dishItem.norms,
          });
        }
      });

      terminal.unSync.push({
        platform: item.platform,
        platform_name: item.platform_name,
        unMatch_dishes: this.tool.deepCopy(temp),
      });
    });

    // 筛选已匹配的菜品
    syncRaw.dishes.map( (item) => {
      let di;
      item.match = [];
      dishObservable.filter((arr: IsyncDish) => {
        di = arr.dishes.find( (dish) => { return (dish.food_id === item.id || dish.local_food_id === item.id); });

        return !!di;
      }).subscribe((arr: IsyncDish) => {
        const newDish = {
          platform: arr.platform,
          id: di.id,
          name: di.name,
        };
        if ('norms' in di) {
          newDish['norms'] = di.norms;
        } else {
          newDish['norms'] = [];
        }

        item.match.push(newDish);
      });

      if (item.match.length !== 0) {
        syncDishes.push(this.tool.deepCopy(item));
      }
    });
    terminal.sync = this.tool.deepCopy(syncDishes);

    return terminal;
  }
  // 重新匹配店铺菜品
  public reSycnDishes(Selected) {
    // 未匹配菜品列表更新
    Selected.match.map( (item) => {
      const matchPlatformIndex = this.dishes.unSync.findIndex( (platform) => {
        return platform.platform === item.platform;
      });
      if (matchPlatformIndex !== -1 && item.platform !== 'dine') {
        this.dishes.unSync[matchPlatformIndex].unMatch_dishes.unshift({
          id: item.id,
          name: item.name,
          norms: item.norms,
        });
      }
    });

    // 已匹配菜品列表更新
    const syncDishIndex = this.dishes.sync.findIndex( (item) => {
      return item.id === Selected.id;
    });

    this.dishes.sync.splice( syncDishIndex, 1);

    return Observable.create( (observer) => {
      observer.next(this.dishes);
      observer.complete();
    });
  }
  // // 强制匹配菜品s
  // public AutoSync() {
  //   const param = [];
  //   this.dishes.unSync.map((platform) => {
  //     if (platform.platform !== 'dine') {
  //       platform.unMatch_dishes.map((dish) => {
  //         dish.norms = JSON.stringify(dish.norms);
  //       });
  //       param.push({
  //         platform: platform.platform,
  //         dishes: platform.unMatch_dishes,
  //       });
  //     }
  //   });
  //
  //   return this.api.post(API_MAP.FOOD_TAKEOUT_FORCE, {
  //     foods: param,
  //   }).mergeMap( (res) => {
  //     return this.getDishes();
  //   });
  // }
}
