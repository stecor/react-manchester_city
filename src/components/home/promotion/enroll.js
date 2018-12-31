import React, { Component } from 'react';
import Fade from 'react-reveal/Fade';
import FormField from '../../ui/formFields';
import { validate } from '../../ui/misc';

import { firebasePromotions } from '../../../firebase';

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

    newFormData[element.id] = newElement;

    this.setState({
      formError: false,
      formdata: newFormData
    })
  }

  resetFormSucess=(type)=>{
    const newFormData = {...this.state.formdata};

    for(let key in newFormData){
      newFormData[key].value = '';
      newFormData[key].valid = false;
      newFormData[key].validationMessage = '';
    }
    this.setState({
      formError:false,
      formdata : newFormData,
      formSucess : type? 'Congratulations!' : 'Email already on the database!',
    });
    this.successMessage();
  }

  successMessage=()=>{
    setTimeout(()=>{
      this.setState({
        formSucess: ''
      })
    },2000)
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
      firebasePromotions.orderByChild('email')
          .equalTo(dataToSubmit.email)
          .once('value')
          .then((snapshot)=>{
            if(snapshot.val() === null){
              firebasePromotions.push(dataToSubmit);
              this.resetFormSucess(true)
            }else{
              this.resetFormSucess(false)
            }
          })
      //this.resetFormSucess()
    }else {
      this.setState({formError:true});
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
              {this.state.formError?
                <div className="error_label">Something is wrong, try again!</div>
                :null}
              <div className="success_label">{this.state.formSucess}</div>
              <button onClick={(event)=>this.submitForm(event)}>Enroll</button>
              <div className="enroll_discl">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Earum veniam autem sint commodi voluptas nobis!</div>
              </div>
          </form>
        </div>
      </Fade>
    );
  }

}

export default Enroll;
