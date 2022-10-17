import React, { Component } from "react";
import { Row, FormGroup, FormControl, ControlLabel, Button, HelpBlock } from 'react-bootstrap';
import './login.sass';
import { isEmail, isEmpty, isLength, isContainWhiteSpace } from 'shared/validator';
import axios from 'axios';
class Login extends Component {

    constructor(props) {
        super(props)

        this.state = {
            formData: {}, // Contains login form data
            email:'',
            errors: {}, // Contains login field errors
            formSubmitted: false, // Indicates submit status of login form
            loading: false, // Indicates in progress state of login form
            showLoginFields:false,
            showCreateFields:false,
            showPasswordError:false
           }
    }

    handleInputChange = (event) => {
        
        const target = event.target;
        const value = target.value;
        const name = target.name;

        let { formData } = this.state;
        formData[name] = value;
        console.log(value)
        this.setState({
            formData: formData
        });
        console.log(formData)
    }
    handleEmailChange = (event) => {
        
        const target = event.target;
        const value = target.value;
        const name = target.name;

        let { email } = this.state;
        email = value;
        console.log(value)
        this.setState({
            email: email
        });
        console.log(email)
    }

    validateLoginForm = (e) => {

        let errors = {};
        const { email } = this.state;

        if (isEmpty(email)) {
            errors.email = "Email can't be blank";
        } else if (!isEmail(email)) {
            errors.email = "Please enter a valid email";
        }

    /*if (isEmpty(formData.password)) {
        errors.password = "Password can't be blank";
    }  else if (isContainWhiteSpace(formData.password)) {
        errors.password = "Password should not contain white spaces";
    } else if (!isLength(formData.password, { gte: 6, lte: 16, trim: true })) {
        errors.password = "Password's length must between 6 to 16";
    }*/

        if (isEmpty(errors)) {
            return true;
        } else {
            return errors;
        }
    }
    logout = (e) => {
        this.setState({
            formSubmitted:false
        })
    }
    emailCheck = (e) =>{
        const { email } = this.state;
        const { formData } = this.state;
        let errors = this.validateLoginForm();

        e.preventDefault();
        if(errors!==true){
                this.setState({
                    errors: errors
                });
            
        }
        else{
            axios({
                url: `/findCustomer/?email=${email}`,
                method: 'post'}).then((response)=>{
                  if(response){
                    console.log(response.data)
                    if(response.data === false){
                        
                        this.setState({
                            showCreateFields :true,
                        });
                        formData.email = email
                        
                    }
                    else {
                        this.setState({
                            showLoginFields:true
                        });
                    }
    
                  }
                })
        }
        
    }
    
    login = (e) => {
        e.preventDefault();
        const { email } = this.state;
        const { formData } = this.state;
        let errors = this.validateLoginForm();
        axios({
            url: `/getAccessToken/?email=${email}&password=${formData.password}`,
            method: 'post'}).then((response)=>{
              if(response){
                console.log(response.data)
              }
              else{
                this.state.showPasswordError= true
              }
            })
        if(errors === true){
            
        } else {
            this.setState({
                errors: errors,
                formSubmitted: false
            });
        }
    }
    create = (e) => {
        e.preventDefault();
        const { email } = this.state;
        const { formData } = this.state;
        let errors = this.validateLoginForm();
        axios({
            url: `/createCustomer/?email=${email}&name=${formData.last_name}&password=${formData.password}`,
            method: 'post'}).then((response)=>{
              if(response){
                console.log(response.data)
              }
            })
        if(errors === true){

        } else {
            this.setState({
                errors: errors,
                formSubmitted: false
            });
        }
    }
    goBack =(e)=>{
        e.preventDefault()
        this.setState({
            showCreateFields :false,
            showLoginFields:false
        });
    }
    render() {

        const { errors, formSubmitted } = this.state;

        return (
            
            <div className="Login">
                {
                    
                !this.state.formSubmitted?
                    <div>
                <Row>
                        { this.state.showCreateFields?
                       <div><button onClick={this.goBack}>back</button>
                        <form onSubmit={this.create}>
                        <div>
                            <div>Hello {this.state.email}</div>
                            
                        <FormGroup controlId="last_name" onChange={this.handleInputChange}>
                            <ControlLabel>Last Name</ControlLabel>
                            <FormControl type="text" name="last_name" />
                        
                        </FormGroup>
                        <FormGroup controlId="password" validationState={ formSubmitted ? (errors.password ? 'error' : 'success') : null }>
                            <ControlLabel>Password</ControlLabel>
                            <FormControl type="password" name="password"  onChange={this.handleInputChange} />
                        { errors.password &&
                            <HelpBlock>{errors.password}</HelpBlock>
                        }
                        </FormGroup>
                        <FormGroup controlId="confirm-password" validationState={ formSubmitted ? (errors.password ? 'error' : 'success') : null }>
                            <ControlLabel>Confirm Password</ControlLabel>
                            <FormControl type="password" name="password"  onChange={this.handleInputChange} />
                        { errors.password &&
                            <HelpBlock>{errors.password}</HelpBlock>
                        }
                        </FormGroup>
                       
                        </div>
                        <Button type="submit" bsStyle="primary">Register</Button>
                    </form></div> : 
                    this.state.showLoginFields?
                    <div><button onClick={this.goBack}>back</button>
                    <form onSubmit={this.login}>
                     <FormGroup controlId="password" validationState={ formSubmitted ? (errors.password ? 'error' : 'success') : null }>
                     <ControlLabel>Password</ControlLabel>
                     <FormControl type="password" name="password"  onChange={this.handleInputChange} />
                 { errors.password &&
                     <HelpBlock>{errors.password}</HelpBlock>
                 }
                 { this.state.showPasswordError &&
                     <h3>Wrong Password</h3>
                 }
                 </FormGroup>
                 <Button type="submit" bsStyle="primary">Sign In</Button></form></div>:
                    <form onSubmit={this.emailCheck}>
                        <div>
                            <FormGroup controlId="email" validationState={ formSubmitted ? (errors.email ? 'error' : 'success') : null }>
                       <ControlLabel>Email</ControlLabel>
                       <FormControl type="text" name="email" placeholder="Enter your email" onChange={this.handleEmailChange} />
                   { errors.email &&
                       <HelpBlock>{errors.email}</HelpBlock>
                   }
                   </FormGroup>
                   <Button type="submit" bsStyle="primary">Next</Button>
                   </div>
                   </form>}
                </Row>
                </div>: 
                   <Row>
                     
                     <Button onClick={() => this.logout()} bsStyle="primary">LogOut</Button>
                    
                </Row>}
            </div>
        )
    }
}

export default Login;