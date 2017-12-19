import {
  ApplicationRef, ComponentFactoryResolver, ComponentRef, Injectable,
  Injector, ViewContainerRef, EmbeddedViewRef, Type,
} from '@angular/core';

/**
 * Injection service is a helper to append components
 * dynamically to a known location in the DOM, most
 * noteably for dialogs/tooltips appending to body.
 *
 * ts: 注册服务是一个辅助动态组件在DOM中注册一个已知的位置，对话/提示附加体。
 * @export
 * @class InjectionService
 */
@Injectable()
export class InjectionService {

  private _container: ComponentRef<any>;

  constructor(private applicationRef: ApplicationRef,
              private componentFactoryResolver: ComponentFactoryResolver,
              private injector: Injector) {
  }

  /**
   * Gets the root view container to inject the component to.
   *
   * ts: 将组建注册到 root 容器中
   * @returns {ComponentRef<any>}
   * @memberOf InjectionService
   */
  getRootViewContainer(): ComponentRef<any> {
    if (this._container) {
      return this._container;
    }

    const rootComponents = this.applicationRef['_rootComponents'];
    if (rootComponents.length) {
      return rootComponents[0];
    }

    throw new Error('View Container not found! ngUpgrade needs to manually set this via setRootViewContainer.');
  }

  /**
   * Overrides the default root view container. This is useful for
   * things like ngUpgrade that doesn't have a ApplicationRef root.
   *
   * ts: 重写默认注入根节点
   * @param {any} container
   * @memberOf InjectionService
   */
  setRootViewContainer(container): void {
    this._container = container;
  }

  /**
   * Gets the html element for a component ref.
   *
   * 获取组件 html 元素
   * @param {ComponentRef<any>} componentRef
   * @returns {HTMLElement}
   * @memberOf InjectionService
   */
  getComponentRootNode(componentRef: any): HTMLElement {
    // the top most component root node has no `hostView`
    if (!componentRef.hostView) {
      return componentRef.element.nativeElement;
    }

    return (componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
  }

  /**
   * Gets the root component container html element.
   *
   * 获取 root html 元素
   * @returns {HTMLElement}
   * @memberOf InjectionService
   */
  getRootViewContainerNode(componentRef): HTMLElement {
    return this.getComponentRootNode(componentRef);
  }

  /**
   * Projects the bindings onto the component
   *
   * ts: 绑定 组建
   * @param {ComponentRef<any>} component
   * @param {*} options
   * @returns {ComponentRef<any>}
   * @memberOf InjectionService
   */
  projectComponentBindings(component: ComponentRef<any>, bindings: any): ComponentRef<any> {
    if (bindings) {
      if (bindings.inputs !== undefined) {
        const bindingKeys = Object.getOwnPropertyNames(bindings.inputs);
        for (const bindingName of bindingKeys) {
          component.instance[bindingName] = bindings.inputs[bindingName];
        }
      }

      if (bindings.outputs !== undefined) {
        const eventKeys = Object.getOwnPropertyNames(bindings.outputs);
        for (const eventName of eventKeys) {
          component.instance[eventName] = bindings.outputs[eventName];
        }
      }
    }

    return component;
  }

  /**
   * Appends a component to a adjacent location
   *
   * ts: 添加组建
   * @template T
   * @param {Type<T>} componentClass
   * @param {*} [options={}]
   * @param {Element} [location]
   * @returns {ComponentRef<any>}
   *
   * @memberOf InjectionService
   */
  appendComponent<T>(componentClass: Type<T>,
                     bindings: any = {},
                     location?: any): ComponentRef<any> {

    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(componentClass);
    const componentRef = componentFactory.create(this.injector);
    const appRef: any = this.applicationRef;
    const componentRootNode = this.getComponentRootNode(componentRef);

    // project the options passed to the component instance
    this.projectComponentBindings(componentRef, bindings);

    appRef.attachView(componentRef.hostView);

    componentRef.onDestroy(() => {
      appRef.detachView(componentRef.hostView);
    });

    // location override not passed, get `this._container`
    if (!location) {
      location = this.getRootViewContainer();
    }

    const appendLocation = this.getComponentRootNode(location);
    appendLocation.appendChild(componentRootNode);

    return componentRef;
  }
}
