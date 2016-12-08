import {is} from 'immutable';
// 判断如果两次props和state的值相同则不用render方法
function shouldComponentUpdate(nextProps, nextState) {
  const revalue = !(this.props === nextProps || is(this.props, nextProps)) || !(this.state === nextState || is(this.state, nextState));
  return revalue;
}

export function IsRender(component) {
  component.prototype.shouldComponentUpdate = shouldComponentUpdate;
}
