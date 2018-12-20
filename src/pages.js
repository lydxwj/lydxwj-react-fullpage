import React, { Component } from 'react';
import PropTypes from 'prop-types';
export default class Pages extends Component {
  constructor(props) {
    super(props);
    this.$pages = React.createRef();
  }
  static propTypes = {
    /**
     * @title 回看回调函数
     * @description
     */
    again: PropTypes.func,
    /**
     * @title 回看设置
     * @description
     */
    againCof: PropTypes.shape({
      /**
       * @title 是否显示
       * @description
       */
      isShow: PropTypes.bool,
      /**
       * @title 文案
       * @description
       */
      text: PropTypes.string,
    })
  };

  static defaultProps = {
    style: {
    },
    againCof: {
      isShow: true,
      text: '回看',
    },
  };
  componentDidMount(){
    this.__init();
  }
  __init() {
    const pages = this.props.pages;
    this.$pages.current.style.height = 100 / pages + '%';
  }
  __again() {
    this.props.againFunc();
    if (this.props.again) {
      this.props.again();
    }
  }
  render() {
    const style = this.props.style;
    const idx = this.props.idx;
    const againCof = this.props.againCof;
    const pages = this.props.pages;
    return (
      <div className={'full_pages full_pages_' + idx } ref={this.$pages} style={style}>
        {this.props.children}
        {againCof.isShow && (pages === idx) ? <div className="full_pages_again" onClick={this.__again.bind(this)}>{againCof.text}</div> : null}
      </div>
    );
  }
}
