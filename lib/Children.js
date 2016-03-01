export default function Children(tree, props) {
  if (props['@children']) {
    return props['@children'];
  }
};