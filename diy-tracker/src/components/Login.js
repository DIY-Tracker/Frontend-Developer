import React from "react";
import axios from 'axios';

import styled from 'styled-components';

import { axiosWithAuth } from '../utils/axiosWithAuth';

const FormContainer = styled.div`
  height: 50vh;
  width:35vw;
  background-color: #F7F7F7;
  display:flex;
  align-items:center;
  justify-content:center;
  border-radius:5px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);

`
const FieldContainer = styled.div`
  height: 170px;
  display: flex; 
  flex-direction: column;
  justify-content: space-evenly;
`
const DivContainer = styled.div`
display:flex;
flex-direction:column;
justify-content:center;
align-items:center;
`;

const Input =styled.input`
border-radius: 5px;
`;
class Login extends React.Component {

  state = {
    credentials: {
      username: '',
      password: ''
    }
  };

  handleChange = e => {
    this.setState({
      credentials: {
        ...this.state.credentials,
        [e.target.name]: e.target.value
      }
    });
  };

  login = e => {
    e.preventDefault();
    axios
      .post('https://diy-tracker.herokuapp.com/login', `grant_type=password&username=${this.state.credentials.username}&password=${this.state.credentials.password}`, {

        headers: {
          Authorization: `Basic ${btoa('lambda-client:lambda-secret')}`,
          'Content-Type': 'application/x-www-form-urlencoded'
  
        }})
      .then(res => {
        console.log('token response:', res);
        localStorage.setItem('token', res.data.access_token);
        axiosWithAuth()
          .get('/users/getusername') 
            .then(response => {
              // console.log(response);
              this.props.history.push(`/users/${response.data.userid}`);
            })
      })
      .catch(err => console.log(err));
  };

  render() {
    return (
      <DivContainer>
        <h3 className="welcomeBack">Welcome Back</h3>
        <FormContainer>
        <form onSubmit={this.login}>
        <FieldContainer>
          <Input
            type="text"
            name="username"
            value={this.state.credentials.username}
            placeholder='Username'
            onChange={this.handleChange}
          />
          <Input
            type="password"
            name="password"
            value={this.state.credentials.password}
            placeholder='Password'
            onChange={this.handleChange}
          />
          <button>Log in</button>
          </FieldContainer>
        </form>
        </FormContainer>
      </DivContainer>
    );
  }
}

export default Login;