function findTag(children, tag = 'a') {
  let found;
  (children || []).forEach((child) => {
    if (child.tag === tag) {
      found = child;
    } else if (child.children) {
      found = findTag(child.children);
    }
  });
  return found;
}

export default {
  name: 'router-link',
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
    activeClass: String,
  },
  render(createElement) {
    const router = this.$router;

    const data = {
      class: {
        // TODO: find a better method to detect 'active'
        [this.activeClass]: !router.canEmit(this.to),
      },
      on: {
        [this.event]: () => {
          this.$router.emit(this.to);
        },
      },
    };

    if (this.tag !== 'a') {
      const a = findTag(this.$slots.default);
      if (a) {
        // Move listener from created tag to child 'a'
        a.data = a.data || {};
        a.data.on = data.on;
        data.on = {};
      }
    }

    return createElement(this.tag, data, this.$slots.default);
  },
};
