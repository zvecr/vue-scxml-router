// TODO: add support for:
//         nested <a>
//         active class
export default {
  name: 'router-link',
  render(createElement) {
    const self = this;
    return createElement(self.tag, {
      on: {
        [self.event]: () => {
          self.$router.emit(self.to);
        },
      },
    }, this.$slots.default);
  },
  props: {
    to: {
      type: String,
      required: true,
    },
    tag: {
      type: String,
      default: 'a',
    },
    event: {
      type: String,
      default: 'click',
    },
  },
};
