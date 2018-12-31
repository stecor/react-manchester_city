import React, { Component } from 'react';
import Fade from 'react-reveal/Fade';
import FormField from '../../ui/formFields';
import { validate } from '../../ui/misc';

class Enroll extends Component {

  state={
    formError:false,
    formSucess:'',
    formdata:{
      email:{
        element:'input',
        value:'',
        config:{
          name:'email_input',
          type:'email',
          placeholder: 'enter your email'
        },
        validation:{
          required: true,
          email: true,
        },
        valid:false,
        validationMessage:''
      }
    }
  }

  updateForm(element){

    const newFormData = {...this.state.formdata}
    const newElement = {...newFormData[element.id]}

    newElement.value = element.event.target.value;

    let valiData = validate(newElement);

    newElement.valid =valiData[0];
    newElement.validationMessage = valiData[1];

    console.log(newFormData);


    newFormData[element.id] = newElement;

    this.setState({
      formdata: newFormData
    })
  }

  submitForm(event){
      event.preventDefault();

      let dataToSubmit = {};
      let formIsValid = true;

    for(let key in this.state.formdata ){
      dataToSubmit[key] = this.state.formdata[key].value;
      formIsValid = this.state.formdata[key].valid && formIsValid;
    }
    if(formIsValid){
      console.log(dataToSubmit);
    }else {
      console.log('error');
    }

  }

  render() {
    return (
      <Fade>
        <div className="enroll_wrapper">
          <form onSubmit={(event)=> this.submitForm(event)}>
              <div className="enroll_title">
                Enter your email
              </div>
              <div className="enroll_input">
                <FormField
                    id={'email'}
                    formdata={this.state.formdata.email}
                    change={(element)=>this.updateForm(element)}
                />
              <button onClick={(event)=>this.submitForm(event)}>Enroll</button>
              </div>
          </form>
        </div>
      </Fade>
    );
  }

}

export default Enroll;
