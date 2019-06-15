export default {
  name: 'router-link',
  render(createElement) {
    const self = this;
    return createElement(self.tag, {
      on: {
        click() {
          self.$router.send(self.event);
        },
      },
    }, this.$slots.default);
  },
  props: {
    tag: {
      type: String,
      default: 'button',
    },
    event: {
      type: String,
      default: 'navigate',
    },
  },
};
