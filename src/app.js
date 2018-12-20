import React, { Component } from 'react';
import PropTypes from 'prop-types';
export default class PageContainer extends Component {
  constructor(props) {
    super(props);
    this.pagesKey = 0;
    this.state = {
      children: React.Children.toArray(this.props.children),
      currentIndex: 0,
    };
    this.startY = 0;
    this.distanceY = 0;
    this.moveY = 0;
    this.isMove = false;
    this.isChange = false;
    this.pageMoving = false;
    this.$full = React.createRef();
  }
  static propTypes = {
    /**
     * @title 是否显示下滑提示箭头
     * @description
     */
    isArrow: PropTypes.bool,
    /**
     * @title 是否显示指示器
     * @description
     */
    isNav: PropTypes.bool,
    /**
     * @title 切换回调函数
     * @description
     */
    onChange: PropTypes.func,
    /**
     * @title 切换完成后回调函数
     * @description
     */
    onChangeEnd: PropTypes.func,
  };

  static defaultProps = {
    isArrow: true,
    isNav: true,
  };
  componentDidMount(){
    this.init();
  }
  init() {
    const pages = this.state.children.length;
    const $full = this.$full.current;
    $full.style.height = 100 * pages + '%';
    this.bindTouchEvent($full);
  }
  bindTouchEvent($full) {
    $full.addEventListener('touchstart', this.touchstartEvent);
    // $full.addEventListener('mousedown', this.touchstartEvent);
    $full.addEventListener('touchmove', this.touchmoveEvent);
    $full.addEventListener('touchend', this.touchendEvent);
    // $full.addEventListener('mouseup', this.touchendEvent);
  }
  unbindTouchEvent($full) {
    $full.removeEventListener('touchstart', this.touchstartEvent);
    $full.removeEventListener('touchmove', this.touchmoveEvent);
    $full.removeEventListener('touchend', this.touchendEvent);
  }
  touchstartEvent = e => {
    this.startY = e.touches[0].clientY;
  }
  touchmoveEvent = e => {
    e.preventDefault();
    this.isMove = true;
    this.moveY = e.touches[0].clientY;
    this.distanceY = this.moveY - this.startY;
  }
  touchendEvent = () => {
    const $full = this.$full.current;
    const pages = this.state.children.length;
    if (Math.abs(this.distanceY) > 10 && this.isMove && !this.pageMoving) {
      if (this.distanceY > 0) {
        if (this.state.currentIndex > 0) {
          if (this.props.onChange) {
            this.props.onChange(this.state.currentIndex, this.state.currentIndex - 1);
          }
          this.setState({
            currentIndex: --this.state.currentIndex,
          });
          this.isChange = true;
        }
      } else {
        if (this.state.currentIndex < (pages - 1)) {
          if (this.props.onChange) {
            this.props.onChange(this.state.currentIndex, this.state.currentIndex + 1);
          }
          this.setState({
            currentIndex: ++this.state.currentIndex,
          });
          this.isChange = true;
        }
      }
      if (this.isChange) {
        this.pageMoving = true;
        $full.style.transform = 'translate3d(0, ' + (-100 / pages * this.state.currentIndex) + '%, 0)';
        this.removeClass('#fullpage .full_pages', 'full_pages_active');
        this.addClass('#fullpage .full_pages', 'full_pages_active', this.state.currentIndex);
        setTimeout(() => {
          this.pageMoving = false;
          this.isChange = false;
          if (this.props.onChangeEnd) {
            this.props.onChangeEnd(this.state.currentIndex);
          }
        }, 500);
      }
      this.startY = 0;
      this.moveY = 0;
      this.distanceY = 0;
      this.isMove = false;
    } else {
      this.startY = 0;
      this.moveY = 0;
      this.distanceY = 0;
      this.isMove = false;
    }
  }
  removeClass(el, className) {
    const nodeLists = document.querySelectorAll(el);
    if (nodeLists.length > 0) {
      nodeLists.forEach(nodes => {
        nodes.classList.remove(className);
      });
    }
  }
  addClass(el, className, num) {
    const nodeLists = document.querySelectorAll(el);
    if (nodeLists.length > 0) {
      if (num <= nodeLists.length) {
        nodeLists[num].classList.add(className);
      } else if (num === undefined) {
        nodeLists.forEach(nodes => {
          nodes.classList.add(className);
        });
      }
    }
  }
  __renderNav() {
    const isNav = this.props.isNav;
    const children = this.state.children;
    const currentIndex = this.state.currentIndex;
    if (isNav) {
      return (
        <ul className="fullpage_nav">
          {children.map((el, idx) => {
            return <li key={idx} className={currentIndex === idx ? 'nav_active fullpage_nav_item' : 'fullpage_nav_item'}></li>
          })}
        </ul>
      );
    }
  }
  render() {
    const children = this.state.children;
    const isArrow = this.props.isArrow;
    const currentIndex = this.state.currentIndex + 1;
    const pages = this.state.children.length;
    const isShowArrow = (currentIndex !== pages);
    const style = this.props.style;
    return (
      <div className="fullpage" id="fullpage">
        <div className="full_contain" ref={this.$full} style={style}>
          {children.map((child, index) => {
            return React.cloneElement(child, this.__getDefine(index));
          })}
        </div>
        {isArrow && isShowArrow ? <div className="full_pages_down" onClick={this.__nextPage.bind(this)}>&#xeb0a;</div> : null}
        {this.__renderNav()}
      </div>
    );
  }
  __getDefine(index) {
    return {
      key: index,
      idx: index + 1,
      currentIdx: this.state.currentIndex,
      againFunc: this.__again.bind(this),
      pages: this.state.children.length,
    };
  }
  __again() {
    const $full = this.$full.current;
    $full.style.transitionDuration = '0s';
    $full.style.transform = 'translateY(0%)';
    this.removeClass('#fullpage .full_pages', 'full_pages_active');
    this.addClass('#fullpage .full_pages', 'full_pages_active', 0);
    this.startY = 0;
    this.moveY = 0;
    this.distanceY = 0;
    this.isMove = false;
    setTimeout(() => {
      this.setState({
        currentIndex: 0,
      });
      $full.style.transitionDuration = '0.5s';
    }, 10);
  }
  __nextPage() {
    const pages = this.state.children.length;
    const $full = this.$full.current;
    if (this.state.currentIndex < (pages - 1)) {
      if (this.props.onChange) {
        this.props.onChange(this.state.currentIndex, this.state.currentIndex + 1);
      }
      this.setState({
        currentIndex: ++this.state.currentIndex,
      });
      this.isChange = true;
    }
    if (this.isChange) {
      this.pageMoving = true;
      $full.style.transform = 'translate3d(0, ' + (-100 / pages * this.state.currentIndex) + '%, 0)';
      this.removeClass('#fullpage .full_pages', 'full_pages_active');
      this.addClass('#fullpage .full_pages', 'full_pages_active', this.state.currentIndex);
      setTimeout(() => {
        this.pageMoving = false;
        this.isChange = false;
        if (this.props.onChangeEnd) {
          this.props.onChangeEnd(this.state.currentIndex);
        }
      }, 500);
    }
    this.startY = 0;
    this.moveY = 0;
    this.distanceY = 0;
    this.isMove = false;
  }
}
