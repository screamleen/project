import React from 'react';
import WepApplist from './applist.jsx';
import {Link} from 'react-router';

// 假设这是ajax请求回来的数据
var List = {
  1: [
      {
        appname: '同学号',
        url: '/focus',
        img: '../img/stu_no_icon.png'
      },
      {
        appname: '公交运营',
        url: '',
        img: '../img/vehicle.png',
      }
  ],
  2: [
    {
      appname: '安全闭环',
      url: '',
      img: '../img/stu_no_icon.png',
    }
  ],
  3: [
    {
      appname:'数据填报',
      url: '',
      img: '',
    },
    {
      appname: '站务',
      url: '',
      img: '',
    }
  ],
  4: []
};

export default  React.createClass({
  getInitialState(){
    return {
      'prjItem': 1
    };
  },
  handClick(e){
    // console.log(this);
    let elem = e.target;
    // console.log(this);
    this.setState({'prjItem':elem.getAttribute("data-key")});
  },
  render(){
    let children = List[this.state.prjItem].map(
      (e, i) => {
        // console.log(e);
        // console.log(1);
        // 防止数据库拿到的img为空而导致react渲染的时候css出错
        if(!e.img){
          e.img = "../img/img_error.png" ;
        }
        return(
          <li key={i}>
            <Link to={e.url}>
              <span style={{background:'url('+e.img+') center 10px / 32px 32px no-repeat'}}>{e.appname}</span>
            </Link>
          </li>
        );
      }
    );
    // console.log(List);
    return (
      <div>
        <header>
          <nav className="home-navbar">
            <ul>
              <li>
                <span className="kpi-icon" data-key="1" onClick={this.handClick}>关键指标</span>
              </li>
              <li>
                <span className="alalysis-icon" data-key="2" onClick={this.handClick}>专题分析</span>
              </li>
              <li>
                <span className="task-icon" data-key="3" onClick={this.handClick}>我的任务</span>
              </li>
              <li>
                <span className="myfollow-icon" data-key="4" onClick={this.handClick}>我的关注</span>
              </li>
            </ul>
          </nav>
        </header>
        <div className="applist">
          <ul>
            {children}
          </ul>
        </div>
      </div>
    )
  }
})
