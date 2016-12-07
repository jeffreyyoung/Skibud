import React from 'react'
import {globals} from './../../constants/globals'
import {View, Text} from 'react-native'
import moment from 'moment';
import Event from './../../models/Event';
import AppComponent from './../../models/AppComponent'
import uiState from './../../models/UIState'
import {observe} from 'mobx'
let themes = {
  mainColor: globals.primaryColor
}
import FloatLabelTextInput from './Row';
import { Fumi } from 'react-native-textinput-effects';

var {GiftedForm, GiftedFormManager} = require('react-native-gifted-form');

import ModalInput from './ModalInput';


let Spacer = () => {
  return <View style={{height: globals.fullPadding * 2}}/>
}

// export default class NewEventScene extends AppComponent {
//   constructor(...args) {
//     super(...args);
//     this.event = new Event();
//   }
//   render() {
//     return (
//       <View style={{backgroundColor: globals.gray, flex: 1}}>
//         <ModalInput 
//         borderTop={true}
//           placeholder={'Event Title'}
//         />
//         <ModalInput 
//           placeholder={'Location'}
//         />
//         <ModalInput 
//           placeholder={'Date'}
//         />
//         <Spacer />
//         <ModalInput
//           borderTop={true}
//           placeholder={'Description'}
//         />
//       
//         
//       </View>
//     )
//   }
// }


export default class NewEventForm extends AppComponent {
  constructor(...args) {
    super(...args);
    this.state = {}
	console.log(this.app.resorts);
  }
  
  render() {
    return (
      <GiftedForm
        formName='newEventForm' // GiftedForm instances that use the same name will also share the same states
        openModal={(route) => {
          uiState.segway('newEventModal', route, true); // The ModalWidget will be opened using this method. Tested with ExNavigator
        }}

        clearOnClose={false} // delete the values of the form when unmounted

        defaults={{
          /*
          username: 'Farid',
          'gender{M}': true,
          password: 'abcdefg',
          country: 'FR',
          birthday: new Date(((new Date()).getFullYear() - 18)+''),
          */
        }}

        validators={{
          eventTitle: {
            title: 'Event title',
            validate: [{
              validator: (...args) => {
                return true;
                if (args[0] && args[0].length) {
                  return args[0].length > 5 && args[0].length < 50
                }
                return false;
              },
              message: '{TITLE} must be between 3 and 50 characters'
            }]
          },
          description: {
            title: 'Description',
            validate: [{
              validator: (...args) => {
                return true;
                if (args[0] && args[0].length) {
                  return args[0].length > 10 && args[0].length < 50
                }
                return false;
              },
              message: '{Title} must be at least 10 characters'
            }]
          },
          skillLevel: {
            title: 'Skill Level',
            validate: [{
              validator: (...args) => {
                if (args[0] === undefined) {
                  return false;
                }
                return true;
              },
              message: '{TITLE} is required',
            }]
          }
        }}
      >

        <GiftedForm.SeparatorWidget />
        <GiftedForm.TextInputWidget
          name='name' // mandatory
          title='Event Title'

          placeholder='Skiing at Snowbird!!'
          clearButtonMode='while-editing'
        />
        


        <GiftedForm.SeparatorWidget />
        
        <GiftedForm.ModalWidget
          title='Date'
          displayValue='eventDate'

          scrollEnabled={true}
        >
          <GiftedForm.SeparatorWidget/>
          <GiftedForm.DatePickerIOSWidget
            name='eventDate'
            mode='datetime'
            getDefaultDate={() => {
              return new Date(1477460152587);
            }}
          />
        </GiftedForm.ModalWidget>
		<GiftedForm.ModalWidget
			title='Resort'
			displayValue='resort'
		>
			<Text>Yay</Text>
			<GiftedForm.SelectWidget name='resort' title='Resort' multiple={false}>
				{this.app.resorts.map(resort => {
					return (<GiftedForm.OptionWidget key={resort._idrea} title={resort.name} value={resort._id}/>)
				})}
			</GiftedForm.SelectWidget>
		</GiftedForm.ModalWidget>
		
		
        <GiftedForm.ModalWidget
          title='Skill Level'
          displayValue='skillLevel'
        >
          <GiftedForm.SeparatorWidget />

          <GiftedForm.SelectWidget name='skillLevel' title='Skill Level' multiple={false}>
            <GiftedForm.OptionWidget title='Any Skill Level' value='Any Skill Level'/>
            <GiftedForm.OptionWidget  title='Expert' value='Expert'/>
            <GiftedForm.OptionWidget title='Intermediate' value='Intermediate'/>
            <GiftedForm.OptionWidget title='Beginner' value='Beginner'/>
          </GiftedForm.SelectWidget>
        </GiftedForm.ModalWidget>
        <GiftedForm.SeparatorWidget/>
        <GiftedForm.TextAreaWidget
          name='description'

          autoFocus={true}

          placeholder='More info on the event'
        />



        <GiftedForm.SubmitWidget
          title='Post Event'
          widgetStyles={{
            submitButton: {
              backgroundColor: themes.mainColor,
            }
          }}
          onSubmit={async (isValid, values, validationResults, postSubmit = null, modalNavigator = null) => {
            this.setState({errorMessage: ''})
            if (isValid === true) {
              // prepare object
              //values.gender = values.gender[0];
              //values.birthday = moment(values.birthday).format('YYYY-MM-DD');
              values.resortId = "57f5fb9b44a3c90a9899ce87";
              values.skillLevel = values.skillLevel[0];
              try {
                let response = await this.app.graphql(`
                  mutation {
                    createEvent(
                        name: "${values.name}",
                        description: "${values.description}",
                        resortId: "${values.resort}",
                        skillLevel: "${values.skillLevel}",
                        eventDate: "${values.eventDate}"
                    ) {
                      _id
                      name
                      description
                      resortId
                    }
                  }
                `)
                //this.setState({errorMessage: 'Success'})
                this.app.ui.navigator.pop();
              } catch (e) {
                console.log(e);
                this.setState({errorMessage: 'An error occurred, please try again'});
                postSubmit();
              }

              /* Implement the request to your server using values variable
              ** then you can do:
              ** postSubmit(); // disable the loader
              ** postSubmit(['An error occurred, please try again']); // disable the loader and display an error message
              ** postSubmit(['Username already taken', 'Email already taken']); // disable the loader and display an error message
              ** GiftedFormManager.reset('signupForm'); // clear the states of the form manually. 'signupForm' is the formName used
              */
            } else {
              this.setState({errorMessage: 'Fill out all form values'})
            }
          }}

        />
        <GiftedForm.ValidationErrorWidget
          message={this.state.errorMessage}
        />
      </GiftedForm>
    );
  }
};