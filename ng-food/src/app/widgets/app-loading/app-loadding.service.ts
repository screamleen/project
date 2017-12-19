import { ApplicationRef, ElementRef, Injectable } from '@angular/core';

@Injectable()
export class AppLoadingService {
  private loadings = [];
  public idGenerator = 0;

  constructor(private applicationRef: ApplicationRef) {
  }

  public generateId() {
    return this.idGenerator++;
  }

  public start(container?: ElementRef) {
    let parentNode = container;
    const delay = 200;
    const loadingId = this.generateId();
    const div = document.createElement('div');
    const img = document.createElement('img');
    if (!parentNode) {
      parentNode = this.applicationRef['_rootComponents'][0].location;
    }
    img.setAttribute('src', `/shopadmin_assets/images/common/bars.svg`);
    const style = {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100%',
      width: '100%',
      background: 'rgba(0, 0, 0, 0.3)',
      opacity: '0',
    };

    for ( const i in style) {
      if (i) {
        div.style[i] = style[i];
      }
    }
    div.appendChild(img);
    parentNode.nativeElement.appendChild(div);
    setTimeout( () => {
      div.style.opacity = '1';
    }, delay);

    this.loadings.push({
      id: loadingId,
      dom: div,
    });

    return loadingId;
  }

  public complete(obj: { container?: ElementRef, index: number }) {
    const loadingIndex = this.loadings.findIndex( (item) => {
      return item.id === obj.index;
    });

    if (!obj.container) {
      obj.container = this.applicationRef['_rootComponents'][0].location;
    }

    if (loadingIndex !== -1) {
      obj.container.nativeElement.removeChild(this.loadings[loadingIndex].dom);
      this.loadings.splice( loadingIndex, 1);
    }

  }
}
