import React, { Component } from "react";

import UserService from "../services/user.service";
import EventBus from "../common/EventBus";

export default class BoardAdmin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: []
    };
  }

  componentDidMount() {
    UserService.getAdminBoard().then(
      response => {
        this.setState({
          data: response.data
        });
        console.log(response.data)
      },
      error => {
        this.setState({
          content:
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString()
        });

        if (error.response && error.response.status === 401) {
          EventBus.dispatch("logout");
        }
      }
    );
  }


  render() {
    return (
      <div className="container">
        <header className="jumbotron">
          {this.state.data.map((emp,index)=>(
              <div key={index}>
                <h3>{emp.employee_name}</h3>
                <h4>{emp.employee_name}</h4>
              </div>
          ))}
        </header>
      </div>
    );
  }
}
