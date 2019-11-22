import React from 'react';
import { StyleSheet, TextInput, View, Button } from 'react-native';

export default class InputStyleNumber extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      styleNumber: ''
    };
  }

  onSearchByNike = () => {
    console.log('search by nike');
  }

  onSearchByAdidas = () => {}

  render() {
    return (
      <View style={compStyles.viewContainer}>
        <View style={compStyles.inputContainer}>
          <TextInput 
            style={compStyles.textinput}
            placeholder='Style Number' 
            autoCapitalize={'characters'}
            maxLength={6}
            multiline={false}
            autoCorrect={false}
            underlineColorAndroid='rgba(0,0,0,0)'
            clearTextOnFocus={true}
            autoFocus={true}
            value={this.state.styleNumber}
            onChangeText={text => this.onChangeText(text)}
            />
        </View>
        <View style={compStyles.buttonContainer}>
          <Button 
            style={compStyles.buttonStyle}
            onPress={this.onSearchByNike}
            title="Nike"
            accessibilityLabel="Search via Nike"/>
          <Button 
            style={compStyles.buttonStyle}
            onPress={this.onSearchByAdidas}
            title="Adidas"
            color="red"
            accessibilityLabel="Search via Nike"/>
        </View>
      </View>
    );  
  }

  onChangeText = (newText) => {
    const removedNonAlphaNumberic = newText.replace(/[^0-9a-z]/gi, '');
    this.setState({styleNumber: removedNonAlphaNumberic}, () => {
      if (this.state.styleNumber.length === 6) {
        this.props.onStyleNumberInputed(this.state.styleNumber);
      }
    });
  }
}
const compStyles = StyleSheet.create({
  viewContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  inputContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    flex: .5,
  },
  buttonStyle: {
    fontSize: 18,
    height: 40,
  },
  textinput: {
    height: 40,
    width: 140,
    fontSize: 18,
    fontWeight: '400',
    borderRadius: 50,
    borderWidth: 2,
    textAlign: 'center',
    alignSelf: 'center',
    backgroundColor:'#98fb985d',
  },
});