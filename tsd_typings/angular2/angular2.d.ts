

interface List<T> extends Array<T> {}
interface Map<K,V> {}
interface StringMap<K,V> extends Map<K,V> {}

declare module ng {
  type SetterFn = typeof Function;
  type int = number;
  interface Type extends Function {
    new (...args: any[]): Type;
  }

  // See https://github.com/Microsoft/TypeScript/issues/1168
  class BaseException /* extends Error */ {
    message: string;
    stack: string;
    toString(): string;
  }
  interface InjectableReference {}
}




/**
 * The `angular2` is the single place to import all of the individual types.
 */
declare module ng {

  /**
   * Bootstrapping for Angular applications.
   *
   * You instantiate an Angular application by explicitly specifying a component to use as the root
   * component for your
   * application via the `bootstrap()` method.
   *
   * ## Simple Example
   *
   * Assuming this `index.html`:
   *
   * ```html
   * <html>
   *   <!-- load Angular script tags here. -->
   *   <body>
   *     <my-app>loading...</my-app>
   *   </body>
   * </html>
   * ```
   *
   * An application is bootstrapped inside an existing browser DOM, typically `index.html`. Unlike
   * Angular 1, Angular 2
   * does not compile/process bindings in `index.html`. This is mainly for security reasons, as well
   * as architectural
   * changes in Angular 2. This means that `index.html` can safely be processed using server-side
   * technologies such as
   * bindings. Bindings can thus use double-curly `{{ syntax }}` without collision from Angular 2
   * component double-curly
   * `{{ syntax }}`.
   *
   * We can use this script code:
   *
   * ```
   * @Component({
   *    selector: 'my-app'
   * })
   * @View({
   *    template: 'Hello {{ name }}!'
   * })
   * class MyApp {
   *   name:string;
   *
   *   constructor() {
   *     this.name = 'World';
   *   }
   * }
   *
   * main() {
   *   return bootstrap(MyApp);
   * }
   * ```
   *
   * When the app developer invokes `bootstrap()` with the root component `MyApp` as its argument,
   * Angular performs the
   * following tasks:
   *
   *  1. It uses the component's `selector` property to locate the DOM element which needs to be
   * upgraded into
   *     the angular component.
   *  2. It creates a new child injector (from the platform injector). Optionally, you can also
   * override the injector configuration for an app by
   * invoking `bootstrap` with the `componentInjectableBindings` argument.
   *  3. It creates a new `Zone` and connects it to the angular application's change detection domain
   * instance.
   *  4. It creates a shadow DOM on the selected component's host element and loads the template into
   * it.
   *  5. It instantiates the specified component.
   *  6. Finally, Angular performs change detection to apply the initial data bindings for the
   * application.
   *
   *
   * ## Instantiating Multiple Applications on a Single Page
   *
   * There are two ways to do this.
   *
   *
   * ### Isolated Applications
   *
   * Angular creates a new application each time that the `bootstrap()` method is invoked. When
   * multiple applications
   * are created for a page, Angular treats each application as independent within an isolated change
   * detection and
   * `Zone` domain. If you need to share data between applications, use the strategy described in the
   * next
   * section, "Applications That Share Change Detection."
   *
   *
   * ### Applications That Share Change Detection
   *
   * If you need to bootstrap multiple applications that share common data, the applications must
   * share a common
   * change detection and zone. To do that, create a meta-component that lists the application
   * components in its template.
   * By only invoking the `bootstrap()` method once, with the meta-component as its argument, you
   * ensure that only a
   * single change detection zone is created and therefore data can be shared across the applications.
   *
   *
   * ## Platform Injector
   *
   * When working within a browser window, there are many singleton resources: cookies, title,
   * location, and others.
   * Angular services that represent these resources must likewise be shared across all Angular
   * applications that
   * occupy the same browser window.  For this reason, Angular creates exactly one global platform
   * injector which stores
   * all shared services, and each angular application injector has the platform injector as its
   * parent.
   *
   * Each application has its own private injector as well. When there are multiple applications on a
   * page, Angular treats
   * each application injector's services as private to that application.
   *
   *
   * # API
   * - `appComponentType`: The root component which should act as the application. This is a reference
   * to a `Type`
   *   which is annotated with `@Component(...)`.
   * - `componentInjectableBindings`: An additional set of bindings that can be added to the app
   * injector
   * to override default injection behavior.
   * - `errorReporter`: `function(exception:any, stackTrace:string)` a default error reporter for
   * unhandled exceptions.
   *
   * Returns a `Promise` of {@link ApplicationRef}.
   */
  function bootstrap(appComponentType: /*Type*/ any, componentInjectableBindings?: List<Type | Binding | List<any>>) : Promise<ApplicationRef> ;

  class DehydratedException extends BaseException {
  }

  class ExpressionChangedAfterItHasBeenChecked extends BaseException {
  }

  class ChangeDetectionError extends BaseException {

     location: string;
  }


  /**
   * ON_PUSH means that the change detector's mode will be set to CHECK_ONCE during hydration.
   */
  const ON_PUSH : string ;


  /**
   * DEFAULT means that the change detector's mode will be set to CHECK_ALWAYS during hydration.
   */
  const DEFAULT : string ;


  /**
   * Controls change detection.
   *
   * {@link ChangeDetectorRef} allows requesting checks for detectors that rely on observables. It
   * also allows detaching and
   * attaching change detector subtrees.
   */
  class ChangeDetectorRef {


    /**
     * Request to check all ON_PUSH ancestors.
     */
     requestCheck(): void;


    /**
     * Detaches the change detector from the change detector tree.
     *
     * The detached change detector will not be checked until it is reattached.
     */
     detach(): void;


    /**
     * Reattach the change detector to the change detector tree.
     *
     * This also requests a check of this change detector. This reattached change detector will be
     * checked during the
     * next change detection run.
     */
     reattach(): void;
  }

  class Pipes {


    /**
     * Map of {@link Pipe} names to {@link PipeFactory} lists used to configure the
     * {@link Pipes} registry.
     *
     * #Example
     *
     * ```
     * var pipesConfig = {
     *   'json': [jsonPipeFactory]
     * }
     * @Component({
     *   viewInjector: [
     *     bind(Pipes).toValue(new Pipes(pipesConfig))
     *   ]
     * })
     * ```
     */
     config: StringMap<string, PipeFactory[]>;

     get(type: string, obj: any, cdRef?: ChangeDetectorRef, existingPipe?: Pipe): Pipe;
  }


  /**
   * Indicates that the result of a {@link Pipe} transformation has changed even though the reference
   * has not changed.
   *
   * The wrapped value will be unwrapped by change detection, and the unwrapped value will be stored.
   */
  class WrappedValue {

     wrapped: any;
  }


  /**
   * An interface for extending the list of pipes known to Angular.
   *
   * If you are writing a custom {@link Pipe}, you must extend this interface.
   *
   * #Example
   *
   * ```
   * class DoublePipe implements Pipe {
   *  supports(obj) {
   *    return true;
   *  }
   *
   *  onDestroy() {}
   *
   *  transform(value, args = []) {
   *    return `${value}${value}`;
   *  }
   * }
   * ```
   */
  interface Pipe {

     supports(obj: any): boolean;

     onDestroy(): void;

     transform(value: any, args: List<any>): any;
  }

  interface PipeFactory {

     supports(obs: any): boolean;

     create(cdRef: ChangeDetectorRef): Pipe;
  }

  class NullPipe extends BasePipe {

     called: boolean;

     supports(obj: any): boolean;

     transform(value: any, args?: List<any>): WrappedValue;
  }

  class NullPipeFactory implements PipeFactory {

     supports(obj: any): boolean;

     create(cdRef: ChangeDetectorRef): Pipe;
  }

  const defaultPipes : Pipes ;


  /**
   * Provides default implementation of supports and onDestroy.
   *
   * #Example
   *
   * ```
   * class DoublePipe extends BasePipe {*
   *  transform(value) {
   *    return `${value}${value}`;
   *  }
   * }
   * ```
   */
  class BasePipe implements Pipe {

     supports(obj: any): boolean;

     onDestroy(): void;

     transform(value: any, args: List<any>): any;
  }

  class Locals {

     parent: Locals;

     current: Map<any, any>;

     contains(name: string): boolean;

     get(name: string): any;

     set(name: string, value: any): void;

     clearValues(): void;
  }


  /**
   * A dispatcher for all events happening in a view.
   */
  interface RenderEventDispatcher {


    /**
     * Called when an event was triggered for a on-* attribute on an element.
     * @param {Map<string, any>} locals Locals to be used to evaluate the
     *   event expressions
     */
     dispatchRenderEvent(elementIndex: number, eventName: string, locals: Map<string, any>): void;
  }

  class Renderer {


    /**
     * Creates a root host view that includes the given element.
     * Note that the fragmentCount needs to be passed in so that we can create a result
     * synchronously even when dealing with webworkers!
     *
     * @param {RenderProtoViewRef} hostProtoViewRef a RenderProtoViewRef of type
     * ProtoViewDto.HOST_VIEW_TYPE
     * @param {any} hostElementSelector css selector for the host element (will be queried against the
     * main document)
     * @return {RenderViewWithFragments} the created view including fragments
     */
     createRootHostView(hostProtoViewRef: RenderProtoViewRef, fragmentCount: number, hostElementSelector: string): RenderViewWithFragments;


    /**
     * Creates a regular view out of the given ProtoView.
     * Note that the fragmentCount needs to be passed in so that we can create a result
     * synchronously even when dealing with webworkers!
     */
     createView(protoViewRef: RenderProtoViewRef, fragmentCount: number): RenderViewWithFragments;


    /**
     * Destroys the given view after it has been dehydrated and detached
     */
     destroyView(viewRef: RenderViewRef): void;


    /**
     * Attaches a fragment after another fragment.
     */
     attachFragmentAfterFragment(previousFragmentRef: RenderFragmentRef, fragmentRef: RenderFragmentRef): void;


    /**
     * Attaches a fragment after an element.
     */
     attachFragmentAfterElement(elementRef: RenderElementRef, fragmentRef: RenderFragmentRef): void;


    /**
     * Detaches a fragment.
     */
     detachFragment(fragmentRef: RenderFragmentRef): void;


    /**
     * Hydrates a view after it has been attached. Hydration/dehydration is used for reusing views
     * inside of the view pool.
     */
     hydrateView(viewRef: RenderViewRef): void;


    /**
     * Dehydrates a view after it has been attached. Hydration/dehydration is used for reusing views
     * inside of the view pool.
     */
     dehydrateView(viewRef: RenderViewRef): void;


    /**
     * Returns the native element at the given location.
     * Attention: In a WebWorker scenario, this should always return null!
     */
     getNativeElementSync(location: RenderElementRef): any;


    /**
     * Sets a property on an element.
     */
     setElementProperty(location: RenderElementRef, propertyName: string, propertyValue: any): void;


    /**
     * Sets an attribute on an element.
     */
     setElementAttribute(location: RenderElementRef, attributeName: string, attributeValue: string): void;


    /**
     * Sets a class on an element.
     */
     setElementClass(location: RenderElementRef, className: string, isAdd: boolean): void;


    /**
     * Sets a style on an element.
     */
     setElementStyle(location: RenderElementRef, styleName: string, styleValue: string): void;


    /**
     * Calls a method on an element.
     */
     invokeElementMethod(location: RenderElementRef, methodName: string, args: List<any>): void;


    /**
     * Sets the value of a text node.
     */
     setText(viewRef: RenderViewRef, textNodeIndex: number, text: string): void;


    /**
     * Sets the dispatcher for all events of the given view
     */
     setEventDispatcher(viewRef: RenderViewRef, dispatcher: RenderEventDispatcher): void;
  }


  /**
   * Abstract reference to the element which can be marshaled across web-worker boundry.
   *
   * This interface is used by the Renderer API.
   */
  interface RenderElementRef {


    /**
     * Reference to the `RenderViewRef` where the `RenderElementRef` is inside of.
     */
     renderView: RenderViewRef;


    /**
     * Index of the element inside the `RenderViewRef`.
     *
     * This is used internally by the Angular framework to locate elements.
     */
     renderBoundElementIndex: number;
  }

  class RenderViewRef {
  }

  class RenderProtoViewRef {
  }

  class RenderFragmentRef {
  }

  class RenderViewWithFragments {

     viewRef: RenderViewRef;

     fragmentRefs: RenderFragmentRef[];
  }

  class DomRenderer extends Renderer {

     createRootHostView(hostProtoViewRef: RenderProtoViewRef, fragmentCount: number, hostElementSelector: string): RenderViewWithFragments;

     createView(protoViewRef: RenderProtoViewRef, fragmentCount: number): RenderViewWithFragments;

     destroyView(viewRef: RenderViewRef): void;

     getNativeElementSync(location: RenderElementRef): any;

     getRootNodes(fragment: RenderFragmentRef): List<Node>;

     attachFragmentAfterFragment(previousFragmentRef: RenderFragmentRef, fragmentRef: RenderFragmentRef): void;

     attachFragmentAfterElement(elementRef: RenderElementRef, fragmentRef: RenderFragmentRef): void;

     detachFragment(fragmentRef: RenderFragmentRef): void;

     hydrateView(viewRef: RenderViewRef): void;

     dehydrateView(viewRef: RenderViewRef): void;

     setElementProperty(location: RenderElementRef, propertyName: string, propertyValue: any): void;

     setElementAttribute(location: RenderElementRef, attributeName: string, attributeValue: string): void;

     setElementClass(location: RenderElementRef, className: string, isAdd: boolean): void;

     setElementStyle(location: RenderElementRef, styleName: string, styleValue: string): void;

     invokeElementMethod(location: RenderElementRef, methodName: string, args: List<any>): void;

     setText(viewRef: RenderViewRef, textNodeIndex: number, text: string): void;

     setEventDispatcher(viewRef: RenderViewRef, dispatcher: any): void;
  }

  const DOCUMENT_TOKEN : OpaqueToken ;

  const DOM_REFLECT_PROPERTIES_AS_ATTRIBUTES : OpaqueToken ;


  /**
   * Declare reusable UI building blocks for an application.
   *
   * Each Angular component requires a single `@Component` and at least one `@View` annotation. The
   * `@Component`
   * annotation specifies when a component is instantiated, and which properties and hostListeners it
   * binds to.
   *
   * When a component is instantiated, Angular
   * - creates a shadow DOM for the component.
   * - loads the selected template into the shadow DOM.
   * - creates all the injectable objects configured with `hostInjector` and `viewInjector`.
   *
   * All template expressions and statements are then evaluated against the component instance.
   *
   * For details on the `@View` annotation, see {@link View}.
   *
   * ## Example
   *
   * ```
   * @Component({
   *   selector: 'greet'
   * })
   * @View({
   *   template: 'Hello {{name}}!'
   * })
   * class Greet {
   *   name: string;
   *
   *   constructor() {
   *     this.name = 'World';
   *   }
   * }
   * ```
   */
  class ComponentAnnotation extends DirectiveAnnotation {


    /**
     * Defines the used change detection strategy.
     *
     * When a component is instantiated, Angular creates a change detector, which is responsible for
     * propagating
     * the component's bindings.
     *
     * The `changeDetection` property defines, whether the change detection will be checked every time
     * or only when the component
     * tells it to do so.
     */
     changeDetection: string;


    /**
     * Defines the set of injectable objects that are visible to its view dom children.
     *
     * ## Simple Example
     *
     * Here is an example of a class that can be injected:
     *
     * ```
     * class Greeter {
     *    greet(name:string) {
     *      return 'Hello ' + name + '!';
     *    }
     * }
     *
     * @Directive({
     *   selector: 'needs-greeter'
     * })
     * class NeedsGreeter {
     *   greeter:Greeter;
     *
     *   constructor(greeter:Greeter) {
     *     this.greeter = greeter;
     *   }
     * }
     *
     * @Component({
     *   selector: 'greet',
     *   viewInjector: [
     *     Greeter
     *   ]
     * })
     * @View({
     *   template: `<needs-greeter></needs-greeter>`,
     *   directives: [NeedsGreeter]
     * })
     * class HelloWorld {
     * }
     *
     * ```
     */
     viewInjector: List<any>;
  }


  /**
   * Directives allow you to attach behavior to elements in the DOM.
   *
   * {@link Directive}s with an embedded view are called {@link Component}s.
   *
   * A directive consists of a single directive annotation and a controller class. When the
   * directive's `selector` matches
   * elements in the DOM, the following steps occur:
   *
   * 1. For each directive, the `ElementInjector` attempts to resolve the directive's constructor
   * arguments.
   * 2. Angular instantiates directives for each matched element using `ElementInjector` in a
   * depth-first order,
   *    as declared in the HTML.
   *
   * ## Understanding How Injection Works
   *
   * There are three stages of injection resolution.
   * - *Pre-existing Injectors*:
   *   - The terminal {@link Injector} cannot resolve dependencies. It either throws an error or, if
   * the dependency was
   *     specified as `@Optional`, returns `null`.
   *   - The platform injector resolves browser singleton resources, such as: cookies, title,
   * location, and others.
   * - *Component Injectors*: Each component instance has its own {@link Injector}, and they follow
   * the same parent-child hierarchy
   *     as the component instances in the DOM.
   * - *Element Injectors*: Each component instance has a Shadow DOM. Within the Shadow DOM each
   * element has an `ElementInjector`
   *     which follow the same parent-child hierarchy as the DOM elements themselves.
   *
   * When a template is instantiated, it also must instantiate the corresponding directives in a
   * depth-first order. The
   * current `ElementInjector` resolves the constructor dependencies for each directive.
   *
   * Angular then resolves dependencies as follows, according to the order in which they appear in the
   * {@link View}:
   *
   * 1. Dependencies on the current element
   * 2. Dependencies on element injectors and their parents until it encounters a Shadow DOM boundary
   * 3. Dependencies on component injectors and their parents until it encounters the root component
   * 4. Dependencies on pre-existing injectors
   *
   *
   * The `ElementInjector` can inject other directives, element-specific special objects, or it can
   * delegate to the parent
   * injector.
   *
   * To inject other directives, declare the constructor parameter as:
   * - `directive:DirectiveType`: a directive on the current element only
   * - `@Ancestor() directive:DirectiveType`: any directive that matches the type between the current
   * element and the
   *    Shadow DOM root. Current element is not included in the resolution, therefore even if it could
   * resolve it, it will
   *    be ignored.
   * - `@Query(DirectiveType) query:QueryList<DirectiveType>`: A live collection of direct child
   * directives.
   * - `@QueryDescendants(DirectiveType) query:QueryList<DirectiveType>`: A live collection of any
   * child directives.
   *
   * To inject element-specific special objects, declare the constructor parameter as:
   * - `element: ElementRef` to obtain a reference to logical element in the view.
   * - `viewContainer: ViewContainerRef` to control child template instantiation, for
   * {@link Directive} directives only
   * - `bindingPropagation: BindingPropagation` to control change detection in a more granular way.
   *
   * ## Example
   *
   * The following example demonstrates how dependency injection resolves constructor arguments in
   * practice.
   *
   *
   * Assume this HTML template:
   *
   * ```
   * <div dependency="1">
   *   <div dependency="2">
   *     <div dependency="3" my-directive>
   *       <div dependency="4">
   *         <div dependency="5"></div>
   *       </div>
   *       <div dependency="6"></div>
   *     </div>
   *   </div>
   * </div>
   * ```
   *
   * With the following `dependency` decorator and `SomeService` injectable class.
   *
   * ```
   * @Injectable()
   * class SomeService {
   * }
   *
   * @Directive({
   *   selector: '[dependency]',
   *   properties: [
   *     'id: dependency'
   *   ]
   * })
   * class Dependency {
   *   id:string;
   * }
   * ```
   *
   * Let's step through the different ways in which `MyDirective` could be declared...
   *
   *
   * ### No injection
   *
   * Here the constructor is declared with no arguments, therefore nothing is injected into
   * `MyDirective`.
   *
   * ```
   * @Directive({ selector: '[my-directive]' })
   * class MyDirective {
   *   constructor() {
   *   }
   * }
   * ```
   *
   * This directive would be instantiated with no dependencies.
   *
   *
   * ### Component-level injection
   *
   * Directives can inject any injectable instance from the closest component injector or any of its
   * parents.
   *
   * Here, the constructor declares a parameter, `someService`, and injects the `SomeService` type
   * from the parent
   * component's injector.
   * ```
   * @Directive({ selector: '[my-directive]' })
   * class MyDirective {
   *   constructor(someService: SomeService) {
   *   }
   * }
   * ```
   *
   * This directive would be instantiated with a dependency on `SomeService`.
   *
   *
   * ### Injecting a directive from the current element
   *
   * Directives can inject other directives declared on the current element.
   *
   * ```
   * @Directive({ selector: '[my-directive]' })
   * class MyDirective {
   *   constructor(dependency: Dependency) {
   *     expect(dependency.id).toEqual(3);
   *   }
   * }
   * ```
   * This directive would be instantiated with `Dependency` declared at the same element, in this case
   * `dependency="3"`.
   *
   * ### Injecting a directive from any ancestor elements
   *
   * Directives can inject other directives declared on any ancestor element (in the current Shadow
   * DOM), i.e. on the
   * parent element and its parents. By definition, a directive with an `@Ancestor` annotation does
   * not attempt to
   * resolve dependencies for the current element, even if this would satisfy the dependency.
   *
   * ```
   * @Directive({ selector: '[my-directive]' })
   * class MyDirective {
   *   constructor(@Ancestor() dependency: Dependency) {
   *     expect(dependency.id).toEqual(2);
   *   }
   * }
   * ```
   *
   * `@Ancestor` checks the parent, as well as its parents recursively. If `dependency="2"` didn't
   * exist on the direct parent, this injection would
   * have returned
   * `dependency="1"`.
   *
   *
   * ### Injecting a live collection of direct child directives
   *
   *
   * A directive can also query for other child directives. Since parent directives are instantiated
   * before child directives, a directive can't simply inject the list of child directives. Instead,
   * the directive injects a {@link QueryList}, which updates its contents as children are added,
   * removed, or moved by a directive that uses a {@link ViewContainerRef} such as a `ng-for`, an
   * `ng-if`, or an `ng-switch`.
   *
   * ```
   * @Directive({ selector: '[my-directive]' })
   * class MyDirective {
   *   constructor(@Query(Dependency) dependencies:QueryList<Dependency>) {
   *   }
   * }
   * ```
   *
   * This directive would be instantiated with a {@link QueryList} which contains `Dependency` 4 and
   * 6. Here, `Dependency` 5 would not be included, because it is not a direct child.
   *
   * ### Injecting a live collection of descendant directives
   *
   * By passing the descendant flag to `@Query` above, we can include the children of the child
   * elements.
   *
   * ```
   * @Directive({ selector: '[my-directive]' })
   * class MyDirective {
   *   constructor(@Query(Dependency, {descendants: true}) dependencies:QueryList<Dependency>) {
   *   }
   * }
   * ```
   *
   * This directive would be instantiated with a Query which would contain `Dependency` 4, 5 and 6.
   *
   * ### Optional injection
   *
   * The normal behavior of directives is to return an error when a specified dependency cannot be
   * resolved. If you
   * would like to inject `null` on unresolved dependency instead, you can annotate that dependency
   * with `@Optional()`.
   * This explicitly permits the author of a template to treat some of the surrounding directives as
   * optional.
   *
   * ```
   * @Directive({ selector: '[my-directive]' })
   * class MyDirective {
   *   constructor(@Optional() dependency:Dependency) {
   *   }
   * }
   * ```
   *
   * This directive would be instantiated with a `Dependency` directive found on the current element.
   * If none can be
   * found, the injector supplies `null` instead of throwing an error.
   *
   * ## Example
   *
   * Here we use a decorator directive to simply define basic tool-tip behavior.
   *
   * ```
   * @Directive({
   *   selector: '[tooltip]',
   *   properties: [
   *     'text: tooltip'
   *   ],
   *   hostListeners: {
   *     'onmouseenter': 'onMouseEnter()',
   *     'onmouseleave': 'onMouseLeave()'
   *   }
   * })
   * class Tooltip{
   *   text:string;
   *   overlay:Overlay; // NOT YET IMPLEMENTED
   *   overlayManager:OverlayManager; // NOT YET IMPLEMENTED
   *
   *   constructor(overlayManager:OverlayManager) {
   *     this.overlay = overlay;
   *   }
   *
   *   onMouseEnter() {
   *     // exact signature to be determined
   *     this.overlay = this.overlayManager.open(text, ...);
   *   }
   *
   *   onMouseLeave() {
   *     this.overlay.close();
   *     this.overlay = null;
   *   }
   * }
   * ```
   * In our HTML template, we can then add this behavior to a `<div>` or any other element with the
   * `tooltip` selector,
   * like so:
   *
   * ```
   * <div tooltip="some text here"></div>
   * ```
   *
   * Directives can also control the instantiation, destruction, and positioning of inline template
   * elements:
   *
   * A directive uses a {@link ViewContainerRef} to instantiate, insert, move, and destroy views at
   * runtime.
   * The {@link ViewContainerRef} is created as a result of `<template>` element, and represents a
   * location in the current view
   * where these actions are performed.
   *
   * Views are always created as children of the current {@link View}, and as siblings of the
   * `<template>` element. Thus a
   * directive in a child view cannot inject the directive that created it.
   *
   * Since directives that create views via ViewContainers are common in Angular, and using the full
   * `<template>` element syntax is wordy, Angular
   * also supports a shorthand notation: `<li *foo="bar">` and `<li template="foo: bar">` are
   * equivalent.
   *
   * Thus,
   *
   * ```
   * <ul>
   *   <li *foo="bar" title="text"></li>
   * </ul>
   * ```
   *
   * Expands in use to:
   *
   * ```
   * <ul>
   *   <template [foo]="bar">
   *     <li title="text"></li>
   *   </template>
   * </ul>
   * ```
   *
   * Notice that although the shorthand places `*foo="bar"` within the `<li>` element, the binding for
   * the directive
   * controller is correctly instantiated on the `<template>` element rather than the `<li>` element.
   *
   *
   * ## Example
   *
   * Let's suppose we want to implement the `unless` behavior, to conditionally include a template.
   *
   * Here is a simple directive that triggers on an `unless` selector:
   *
   * ```
   * @Directive({
   *   selector: '[unless]',
   *   properties: ['unless']
   * })
   * export class Unless {
   *   viewContainer: ViewContainerRef;
   *   templateRef: TemplateRef;
   *   prevCondition: boolean;
   *
   *   constructor(viewContainer: ViewContainerRef, templateRef: TemplateRef) {
   *     this.viewContainer = viewContainer;
   *     this.templateRef = templateRef;
   *     this.prevCondition = null;
   *   }
   *
   *   set unless(newCondition) {
   *     if (newCondition && (isBlank(this.prevCondition) || !this.prevCondition)) {
   *       this.prevCondition = true;
   *       this.viewContainer.clear();
   *     } else if (!newCondition && (isBlank(this.prevCondition) || this.prevCondition)) {
   *       this.prevCondition = false;
   *       this.viewContainer.create(this.templateRef);
   *     }
   *   }
   * }
   * ```
   *
   * We can then use this `unless` selector in a template:
   * ```
   * <ul>
   *   <li *unless="expr"></li>
   * </ul>
   * ```
   *
   * Once the directive instantiates the child view, the shorthand notation for the template expands
   * and the result is:
   *
   * ```
   * <ul>
   *   <template [unless]="exp">
   *     <li></li>
   *   </template>
   *   <li></li>
   * </ul>
   * ```
   *
   * Note also that although the `<li></li>` template still exists inside the `<template></template>`,
   * the instantiated
   * view occurs on the second `<li></li>` which is a sibling to the `<template>` element.
   */
  class DirectiveAnnotation extends InjectableMetadata {


    /**
     * The CSS selector that triggers the instantiation of a directive.
     *
     * Angular only allows directives to trigger on CSS selectors that do not cross element
     * boundaries.
     *
     * `selector` may be declared as one of the following:
     *
     * - `element-name`: select by element name.
     * - `.class`: select by class name.
     * - `[attribute]`: select by attribute name.
     * - `[attribute=value]`: select by attribute name and value.
     * - `:not(sub_selector)`: select only if the element does not match the `sub_selector`.
     * - `selector1, selector2`: select if either `selector1` or `selector2` matches.
     *
     *
     * ## Example
     *
     * Suppose we have a directive with an `input[type=text]` selector.
     *
     * And the following HTML:
     *
     * ```html
     * <form>
     *   <input type="text">
     *   <input type="radio">
     * <form>
     * ```
     *
     * The directive would only be instantiated on the `<input type="text">` element.
     */
     selector: string;


    /**
     * Enumerates the set of properties that accept data binding for a directive.
     *
     * The `properties` property defines a set of `directiveProperty` to `bindingProperty`
     * configuration:
     *
     * - `directiveProperty` specifies the component property where the value is written.
     * - `bindingProperty` specifies the DOM property where the value is read from.
     *
     * You can include a {@link Pipe} when specifying a `bindingProperty` to allow for data
     * transformation and structural change detection of the value. These pipes will be evaluated in
     * the context of this component.
     *
     * ## Syntax
     *
     * There is no need to specify both `directiveProperty` and `bindingProperty` when they both have
     * the same value.
     *
     * ```
     * @Directive({
     *   properties: [
     *     'propertyName', // shorthand notation for 'propertyName: propertyName'
     *     'directiveProperty1: bindingProperty1',
     *     'directiveProperty2: bindingProperty2 | pipe1 | ...',
     *     ...
     *   ]
     * }
     * ```
     *
     *
     * ## Basic Property Binding
     *
     * We can easily build a simple `Tooltip` directive that exposes a `tooltip` property, which can
     * be used in templates with standard Angular syntax. For example:
     *
     * ```
     * @Directive({
     *   selector: '[tooltip]',
     *   properties: [
     *     'text: tooltip'
     *   ]
     * })
     * class Tooltip {
     *   set text(value: string) {
     *     // This will get called every time with the new value when the 'tooltip' property changes
     *   }
     * }
     * ```
     *
     * We can then bind to the `tooltip' property as either an expression (`someExpression`) or as a
     * string literal, as shown in the HTML template below:
     *
     * ```html
     * <div [tooltip]="someExpression">...</div>
     * <div tooltip="Some Text">...</div>
     * ```
     *
     * Whenever the `someExpression` expression changes, the `properties` declaration instructs
     * Angular to update the `Tooltip`'s `text` property.
     *
     * ## Bindings With Pipes
     *
     * You can also use pipes when writing binding definitions for a directive.
     *
     * For example, we could write a binding that updates the directive on structural changes, rather
     * than on reference changes, as normally occurs in change detection.
     *
     * See {@link Pipe} and {@link KeyValueChanges} documentation for more details.
     *
     * ```
     * @Directive({
     *   selector: '[class-set]',
     *   properties: [
     *     'classChanges: classSet | keyValDiff'
     *   ]
     * })
     * class ClassSet {
     *   set classChanges(changes: KeyValueChanges) {
     *     // This will get called every time the `class-set` expressions changes its structure.
     *   }
     * }
     * ```
     *
     * The template that this directive is used in may also contain its own pipes. For example:
     *
     * ```html
     * <div [class-set]="someExpression | somePipe">
     * ```
     *
     * In this case, the two pipes compose as if they were inlined: `someExpression | somePipe |
     * keyValDiff`.
     */
     properties: List<string>;


    /**
     * Enumerates the set of emitted events.
     *
     * ## Syntax
     *
     * ```
     * @Component({
     *   events: ['statusChange']
     * })
     * class TaskComponent {
     *   statusChange: EventEmitter;
     *
     *   constructor() {
     *     this.statusChange = new EventEmitter();
     *   }
     *
     *   onComplete() {
     *     this.statusChange.next('completed');
     *   }
     * }
     * ```
     *
     * Use `propertyName: eventName` when the event emitter property name is different from the name
     * of the emitted event:
     *
     * ```
     * @Component({
     *   events: ['status: statusChange']
     * })
     * class TaskComponent {
     *   status: EventEmitter;
     *
     *   constructor() {
     *     this.status = new EventEmitter();
     *   }
     *
     *   onComplete() {
     *     this.status.next('completed');
     *   }
     * }
     * ```
     */
     events: List<string>;


    /**
     * Specifiy the events, actions, properties and attributes related to the host element.
     *
     * ## Events
     *
     * Specifies which DOM hostListeners a directive listens to via a set of `(event)` to `method`
     * key-value pairs:
     *
     * - `event1`: the DOM event that the directive listens to.
     * - `statement`: the statement to execute when the event occurs.
     * If the evalutation of the statement returns `false`, then `preventDefault`is applied on the DOM
     * event.
     *
     * To listen to global events, a target must be added to the event name.
     * The target can be `window`, `document` or `body`.
     *
     * When writing a directive event binding, you can also refer to the following local variables:
     * - `$event`: Current event object which triggered the event.
     * - `$target`: The source of the event. This will be either a DOM element or an Angular
     * directive. (will be implemented in later release)
     *
     * ## Syntax
     *
     * ```
     * @Directive({
     *   host: {
     *     '(event1)': 'onMethod1(arguments)',
     *     '(target:event2)': 'onMethod2(arguments)',
     *     ...
     *   }
     * }
     * ```
     *
     * ## Basic Event Binding:
     *
     * Suppose you want to write a directive that reacts to `change` events in the DOM and on
     * `resize` events in window.
     * You would define the event binding as follows:
     *
     * ```
     * @Directive({
     *   selector: 'input',
     *   host: {
     *     '(change)': 'onChange($event)',
     *     '(window:resize)': 'onResize($event)'
     *   }
     * })
     * class InputDirective {
     *   onChange(event:Event) {
     *     // invoked when the input element fires the 'change' event
     *   }
     *   onResize(event:Event) {
     *     // invoked when the window fires the 'resize' event
     *   }
     * }
     * ```
     *
     * ## Properties
     *
     * Specifies which DOM properties a directives updates.
     *
     * ## Syntax
     *
     * ```
     * @Directive({
     *   selector: 'input',
     *   host: {
     *     '[prop]': 'expression'
     *   }
     * })
     * class InputDirective {
     *   value:string;
     * }
     * ```
     *
     * In this example the prop property of the host element is updated with the expression value
     * every time it changes.
     *
     * ## Attributes
     *
     * Specifies static attributes that should be propagated to a host element. Attributes specified
     * in `hostAttributes` are propagated only if a given attribute is not present on a host element.
     *
     * ## Syntax
     *
     * ```
     * @Directive({
     *   selector: '[my-button]',
     *   host: {
     *     'role': 'button'
     *   }
     * })
     * class MyButton {
     * }
     * ```
     *
     * In this example using `my-button` directive (ex.: `<div my-button></div>`) on a host element
     * (here: `<div>` ) will ensure that this element will get the "button" role.
     *
     * ## Actions
     *
     * Specifies which DOM methods a directive can invoke.
     *
     * ## Syntax
     *
     * ```
     * @Directive({
     *   selector: 'input',
     *   host: {
     *     '@emitFocus': 'focus()'
     *   }
     * })
     * class InputDirective {
     *   constructor() {
     *     this.emitFocus = new EventEmitter();
     *   }
     *
     *   focus() {
     *     this.emitFocus.next();
     *   }
     * }
     * ```
     *
     * In this example calling focus on InputDirective will result in calling focus on the input.
     */
     host: StringMap<string, string>;


    /**
     * Specifies which lifecycle should be notified to the directive.
     *
     * See {@link LifecycleEvent} for details.
     */
     lifecycle: List<LifecycleEvent>;


    /**
     * If set to false the compiler does not compile the children of this directive.
     */
     compileChildren: boolean;


    /**
     * Defines the set of injectable objects that are visible to a Directive and its light dom
     * children.
     *
     * ## Simple Example
     *
     * Here is an example of a class that can be injected:
     *
     * ```
     * class Greeter {
     *    greet(name:string) {
     *      return 'Hello ' + name + '!';
     *    }
     * }
     *
     * @Directive({
     *   selector: 'greet',
     *   hostInjector: [
     *     Greeter
     *   ]
     * })
     * class HelloWorld {
     *   greeter:Greeter;
     *
     *   constructor(greeter:Greeter) {
     *     this.greeter = greeter;
     *   }
     * }
     * ```
     */
     hostInjector: List<any>;


    /**
     * Defines the name that can be used in the template to assign this directive to a variable.
     *
     * ## Simple Example
     *
     * ```
     * @Directive({
     *   selector: 'child-dir',
     *   exportAs: 'child'
     * })
     * class ChildDir {
     * }
     *
     * @Component({
     *   selector: 'main',
     * })
     * @View({
     *   template: `<child-dir #c="child"></child-dir>`,
     *   directives: [ChildDir]
     * })
     * class MainComponent {
     * }
     *
     * ```
     */
     exportAs: string;
  }


  /**
   * Lifecycle events are guaranteed to be called in the following order:
   * - `onChange` (optional if any bindings have changed),
   * - `onInit` (optional after the first check only),
   * - `onCheck`,
   * - `onAllChangesDone`
   */
  enum LifecycleEvent {
    onDestroy,
    onChange,
    onCheck,
    onInit,
    onAllChangesDone
  }


  /**
   * Declares the available HTML templates for an application.
   *
   * Each angular component requires a single `@Component` and at least one `@View` annotation. The
   * `@View` annotation specifies the HTML template to use, and lists the directives that are active
   * within the template.
   *
   * When a component is instantiated, the template is loaded into the component's shadow root, and
   * the expressions and statements in the template are evaluated against the component.
   *
   * For details on the `@Component` annotation, see {@link Component}.
   *
   * ## Example
   *
   * ```
   * @Component({
   *   selector: 'greet'
   * })
   * @View({
   *   template: 'Hello {{name}}!',
   *   directives: [GreetUser, Bold]
   * })
   * class Greet {
   *   name: string;
   *
   *   constructor() {
   *     this.name = 'World';
   *   }
   * }
   * ```
   */
  class ViewAnnotation {


    /**
     * Specifies an inline template for an angular component.
     *
     * NOTE: either `templateUrl` or `template` should be used, but not both.
     */
     templateUrl: string;


    /**
     * Specifies a template URL for an angular component.
     *
     * NOTE: either `templateUrl` or `template` should be used, but not both.
     */
     template: string;


    /**
     * Specifies stylesheet URLs for an angular component.
     */
     styleUrls: List<string>;


    /**
     * Specifies an inline stylesheet for an angular component.
     */
     styles: List<string>;


    /**
     * Specifies a list of directives that can be used within a template.
     *
     * Directives must be listed explicitly to provide proper component encapsulation.
     *
     * ## Example
     *
     * ```javascript
     * @Component({
     *     selector: 'my-component'
     *   })
     * @View({
     *   directives: [For]
     *   template: '
     *   <ul>
     *     <li *ng-for="#item of items">{{item}}</li>
     *   </ul>'
     * })
     * class MyComponent {
     * }
     * ```
     */
     directives: List<Type | any | List<any>>;


    /**
     * Specify a custom renderer for this View.
     * If this is set, neither `template`, `templateUrl`, `styles`, `styleUrls` nor `directives` are
     * used.
     */
     renderer: string;
  }


  /**
   * Specifies that a {@link QueryList} should be injected.
   *
   * See {@link QueryList} for usage and example.
   */
  class QueryAnnotation extends DependencyMetadata {

     descendants: boolean;

     isViewQuery: void;

     selector: void;

     isVarBindingQuery: boolean;

     varBindings: List<string>;

     toString(): string;
  }


  /**
   * Specifies that a constant attribute value should be injected.
   *
   * The directive can inject constant string literals of host element attributes.
   *
   * ## Example
   *
   * Suppose we have an `<input>` element and want to know its `type`.
   *
   * ```html
   * <input type="text">
   * ```
   *
   * A decorator can inject string literal `text` like so:
   *
   * ```javascript
   * @Directive({
   *   selector: `input'
   * })
   * class InputDirective {
   *   constructor(@Attribute('type') type) {
   *     // type would be `text` in this example
   *   }
   * }
   * ```
   */
  class AttributeAnnotation extends DependencyMetadata {

     attributeName: string;

     token: void;

     toString(): string;
  }


  /**
   * Defines lifecycle method [onAllChangesDone ] called when the bindings of all its children have
   * been changed.
   */
  interface OnAllChangesDone {

     onAllChangesDone(): void;
  }


  /**
   * Defines lifecycle method [onChange] called after all of component's bound
   * properties are updated.
   */
  interface OnChange {

     onChange(changes: StringMap<string, any>): void;
  }


  /**
   * Defines lifecycle method [onDestroy] called when a directive is being destroyed.
   */
  interface OnDestroy {

     onDestroy(): void;
  }


  /**
   * Defines lifecycle method [onInit] called when a directive is being checked the first time.
   */
  interface OnInit {

     onInit(): void;
  }


  /**
   * Defines lifecycle method [onCheck] called when a directive is being checked.
   */
  interface OnCheck {

     onCheck(): void;
  }


  /**
   * Provides a way for expressing ES6 classes with parameter annotations in ES5.
   *
   * ## Basic Example
   *
   * ```
   * var Greeter = ng.Class({
   *   constructor: function(name) {
   *     this.name = name;
   *   },
   *
   *   greet: function() {
   *     alert('Hello ' + this.name + '!');
   *   }
   * });
   * ```
   *
   * is equivalent to ES6:
   *
   * ```
   * class Greeter {
   *   constructor(name) {
   *     this.name = name;
   *   }
   *
   *   greet() {
   *     alert('Hello ' + this.name + '!');
   *   }
   * }
   * ```
   *
   * or equivalent to ES5:
   *
   * ```
   * var Greeter = function (name) {
   *   this.name = name;
   * }
   *
   * Greeter.prototype.greet = function () {
   *   alert('Hello ' + this.name + '!');
   * }
   * ```
   *
   * ## Example with parameter annotations
   *
   * ```
   * var MyService = neg.Class({
   *   constructor: [String, [new Query(), QueryList], function(name, queryList) {
   *     ...
   *   }];
   * });
   * ```
   *
   * is equivalent to ES6:
   *
   * ```
   * class MyService {
   *   constructor(name: string, @Query() queryList: QueryList) {
   *     ...
   *   }
   * }
   * ```
   *
   * ## Example with inheritance
   *
   * ```
   * var Shape = ng.Class({
   *   constructor: (color) {
   *     this.color = color;
   *   }
   * });
   *
   * var Square = ng.Class({
   *   extends: Shape,
   *   constructor: function(color, size) {
   *     Shape.call(this, color);
   *     this.size = size;
   *   }
   * });
   * ```
   */
  function Class(clsDef: ClassDefinition) : Type ;


  /**
   * Declares the interface to be used with {@link Class}.
   */
  interface ClassDefinition {


    /**
     * Optional argument for specifying the superclass.
     */
     extends?: Type;


    /**
     * Required constructor function for a class.
     *
     * The function may be optionally wrapped in an `Array`, in which case additional parameter
     * annotations may be specified.
     * The number of arguments and the number of parameter annotations must match.
     *
     * See {@link Class} for example of usage.
     */
     constructor: (Function | Array<any>);
  }


  /**
   * An interface implemented by all Angular parameter decorators, which allows them to be used as ES7
   * decorators.
   */
  interface ParameterDecorator {


    /**
     * Invoke as ES7 decorator.
     */
     (cls: Type, unusedKey: any, index: number): void;

  }


  /**
   * An interface implemented by all Angular type decorators, which allows them to be used as ES7
   * decorators as well as
   * Angular DSL syntax.
   *
   * DSL syntax:
   *
   * ```
   * var MyClass = ng
   *   .Component({...})
   *   .View({...})
   *   .Class({...});
   * ```
   *
   * ES7 syntax:
   *
   * ```
   * @ng.Component({...})
   * @ng.View({...})
   * class MyClass {...}
   * ```
   */
  interface TypeDecorator {


    /**
     * Invoke as ES7 decorator.
     */
     <T extends Type>(type: T): T;



    /**
     * Storage for the accumulated annotations so far used by the DSL syntax.
     *
     * Used by {@link Class} to annotate the generated class.
     */
     annotations: Array<any>;


    /**
     * Generate a class from the definition and annotate it with {@link TypeDecorator#annotations}.
     */
     Class(obj: ClassDefinition): Type;
  }


  /**
   * {@link Attribute} factory function.
   */
  var Attribute : AttributeFactory ;


  /**
   * {@link Attribute} factory for creating annotations, decorators or DSL.
   *
   * ## Example as TypeScript Decorator
   *
   * ```
   * import {Attribute, Component, View} from "angular2/angular2";
   *
   * @Component({...})
   * @View({...})
   * class MyComponent {
   *   constructor(@Attribute('title') title: string) {
   *     ...
   *   }
   * }
   * ```
   *
   * ## Example as ES5 DSL
   *
   * ```
   * var MyComponent = ng
   *   .Component({...})
   *   .View({...})
   *   .Class({
   *     constructor: [new ng.Attribute('title'), function(title) {
   *       ...
   *     }]
   *   })
   * ```
   *
   * ## Example as ES5 annotation
   *
   * ```
   * var MyComponent = function(title) {
   *   ...
   * };
   *
   * MyComponent.annotations = [
   *   new ng.Component({...})
   *   new ng.View({...})
   * ]
   * MyComponent.parameters = [
   *   [new ng.Attribute('title')]
   * ]
   * ```
   */
  interface AttributeFactory {

     new(name: string): AttributeAnnotation;


     (name: string): TypeDecorator;

  }


  /**
   * {@link Component} factory function.
   */
  var Component : ComponentFactory ;


  /**
   * Interface for the {@link Component} decorator function.
   *
   * See {@link ComponentFactory}.
   */
  interface ComponentDecorator extends TypeDecorator {


    /**
     * Chain {@link View} annotation.
     */
     View(obj: {
    templateUrl?: string,
    template?: string,
    directives?: List<Type | any | List<any>>,
    renderer?: string,
    styles?: List<string>,
    styleUrls?: List<string>,
  }): ViewDecorator;
  }


  /**
   * {@link ComponentAnnotation} factory for creating annotations, decorators or DSL.
   *
   * ## Example as TypeScript Decorator
   *
   * ```
   * import {Component, View} from "angular2/angular2";
   *
   * @Component({...})
   * @View({...})
   * class MyComponent {
   *   constructor() {
   *     ...
   *   }
   * }
   * ```
   *
   * ## Example as ES5 DSL
   *
   * ```
   * var MyComponent = ng
   *   .Component({...})
   *   .View({...})
   *   .Class({
   *     constructor: function() {
   *       ...
   *     }
   *   })
   * ```
   *
   * ## Example as ES5 annotation
   *
   * ```
   * var MyComponent = function() {
   *   ...
   * };
   *
   * MyComponent.annotations = [
   *   new ng.Component({...})
   *   new ng.View({...})
   * ]
   * ```
   */
  interface ComponentFactory {

     new(obj: {
    selector?: string,
    properties?: List<string>,
    events?: List<string>,
    host?: StringMap<string, string>,
    lifecycle?: List<LifecycleEvent>,
    hostInjector?: List<any>,
    exportAs?: string,
    compileChildren?: boolean,
    viewInjector?: List<any>,
    changeDetection?: string,
  }): ComponentAnnotation;


     (obj: {
    selector?: string,
    properties?: List<string>,
    events?: List<string>,
    host?: StringMap<string, string>,
    lifecycle?: List<LifecycleEvent>,
    hostInjector?: List<any>,
    exportAs?: string,
    compileChildren?: boolean,
    viewInjector?: List<any>,
    changeDetection?: string,
  }): ComponentDecorator;

  }


  /**
   * {@link Directive} factory function.
   */
  var Directive : DirectiveFactory ;


  /**
   * Interface for the {@link Directive} decorator function.
   *
   * See {@link DirectiveFactory}.
   */
  interface DirectiveDecorator extends TypeDecorator {
  }


  /**
   * {@link Directive} factory for creating annotations, decorators or DSL.
   *
   * ## Example as TypeScript Decorator
   *
   * ```
   * import {Directive} from "angular2/angular2";
   *
   * @Directive({...})
   * class MyDirective {
   *   constructor() {
   *     ...
   *   }
   * }
   * ```
   *
   * ## Example as ES5 DSL
   *
   * ```
   * var MyDirective = ng
   *   .Directive({...})
   *   .Class({
   *     constructor: function() {
   *       ...
   *     }
   *   })
   * ```
   *
   * ## Example as ES5 annotation
   *
   * ```
   * var MyDirective = function() {
   *   ...
   * };
   *
   * MyDirective.annotations = [
   *   new ng.Directive({...})
   * ]
   * ```
   */
  interface DirectiveFactory {

     new(obj: {
    selector?: string, properties?: List<string>, events?: List<string>,
        host?: StringMap<string, string>, lifecycle?: List<LifecycleEvent>,
        hostInjector?: List<any>, exportAs?: string, compileChildren?: boolean;
  }): DirectiveAnnotation;


     (obj: {
    selector?: string, properties?: List<string>, events?: List<string>,
        host?: StringMap<string, string>, lifecycle?: List<LifecycleEvent>,
        hostInjector?: List<any>, exportAs?: string, compileChildren?: boolean;
  }): DirectiveDecorator;

  }


  /**
   * {@link View} factory function.
   */
  var View : ViewFactory ;


  /**
   * Interface for the {@link View} decorator function.
   *
   * See {@link ViewFactory}.
   */
  interface ViewDecorator extends TypeDecorator {


    /**
     * Chain {@link View} annotation.
     */
     View(obj: {
    templateUrl?: string,
    template?: string,
    directives?: List<Type | any | List<any>>,
    renderer?: string,
    styles?: List<string>,
    styleUrls?: List<string>,
  }): ViewDecorator;
  }


  /**
   * {@link ViewAnnotation} factory for creating annotations, decorators or DSL.
   *
   * ## Example as TypeScript Decorator
   *
   * ```
   * import {Component, View} from "angular2/angular2";
   *
   * @Component({...})
   * @View({...})
   * class MyComponent {
   *   constructor() {
   *     ...
   *   }
   * }
   * ```
   *
   * ## Example as ES5 DSL
   *
   * ```
   * var MyComponent = ng
   *   .Component({...})
   *   .View({...})
   *   .Class({
   *     constructor: function() {
   *       ...
   *     }
   *   })
   * ```
   *
   * ## Example as ES5 annotation
   *
   * ```
   * var MyComponent = function() {
   *   ...
   * };
   *
   * MyComponent.annotations = [
   *   new ng.Component({...})
   *   new ng.View({...})
   * ]
   * ```
   */
  interface ViewFactory {

     new(obj: {
    templateUrl?: string,
    template?: string,
    directives?: List<Type | any | List<any>>,
    renderer?: string,
    styles?: List<string>,
    styleUrls?: List<string>,
  }): ViewAnnotation;


     (obj: {
    templateUrl?: string,
    template?: string,
    directives?: List<Type | any | List<any>>,
    renderer?: string,
    styles?: List<string>,
    styleUrls?: List<string>,
  }): ViewDecorator;

  }


  /**
   * {@link Query} factory function.
   */
  var Query : QueryFactory ;


  /**
   * {@link Query} factory for creating annotations, decorators or DSL.
   *
   * ## Example as TypeScript Decorator
   *
   * ```
   * import {Query, QueryList, Component, View} from "angular2/angular2";
   *
   * @Component({...})
   * @View({...})
   * class MyComponent {
   *   constructor(@Query(SomeType) queryList: QueryList) {
   *     ...
   *   }
   * }
   * ```
   *
   * ## Example as ES5 DSL
   *
   * ```
   * var MyComponent = ng
   *   .Component({...})
   *   .View({...})
   *   .Class({
   *     constructor: [new ng.Query(SomeType), function(queryList) {
   *       ...
   *     }]
   *   })
   * ```
   *
   * ## Example as ES5 annotation
   *
   * ```
   * var MyComponent = function(queryList) {
   *   ...
   * };
   *
   * MyComponent.annotations = [
   *   new ng.Component({...})
   *   new ng.View({...})
   * ]
   * MyComponent.parameters = [
   *   [new ng.Query(SomeType)]
   * ]
   * ```
   */
  interface QueryFactory {

     new(selector: Type | string, {descendants}?: {descendants?: boolean}): QueryAnnotation;


     (selector: Type | string, {descendants}?: {descendants?: boolean}): ParameterDecorator;

  }


  /**
   * {@link ViewQuery} factory function.
   */
  var ViewQuery : QueryFactory ;


  /**
   * An opaque token representing the application root type in the {@link Injector}.
   *
   * ```
   * @Component(...)
   * @View(...)
   * class MyApp {
   *   ...
   * }
   *
   * bootstrap(MyApp).then((appRef:ApplicationRef) {
   *   expect(appRef.injector.get(appComponentTypeToken)).toEqual(MyApp);
   * });
   *
   * ```
   */
  const appComponentTypeToken : OpaqueToken ;


  /**
   * Represents a Angular's representation of an Application.
   *
   * `ApplicationRef` represents a running application instance. Use it to retrieve the host
   * component, injector,
   * or dispose of an application.
   */
  interface ApplicationRef {


    /**
     * Returns the current {@link Component} type.
     */
     hostComponentType: Type;


    /**
     * Returns the current {@link Component} instance.
     */
     hostComponent: any;


    /**
     * Dispose (un-load) the application.
     */
     dispose(): void;


    /**
     * Returns the root application {@link Injector}.
     */
     injector: Injector;
  }


  /**
   * Specifies app root url for the application.
   *
   * Used by the {@link Compiler} when resolving HTML and CSS template URLs.
   *
   * This interface can be overridden by the application developer to create custom behavior.
   *
   * See {@link Compiler}
   */
  class AppRootUrl {


    /**
     * Returns the base URL of the currently running application.
     */
     value: void;
  }


  /**
   * Used by the {@link Compiler} when resolving HTML and CSS template URLs.
   *
   * This interface can be overridden by the application developer to create custom behavior.
   *
   * See {@link Compiler}
   */
  class UrlResolver {


    /**
     * Resolves the `url` given the `baseUrl`:
     * - when the `url` is null, the `baseUrl` is returned,
     * - if `url` is relative ('path/to/here', './path/to/here'), the resolved url is a combination of
     * `baseUrl` and `url`,
     * - if `url` is absolute (it has a scheme: 'http://', 'https://' or start with '/'), the `url` is
     * returned as is (ignoring the `baseUrl`)
     *
     * @param {string} baseUrl
     * @param {string} url
     * @returns {string} the resolved URL
     */
     resolve(baseUrl: string, url: string): string;
  }


  /**
   * Resolve a `Type` from a {@link Component} into a URL.
   *
   * This interface can be overridden by the application developer to create custom behavior.
   *
   * See {@link Compiler}
   */
  class ComponentUrlMapper {


    /**
     * Returns the base URL to the component source file.
     * The returned URL could be:
     * - an absolute URL,
     * - a path relative to the application
     */
     getUrl(component: Type): string;
  }


  /**
   * Resolve a `Type` for {@link Directive}.
   *
   * This interface can be overridden by the application developer to create custom behavior.
   *
   * See {@link Compiler}
   */
  class DirectiveResolver {


    /**
     * Return {@link Directive} for a given `Type`.
     */
     resolve(type: Type): DirectiveAnnotation;
  }


  /**
   * ## URL Resolution
   *
   * ```
   * var appRootUrl: AppRootUrl = ...;
   * var componentUrlMapper: ComponentUrlMapper = ...;
   * var urlResolver: UrlResolver = ...;
   *
   * var componentType: Type = ...;
   * var componentAnnotation: ComponentAnnotation = ...;
   * var viewAnnotation: ViewAnnotation = ...;
   *
   * // Resolving a URL
   *
   * var url = viewAnnotation.templateUrl;
   * var componentUrl = componentUrlMapper.getUrl(componentType);
   * var componentResolvedUrl = urlResolver.resolve(appRootUrl.value, componentUrl);
   * var templateResolvedUrl = urlResolver.resolve(componetResolvedUrl, url);
   * ```
   */
  interface Compiler {

     compileInHost(componentTypeOrBinding: Type | Binding): Promise<ProtoViewRef>;
  }


  /**
   * Entry point for creating, moving views in the view hierarchy and destroying views.
   * This manager contains all recursion and delegates to helper methods
   * in AppViewManagerUtils and the Renderer, so unit tests get simpler.
   */
  interface AppViewManager {


    /**
     * Returns a {@link ViewContainerRef} at the {@link ElementRef} location.
     */
     getViewContainer(location: ElementRef): ViewContainerRef;


    /**
     * Return the first child element of the host element view.
     */
     getHostElement(hostViewRef: ViewRef): ElementRef;


    /**
     * Returns an ElementRef for the element with the given variable name
     * in the current view.
     *
     * - `hostLocation`: {@link ElementRef} of any element in the View which defines the scope of
     *   search.
     * - `variableName`: Name of the variable to locate.
     * - Returns {@link ElementRef} of the found element or null. (Throws if not found.)
     */
     getNamedElementInComponentView(hostLocation: ElementRef, variableName: string): ElementRef;


    /**
     * Returns the component instance for a given element.
     *
     * The component is the execution context as seen by an expression at that {@link ElementRef}
     * location.
     */
     getComponent(hostLocation: ElementRef): any;


    /**
     * Load component view into existing element.
     *
     * Use this if a host element is already in the DOM and it is necessary to upgrade
     * the element into Angular component by attaching a view but reusing the existing element.
     *
     * - `hostProtoViewRef`: {@link ProtoViewRef} Proto view to use in creating a view for this
     *   component.
     * - `overrideSelector`: (optional) selector to use in locating the existing element to load
     *   the view into. If not specified use the selector in the component definition of the
     *   `hostProtoView`.
     * - injector: {@link Injector} to use as parent injector for the view.
     *
     * See {@link AppViewManager#destroyRootHostView}.
     *
     * ## Example
     *
     * ```
     * @ng.Component({
     *   selector: 'child-component'
     * })
     * @ng.View({
     *   template: 'Child'
     * })
     * class ChildComponent {
     *
     * }
     *
     * @ng.Component({
     *   selector: 'my-app'
     * })
     * @ng.View({
     *   template: `
     *     Parent (<some-component></some-component>)
     *   `
     * })
     * class MyApp {
     *   viewRef: ng.ViewRef;
     *
     *   constructor(public appViewManager: ng.AppViewManager, compiler: ng.Compiler) {
     *     compiler.compileInHost(ChildComponent).then((protoView: ng.ProtoViewRef) => {
     *       this.viewRef = appViewManager.createRootHostView(protoView, 'some-component', null);
     *     })
     *   }
     *
     *   onDestroy() {
     *     this.appViewManager.destroyRootHostView(this.viewRef);
     *     this.viewRef = null;
     *   }
     * }
     *
     * ng.bootstrap(MyApp);
     * ```
     */
     createRootHostView(hostProtoViewRef: ProtoViewRef, overrideSelector: string, injector: Injector): ViewRef;


    /**
     * Remove the View created with {@link AppViewManager#createRootHostView}.
     */
     destroyRootHostView(hostViewRef: ViewRef): void;


    /**
     * See {@link AppViewManager#destroyViewInContainer}.
     */
     createEmbeddedViewInContainer(viewContainerLocation: ElementRef, atIndex: number, templateRef: TemplateRef): ViewRef;


    /**
     * See {@link AppViewManager#destroyViewInContainer}.
     */
     createHostViewInContainer(viewContainerLocation: ElementRef, atIndex: number, protoViewRef: ProtoViewRef, imperativelyCreatedInjector: ResolvedBinding[]): ViewRef;


    /**
     * See {@link AppViewManager#createViewInContainer}.
     */
     destroyViewInContainer(viewContainerLocation: ElementRef, atIndex: number): void;


    /**
     * See {@link AppViewManager#detachViewInContainer}.
     */
     attachViewInContainer(viewContainerLocation: ElementRef, atIndex: number, viewRef: ViewRef): ViewRef;


    /**
     * See {@link AppViewManager#attachViewInContainer}.
     */
     detachViewInContainer(viewContainerLocation: ElementRef, atIndex: number): ViewRef;
  }


  /**
   * An iterable live list of components in the Light DOM.
   *
   * Injectable Objects that contains a live list of child directives in the light DOM of a directive.
   * The directives are kept in depth-first pre-order traversal of the DOM.
   *
   * The `QueryList` is iterable, therefore it can be used in both javascript code with `for..of` loop
   * as well as in
   * template with `*ng-for="of"` directive.
   *
   * NOTE: In the future this class will implement an `Observable` interface. For now it uses a plain
   * list of observable
   * callbacks.
   *
   * # Example:
   *
   * Assume that `<tabs>` component would like to get a list its children which are `<pane>`
   * components as shown in this
   * example:
   *
   * ```html
   * <tabs>
   *   <pane title="Overview">...</pane>
   *   <pane *ng-for="#o of objects" [title]="o.title">{{o.text}}</pane>
   * </tabs>
   * ```
   *
   * In the above example the list of `<tabs>` elements needs to get a list of `<pane>` elements so
   * that it could render
   * tabs with the correct titles and in the correct order.
   *
   * A possible solution would be for a `<pane>` to inject `<tabs>` component and then register itself
   * with `<tabs>`
   * component's on `hydrate` and deregister on `dehydrate` event. While a reasonable approach, this
   * would only work
   * partialy since `*ng-for` could rearrange the list of `<pane>` components which would not be
   * reported to `<tabs>`
   * component and thus the list of `<pane>` components would be out of sync with respect to the list
   * of `<pane>` elements.
   *
   * A preferred solution is to inject a `QueryList` which is a live list of directives in the
   * component`s light DOM.
   *
   * ```javascript
   * @Component({
   *   selector: 'tabs'
   * })
   * @View({
   *  template: `
   *    <ul>
   *      <li *ng-for="#pane of panes">{{pane.title}}</li>
   *    </ul>
   *    <content></content>
   *  `
   * })
   * class Tabs {
   *   panes: QueryList<Pane>
   *
   *   constructor(@Query(Pane) panes:QueryList<Pane>) {
   *     this.panes = panes;
   *   }
   * }
   *
   * @Component({
   *   selector: 'pane',
   *   properties: ['title']
   * })
   * @View(...)
   * class Pane {
   *   title:string;
   * }
   * ```
   */
  interface IQueryList<T> {
  }


  /**
   * Injectable Objects that contains a live list of child directives in the light Dom of a directive.
   * The directives are kept in depth-first pre-order traversal of the DOM.
   *
   * In the future this class will implement an Observable interface.
   * For now it uses a plain list of observable callbacks.
   */
  class QueryList<T> implements IQueryList<T> {

     reset(newList: List<T>): void;

     add(obj: T): void;

     fireCallbacks(): void;

     onChange(callback: () => void): void;

     removeCallback(callback: () => void): void;

     length: number;

     first: T;

     last: T;

     map<U>(fn: (item: T) => U): U[];
  }


  /**
   * Reference to the element.
   *
   * Represents an opaque reference to the underlying element. The element is a DOM ELement in
   * a Browser, but may represent other types on other rendering platforms. In the browser the
   * `ElementRef` can be sent to the web-worker. Web Workers can not have references to the
   * DOM Elements.
   */
  class ElementRef implements RenderElementRef {


    /**
     * Reference to the {@link ViewRef} where the `ElementRef` is inside of.
     */
     parentView: ViewRef;


    /**
     * Index of the element inside the {@link ViewRef}.
     *
     * This is used internally by the Angular framework to locate elements.
     */
     boundElementIndex: number;


    /**
     * Index of the element inside the `RenderViewRef`.
     *
     * This is used internally by the Angular framework to locate elements.
     */
     renderBoundElementIndex: number;

     renderView: RenderViewRef;


    /**
     * Returns the native Element implementation.
     *
     * In the browser this represents the DOM Element.
     *
     * The `nativeElement` can be used as an escape hatch when direct DOM manipulation is needed. Use
     * this with caution, as it creates tight coupling between your application and the Browser, which
     * will not work in WebWorkers.
     *
     * NOTE: This method will return null in the webworker scenario!
     */
     nativeElement: any;
  }


  /**
   * Reference to a template within a component.
   *
   * Represents an opaque reference to the underlying template that can
   * be instantiated using the {@link ViewContainerRef}.
   */
  class TemplateRef {


    /**
     * The location of the template
     */
     elementRef: ElementRef;

     protoViewRef: ProtoViewRef;


    /**
     * Whether this template has a local variable with the given name
     */
     hasLocal(name: string): boolean;
  }


  /**
   * A reference to an Angular View.
   *
   * A View is a fundamental building block of Application UI. A View is the smallest set of
   * elements which are created and destroyed together. A View can change properties on the elements
   * within the view, but it can not change the structure of those elements.
   *
   * To change structure of the elements, the Views can contain zero or more {@link ViewContainerRef}s
   * which allow the views to be nested.
   *
   * ## Example
   *
   * Given this template
   *
   * ```
   * Count: {{items.length}}
   * <ul>
   *   <li *ng-for="var item of items">{{item}}</li>
   * </ul>
   * ```
   *
   * The above example we have two {@link ProtoViewRef}s:
   *
   * Outter {@link ProtoViewRef}:
   * ```
   * Count: {{items.length}}
   * <ul>
   *   <template ng-for var-item [ng-for-of]="items"></template>
   * </ul>
   * ```
   *
   * Inner {@link ProtoViewRef}:
   * ```
   *   <li>{{item}}</li>
   * ```
   *
   * Notice that the original template is broken down into two separate {@link ProtoViewRef}s.
   *
   * The outter/inner {@link ProtoViewRef}s are then assembled into views like so:
   *
   * ```
   * <!-- ViewRef: outter-0 -->
   * Count: 2
   * <ul>
   *   <template view-container-ref></template>
   *   <!-- ViewRef: inner-1 --><li>first</li><!-- /ViewRef: inner-1 -->
   *   <!-- ViewRef: inner-2 --><li>second</li><!-- /ViewRef: inner-2 -->
   * </ul>
   * <!-- /ViewRef: outter-0 -->
   * ```
   */
  class ViewRef {


    /**
     * Return `RenderViewRef`
     */
     render: RenderViewRef;


    /**
     * Return `RenderFragmentRef`
     */
     renderFragment: RenderFragmentRef;


    /**
     * Set local variable for a view.
     */
     setLocal(contextName: string, value: any): void;
  }


  /**
   * A reference to an Angular ProtoView.
   *
   * A ProtoView is a reference to a template for easy creation of views.
   * (See {@link AppViewManager#createViewInContainer} and {@link AppViewManager#createRootHostView}).
   *
   * A `ProtoView` is a foctary for creating `View`s.
   *
   * ## Example
   *
   * Given this template
   *
   * ```
   * Count: {{items.length}}
   * <ul>
   *   <li *ng-for="var item of items">{{item}}</li>
   * </ul>
   * ```
   *
   * The above example we have two {@link ProtoViewRef}s:
   *
   * Outter {@link ProtoViewRef}:
   * ```
   * Count: {{items.length}}
   * <ul>
   *   <template ng-for var-item [ng-for-of]="items"></template>
   * </ul>
   * ```
   *
   * Inner {@link ProtoViewRef}:
   * ```
   *   <li>{{item}}</li>
   * ```
   *
   * Notice that the original template is broken down into two separate {@link ProtoViewRef}s.
   */
  interface ProtoViewRef {
  }

  class ViewContainerRef {

     viewManager: AppViewManager;

     element: ElementRef;

     clear(): void;

     get(index: number): ViewRef;

     length: number;

     createEmbeddedView(templateRef: TemplateRef, atIndex?: number): ViewRef;

     createHostView(protoViewRef?: ProtoViewRef, atIndex?: number, dynamicallyCreatedBindings?: ResolvedBinding[]): ViewRef;

     insert(viewRef: ViewRef, atIndex?: number): ViewRef;

     indexOf(viewRef: ViewRef): number;

     remove(atIndex?: number): void;


    /**
     * The method can be used together with insert to implement a view move, i.e.
     * moving the dom nodes while the directives in the view stay intact.
     */
     detach(atIndex?: number): ViewRef;
  }


  /**
   * Service for dynamically loading a Component into an arbitrary position in the internal Angular
   * application tree.
   */
  class DynamicComponentLoader {


    /**
     * Loads a root component that is placed at the first element that matches the component's
     * selector.
     *
     * The loaded component receives injection normally as a hosted view.
     */
     loadAsRoot(typeOrBinding: Type | Binding, overrideSelector: string, injector: Injector): Promise<ComponentRef>;


    /**
     * Loads a component into the component view of the provided ElementRef
     * next to the element with the given name
     * The loaded component receives
     * injection normally as a hosted view.
     */
     loadIntoLocation(typeOrBinding: Type | Binding, hostLocation: ElementRef, anchorName: string, bindings?: ResolvedBinding[]): Promise<ComponentRef>;


    /**
     * Loads a component next to the provided ElementRef. The loaded component receives
     * injection normally as a hosted view.
     */
     loadNextToLocation(typeOrBinding: Type | Binding, location: ElementRef, bindings?: ResolvedBinding[]): Promise<ComponentRef>;
  }

  class ComponentRef {

     location: ElementRef;

     instance: any;

     dispose: Function;

     hostView: ViewRef;
  }


  /**
   * A wrapper around zones that lets you schedule tasks after it has executed a task.
   *
   * The wrapper maintains an "inner" and an "mount" `Zone`. The application code will executes
   * in the "inner" zone unless `runOutsideAngular` is explicitely called.
   *
   * A typical application will create a singleton `NgZone`. The outer `Zone` is a fork of the root
   * `Zone`. The default `onTurnDone` runs the Angular change detection.
   */
  class NgZone {


    /**
     * Sets the zone hook that is called just before Angular event turn starts.
     * It is called once per browser event.
     */
     overrideOnTurnStart(onTurnStartFn: Function): void;


    /**
     * Sets the zone hook that is called immediately after Angular processes
     * all pending microtasks.
     */
     overrideOnTurnDone(onTurnDoneFn: Function): void;


    /**
     * Sets the zone hook that is called immediately after the last turn in
     * an event completes. At this point Angular will no longer attempt to
     * sync the UI. Any changes to the data model will not be reflected in the
     * DOM. `onEventDoneFn` is executed outside Angular zone.
     *
     * This hook is useful for validating application state (e.g. in a test).
     */
     overrideOnEventDone(onEventDoneFn: Function): void;


    /**
     * Sets the zone hook that is called when an error is uncaught in the
     * Angular zone. The first argument is the error. The second argument is
     * the stack trace.
     */
     overrideOnErrorHandler(errorHandlingFn: Function): void;


    /**
     * Runs `fn` in the inner zone and returns whatever it returns.
     *
     * In a typical app where the inner zone is the Angular zone, this allows one to make use of the
     * Angular's auto digest mechanism.
     *
     * ```
     * var zone: NgZone = [ref to the application zone];
     *
     * zone.run(() => {
     *   // the change detection will run after this function and the microtasks it enqueues have
     * executed.
     * });
     * ```
     */
     run(fn: () => any): any;


    /**
     * Runs `fn` in the outer zone and returns whatever it returns.
     *
     * In a typical app where the inner zone is the Angular zone, this allows one to escape Angular's
     * auto-digest mechanism.
     *
     * ```
     * var zone: NgZone = [ref to the application zone];
     *
     * zone.runOusideAngular(() => {
     *   element.onClick(() => {
     *     // Clicking on the element would not trigger the change detection
     *   });
     * });
     * ```
     */
     runOutsideAngular(fn: () => any): any;
  }

  class Observable {

     observer(generator: any): Object;
  }


  /**
   * Use Rx.Observable but provides an adapter to make it work as specified here:
   * https://github.com/jhusain/observable-spec
   *
   * Once a reference implementation of the spec is available, switch to it.
   */
  class EventEmitter extends Observable {

     observer(generator: any): Rx.IDisposable;

     toRx(): Rx.Observable<any>;

     next(value: any): void;

     throw(error: any): void;

     return(value?: any): void;
  }


  /**
   * A parameter metadata that specifies a dependency.
   *
   * ```
   * class AComponent {
   *   constructor(@Inject(MyService) aService:MyService) {}
   * }
   * ```
   */
  class InjectMetadata {

     token: void;

     toString(): string;
  }


  /**
   * A parameter metadata that marks a dependency as optional. {@link Injector} provides `null` if
   * the dependency is not found.
   *
   * ```
   * class AComponent {
   *   constructor(@Optional() aService:MyService) {
   *     this.aService = aService;
   *   }
   * }
   * ```
   */
  class OptionalMetadata {

     toString(): string;
  }


  /**
   * A marker metadata that marks a class as available to `Injector` for creation. Used by tooling
   * for generating constructor stubs.
   *
   * ```
   * class NeedsService {
   *   constructor(svc:UsefulService) {}
   * }
   *
   * @Injectable
   * class UsefulService {}
   * ```
   */
  class InjectableMetadata {
  }


  /**
   * Specifies how injector should resolve a dependency.
   *
   * See {@link Self}, {@link Ancestor}, {@link Unbounded}.
   */
  class VisibilityMetadata {

     crossBoundaries: boolean;

     includeSelf: boolean;

     toString(): string;
  }


  /**
   * Specifies that an injector should retrieve a dependency from itself.
   *
   * ## Example
   *
   * ```
   * class Dependency {
   * }
   *
   * class NeedsDependency {
   *   constructor(public @Self() dependency:Dependency) {}
   * }
   *
   * var inj = Injector.resolveAndCreate([Dependency, NeedsDependency]);
   * var nd = inj.get(NeedsDependency);
   * expect(nd.dependency).toBeAnInstanceOf(Dependency);
   * ```
   */
  class SelfMetadata extends VisibilityMetadata {

     toString(): string;
  }


  /**
   * Specifies that an injector should retrieve a dependency from any ancestor from the same boundary.
   *
   * ## Example
   *
   * ```
   * class Dependency {
   * }
   *
   * class NeedsDependency {
   *   constructor(public @Ancestor() dependency:Dependency) {}
   * }
   *
   * var parent = Injector.resolveAndCreate([
   *   bind(Dependency).toClass(AncestorDependency)
   * ]);
   * var child = parent.resolveAndCreateChild([]);
   * var grandChild = child.resolveAndCreateChild([NeedsDependency, Depedency]);
   * var nd = grandChild.get(NeedsDependency);
   * expect(nd.dependency).toBeAnInstanceOf(AncestorDependency);
   * ```
   *
   * You can make an injector to retrive a dependency either from itself or its ancestor by setting
   * self to true.
   *
   * ```
   * class NeedsDependency {
   *   constructor(public @Ancestor({self:true}) dependency:Dependency) {}
   * }
   * ```
   */
  class AncestorMetadata extends VisibilityMetadata {

     toString(): string;
  }


  /**
   * Specifies that an injector should retrieve a dependency from any ancestor, crossing boundaries.
   *
   * ## Example
   *
   * ```
   * class Dependency {
   * }
   *
   * class NeedsDependency {
   *   constructor(public @Ancestor() dependency:Dependency) {}
   * }
   *
   * var parent = Injector.resolveAndCreate([
   *   bind(Dependency).toClass(AncestorDependency)
   * ]);
   * var child = parent.resolveAndCreateChild([]);
   * var grandChild = child.resolveAndCreateChild([NeedsDependency, Depedency]);
   * var nd = grandChild.get(NeedsDependency);
   * expect(nd.dependency).toBeAnInstanceOf(AncestorDependency);
   * ```
   *
   * You can make an injector to retrive a dependency either from itself or its ancestor by setting
   * self to true.
   *
   * ```
   * class NeedsDependency {
   *   constructor(public @Ancestor({self:true}) dependency:Dependency) {}
   * }
   * ```
   */
  class UnboundedMetadata extends VisibilityMetadata {

     toString(): string;
  }


  /**
   * `DependencyMetadata is used by the framework to extend DI.
   *
   * Only metadata implementing `DependencyMetadata` are added to the list of dependency
   * properties.
   *
   * For example:
   *
   * ```
   * class Exclude extends DependencyMetadata {}
   * class NotDependencyProperty {}
   *
   * class AComponent {
   *   constructor(@Exclude @NotDependencyProperty aService:AService) {}
   * }
   * ```
   *
   * will create the following dependency:
   *
   * ```
   * new Dependency(Key.get(AService), [new Exclude()])
   * ```
   *
   * The framework can use `new Exclude()` to handle the `aService` dependency
   * in a specific way.
   */
  class DependencyMetadata {

     token: void;
  }

  const DEFAULT_VISIBILITY : VisibilityMetadata ;


  /**
   * Allows to refer to references which are not yet defined.
   *
   * This situation arises when the key which we need te refer to for the purposes of DI is declared,
   * but not yet defined.
   *
   * ## Example:
   *
   * ```
   * class Door {
   *   // Incorrect way to refer to a reference which is defined later.
   *   // This fails because `Lock` is undefined at this point.
   *   constructor(lock:Lock) { }
   *
   *   // Correct way to refer to a reference which is defined later.
   *   // The reference needs to be captured in a closure.
   *   constructor(@Inject(forwardRef(() => Lock)) lock:Lock) { }
   * }
   *
   * // Only at this point the lock is defined.
   * class Lock {
   * }
   * ```
   */
  function forwardRef(forwardRefFn: ForwardRefFn) : Type ;


  /**
   * Lazily retrieve the reference value.
   *
   * See: {@link forwardRef}
   */
  function resolveForwardRef(type: any) : any ;

  interface ForwardRefFn {

     (): any;

  }


  /**
   * A dependency injection container used for resolving dependencies.
   *
   * An `Injector` is a replacement for a `new` operator, which can automatically resolve the
   * constructor dependencies.
   * In typical use, application code asks for the dependencies in the constructor and they are
   * resolved by the `Injector`.
   *
   * ## Example:
   *
   * Suppose that we want to inject an `Engine` into class `Car`, we would define it like this:
   *
   * ```javascript
   * class Engine {
   * }
   *
   * class Car {
   *   constructor(@Inject(Engine) engine) {
   *   }
   * }
   *
   * ```
   *
   * Next we need to write the code that creates and instantiates the `Injector`. We then ask for the
   * `root` object, `Car`, so that the `Injector` can recursively build all of that object's
   * dependencies.
   *
   * ```javascript
   * main() {
   *   var injector = Injector.resolveAndCreate([Car, Engine]);
   *
   *   // Get a reference to the `root` object, which will recursively instantiate the tree.
   *   var car = injector.get(Car);
   * }
   * ```
   * Notice that we don't use the `new` operator because we explicitly want to have the `Injector`
   * resolve all of the object's dependencies automatically.
   */
  class Injector {


    /**
     * Returns debug information about the injector.
     *
     * This information is included into exceptions thrown by the injector.
     */
     debugContext(): any;


    /**
     * Retrieves an instance from the injector.
     *
     * @param `token`: usually the `Type` of an object. (Same as the token used while setting up a
     * binding).
     * @returns an instance represented by the token. Throws if not found.
     */
     get(token: any): any;


    /**
     * Retrieves an instance from the injector.
     *
     * @param `token`: usually a `Type`. (Same as the token used while setting up a binding).
     * @returns an instance represented by the token. Returns `null` if not found.
     */
     getOptional(token: any): any;


    /**
     * Retrieves an instance from the injector.
     *
     * @param `index`: index of an instance.
     * @returns an instance represented by the index. Throws if not found.
     */
     getAt(index: number): any;


    /**
     * Direct parent of this injector.
     */
     parent: Injector;


    /**
     * Internal. Do not use.
     *
     * We return `any` not to export the InjectorStrategy type.
     */
     internalStrategy: any;


    /**
     * Creates a child injector and loads a new set of bindings into it.
     *
     * A resolution is a process of flattening multiple nested lists and converting individual
     * bindings into a list of {@link ResolvedBinding}s. The resolution can be cached by `resolve`
     * for the {@link Injector} for performance-sensitive code.
     *
     * @param `bindings` can be a list of `Type`, {@link Binding}, {@link ResolvedBinding}, or a
     * recursive list of more bindings.
     * @param `depProvider`
     */
     resolveAndCreateChild(bindings: List<Type | Binding | List<any>>, depProvider?: DependencyProvider): Injector;


    /**
     * Creates a child injector and loads a new set of {@link ResolvedBinding}s into it.
     *
     * @param `bindings`: A sparse list of {@link ResolvedBinding}s.
     * See `resolve` for the {@link Injector}.
     * @param `depProvider`
     * @returns a new child {@link Injector}.
     */
     createChildFromResolved(bindings: List<ResolvedBinding>, depProvider?: DependencyProvider): Injector;

     displayName: string;

     toString(): string;
  }

  class ProtoInjector {

     numberOfBindings: number;

     getBindingAtIndex(index: number): any;
  }

  class BindingWithVisibility {

     binding: ResolvedBinding;

     visibility: number;

     getKeyId(): number;
  }


  /**
   * Used to provide dependencies that cannot be easily expressed as bindings.
   */
  interface DependencyProvider {

     getDependency(injector: Injector, binding: ResolvedBinding, dependency: Dependency): any;
  }

  const PUBLIC_AND_PRIVATE : number ;

  const PUBLIC : number ;

  const PRIVATE : number ;

  const undefinedValue : Object ;


  /**
   * Describes how the {@link Injector} should instantiate a given token.
   *
   * See {@link bind}.
   *
   * ## Example
   *
   * ```javascript
   * var injector = Injector.resolveAndCreate([
   *   new Binding(String, { toValue: 'Hello' })
   * ]);
   *
   * expect(injector.get(String)).toEqual('Hello');
   * ```
   */
  class Binding {


    /**
     * Token used when retrieving this binding. Usually the `Type`.
     */
     token: void;


    /**
     * Binds an interface to an implementation / subclass.
     *
     * ## Example
     *
     * Becuse `toAlias` and `toClass` are often confused, the example contains both use cases for easy
     * comparison.
     *
     * ```javascript
     *
     * class Vehicle {}
     *
     * class Car extends Vehicle {}
     *
     * var injectorClass = Injector.resolveAndCreate([
     *   Car,
     *   new Binding(Vehicle, { toClass: Car })
     * ]);
     * var injectorAlias = Injector.resolveAndCreate([
     *   Car,
     *   new Binding(Vehicle, { toAlias: Car })
     * ]);
     *
     * expect(injectorClass.get(Vehicle)).not.toBe(injectorClass.get(Car));
     * expect(injectorClass.get(Vehicle) instanceof Car).toBe(true);
     *
     * expect(injectorAlias.get(Vehicle)).toBe(injectorAlias.get(Car));
     * expect(injectorAlias.get(Vehicle) instanceof Car).toBe(true);
     * ```
     */
     toClass: Type;


    /**
     * Binds a key to a value.
     *
     * ## Example
     *
     * ```javascript
     * var injector = Injector.resolveAndCreate([
     *   new Binding(String, { toValue: 'Hello' })
     * ]);
     *
     * expect(injector.get(String)).toEqual('Hello');
     * ```
     */
     toValue: void;


    /**
     * Binds a key to the alias for an existing key.
     *
     * An alias means that {@link Injector} returns the same instance as if the alias token was used.
     * This is in contrast to `toClass` where a separate instance of `toClass` is returned.
     *
     * ## Example
     *
     * Becuse `toAlias` and `toClass` are often confused the example contains both use cases for easy
     * comparison.
     *
     * ```javascript
     *
     * class Vehicle {}
     *
     * class Car extends Vehicle {}
     *
     * var injectorAlias = Injector.resolveAndCreate([
     *   Car,
     *   new Binding(Vehicle, { toAlias: Car })
     * ]);
     * var injectorClass = Injector.resolveAndCreate([
     *   Car,
     *   new Binding(Vehicle, { toClass: Car })
     * ]);
     *
     * expect(injectorAlias.get(Vehicle)).toBe(injectorAlias.get(Car));
     * expect(injectorAlias.get(Vehicle) instanceof Car).toBe(true);
     *
     * expect(injectorClass.get(Vehicle)).not.toBe(injectorClass.get(Car));
     * expect(injectorClass.get(Vehicle) instanceof Car).toBe(true);
     * ```
     */
     toAlias: void;


    /**
     * Binds a key to a function which computes the value.
     *
     * ## Example
     *
     * ```javascript
     * var injector = Injector.resolveAndCreate([
     *   new Binding(Number, { toFactory: () => { return 1+2; }}),
     *   new Binding(String, { toFactory: (value) => { return "Value: " + value; },
     *                         dependencies: [Number] })
     * ]);
     *
     * expect(injector.get(Number)).toEqual(3);
     * expect(injector.get(String)).toEqual('Value: 3');
     * ```
     */
     toFactory: Function;


    /**
     * Used in conjunction with `toFactory` and specifies a set of dependencies
     * (as `token`s) which should be injected into the factory function.
     *
     * ## Example
     *
     * ```javascript
     * var injector = Injector.resolveAndCreate([
     *   new Binding(Number, { toFactory: () => { return 1+2; }}),
     *   new Binding(String, { toFactory: (value) => { return "Value: " + value; },
     *                         dependencies: [Number] })
     * ]);
     *
     * expect(injector.get(Number)).toEqual(3);
     * expect(injector.get(String)).toEqual('Value: 3');
     * ```
     */
     dependencies: List<any>;


    /**
     * Converts the {@link Binding} into {@link ResolvedBinding}.
     *
     * {@link Injector} internally only uses {@link ResolvedBinding}, {@link Binding} contains
     * convenience binding syntax.
     */
     resolve(): ResolvedBinding;
  }


  /**
   * Helper class for the {@link bind} function.
   */
  class BindingBuilder {

     token: void;


    /**
     * Binds an interface to an implementation / subclass.
     *
     * ## Example
     *
     * Because `toAlias` and `toClass` are often confused, the example contains both use cases for
     * easy comparison.
     *
     * ```javascript
     *
     * class Vehicle {}
     *
     * class Car extends Vehicle {}
     *
     * var injectorClass = Injector.resolveAndCreate([
     *   Car,
     *   bind(Vehicle).toClass(Car)
     * ]);
     * var injectorAlias = Injector.resolveAndCreate([
     *   Car,
     *   bind(Vehicle).toAlias(Car)
     * ]);
     *
     * expect(injectorClass.get(Vehicle)).not.toBe(injectorClass.get(Car));
     * expect(injectorClass.get(Vehicle) instanceof Car).toBe(true);
     *
     * expect(injectorAlias.get(Vehicle)).toBe(injectorAlias.get(Car));
     * expect(injectorAlias.get(Vehicle) instanceof Car).toBe(true);
     * ```
     */
     toClass(type: Type): Binding;


    /**
     * Binds a key to a value.
     *
     * ## Example
     *
     * ```javascript
     * var injector = Injector.resolveAndCreate([
     *   bind(String).toValue('Hello')
     * ]);
     *
     * expect(injector.get(String)).toEqual('Hello');
     * ```
     */
     toValue(value: any): Binding;


    /**
     * Binds a key to the alias for an existing key.
     *
     * An alias means that we will return the same instance as if the alias token was used. (This is
     * in contrast to `toClass` where a separate instance of `toClass` will be returned.)
     *
     * ## Example
     *
     * Becuse `toAlias` and `toClass` are often confused, the example contains both use cases for easy
     * comparison.
     *
     * ```javascript
     *
     * class Vehicle {}
     *
     * class Car extends Vehicle {}
     *
     * var injectorAlias = Injector.resolveAndCreate([
     *   Car,
     *   bind(Vehicle).toAlias(Car)
     * ]);
     * var injectorClass = Injector.resolveAndCreate([
     *   Car,
     *   bind(Vehicle).toClass(Car)
     * ]);
     *
     * expect(injectorAlias.get(Vehicle)).toBe(injectorAlias.get(Car));
     * expect(injectorAlias.get(Vehicle) instanceof Car).toBe(true);
     *
     * expect(injectorClass.get(Vehicle)).not.toBe(injectorClass.get(Car));
     * expect(injectorClass.get(Vehicle) instanceof Car).toBe(true);
     * ```
     */
     toAlias(aliasToken: /*Type*/ any): Binding;


    /**
     * Binds a key to a function which computes the value.
     *
     * ## Example
     *
     * ```javascript
     * var injector = Injector.resolveAndCreate([
     *   bind(Number).toFactory(() => { return 1+2; }),
     *   bind(String).toFactory((v) => { return "Value: " + v; }, [Number])
     * ]);
     *
     * expect(injector.get(Number)).toEqual(3);
     * expect(injector.get(String)).toEqual('Value: 3');
     * ```
     */
     toFactory(factoryFunction: Function, dependencies?: List<any>): Binding;
  }


  /**
   * An internal resolved representation of a {@link Binding} used by the {@link Injector}.
   *
   * A {@link Binding} is resolved when it has a factory function. Binding to a class, alias, or
   * value, are just convenience methods, as {@link Injector} only operates on calling factory
   * functions.
   */
  class ResolvedBinding {


    /**
     * A key, usually a `Type`.
     */
     key: Key;


    /**
     * Factory function which can return an instance of an object represented by a key.
     */
     factory: Function;


    /**
     * Arguments (dependencies) to the `factory` function.
     */
     dependencies: List<Dependency>;
  }


  /**
   * @private
   */
  class Dependency {

     key: Key;

     optional: boolean;

     visibility: VisibilityMetadata;

     properties: List<any>;
  }


  /**
   * Provides an API for imperatively constructing {@link Binding}s.
   *
   * This is only relevant for JavaScript. See {@link BindingBuilder}.
   *
   * ## Example
   *
   * ```javascript
   * bind(MyInterface).toClass(MyClass)
   *
   * ```
   */
  function bind(token: any) : BindingBuilder ;


  /**
   * A unique object used for retrieving items from the {@link Injector}.
   *
   * Keys have:
   * - a system-wide unique `id`.
   * - a `token`, usually the `Type` of the instance.
   *
   * Keys are used internally by the {@link Injector} because their system-wide unique `id`s allow the
   * injector to index in arrays rather than looking up items in maps.
   */
  interface Key {

     token: Object;

     id: number;

     displayName: string;
  }


  /**
   * @private
   */
  class KeyRegistry {

     get(token: Object): Key;

     numberOfKeys: number;
  }


  /**
   * Type literals is a Dart-only feature. This is here only so we can x-compile
   * to multiple languages.
   */
  class TypeLiteral {

     type: any;
  }


  /**
   * Thrown when trying to retrieve a dependency by `Key` from {@link Injector}, but the
   * {@link Injector} does not have a {@link Binding} for {@link Key}.
   */
  class NoBindingError extends AbstractBindingError {
  }


  /**
   * Base class for all errors arising from misconfigured bindings.
   */
  class AbstractBindingError extends BaseException {

     name: string;

     message: string;

     keys: List<Key>;

     injectors: List<Injector>;

     constructResolvingMessage: Function;

     addKey(injector: Injector, key: Key): void;

     context: void;

     toString(): string;
  }


  /**
   * Thrown when dependencies form a cycle.
   *
   * ## Example:
   *
   * ```javascript
   * class A {
   *   constructor(b:B) {}
   * }
   * class B {
   *   constructor(a:A) {}
   * }
   * ```
   *
   * Retrieving `A` or `B` throws a `CyclicDependencyError` as the graph above cannot be constructed.
   */
  class CyclicDependencyError extends AbstractBindingError {
  }


  /**
   * Thrown when a constructing type returns with an Error.
   *
   * The `InstantiationError` class contains the original error plus the dependency graph which caused
   * this object to be instantiated.
   */
  class InstantiationError extends AbstractBindingError {

     causeKey: Key;
  }


  /**
   * Thrown when an object other then {@link Binding} (or `Type`) is passed to {@link Injector}
   * creation.
   */
  class InvalidBindingError extends BaseException {

     message: string;

     toString(): string;
  }


  /**
   * Thrown when the class has no annotation information.
   *
   * Lack of annotation information prevents the {@link Injector} from determining which dependencies
   * need to be injected into the constructor.
   */
  class NoAnnotationError extends BaseException {

     name: string;

     message: string;

     toString(): string;
  }


  /**
   * Thrown when getting an object by index.
   */
  class OutOfBoundsError extends BaseException {

     message: string;

     toString(): string;
  }

  class OpaqueToken {

     toString(): string;
  }


  /**
   * Factory for creating {@link InjectMetadata}.
   */
  interface InjectFactory {

     new(token: any): InjectMetadata;


     (token: any): any;

  }


  /**
   * Factory for creating {@link OptionalMetadata}.
   */
  interface OptionalFactory {

     new(): OptionalMetadata;


     (): any;

  }


  /**
   * Factory for creating {@link InjectableMetadata}.
   */
  interface InjectableFactory {

     new(): InjectableMetadata;


     (): any;

  }


  /**
   * Factory for creating {@link SelfMetadata}.
   */
  interface SelfFactory {

     new(): SelfMetadata;


     (): any;

  }


  /**
   * Factory for creating {@link AncestorMetadata}.
   */
  interface AncestorFactory {

     new(visibility?: {self: boolean}): AncestorMetadata;


     (visibility?: {self: boolean}): any;

  }


  /**
   * Factory for creating {@link UnboundedMetadata}.
   */
  interface UnboundedFactory {

     new(visibility?: {self: boolean}): UnboundedMetadata;


     (visibility?: {self: boolean}): any;

  }


  /**
   * Factory for creating {@link InjectMetadata}.
   */
  var Inject : InjectFactory ;


  /**
   * Factory for creating {@link OptionalMetadata}.
   */
  var Optional : OptionalFactory ;


  /**
   * Factory for creating {@link InjectableMetadata}.
   */
  var Injectable : InjectableFactory ;


  /**
   * Factory for creating {@link SelfMetadata}.
   */
  var Self : SelfFactory ;


  /**
   * Factory for creating {@link AncestorMetadata}.
   */
  var Ancestor : AncestorFactory ;


  /**
   * Factory for creating {@link UnboundedMetadata}.
   */
  var Unbounded : UnboundedFactory ;


  /**
   * Omitting from external API doc as this is really an abstract internal concept.
   */
  class AbstractControl {

     validator: Function;

     value: any;

     status: string;

     valid: boolean;

     errors: StringMap<string, any>;

     pristine: boolean;

     dirty: boolean;

     touched: boolean;

     untouched: boolean;

     valueChanges: Observable;

     markAsTouched(): void;

     markAsDirty({onlySelf}?: {onlySelf?: boolean}): void;

     setParent(parent: ControlGroup | ControlArray): void;

     updateValidity({onlySelf}?: {onlySelf?: boolean}): void;

     updateValueAndValidity({onlySelf, emitEvent}?: {onlySelf?: boolean, emitEvent?: boolean}): void;

     find(path: List<string | number>| string): AbstractControl;

     getError(errorCode: string, path?: List<string>): any;

     hasError(errorCode: string, path?: List<string>): boolean;
  }


  /**
   * Defines a part of a form that cannot be divided into other controls.
   *
   * `Control` is one of the three fundamental building blocks used to define forms in Angular, along
   * with
   * {@link ControlGroup} and {@link ControlArray}.
   */
  class Control extends AbstractControl {

     updateValue(value: any, {onlySelf, emitEvent, emitModelToViewChange}?:
                  {onlySelf?: boolean, emitEvent?: boolean, emitModelToViewChange?: boolean}): void;

     registerOnChange(fn: Function): void;
  }


  /**
   * Defines a part of a form, of fixed length, that can contain other controls.
   *
   * A ControlGroup aggregates the values and errors of each {@link Control} in the group. Thus, if
   * one of the controls
   * in a group is invalid, the entire group is invalid. Similarly, if a control changes its value,
   * the entire group
   * changes as well.
   *
   * `ControlGroup` is one of the three fundamental building blocks used to define forms in Angular,
   * along with
   * {@link Control} and {@link ControlArray}. {@link ControlArray} can also contain other controls,
   * but is of variable
   * length.
   */
  class ControlGroup extends AbstractControl {

     controls: StringMap<string, AbstractControl>;

     addControl(name: string, c: AbstractControl): void;

     removeControl(name: string): void;

     include(controlName: string): void;

     exclude(controlName: string): void;

     contains(controlName: string): boolean;
  }


  /**
   * Defines a part of a form, of variable length, that can contain other controls.
   *
   * A `ControlArray` aggregates the values and errors of each {@link Control} in the group. Thus, if
   * one of the controls
   * in a group is invalid, the entire group is invalid. Similarly, if a control changes its value,
   * the entire group
   * changes as well.
   *
   * `ControlArray` is one of the three fundamental building blocks used to define forms in Angular,
   * along with {@link Control} and {@link ControlGroup}. {@link ControlGroup} can also contain
   * other controls, but is of fixed length.
   */
  class ControlArray extends AbstractControl {

     controls: List<AbstractControl>;

     at(index: number): AbstractControl;

     push(control: AbstractControl): void;

     insert(index: number, control: AbstractControl): void;

     removeAt(index: number): void;

     length: number;
  }

  class AbstractControlDirective {

     control: AbstractControl;

     value: any;

     valid: boolean;

     errors: StringMap<string, any>;

     pristine: boolean;

     dirty: boolean;

     touched: boolean;

     untouched: boolean;
  }


  /**
   * An interface that {@link NgFormModel} and {@link NgForm} implement.
   *
   * Only used by the forms module.
   */
  interface Form {

     addControl(dir: NgControl): void;

     removeControl(dir: NgControl): void;

     getControl(dir: NgControl): Control;

     addControlGroup(dir: NgControlGroup): void;

     removeControlGroup(dir: NgControlGroup): void;

     getControlGroup(dir: NgControlGroup): ControlGroup;

     updateModel(dir: NgControl, value: any): void;
  }


  /**
   * A directive that contains a group of [NgControl].
   *
   * Only used by the forms module.
   */
  class ControlContainer extends AbstractControlDirective {

     name: string;

     formDirective: Form;

     path: List<string>;
  }


  /**
   * Creates and binds a control with a specified name to a DOM element.
   *
   * This directive can only be used as a child of {@link NgForm} or {@link NgFormModel}.
   *
   * # Example
   *
   * In this example, we create the login and password controls.
   * We can work with each control separately: check its validity, get its value, listen to its
   *  changes.
   *
   *  ```
   * @Component({selector: "login-comp"})
   * @View({
   *      directives: [formDirectives],
   *      template: `
   *              <form #f="form" (submit)='onLogIn(f.value)'>
   *                Login <input type='text' ng-control='login' #l="form">
   *                <div *ng-if="!l.valid">Login is invalid</div>
   *
   *                Password <input type='password' ng-control='password'>
   *
   *                <button type='submit'>Log in!</button>
   *              </form>
   *      `})
   * class LoginComp {
   *  onLogIn(value) {
   *    // value === {login: 'some login', password: 'some password'}
   *  }
   * }
   *  ```
   *
   * We can also use ng-model to bind a domain model to the form.
   *
   *  ```
   * @Component({selector: "login-comp"})
   * @View({
   *      directives: [formDirectives],
   *      template: `
   *              <form (submit)='onLogIn()'>
   *                Login <input type='text' ng-control='login' [(ng-model)]="credentials.login">
   *                Password <input type='password' ng-control='password'
   *  [(ng-model)]="credentials.password">
   *                <button type='submit'>Log in!</button>
   *              </form>
   *      `})
   * class LoginComp {
   *  credentials: {login:string, password:string};
   *
   *  onLogIn() {
   *    // this.credentials.login === "some login"
   *    // this.credentials.password === "some password"
   *  }
   * }
   *  ```
   */
  class NgControlName extends NgControl {

     update: void;

     model: any;

     viewModel: any;

     ngValidators: QueryList<NgValidator>;

     onChange(c: StringMap<string, any>): void;

     onDestroy(): void;

     viewToModelUpdate(newValue: any): void;

     path: List<string>;

     formDirective: any;

     control: Control;

     validator: Function;
  }


  /**
   * Binds an existing control to a DOM element.
   *
   * # Example
   *
   * In this example, we bind the control to an input element. When the value of the input element
   * changes, the value of
   * the control will reflect that change. Likewise, if the value of the control changes, the input
   * element reflects that
   * change.
   *
   *  ```
   * @Component({selector: "login-comp"})
   * @View({
   *      directives: [formDirectives],
   *      template: "<input type='text' [ng-form-control]='loginControl'>"
   *      })
   * class LoginComp {
   *  loginControl:Control;
   *
   *  constructor() {
   *    this.loginControl = new Control('');
   *  }
   * }
   *
   *  ```
   *
   * We can also use ng-model to bind a domain model to the form.
   *
   *  ```
   * @Component({selector: "login-comp"})
   * @View({
   *      directives: [formDirectives],
   *      template: "<input type='text' [ng-form-control]='loginControl' [(ng-model)]='login'>"
   *      })
   * class LoginComp {
   *  loginControl:Control;
   *  login:string;
   *
   *  constructor() {
   *    this.loginControl = new Control('');
   *  }
   * }
   *  ```
   */
  class NgFormControl extends NgControl {

     form: Control;

     update: void;

     model: any;

     viewModel: any;

     ngValidators: QueryList<NgValidator>;

     onChange(c: StringMap<string, any>): void;

     path: List<string>;

     control: Control;

     validator: Function;

     viewToModelUpdate(newValue: any): void;
  }


  /**
   * Binds a domain model to the form.
   *
   * # Example
   *  ```
   * @Component({selector: "search-comp"})
   * @View({
   *      directives: [formDirectives],
   *      template: `
   *               <input type='text' [(ng-model)]="searchQuery">
   *      `})
   * class SearchComp {
   *  searchQuery: string;
   * }
   *  ```
   */
  class NgModel extends NgControl {

     update: void;

     model: any;

     viewModel: any;

     ngValidators: QueryList<NgValidator>;

     onChange(c: StringMap<string, any>): void;

     control: Control;

     path: List<string>;

     validator: Function;

     viewToModelUpdate(newValue: any): void;
  }


  /**
   * An abstract class that all control directive extend.
   *
   * It binds a {@link Control} object to a DOM element.
   */
  class NgControl extends AbstractControlDirective {

     name: string;

     valueAccessor: ControlValueAccessor;

     validator: Function;

     path: List<string>;

     viewToModelUpdate(newValue: any): void;
  }


  /**
   * Creates and binds a control group to a DOM element.
   *
   * This directive can only be used as a child of {@link NgForm} or {@link NgFormModel}.
   *
   * # Example
   *
   * In this example, we create the credentials and personal control groups.
   * We can work with each group separately: check its validity, get its value, listen to its changes.
   *
   *  ```
   * @Component({selector: "signup-comp"})
   * @View({
   *      directives: [formDirectives],
   *      template: `
   *              <form #f="form" (submit)='onSignUp(f.value)'>
   *                <div ng-control-group='credentials' #credentials="form">
   *                  Login <input type='text' ng-control='login'>
   *                  Password <input type='password' ng-control='password'>
   *                </div>
   *                <div *ng-if="!credentials.valid">Credentials are invalid</div>
   *
   *                <div ng-control-group='personal'>
   *                  Name <input type='text' ng-control='name'>
   *                </div>
   *                <button type='submit'>Sign Up!</button>
   *              </form>
   *      `})
   * class SignupComp {
   *  onSignUp(value) {
   *    // value === {personal: {name: 'some name'},
   *    //  credentials: {login: 'some login', password: 'some password'}}
   *  }
   * }
   *
   *  ```
   */
  class NgControlGroup extends ControlContainer {

     onInit(): void;

     onDestroy(): void;

     control: ControlGroup;

     path: List<string>;

     formDirective: Form;
  }


  /**
   * Binds an existing control group to a DOM element.
   *
   * # Example
   *
   * In this example, we bind the control group to the form element, and we bind the login and
   * password controls to the
   * login and password elements.
   *
   *  ```
   * @Component({selector: "login-comp"})
   * @View({
   *      directives: [formDirectives],
   *      template: "<form [ng-form-model]='loginForm'>" +
   *              "Login <input type='text' ng-control='login'>" +
   *              "Password <input type='password' ng-control='password'>" +
   *              "<button (click)="onLogin()">Login</button>" +
   *              "</form>"
   *      })
   * class LoginComp {
   *  loginForm:ControlGroup;
   *
   *  constructor() {
   *    this.loginForm = new ControlGroup({
   *      login: new Control(""),
   *      password: new Control("")
   *    });
   *  }
   *
   *  onLogin() {
   *    // this.loginForm.value
   *  }
   * }
   *
   *  ```
   *
   * We can also use ng-model to bind a domain model to the form.
   *
   *  ```
   * @Component({selector: "login-comp"})
   * @View({
   *      directives: [formDirectives],
   *      template: "<form [ng-form-model]='loginForm'>" +
   *              "Login <input type='text' ng-control='login' [(ng-model)]='login'>" +
   *              "Password <input type='password' ng-control='password' [(ng-model)]='password'>" +
   *              "<button (click)="onLogin()">Login</button>" +
   *              "</form>"
   *      })
   * class LoginComp {
   *  credentials:{login:string, password:string}
   *  loginForm:ControlGroup;
   *
   *  constructor() {
   *    this.loginForm = new ControlGroup({
   *      login: new Control(""),
   *      password: new Control("")
   *    });
   *  }
   *
   *  onLogin() {
   *    // this.credentials.login === 'some login'
   *    // this.credentials.password === 'some password'
   *  }
   * }
   *  ```
   */
  class NgFormModel extends ControlContainer implements Form {

     form: ControlGroup;

     directives: List<NgControl>;

     ngSubmit: void;

     onChange(_: any): void;

     formDirective: Form;

     control: ControlGroup;

     path: List<string>;

     addControl(dir: NgControl): void;

     getControl(dir: NgControl): Control;

     removeControl(dir: NgControl): void;

     addControlGroup(dir: NgControlGroup): void;

     removeControlGroup(dir: NgControlGroup): void;

     getControlGroup(dir: NgControlGroup): ControlGroup;

     updateModel(dir: NgControl, value: any): void;

     onSubmit(): boolean;
  }


  /**
   * Creates and binds a form object to a DOM element.
   *
   * # Example
   *
   *  ```
   * @Component({selector: "signup-comp"})
   * @View({
   *      directives: [formDirectives],
   *      template: `
   *              <form #f="form" (submit)='onSignUp(f.value)'>
   *                <div ng-control-group='credentials' #credentials="form">
   *                  Login <input type='text' ng-control='login'>
   *                  Password <input type='password' ng-control='password'>
   *                </div>
   *                <div *ng-if="!credentials.valid">Credentials are invalid</div>
   *
   *                <div ng-control-group='personal'>
   *                  Name <input type='text' ng-control='name'>
   *                </div>
   *                <button type='submit'>Sign Up!</button>
   *              </form>
   *      `})
   * class SignupComp {
   *  onSignUp(value) {
   *    // value === {personal: {name: 'some name'},
   *    //  credentials: {login: 'some login', password: 'some password'}}
   *  }
   * }
   *
   *  ```
   */
  class NgForm extends ControlContainer implements Form {

     form: ControlGroup;

     ngSubmit: void;

     formDirective: Form;

     control: ControlGroup;

     path: List<string>;

     controls: StringMap<string, AbstractControl>;

     addControl(dir: NgControl): void;

     getControl(dir: NgControl): Control;

     removeControl(dir: NgControl): void;

     addControlGroup(dir: NgControlGroup): void;

     removeControlGroup(dir: NgControlGroup): void;

     getControlGroup(dir: NgControlGroup): ControlGroup;

     updateModel(dir: NgControl, value: any): void;

     onSubmit(): boolean;
  }


  /**
   * A bridge between a control and a native element.
   *
   * Please see {@link DefaultValueAccessor} for more information.
   */
  interface ControlValueAccessor {

     writeValue(obj: any): void;

     registerOnChange(fn: any): void;

     registerOnTouched(fn: any): void;
  }


  /**
   * The default accessor for writing a value and listening to changes that is used by the
   * {@link NgModel}, {@link NgFormControl}, and {@link NgControlName} directives.
   *
   *  # Example
   *  ```
   *  <input type="text" [(ng-model)]="searchQuery">
   *  ```
   */
  class DefaultValueAccessor implements ControlValueAccessor {

     onChange: void;

     onTouched: void;

     cd: NgControl;

     renderer: Renderer;

     elementRef: ElementRef;

     writeValue(value: any): void;

     ngClassUntouched: boolean;

     ngClassTouched: boolean;

     ngClassPristine: boolean;

     ngClassDirty: boolean;

     ngClassValid: boolean;

     ngClassInvalid: boolean;

     registerOnChange(fn: (_: any) => void): void;

     registerOnTouched(fn: () => void): void;
  }


  /**
   * The accessor for writing a value and listening to changes on a checkbox input element.
   *
   *  # Example
   *  ```
   *  <input type="checkbox" [ng-control]="rememberLogin">
   *  ```
   */
  class CheckboxControlValueAccessor implements ControlValueAccessor {

     onChange: void;

     onTouched: void;

     cd: NgControl;

     renderer: Renderer;

     elementRef: ElementRef;

     writeValue(value: any): void;

     ngClassUntouched: boolean;

     ngClassTouched: boolean;

     ngClassPristine: boolean;

     ngClassDirty: boolean;

     ngClassValid: boolean;

     ngClassInvalid: boolean;

     registerOnChange(fn: (_: any) => {}): void;

     registerOnTouched(fn: () => {}): void;
  }


  /**
   * Marks <option> as dynamic, so Angular can be notified when options change.
   *
   * #Example:
   *
   * ```
   * <select ng-control="city">
   *   <option *ng-for="#c of cities" [value]="c"></option>
   * </select>
   * ```
   */
  class NgSelectOption {
  }


  /**
   * The accessor for writing a value and listening to changes on a select element.
   */
  class SelectControlValueAccessor implements ControlValueAccessor {

     value: string;

     onChange: void;

     onTouched: void;

     cd: NgControl;

     renderer: Renderer;

     elementRef: ElementRef;

     writeValue(value: any): void;

     ngClassUntouched: boolean;

     ngClassTouched: boolean;

     ngClassPristine: boolean;

     ngClassDirty: boolean;

     ngClassValid: boolean;

     ngClassInvalid: boolean;

     registerOnChange(fn: () => any): void;

     registerOnTouched(fn: () => any): void;
  }


  /**
   * A list of all the form directives used as part of a `@View` annotation.
   *
   *  This is a shorthand for importing them each individually.
   */
  const formDirectives : List<Type> ;


  /**
   * Provides a set of validators used by form controls.
   *
   * # Example
   *
   * ```
   * var loginControl = new Control("", Validators.required)
   * ```
   */
  class Validators {
  }

  class NgValidator {

     validator: Function;
  }

  class NgRequiredValidator extends NgValidator {

     validator: Function;
  }


  /**
   * Creates a form object from a user-specified configuration.
   *
   * # Example
   *
   * ```
   * import {Component, View, bootstrap} from 'angular2/angular2';
   * import {FormBuilder, Validators, formDirectives, ControlGroup} from 'angular2/forms';
   *
   * @Component({
   *   selector: 'login-comp',
   *   viewInjector: [
   *     FormBuilder
   *   ]
   * })
   * @View({
   *   template: `
   *     <form [control-group]="loginForm">
   *       Login <input control="login">
   *
   *       <div control-group="passwordRetry">
   *         Password <input type="password" control="password">
   *         Confirm password <input type="password" control="passwordConfirmation">
   *       </div>
   *     </form>
   *   `,
   *   directives: [
   *     formDirectives
   *   ]
   * })
   * class LoginComp {
   *   loginForm: ControlGroup;
   *
   *   constructor(builder: FormBuilder) {
   *     this.loginForm = builder.group({
   *       login: ["", Validators.required],
   *
   *       passwordRetry: builder.group({
   *         password: ["", Validators.required],
   *         passwordConfirmation: ["", Validators.required]
   *       })
   *     });
   *   }
   * }
   *
   * bootstrap(LoginComp)
   * ```
   *
   * This example creates a {@link ControlGroup} that consists of a `login` {@link Control}, and a
   * nested
   * {@link ControlGroup} that defines a `password` and a `passwordConfirmation` {@link Control}:
   *
   * ```
   *  var loginForm = builder.group({
   *    login: ["", Validators.required],
   *
   *    passwordRetry: builder.group({
   *      password: ["", Validators.required],
   *      passwordConfirmation: ["", Validators.required]
   *    })
   *  });
   *
   *  ```
   */
  class FormBuilder {

     group(controlsConfig: StringMap<string, any>, extra?: StringMap<string, any>): ControlGroup;

     control(value: Object, validator?: Function): Control;

     array(controlsConfig: List<any>, validator?: Function): ControlArray;
  }

  const formInjectables : List<Type> ;


  /**
   * A collection of the Angular core directives that are likely to be used in each and every Angular
   * application.
   *
   * This collection can be used to quickly enumerate all the built-in directives in the `@View`
   * annotation. For example,
   * instead of writing:
   *
   * ```
   * import {If, NgFor, NgSwitch, NgSwitchWhen, NgSwitchDefault} from 'angular2/angular2';
   * import {OtherDirective} from 'myDirectives';
   *
   * @Component({
   *  selector: 'my-component'
   * })
   * @View({
   *   templateUrl: 'myComponent.html',
   *   directives: [If, NgFor, NgSwitch, NgSwitchWhen, NgSwitchDefault, OtherDirective]
   * })
   * export class MyComponent {
   *   ...
   * }
   * ```
   * one could enumerate all the core directives at once:
   *
   * ```
   * import {coreDirectives} from 'angular2/angular2';
   * import {OtherDirective} from 'myDirectives';
   *
   * @Component({
   *  selector: 'my-component'
   * })
   * @View({
   *   templateUrl: 'myComponent.html',
   *   directives: [coreDirectives, OtherDirective]
   * })
   * export class MyComponent {
   *   ...
   * }
   * ```
   */
  const coreDirectives : List<Type> ;


  /**
   * Adds and removes CSS classes based on an {expression} value.
   *
   * The result of expression is used to add and remove CSS classes using the following logic,
   * based on expression's value type:
   * - {string} - all the CSS classes (space - separated) are added
   * - {Array} - all the CSS classes (Array elements) are added
   * - {Object} - each key corresponds to a CSS class name while values
   * are interpreted as {boolean} expression. If a given expression
   * evaluates to {true} a corresponding CSS class is added - otherwise
   * it is removed.
   *
   * # Example:
   *
   * ```
   * <div class="message" [class]="{error: errorCount > 0}">
   *     Please check errors.
   * </div>
   * ```
   */
  class CSSClass {

     rawClass: void;

     onCheck(): void;

     onDestroy(): void;
  }


  /**
   * The `NgFor` directive instantiates a template once per item from an iterable. The context for
   * each instantiated template inherits from the outer context with the given loop variable set
   * to the current item from the iterable.
   *
   * It is possible to alias the `index` to a local variable that will be set to the current loop
   * iteration in the template context.
   *
   * When the contents of the iterator changes, `NgFor` makes the corresponding changes to the DOM:
   *
   * * When an item is added, a new instance of the template is added to the DOM.
   * * When an item is removed, its template instance is removed from the DOM.
   * * When items are reordered, their respective templates are reordered in the DOM.
   *
   * # Example
   *
   * ```
   * <ul>
   *   <li *ng-for="#error of errors; #i = index">
   *     Error {{i}} of {{errors.length}}: {{error.message}}
   *   </li>
   * </ul>
   * ```
   *
   * # Syntax
   *
   * - `<li *ng-for="#item of items; #i = index">...</li>`
   * - `<li template="ng-for #item of items; #i = index">...</li>`
   * - `<template ng-for #item [ng-for-of]="items" #i="index"><li>...</li></template>`
   */
  class NgFor {

     viewContainer: ViewContainerRef;

     templateRef: TemplateRef;

     pipes: Pipes;

     cdr: ChangeDetectorRef;

     ngForOf: void;

     onCheck(): void;
  }

  class RecordViewTuple {

     view: ViewRef;

     record: any;
  }


  /**
   * Removes or recreates a portion of the DOM tree based on an {expression}.
   *
   * If the expression assigned to `ng-if` evaluates to a false value then the element
   * is removed from the DOM, otherwise a clone of the element is reinserted into the DOM.
   *
   * # Example:
   *
   * ```
   * <div *ng-if="errorCount > 0" class="error">
   *   <!-- Error message displayed when the errorCount property on the current context is greater
   * than 0. -->
   *   {{errorCount}} errors detected
   * </div>
   * ```
   *
   * # Syntax
   *
   * - `<div *ng-if="condition">...</div>`
   * - `<div template="ng-if condition">...</div>`
   * - `<template [ng-if]="condition"><div>...</div></template>`
   */
  class NgIf {

     viewContainer: ViewContainerRef;

     templateRef: TemplateRef;

     prevCondition: boolean;

     ngIf: void;
  }


  /**
   * The `NgNonBindable` directive tells Angular not to compile or bind the contents of the current
   * DOM element. This is useful if the element contains what appears to be Angular directives and
   * bindings but which should be ignored by Angular. This could be the case if you have a site that
   * displays snippets of code, for instance.
   *
   * Example:
   *
   * ```
   * <div>Normal: {{1 + 2}}</div> // output "Normal: 3"
   * <div non-bindable>Ignored: {{1 + 2}}</div> // output "Ignored: {{1 + 2}}"
   * ```
   */
  class NgNonBindable {
  }


  /**
   * Adds or removes styles based on an {expression}.
   *
   * When the expression assigned to `ng-style` evaluates to an object, the corresponding element
   * styles are updated. Style names to update are taken from the object keys and values - from the
   * corresponding object values.
   *
   * # Example:
   *
   * ```
   * <div ng-style="{'text-align': alignEpr}"></div>
   * ```
   *
   * In the above example the `text-align` style will be updated based on the `alignEpr` value
   * changes.
   *
   * # Syntax
   *
   * - `<div ng-style="{'text-align': alignEpr}"></div>`
   * - `<div ng-style="styleExp"></div>`
   */
  class NgStyle {

     rawStyle: void;

     onCheck(): void;
  }

  class SwitchView {

     create(): void;

     destroy(): void;
  }


  /**
   * The `NgSwitch` directive is used to conditionally swap DOM structure on your template based on a
   * scope expression.
   * Elements within `NgSwitch` but without `NgSwitchWhen` or `NgSwitchDefault` directives will be
   * preserved at the location as specified in the template.
   *
   * `NgSwitch` simply chooses nested elements and makes them visible based on which element matches
   * the value obtained from the evaluated expression. In other words, you define a container element
   * (where you place the directive), place an expression on the **`[ng-switch]="..."` attribute**),
   * define any inner elements inside of the directive and place a `[ng-switch-when]` attribute per
   * element.
   * The when attribute is used to inform NgSwitch which element to display when the expression is
   * evaluated. If a matching expression is not found via a when attribute then an element with the
   * default attribute is displayed.
   *
   * # Example:
   *
   * ```
   * <ANY [ng-switch]="expression">
   *   <template [ng-switch-when]="whenExpression1">...</template>
   *   <template [ng-switch-when]="whenExpression1">...</template>
   *   <template ng-switch-default>...</template>
   * </ANY>
   * ```
   */
  class NgSwitch {

     ngSwitch: void;
  }


  /**
   * Defines a case statement as an expression.
   *
   * If multiple `NgSwitchWhen` match the `NgSwitch` value, all of them are displayed.
   *
   * Example:
   *
   * ```
   * // match against a context variable
   * <template [ng-switch-when]="contextVariable">...</template>
   *
   * // match against a constant string
   * <template ng-switch-when="stringValue">...</template>
   * ```
   */
  class NgSwitchWhen {

     onDestroy(): void;

     ngSwitchWhen: void;
  }


  /**
   * Defines a default case statement.
   *
   * Default case statements are displayed when no `NgSwitchWhen` match the `ng-switch` value.
   *
   * Example:
   *
   * ```
   * <template ng-switch-default>...</template>
   * ```
   */
  class NgSwitchDefault {
  }


  /**
   * Mock Connection to represent a {@link Connection} for tests.
   */
  class MockConnection {


    /**
     * Describes the state of the connection, based on `XMLHttpRequest.readyState`, but with
     * additional states. For example, state 5 indicates an aborted connection.
     */
     readyState: ReadyStates;


    /**
     * {@link Request} instance used to create the connection.
     */
     request: Request;


    /**
     * {@link EventEmitter} of {@link Response}. Can be subscribed to in order to be notified when a
     * response is available.
     */
     response: EventEmitter;


    /**
     * Changes the `readyState` of the connection to a custom state of 5 (cancelled).
     */
     dispose(): void;


    /**
     * Sends a mock response to the connection. This response is the value that is emitted to the
     * {@link EventEmitter} returned by {@link Http}.
     *
     * #Example
     *
     * ```
     * var connection;
     * backend.connections.subscribe(c => connection = c);
     * http.request('data.json').subscribe(res => console.log(res.text()));
     * connection.mockRespond(new Response('fake response')); //logs 'fake response'
     * ```
     */
     mockRespond(res: Response): void;


    /**
     * Not yet implemented!
     *
     * Sends the provided {@link Response} to the `downloadObserver` of the `Request`
     * associated with this connection.
     */
     mockDownload(res: Response): void;


    /**
     * Emits the provided error object as an error to the {@link Response} {@link EventEmitter}
     * returned
     * from {@link Http}.
     */
     mockError(err?: Error): void;
  }


  /**
   * A mock backend for testing the {@link Http} service.
   *
   * This class can be injected in tests, and should be used to override bindings
   * to other backends, such as {@link XHRBackend}.
   *
   * #Example
   *
   * ```
   * import {MockBackend, DefaultOptions, Http} from 'angular2/http';
   * it('should get some data', inject([AsyncTestCompleter], (async) => {
   *   var connection;
   *   var injector = Injector.resolveAndCreate([
   *     MockBackend,
   *     bind(Http).toFactory((backend, defaultOptions) => {
   *       return new Http(backend, defaultOptions)
   *     }, [MockBackend, DefaultOptions])]);
   *   var http = injector.get(Http);
   *   var backend = injector.get(MockBackend);
   *   //Assign any newly-created connection to local variable
   *   backend.connections.subscribe(c => connection = c);
   *   http.request('data.json').subscribe((res) => {
   *     expect(res.text()).toBe('awesome');
   *     async.done();
   *   });
   *   connection.mockRespond(new Response('awesome'));
   * }));
   * ```
   *
   * This method only exists in the mock implementation, not in real Backends.
   */
  class MockBackend {


    /**
     * {@link EventEmitter}
     * of {@link MockConnection} instances that have been created by this backend. Can be subscribed
     * to in order to respond to connections.
     *
     * #Example
     *
     * ```
     * import {MockBackend, Http, BaseRequestOptions} from 'angular2/http';
     * import {Injector} from 'angular2/di';
     *
     * it('should get a response', () => {
     *   var connection; //this will be set when a new connection is emitted from the backend.
     *   var text; //this will be set from mock response
     *   var injector = Injector.resolveAndCreate([
     *     MockBackend,
     *     bind(Http).toFactory(backend, options) {
     *       return new Http(backend, options);
     *     }, [MockBackend, BaseRequestOptions]]);
     *   var backend = injector.get(MockBackend);
     *   var http = injector.get(Http);
     *   backend.connections.subscribe(c => connection = c);
     *   http.request('something.json').subscribe(res => {
     *     text = res.text();
     *   });
     *   connection.mockRespond(new Response({body: 'Something'}));
     *   expect(text).toBe('Something');
     * });
     * ```
     *
     * This property only exists in the mock implementation, not in real Backends.
     */
     connections: EventEmitter;


    /**
     * An array representation of `connections`. This array will be updated with each connection that
     * is created by this backend.
     *
     * This property only exists in the mock implementation, not in real Backends.
     */
     connectionsArray: Array<MockConnection>;


    /**
     * {@link EventEmitter} of {@link MockConnection} instances that haven't yet been resolved (i.e.
     * with a `readyState`
     * less than 4). Used internally to verify that no connections are pending via the
     * `verifyNoPendingRequests` method.
     *
     * This property only exists in the mock implementation, not in real Backends.
     */
     pendingConnections: EventEmitter;


    /**
     * Checks all connections, and raises an exception if any connection has not received a response.
     *
     * This method only exists in the mock implementation, not in real Backends.
     */
     verifyNoPendingRequests(): void;


    /**
     * Can be used in conjunction with `verifyNoPendingRequests` to resolve any not-yet-resolve
     * connections, if it's expected that there are connections that have not yet received a response.
     *
     * This method only exists in the mock implementation, not in real Backends.
     */
     resolveAllConnections(): void;


    /**
     * Creates a new {@link MockConnection}. This is equivalent to calling `new
     * MockConnection()`, except that it also will emit the new `Connection` to the `connections`
     * emitter of this `MockBackend` instance. This method will usually only be used by tests
     * against the framework itself, not by end-users.
     */
     createConnection(req: Request): Connection;
  }


  /**
   * Creates `Request` instances from provided values.
   *
   * The Request's interface is inspired by the Request constructor defined in the [Fetch
   * Spec](https://fetch.spec.whatwg.org/#request-class),
   * but is considered a static value whose body can be accessed many times. There are other
   * differences in the implementation, but this is the most significant.
   */
  class Request {


    /**
     * Http method with which to perform the request.
     *
     * Defaults to GET.
     */
     method: RequestMethods;

     mode: RequestModesOpts;

     credentials: RequestCredentialsOpts;


    /**
     * Headers object based on the `Headers` class in the [Fetch
     * Spec](https://fetch.spec.whatwg.org/#headers-class). {@link Headers} class reference.
     */
     headers: Headers;


    /**
     * Url of the remote resource
     */
     url: string;

     cache: RequestCacheOpts;


    /**
     * Returns the request's body as string, assuming that body exists. If body is undefined, return
     * empty
     * string.
     */
     text(): String;
  }


  /**
   * Creates `Response` instances from provided values.
   *
   * Though this object isn't
   * usually instantiated by end-users, it is the primary object interacted with when it comes time to
   * add data to a view.
   *
   * #Example
   *
   * ```
   * http.request('my-friends.txt').subscribe(response => this.friends = response.text());
   * ```
   *
   * The Response's interface is inspired by the Response constructor defined in the [Fetch
   * Spec](https://fetch.spec.whatwg.org/#response-class), but is considered a static value whose body
   * can be accessed many times. There are other differences in the implementation, but this is the
   * most significant.
   */
  class Response {


    /**
     * One of "basic", "cors", "default", "error, or "opaque".
     *
     * Defaults to "default".
     */
     type: ResponseTypes;


    /**
     * True if the response's status is within 200-299
     */
     ok: boolean;


    /**
     * URL of response.
     *
     * Defaults to empty string.
     */
     url: string;


    /**
     * Status code returned by server.
     *
     * Defaults to 200.
     */
     status: number;


    /**
     * Text representing the corresponding reason phrase to the `status`, as defined in [ietf rfc 2616
     * section 6.1.1](https://tools.ietf.org/html/rfc2616#section-6.1.1)
     *
     * Defaults to "OK"
     */
     statusText: string;


    /**
     * Non-standard property
     *
     * Denotes how many of the response body's bytes have been loaded, for example if the response is
     * the result of a progress event.
     */
     bytesLoaded: number;


    /**
     * Non-standard property
     *
     * Denotes how many bytes are expected in the final response body.
     */
     totalBytes: number;


    /**
     * Headers object based on the `Headers` class in the [Fetch
     * Spec](https://fetch.spec.whatwg.org/#headers-class).
     */
     headers: Headers;


    /**
     * Not yet implemented
     */
     blob(): any;


    /**
     * Attempts to return body as parsed `JSON` object, or raises an exception.
     */
     json(): Object;


    /**
     * Returns the body as a string, presuming `toString()` can be called on the response body.
     */
     text(): string;


    /**
     * Not yet implemented
     */
     arrayBuffer(): any;
  }


  /**
   * Interface for options to construct a Request, based on
   * [RequestInit](https://fetch.spec.whatwg.org/#requestinit) from the Fetch spec.
   */
  interface IRequestOptions {

     url?: string;

     method?: RequestMethods;

     headers?: Headers;

     body?: string;

     mode?: RequestModesOpts;

     credentials?: RequestCredentialsOpts;

     cache?: RequestCacheOpts;
  }


  /**
   * Interface for options to construct a Response, based on
   * [ResponseInit](https://fetch.spec.whatwg.org/#responseinit) from the Fetch spec.
   */
  interface IResponseOptions {

     body?: string | Object | FormData;

     status?: number;

     statusText?: string;

     headers?: Headers;

     type?: ResponseTypes;

     url?: string;
  }


  /**
   * Abstract class from which real connections are derived.
   */
  class Connection {

     readyState: ReadyStates;

     request: Request;

     response: EventEmitter;

     dispose(): void;
  }


  /**
   * Abstract class from which real backends are derived.
   *
   * The primary purpose of a `ConnectionBackend` is to create new connections to fulfill a given
   * {@link Request}.
   */
  class ConnectionBackend {

     createConnection(request: any): Connection;
  }


  /**
   * Injectable version of {@link RequestOptions}, with overridable default values.
   *
   * #Example
   *
   * ```
   * import {Http, BaseRequestOptions, Request} from 'angular2/http';
   * ...
   * class MyComponent {
   *   constructor(baseRequestOptions:BaseRequestOptions, http:Http) {
   *     var options = baseRequestOptions.merge({body: 'foobar', url: 'https://foo'});
   *     var request = new Request(options);
   *     http.request(request).subscribe(res => this.bars = res.json());
   *   }
   * }
   *
   * ```
   */
  class BaseRequestOptions extends RequestOptions {
  }


  /**
   * Creates a request options object similar to the `RequestInit` description
   * in the [Fetch
   * Spec](https://fetch.spec.whatwg.org/#requestinit) to be optionally provided when instantiating a
   * {@link Request}.
   *
   * All values are null by default.
   */
  class RequestOptions implements IRequestOptions {


    /**
     * Http method with which to execute the request.
     *
     * Defaults to "GET".
     */
     method: RequestMethods;


    /**
     * Headers object based on the `Headers` class in the [Fetch
     * Spec](https://fetch.spec.whatwg.org/#headers-class).
     */
     headers: Headers;


    /**
     * Body to be used when creating the request.
     */
     body: string;

     mode: RequestModesOpts;

     credentials: RequestCredentialsOpts;

     cache: RequestCacheOpts;

     url: string;


    /**
     * Creates a copy of the `RequestOptions` instance, using the optional input as values to override
     * existing values.
     */
     merge(options?: IRequestOptions): RequestOptions;
  }


  /**
   * Injectable version of {@link ResponseOptions}, with overridable default values.
   */
  class BaseResponseOptions extends ResponseOptions {

     body: string | Object | ArrayBuffer | JSON | FormData | Blob;

     status: number;

     headers: Headers;

     statusText: string;

     type: ResponseTypes;

     url: string;
  }


  /**
   * Creates a response options object similar to the
   * [ResponseInit](https://fetch.spec.whatwg.org/#responseinit) description
   * in the Fetch
   * Spec to be optionally provided when instantiating a
   * {@link Response}.
   *
   * All values are null by default.
   */
  class ResponseOptions implements IResponseOptions {

     body: string | Object;

     status: number;

     headers: Headers;

     statusText: string;

     type: ResponseTypes;

     url: string;

     merge(options?: IResponseOptions): ResponseOptions;
  }


  /**
   * Creates {@link XHRConnection} instances.
   *
   * This class would typically not be used by end users, but could be
   * overridden if a different backend implementation should be used,
   * such as in a node backend.
   *
   * #Example
   *
   * ```
   * import {Http, MyNodeBackend, httpInjectables, BaseRequestOptions} from 'angular2/http';
   * @Component({
   *   viewInjector: [
   *     httpInjectables,
   *     bind(Http).toFactory((backend, options) => {
   *       return new Http(backend, options);
   *     }, [MyNodeBackend, BaseRequestOptions])]
   * })
   * class MyComponent {
   *   constructor(http:Http) {
   *     http('people.json').subscribe(res => this.people = res.json());
   *   }
   * }
   * ```
   */
  class XHRBackend implements ConnectionBackend {

     createConnection(request: Request): XHRConnection;
  }


  /**
   * Creates connections using `XMLHttpRequest`. Given a fully-qualified
   * request, an `XHRConnection` will immediately create an `XMLHttpRequest` object and send the
   * request.
   *
   * This class would typically not be created or interacted with directly inside applications, though
   * the {@link MockConnection} may be interacted with in tests.
   */
  class XHRConnection implements Connection {

     request: Request;


    /**
     * Response {@link EventEmitter} which emits a single {@link Response} value on load event of
     * `XMLHttpRequest`.
     */
     response: EventEmitter;

     readyState: ReadyStates;


    /**
     * Calls abort on the underlying XMLHttpRequest.
     */
     dispose(): void;
  }

  class JSONPBackend implements ConnectionBackend {

     createConnection(request: Request): JSONPConnection;
  }

  class JSONPConnection implements Connection {

     readyState: ReadyStates;

     request: Request;

     response: EventEmitter;

     baseResponseOptions: ResponseOptions;

     finished(data?: any): void;

     dispose(): void;
  }


  /**
   * Performs http requests using `XMLHttpRequest` as the default backend.
   *
   * `Http` is available as an injectable class, with methods to perform http requests. Calling
   * `request` returns an {@link EventEmitter} which will emit a single {@link Response} when a
   * response is received.
   *
   *
   * ## Breaking Change
   *
   * Previously, methods of `Http` would return an RxJS Observable directly. For now,
   * the `toRx()` method of {@link EventEmitter} needs to be called in order to get the RxJS
   * Subject. `EventEmitter` does not provide combinators like `map`, and has different semantics for
   * subscribing/observing. This is temporary; the result of all `Http` method calls will be either an
   * Observable
   * or Dart Stream when [issue #2794](https://github.com/angular/angular/issues/2794) is resolved.
   *
   * #Example
   *
   * ```
   * import {Http, httpInjectables} from 'angular2/http';
   * @Component({selector: 'http-app', viewInjector: [httpInjectables]})
   * @View({templateUrl: 'people.html'})
   * class PeopleComponent {
   *   constructor(http: Http) {
   *     http.get('people.json')
   *       //Get the RxJS Subject
   *       .toRx()
   *       // Call map on the response observable to get the parsed people object
   *       .map(res => res.json())
   *       // Subscribe to the observable to get the parsed people object and attach it to the
   *       // component
   *       .subscribe(people => this.people = people);
   *   }
   * }
   * ```
   *
   * To use the {@link EventEmitter} returned by `Http`, simply pass a generator (See "interface
   * Generator" in the Async Generator spec: https://github.com/jhusain/asyncgenerator) to the
   * `observer` method of the returned emitter, with optional methods of `next`, `throw`, and `return`.
   *
   * #Example
   *
   * ```
   * http.get('people.json').observer({next: (value) => this.people = people});
   * ```
   *
   * The default construct used to perform requests, `XMLHttpRequest`, is abstracted as a "Backend" (
   * {@link XHRBackend} in this case), which could be mocked with dependency injection by replacing
   * the {@link XHRBackend} binding, as in the following example:
   *
   * #Example
   *
   * ```
   * import {MockBackend, BaseRequestOptions, Http} from 'angular2/http';
   * var injector = Injector.resolveAndCreate([
   *   BaseRequestOptions,
   *   MockBackend,
   *   bind(Http).toFactory(
   *       function(backend, defaultOptions) {
   *         return new Http(backend, defaultOptions);
   *       },
   *       [MockBackend, BaseRequestOptions])
   * ]);
   * var http = injector.get(Http);
   * http.get('request-from-mock-backend.json').toRx().subscribe((res:Response) => doSomething(res));
   * ```
   */
  class Http {


    /**
     * Performs any type of http request. First argument is required, and can either be a url or
     * a {@link Request} instance. If the first argument is a url, an optional {@link RequestOptions}
     * object can be provided as the 2nd argument. The options object will be merged with the values
     * of {@link BaseRequestOptions} before performing the request.
     */
     request(url: string | Request, options?: IRequestOptions): EventEmitter;


    /**
     * Performs a request with `get` http method.
     */
     get(url: string, options?: IRequestOptions): EventEmitter;


    /**
     * Performs a request with `post` http method.
     */
     post(url: string, body: string, options?: IRequestOptions): EventEmitter;


    /**
     * Performs a request with `put` http method.
     */
     put(url: string, body: string, options?: IRequestOptions): EventEmitter;


    /**
     * Performs a request with `delete` http method.
     */
     delete(url: string, options?: IRequestOptions): EventEmitter;


    /**
     * Performs a request with `patch` http method.
     */
     patch(url: string, body: string, options?: IRequestOptions): EventEmitter;


    /**
     * Performs a request with `head` http method.
     */
     head(url: string, options?: IRequestOptions): EventEmitter;
  }

  class Jsonp extends Http {


    /**
     * Performs any type of http request. First argument is required, and can either be a url or
     * a {@link Request} instance. If the first argument is a url, an optional {@link RequestOptions}
     * object can be provided as the 2nd argument. The options object will be merged with the values
     * of {@link BaseRequestOptions} before performing the request.
     */
     request(url: string | Request, options?: IRequestOptions): EventEmitter;
  }


  /**
   * Polyfill for [Headers](https://developer.mozilla.org/en-US/docs/Web/API/Headers/Headers), as
   * specified in the [Fetch Spec](https://fetch.spec.whatwg.org/#headers-class). The only known
   * difference from the spec is the lack of an `entries` method.
   */
  class Headers {


    /**
     * Appends a header to existing list of header values for a given header name.
     */
     append(name: string, value: string): void;


    /**
     * Deletes all header values for the given name.
     */
     delete(name: string): void;

     forEach(fn: Function): void;


    /**
     * Returns first header that matches given name.
     */
     get(header: string): string;


    /**
     * Check for existence of header by given name.
     */
     has(header: string): boolean;


    /**
     * Provides names of set headers
     */
     keys(): List<string>;


    /**
     * Sets or overrides header value for given name.
     */
     set(header: string, value: string | List<string>): void;


    /**
     * Returns values of all headers.
     */
     values(): List<List<string>>;


    /**
     * Returns list of header values for a given name.
     */
     getAll(header: string): Array<string>;


    /**
     * This method is not implemented.
     */
     entries(): void;
  }


  /**
   * Acceptable response types to be associated with a {@link Response}, based on
   * [ResponseType](https://fetch.spec.whatwg.org/#responsetype) from the Fetch spec.
   */
  enum ResponseTypes {
    Basic,
    Cors,
    Default,
    Error,
    Opaque
  }


  /**
   * All possible states in which a connection can be, based on
   * [States](http://www.w3.org/TR/XMLHttpRequest/#states) from the `XMLHttpRequest` spec, but with an
   * additional "CANCELLED" state.
   */
  enum ReadyStates {
    UNSENT,
    OPEN,
    HEADERS_RECEIVED,
    LOADING,
    DONE,
    CANCELLED
  }


  /**
   * Supported http methods.
   */
  enum RequestMethods {
    GET,
    POST,
    PUT,
    DELETE,
    OPTIONS,
    HEAD,
    PATCH
  }


  /**
   * Acceptable credentials option to be associated with a {@link Request}, based on
   * [RequestCredentials](https://fetch.spec.whatwg.org/#requestcredentials) from the Fetch spec.
   */
  enum RequestCredentialsOpts {
    Omit,
    SameOrigin,
    Include
  }


  /**
   * Acceptable cache option to be associated with a {@link Request}, based on
   * [RequestCache](https://fetch.spec.whatwg.org/#requestcache) from the Fetch spec.
   */
  enum RequestCacheOpts {
    Default,
    NoStore,
    Reload,
    NoCache,
    ForceCache,
    OnlyIfCached
  }


  /**
   * Acceptable origin modes to be associated with a {@link Request}, based on
   * [RequestMode](https://fetch.spec.whatwg.org/#requestmode) from the Fetch spec.
   */
  enum RequestModesOpts {
    Cors,
    NoCors,
    SameOrigin
  }


  /**
   * Map-like representation of url search parameters, based on
   * [URLSearchParams](https://url.spec.whatwg.org/#urlsearchparams) in the url living standard.
   */
  class URLSearchParams {

     paramsMap: Map<string, List<string>>;

     rawParams: string;

     has(param: string): boolean;

     get(param: string): string;

     getAll(param: string): List<string>;

     append(param: string, val: string): void;

     toString(): string;

     delete(param: string): void;
  }


  /**
   * Provides a basic set of injectables to use the {@link Http} service in any application.
   *
   * #Example
   *
   * ```
   * import {httpInjectables, Http} from 'angular2/http';
   * @Component({selector: 'http-app', viewInjector: [httpInjectables]})
   * @View({template: '{{data}}'})
   * class MyApp {
   *   constructor(http:Http) {
   *     http.request('data.txt').subscribe(res => this.data = res.text());
   *   }
   * }
   * ```
   */
  var httpInjectables : List<any> ;

  var jsonpInjectables : List<any> ;

  var ApplicationRef: InjectableReference;

  var Compiler: InjectableReference;

  var AppViewManager: InjectableReference;

  var ProtoViewRef: InjectableReference;

  var Key: InjectableReference;

}



declare module "angular2/angular2" {
  export = ng;
}
