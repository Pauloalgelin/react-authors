import React, { Component } from 'react';
import './css/pure-min.css';
import './css/side-menu.css';
import $ from 'jquery';
import CustomInput from './components/CustomInput'
import CustomButton from './components/CustomButton'

class App extends Component {

  constructor(){
    super();
    this.state = {list:[], name: '', email: '', passw: ''};
  }

  componentDidMount(){
    $.ajax({
      url: 'https://cdc-react.herokuapp.com/api/autores',
      dataType: 'json',
      success:function(respose){
        this.setState({list:respose});
        }.bind(this)
    });
  }

  sendForm = (event) => {
    event.preventDefault();
    console.log("trying to send form");
    $.ajax({
      url: 'https://cdc-react.herokuapp.com/api/autores',
      contentType: 'application/json',
      dataType: 'json',
      type: 'post',
      data: JSON.stringify({nome: this.state.name,
                            email: this.state.email,
                            senha: this.state.passw
                          }),
      success:
        (response) => {
          console.log("form sent");
          this.setState({list: response});
        },
      error: 
        (response) => {
          console.log("error sending form");
        }
    });
  }

  setName = (event) => {
    this.setState({name: event.target.value});
  }

  setEmail = (event) => {
    this.setState({email: event.target.value});
  }

  setPassw = (event) => {
    this.setState({passw: event.target.value});
  }

  render() {
    return (
      <div id="layout">
          <a href="#menu" id="menuLink" className="menu-link">
              <span></span>
          </a>

          <div id="menu">
              <div className="pure-menu">
                  <a className="pure-menu-heading" href="#">Company</a>

                  <ul className="pure-menu-list">
                      <li className="pure-menu-item"><a href="#" className="pure-menu-link">Home</a></li>
                      <li className="pure-menu-item"><a href="#" className="pure-menu-link">Authors</a></li>
                      <li className="pure-menu-item"><a href="#" className="pure-menu-link">Books</a></li>
                  </ul>
              </div>
          </div>

         <div id="main">
            <div className="header">
              <h1>Author form</h1>
            </div>

            <div className="content" id="content">

              <div className="pure-form pure-form-aligned">
                <form className="pure-form pure-form-aligned" onSubmit={this.sendForm}>
                  <CustomInput htmlFor="name" label="Name" id="name" type="text" name="name" value={this.state.name} onChange={this.setName}/>
                  <CustomInput htmlFor="email" label="Email" id="email" type="email" name="email" value={this.state.email} onChange={this.setEmail}/>
                  <CustomInput htmlFor="passw" label="Password" id="passw" type="password" name="passw" value={this.state.passw} onChange={this.setPassw}/>
                  <CustomButton type="submit" text="Save"/>
                </form>
              </div>

              <div>
                <table className="pure-table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                    </tr>
                  </thead>
                  <tbody>
                  {
                  this.state.list
                    .map(
                      function(autor){
                        return(
                          <tr key={autor.id}>
                            <td>{autor.nome}</td>
                            <td>{autor.email}</td>
                          </tr>
                        );
                      }
                    )
                  }
                  </tbody>
                </table> 
              </div>             
            </div>
          </div>            
        </div>
    );
  }
}

export default App;
