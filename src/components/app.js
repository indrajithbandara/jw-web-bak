import React, {Component, PropTypes} from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

export default class App extends Component {
  static propTypes = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {pathname} = this.props.location

    const key = pathname.split('/')[1] || 'root'
    let _class = this.props.location.action == "POP"
      ? "swapout"
      : "swap";
    return (
      <div className="appframe">
        {this.props.children || '测试首页'}
      </div>
    );
  }
}
