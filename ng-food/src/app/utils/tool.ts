/**
 * Created by chenchaohui on 2017/4/21.
 * 工具函数
 *
 */
import { Injectable } from '@angular/core';
@Injectable()
export class Tool {
  public deepCopy(source: any) {
    if (typeof source === 'object') {
      if (this.isArray(source)) {

        return source.map((ele) => {
          return this.deepCopy(ele);
        });
      } else {
        const target = {};
        for (const key in source) {
          if (source.hasOwnProperty(key)) {
            target[key] = this.deepCopy(source[key]);
          }
        }

        return target;
      }
    } else {
      return source;
    }
  }

  public isArray(source: any) {
    return Object.prototype.toString.call(source) === '[object Array]';
  }

  public ArrayRemove(arr: any[], ele: any) {
    arr.splice(arr.indexOf(ele), 1);
  }

  public ArrayInsert(arr: any[], index: number, ele: any) {
    arr.splice(index, 0, ele);
  }

  public getMatching(source: string, target: string) {
    if (!source || !target) {return 0; }
    const chartArray = [];

    for (const chart of source) {
      if (chartArray.indexOf(chart) === -1) {
        chartArray.push(chart);
      }
    }

    for (const chart of target) {
      if (chartArray.indexOf(chart) === -1) {
        chartArray.push(chart);
      }
    }

    // 拿到数组
    let distance = 0;
    let distanceSquareSource = 0;
    let distanceSquareTarget = 0;
    chartArray.map((chart) => {
      if (chart.match(/[+,#?*^&$!()（）~_-|.;:{}\[\]]/)) {
        chart = `[${chart}]`;
      }
      const chartRegExp = new RegExp(chart);
      const x = source.match(chartRegExp) ? source.match(chartRegExp).length : 0;
      const y = target.match(chartRegExp) ? target.match(chartRegExp).length : 0;

      distance += x * y;
      distanceSquareSource += x * x;
      distanceSquareTarget += y * y;
    });

    return distance / (Math.sqrt(distanceSquareSource) * Math.sqrt(distanceSquareTarget));
  }

}
