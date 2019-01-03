import React, { Component } from 'react';
import AdminLayout from '../../../Hoc/AdminLayout';

import FormField from '../../ui/formFields';
import { validate } from '../../ui/misc';

import { firebaseMatches, firebaseDB, firebaseTeams } from '../../../firebase';
import { firebaseLooper } from '../../ui/misc';

class AddEditMatch extends Component {

  state={
    matchId:'',
    formType:'',
    formError: false,
    formSuccess:'',
    teams:[],
    formdata:{
      date:{
        element:'input',
        value:'',
        config:{
          label: 'Event Date',
          name:'date_input',
          type:'date',
        },
        validation:{
          required: true,
        },
        valid:false,
        validationMessage:'',
        showLabel: true
      },
      local:{
        element:'select',
        value:'',
        config:{
          label: 'Select a local team',
          name:'select_local',
          type:'select',
          options:[],
        },
        validation:{
          required: true,
        },
        valid:false,
        validationMessage:'',
        showLabel: false,
      },
      resultLocal:{
        element:'input',
        value:'',
        config:{
          label: 'Result Local',
          name:'result_local_input',
          type:'text',
        },
        validation:{
          required: true,
        },
        valid:false,
        validationMessage:'',
        showLabel: false
      },
      away:{
        element:'select',
        value:'',
        config:{
          label: 'Select a away team',
          name:'select_away',
          type:'select',
          options:[],
        },
        validation:{
          required: true,
        },
        valid:false,
        validationMessage:'',
        showLabel: false,
      },
      resultAway:{
        element:'input',
        value:'',
        config:{
          label: 'Result away',
          name:'result_away_input',
          type:'text',
        },
        validation:{
          required: true,
        },
        valid:false,
        validationMessage:'',
        showLabel: false
      },
      referee:{
        element:'input',
        value:'',
        config:{
          label: 'Referee',
          name:'referee_input',
          type:'text',
        },
        validation:{
          required: true,
        },
        valid:false,
        validationMessage:'',
        showLabel: true
      },
      stadium:{
        element:'input',
        value:'',
        config:{
          label: 'Stadium',
          name:'stadium_input',
          type:'text',
        },
        validation:{
          required: true,
        },
        valid:false,
        validationMessage:'',
        showLabel: true
      },
      result:{
        element:'select',
        value:'',
        config:{
          label: 'Team result',
          name:'select_result',
          type:'select',
          options:[
            {key:'W',value:'Win'},
            {key:'L',value:'Lost'},
            {key:'D',value:'Draw'},
            {key:'n/a',value:'N/A'}
          ],
        },
        validation:{
          required: true,
        },
        valid:false,
        validationMessage:'',
        showLabel: true,
      },
      final:{
        element:'select',
        value:'',
        config:{
          label: 'Game Played',
          name:'select_played',
          type:'select',
          options:[
            {key:'Yes',value:'Yes'},
            {key:'No',value:'No'},
          ],
        },
        validation:{
          required: true,
        },
        valid:false,
        validationMessage:'',
        showLabel: true,
      },


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

  updateFields(match, teamOptions, teams, type, matchId){
    const newFormData = {
      ...this.state.formdata
    }

    for( let key in newFormData){
      if(match){
        newFormData[key].value = match[key];
        newFormData[key].valid = true;
      }

      if(key === 'local' || key === 'away'){
        newFormData[key].config.options = teamOptions
      }
    }

    this.setState({
      matchId,
      formType: type,
      formdata: newFormData,
      teams
    })
  }

  componentDidMount(){
    const matchId = this.props.match.params.id;
    const getTeams = (match, type) =>{
      firebaseTeams.once(`value`)
                   .then(snapshot=>{
                     const teams = firebaseLooper(snapshot);
                     const teamOptions = [];


                     snapshot.forEach((childSnapshot)=>{
                       teamOptions.push({
                         key: childSnapshot.val().shortName,
                         value: childSnapshot.val().name,
                       })
                     });
                     this.updateFields(match, teamOptions, teams, type, matchId)
                   })
    }

    if(!matchId){
      //add match

    }else{
      firebaseDB.ref(`matches/${matchId}`)
                .once(`value`)
                .then((snapshot)=>{
                  const match = snapshot.val();

                getTeams(match, 'Edit Match')
                })

    }
  }


  render() {
    return (
      <AdminLayout>
        <div className="editmatch_dialog_wrapper">
          <h2>
            {this.state.formType}
          </h2>
          <div>
            <form onSubmit={(event)=>this.submitForm(event)}>
              <FormField
                  id={'date'}
                  formdata={this.state.formdata.date}
                  change={(element)=>this.updateForm(element)}
              />

              <div className="select_team_layout">
                <div className="label_inputs">Local</div>
                <div className="wrapper">
                  <div className="left">

                    <FormField
                        id={'local'}
                        formdata={this.state.formdata.local}
                        change={(element)=>this.updateForm(element)}
                    />

                  </div>

                  <div className="right">

                    <FormField
                        id={'resultLocal'}
                        formdata={this.state.formdata.resultLocal}
                        change={(element)=>this.updateForm(element)}
                    />

                  </div>
                </div>
              </div>

              <div className="select_team_layout">
                <div className="label_inputs">Away</div>
                <div className="wrapper">
                  <div className="left">

                    <FormField
                        id={'away'}
                        formdata={this.state.formdata.away}
                        change={(element)=>this.updateForm(element)}
                    />

                  </div>

                  <div className="right">

                    <FormField
                        id={'resultAway'}
                        formdata={this.state.formdata.resultAway}
                        change={(element)=>this.updateForm(element)}
                    />

                  </div>
                </div>
              </div>

              <div className="split_fields">

                  <FormField
                      id={'referee'}
                      formdata={this.state.formdata.referee}
                      change={(element)=>this.updateForm(element)}
                  />

                  <FormField
                      id={'stadium'}
                      formdata={this.state.formdata.stadium}
                      change={(element)=>this.updateForm(element)}
                  />

              </div>

              <div className="split_fields">

                  <FormField
                      id={'result'}
                      formdata={this.state.formdata.result}
                      change={(element)=>this.updateForm(element)}
                  />

                  <FormField
                      id={'final'}
                      formdata={this.state.formdata.final}
                      change={(element)=>this.updateForm(element)}
                  />

              </div>

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

export default AddEditMatch;
