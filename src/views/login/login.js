import React, { Component } from 'react'

export default class login extends Component {
  constructor (props){
    super(props)
    this.state= {
      username: '',
      password: ''
    }
  }
  handleChange(event, name) {
		const value = event.target.value;
		this.setState({ [name]: value });
	}
  render() {
    return (
      <div>
        <input type="text" placeholder= 'username' onChange = {(e)=> this.handleChange(e, "username")} />
        <input type="password" placeholder= 'password' onChange = {(e)=> this.handleChange(e, "password")}/>
      </div>
    )
  }
}
