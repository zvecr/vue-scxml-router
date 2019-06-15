export default {
  name: 'router-view',
  functional: true,
  render: (_, { children, parent, data }) => {
    // TODO: better component creation
    const createElement = parent.$createElement;
    const route = parent.$route;
    const component = parent.$options.components[route];
    if (!component) {
      return createElement();
    }
    return createElement(component, data, children);
  },
};
