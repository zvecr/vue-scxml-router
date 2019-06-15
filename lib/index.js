import { Machine, interpret } from 'xstate';

const model2 = {
    id: 'example',
    initial: 'foo',
    states: {
      foo: {
        on: {
          navigate: 'bar'
        }
      },
      bar: {
        on: {
          navigate: 'foo'
        }
      }
    }
  };

export default class VueStateRouter {
    constructor(model, opts = { logging: true }) {
      // const machine = (model instanceof Machine) ? Machine(model) : model;
      const machine = Machine(model2);
  
      console.log("load:", machine, opts);
  
      const service = interpret(machine)
        .onTransition(state => this.__state = state);
  
      if(opts.logging){
        service.onTransition(state => console.log("trans to:", state.value));
      }
  
      this.__service = service;
    }
  
    static install(Vue, opts = {}) {
      console.log("installing with options:", opts);
  
      Vue.mixin({
        beforeCreate() {
          if(this.$options.router){
            this.__routerRoot = this
            this.__router = this.$options.router
  
            Vue.util.defineReactive(this.__router, '__state', {})
  
            console.log("Starting state machine");  
            this.__router.__service.start();
          } else {
            this.__routerRoot = (this.$parent && this.$parent.__routerRoot) || this
          }
        }
      })
  
      Object.defineProperty(Vue.prototype, '$router', {
        get() {
          return this.__routerRoot.__router.__service;
        }
      })
  
      Object.defineProperty(Vue.prototype, '$route', {
        get() {
          return this.__routerRoot.__router.__state.value;//toStrings()[0];//this._service;
        }
      })
  
      // Vue.component('RouterView', RouterView);
      // Vue.component('RouterLink', RouterLink);
    }
  }
  
