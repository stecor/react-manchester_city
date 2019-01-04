import React, { Component } from 'react';
import AdminLayout from '../../../Hoc/AdminLayout';

import FormField from '../../ui/formFields';
import { validate } from '../../ui/misc';
import FileUploader from '../../ui/fileUploader';

//firebase
import { firebasePlayers, firebaseDB, firebase} from '../../../firebase';



class AddEditPlayers extends Component {

  state={
    playerId:'',
    formType:'',
    formError: false,
    formSuccess:'',
    defaultImg:'',
    formdata:{
      name:{
        element:'input',
        value:'',
        config:{
          label: 'Player Name',
          name:'name_input',
          type:'text',
        },
        validation:{
          required: true,
        },
        valid:false,
        validationMessage:'',
        showLabel: true
      },
      lastname:{
        element:'input',
        value:'',
        config:{
          label:'Player Last Name',
          name:'lastname_input',
          type:'text',
        },
        validation:{
          required: true,
        },
        valid:false,
        validationMessage:'',
        showLabel: true
      },
      number:{
        element:'input',
        value:'',
        config:{
          label: 'Player Number',
          name:'number_input',
          type:'text',
        },
        validation:{
          required: true,
        },
        valid:false,
        validationMessage:'',
        showLabel: true
      },
      position:{
        element:'select',
        value:'',
        config:{
          label:'Select a Position',
          name:'select_position',
          type:'select',
          options:[
            {key:'Keeper',value:'Keeper'},
            {key:'Defence',value:'Defence'},
            {key:'Midfield',value:'Midfield'},
            {key:'Striker',value:'Striker'},
          ],
        },
        validation:{
          required: true,
        },
        valid:false,
        validationMessage:'',
        showLabel: true,
      },
      image:{
        element:'image',
        value:'',
        validation:{
          required:true,
        },
        valid:false,
      }
    }
  }


  updateForm(element, content=''){

    const newFormData = {...this.state.formdata}
    const newElement = {...newFormData[element.id]}

    if(content === ''){
      newElement.value = element.event.target.value;
    }else{
      newElement.value = content;
    }


    let valiData = validate(newElement);

    newElement.valid =valiData[0];
    newElement.validationMessage = valiData[1];

    newFormData[element.id] = newElement;

    this.setState({
      formError: false,
      formdata: newFormData
    })
  }

  updateFields = (player, playerId, formType, defaultImg) =>{

    const newFormData = {...this.state.formdata}


    for(let key in newFormData){
      newFormData[key].value = player[key];
      newFormData[key].valid = true;
    }
    this.setState({
      playerId,
      defaultImg,
      formType,
      formData: newFormData,
    })
  }

  componentDidMount(){

    const playerId = this.props.match.params.id;

    if(!playerId){

        this.setState({
          formType:'Add player'
        });

    }else{

        firebaseDB.ref(`players/${playerId}`)
          .once('value')
          .then((snapshot)=>{

            const playerData = snapshot.val();

            firebase.storage().ref('players')
              .child(playerData.image)
              .getDownloadURL()
              .then((url)=>{
                this.updateFields(playerData,playerId,'Edit player', url)
              }).catch((e)=>{
                  this.updateFields({...playerData,image:''},playerId,'Edit player', '')
              })
          })
    }
  }


  successForm = (message) =>{
    this.setState({
      formSuccess: message,
    });

    setTimeout(()=>{

      this.setState({
        formSuccess: '',
      });

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
      //submit form
      if(this.state.formType === 'Edit player'){

          firebaseDB.ref(`players/${this.state.playerId}`)
            .update(dataToSubmit)
            .then(()=>{
              this.successForm('Correctly updated')
            }).catch((e)=>{
              this.setState({
                formError: true,
              })
            })

      }else{
        firebasePlayers.push(dataToSubmit).then(()=>{
          this.props.history.push("/admin_players")
        }).catch((e)=>{
          this.setState({
            formError:true,
          })
        })
      }
    }else {
      this.setState({formError:true});
    }
  }

  resetImage = () =>{

      const newformData = {...this.state.formData}

      newformData['image'].value ='';

      newformData['image'].valid = false;

      this.setState({
        defaultImg:'',
        formData : newformData,
      })
  }


  storeFileName=(fileName)=>{
      this.updateForm({id:'image'}, fileName)
  }


  render() {

    return (
      <AdminLayout>
        <div className="editplayers_dialog_wrapper">
          <h2>
            {this.state.formType}
          </h2>
          <div>
            <form onSubmit={(event)=> this.submitForm(event)}>

            <FileUploader
              dir = "players"
              tag={"Player image"}
              defaultImg ={this.state.defaultImg}
              defaultImgName = {this.state.formdata.image.value}
              resetImage = {()=> this.resetImage()}
              filename = {(fileName)=> this.storeFileName(fileName)}
            />

            <FormField
                id={'name'}
                formdata={this.state.formdata.name}
                change={(element)=>this.updateForm(element)}
            />

            <FormField
                id={'lastname'}
                formdata={this.state.formdata.lastname}
                change={(element)=>this.updateForm(element)}
            />

            <FormField
                id={'number'}
                formdata={this.state.formdata.number}
                change={(element)=>this.updateForm(element)}
            />

            <FormField
                id={'position'}
                formdata={this.state.formdata.position}
                change={(element)=>this.updateForm(element)}
            />

            <div className="success_label">
              {this.state.formSuccess}
            </div>
            {
              this.state.formError?
                <div className="error_label">
                  Something is wrong
                </div>
              : null
            }
            <div className="admin_submit">
              <button onClick={(event)=>this.submitForm(event)}>
                {this.state.formType}
              </button>
            </div>

            </form>
          </div>
        </div>
      </AdminLayout>
    );
  }

}

export default AddEditPlayers;
