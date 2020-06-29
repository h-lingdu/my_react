import React, { Component } from "react";
import axios from "axios";
import { Pagination, Radio, Input, Button } from "element-react";
import "./About.css";
import "element-theme-default";
axios.defaults.baseURL = "http://localhost:5000/movie";

export default class About extends Component {
  constructor(props) {
    super(props);
    this.state = {
      msg: this.props.msg,
      list: [],
      total: 0,
      pageSize: 10,
      currentPage: 0,
      value: 0, //排序用
      inputValue: "",
    };
  }
  changeInputValue = (val) => {
    console.log(val);
    this.setState({
      inputValue: val,
    });
  };
  searchValue = () => {
    this.getData();
  };
  changeValue = (value) => {
    //排序
    console.log("value", value);
    this.setState(
      {
        value,
        pageSize: 10,
        currentPage: 0,
      },
      () => {
        this.getData();
      }
    );
  };
  getData = () => {
    //请求数据
    let { pageSize, currentPage, value, inputValue } = this.state;
    let params = {
      pagesize: pageSize,
      pagenum: currentPage,
    };
    if (value === "1") {
      params["rate"] = -1;
    }
    if (value === "2") {
      params["rate"] = 1;
    }
    if (value === "3") {
      params["year"] = -1;
    }
    if (value === "4") {
      params["year"] = 1;
    }
    if (inputValue) {
      params["title"] = inputValue;
    }
    console.log("params", params);
    axios.get("/getdata", { params }).then((res) => {
      this.setState({
        list: res.data.result,
        total: res.data.total,
      });
    });
  };
  onSizeChange = (val) => {
    //改变每页条数
    console.log("onSizeChange", val);
    this.setState(
      {
        pageSize: val,
        currentPage: 0,
      },
      () => {
        this.getData();
      }
    );
  };
  onCurrentChange = (val) => {
    //改变当前页
    console.log("onCurrentChange", val);
    this.setState(
      {
        pageSize: 10,
        currentPage: val - 1,
      },
      () => {
        this.getData();
      }
    );
  };
  componentDidMount() {
    this.getData();
  }
  render() {
    let { msg, list, total, pageSize, currentPage } = this.state;
    return (
      <div className="about">
        <h4>{msg}</h4>
        <div className="search">
          <Input
            placeholder="请输入电影名"
            value={this.state.inputValue}
            onChange={this.changeInputValue}
            append={
              <Button onClick={this.searchValue} type="primary" icon="search">
                搜索
              </Button>
            }
          />
        </div>
        <Radio.Group value={this.state.value} onChange={this.changeValue}>
          <Radio value="0">默认排序</Radio>
          <Radio value="1">评分降序</Radio>
          <Radio value="2">评分升序</Radio>
          <Radio value="3">年份降序</Radio>
          <Radio value="4">年份升序</Radio>
        </Radio.Group>
        <ul className="photo">
          {list.map((item, index) => {
            return (
              <li key={index}>
                <img src={item.images.small} alt="" />
                <p>
                  <span className="span1">{item.title}</span>
                  <span className="span2">{item.rating.average}</span>
                </p>
              </li>
            );
          })}
        </ul>
        <div className="Pagination">
          <Pagination
            layout="total, sizes, prev, pager, next"
            total={total}
            pageSizes={[10, 20, 30, 40, 50]}
            pageSize={pageSize}
            currentPage={currentPage + 1}
            onSizeChange={this.onSizeChange}
            onCurrentChange={this.onCurrentChange}
          />
        </div>
      </div>
    );
  }
}
