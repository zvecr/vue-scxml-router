/* eslint-disable no-underscore-dangle */
import { Machine, interpret } from 'xstate';

import RouterView from './components/RouterView';
import RouterLink from './components/RouterLink';

function convert(data) {
  // if (typeof data === 'string') {
  //   // TODO: parse string with xml2js parseString
  //   data = { scxml: {} };
  // } else if (!data) {
  //   data = { scxml: {} };
  // }

  console.log('data:', data);

  // const machine = (model instanceof Machine) ? Machine(model) : model;
  const scxml = data.scxml;

  // TODO: convert betterer
  const model = {};
  model.id = scxml.$.name;
  model.initial = scxml.$.initial;
  model.states = {};
  scxml.state.forEach((state) => {
    model.states[state.$.id] = { on: {} };

    state.transition.forEach((transition) => {
      model.states[state.$.id].on[transition.$.event] = transition.$.target;
    });
  });

  return model;
}

export default class VueStateRouter {
  constructor(model, opts = { logging: true }) {
    const machine = Machine(convert(model));

    console.log('load:', machine, opts);

    const service = interpret(machine)
      .onTransition((state) => { this.__state = state; });

    if (opts.logging) {
      service.onTransition(state => console.log('trans to:', state.value));
    }

    this.__service = service;
  }

  static install(Vue, opts = {}) {
    console.log('installing with options:', opts);

    Vue.mixin({
      beforeCreate() {
        if (this.$options.router) {
          this.__routerRoot = this;
          this.__router = this.$options.router;

          Vue.util.defineReactive(this.__router, '__state', {});

          console.log('Starting state machine');

          this.__router.__service.onTransition(state => this.$emit('scxml:trans', state));
          this.__router.__service.start();
        } else {
          this.__routerRoot = (this.$parent && this.$parent.__routerRoot) || this;
        }
      },
    });

    Object.defineProperty(Vue.prototype, '$router', {
      get() {
        return {
          emit: (...args) => this.__routerRoot.__router.__service.send(...args),
        };
      },
    });

    Object.defineProperty(Vue.prototype, '$route', {
      get() {
        return this.__routerRoot.__router.__state.value;// toStrings()[0];//this._service;
      },
    });

    Vue.component('RouterView', RouterView);
    Vue.component('RouterLink', RouterLink);
  }
}
