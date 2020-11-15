import React, { Component } from 'react';
import { View, TextInput, StyleSheet,Keyboard, TouchableOpacity, TouchableHighlight, Text, Picker, Image } from 'react-native';

import Languages from './Languages.json';

export default class Translator extends Component {

   constructor(props) {
       super(props);
       this.state = {
           languageFrom: "",
           languageTo: "",
           languageCode: 'en',
           inputText: "",
           outputText: "",
           submit: false,
           output: ''
       };
   }

   render() {
       return (
           <View style = {styles.container}>
               <Text style={{textAlign: "center"}}>Language Translator</Text>

               <View>
                    <Text style={{padding: 15}}>
                        Select the language to be translated from:
                    </Text>
                </View>
                <View style={{padding:10}}>
                    <Picker
                    selectedValue={this.state.languageFrom}
                    onValueChange={ lang => this.setState({languageFrom: lang})}
                    >
                        {Object.keys(Languages).map(key => (
                            <Picker.Item label={Languages[key]} value={key} />
                        ))}
                    </Picker>
               </View>

               <View style={styles.input}>
                   <TextInput
                       style={{flex:1, height: 80, padding: 10}}
                       placeholder="Enter Text to be translated from"
                       underlineColorAndroid="transparent"
                       onChangeText = {inputText => this.setState({inputText})}
                       value={this.state.inputText}
                   />
               </View>

                <View>
                    <Text style={{padding: 15}}>
                        Select the language to be translated to:
                    </Text>
                </View>
                <View style={{padding:10}}>
                    <Picker
                    selectedValue={this.state.languageTo}
                    onValueChange={ lang => this.setState({languageTo: lang, languageCode: lang})}
                    >
                        {Object.keys(Languages).map(key => (
                            <Picker.Item label={Languages[key]} value={key} />
                        ))}
                    </Picker>
               </View>

               
               <TouchableOpacity
                   style = {styles.submitButton}
                   onPress = {() => {
                    fetch('https://translation.googleapis.com/language/translate/v2?key=AIzaSyCvfXHDEUTzb9wwtgHWiWpcrTpl6ewtsvA&target=' + this.state.languageTo + '&source=' + this.state.languageFrom + '&format=text&q=' +this.state.inputText )
                    .then(response => response.json())
                    .then(json => {
                    // console.log(json)
                    this.setState({
                    outputText:json.data.translations[0].translatedText
                    })
                    })
                    }}
               >
                   <Text style = {styles.submitButtonText}> Submit </Text>
               </TouchableOpacity>

               
                
                <View>
                    <Text style={{marginLeft: 10}}>
                        Translated text:
                    </Text>
                </View>
               <View style = {styles.output}>
                  <Text>
                  {this.state.outputText}
                  </Text>
               </View>
           </View>
       )
   }
   
}

const styles = StyleSheet.create({
   container: {
       paddingTop: 53
   },
   input: {
       flexDirection: 'row',
       justifyContent: 'center',
       alignItems: 'center',
       backgroundColor: '#fff',
       borderWidth: .5,
       borderColor: '#000',
       // height: 40,
       borderRadius: 6 ,
       margin: 12
   },
   output: {
       flexDirection: 'row',
       justifyContent: 'center',
       alignItems: 'center',
       backgroundColor: '#fff',
       borderWidth: .5,
       borderColor: '#000',
       borderRadius: 5 ,
       margin: 10,
       height: 80,
   },
   submitButton: {
       backgroundColor: '#7c22b1',
       padding: 10,
       margin: 15,
       borderRadius: 5 ,
       height: 40,
   },
   submitButtonText:{
       color: 'white',
       textAlign: 'center'
   },
})

