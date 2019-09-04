/* eslint eqeqeq: 0 */
import React, { Component, ComponentClass, ComponentType } from "react";

function computeHeight(node: Node) {
  let css = getComputedStyle(node as Element);
  const totalHeight = parseInt(css.height ? css.height : '0', 10);
  const padding =
    parseInt(css.paddingTop ? css.paddingTop : '0', 10) +
    parseInt(css.paddingBottom ? css.paddingBottom : '0', 10);
  return totalHeight - padding;
}

function getAutoHeight(n: Node) {
  if (!n) {
    return 0;
  }

  let node = n;

  let height = computeHeight(node);

  while (!height) {
    if (node.parentNode) {
      node = node.parentNode;
      height = computeHeight(node);
    } else {
      break;
    }
  }

  return height;
}

function autoHeight(): <P extends any>(WrappedComponent: ComponentType<P>) => ComponentClass<P> {
  return <P extends any>(WrappedComponent: ComponentType<P>) =>
  class extends Component<P> {
    state = {
      computedHeight: 0,
    };

    root: HTMLDivElement;

    componentDidMount() {
      const { height } = this.props;
      if (!height) {
        const h = getAutoHeight(this.root);
        // eslint-disable-next-line
        this.setState({ computedHeight: h });
      }
    }

    handleRoot = (node: HTMLDivElement) => {
      this.root = node;
    };

    render() {
      const { height } = this.props;
      const { computedHeight } = this.state;
      const h = height || computedHeight;
      return (
        <div ref={this.handleRoot}>{h > 0 && <WrappedComponent {...this.props} height={h} />}</div>
      );
    }
  };
} 

export default autoHeight;
