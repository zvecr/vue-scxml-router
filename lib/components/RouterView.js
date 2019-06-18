export default {
  name: 'router-view',
  functional: true,
  render: (_, { children, parent, data }) => {
    const createElement = parent.$createElement;
    const route = parent.$route.name;

    // TODO: better component creation
    const component = parent.$options.components[route];
    if (!component) {
      return createElement();
    }
    return createElement(component, data, children);
  },
};
