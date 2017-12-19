/*
* @Author: scream_leen
* @Date:   2017-03-22 15:04:30
* @Last Modified by:   scream_leen
* @Last Modified time: 2017-03-22 15:04:33
*/
import React from 'react';
import {Link,IndexLink} from 'react-router';

export default React.createClass({
  render() {
    return (
      <div>
        <footer className="footer-nav">
          <ul>
            <li>
              <IndexLink  to="/" activeClassName="active" onlyActiveOnIndex><span className="nav-first">首页</span></IndexLink>
            </li>
            <li>
              <Link to="/around"  activeClassName="active"><span className="nav-second">周边</span></Link>
            </li>
            <li>
              <Link to="/focus"  activeClassName="active"><span className="nav-third">关注</span></Link>
            </li>
            <li>
              <Link to="/mine"  activeClassName="active"><span className="nav-fourth">我的</span></Link>
            </li>
          </ul>
        </footer>
        {this.props.children}
      </div>
    )
  }
});
