/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import { StyleSheet, Text, View, Button, Alert, Vibration} from 'react-native';
import Textarea from 'react-native-textarea';
import { captureScreen } from "react-native-view-shot";
export default class App extends Component{

  constructor(props){
    super(props);
    this.state={
      text: '',
      img: 'http://aboutreact.com/wp-content/uploads/2018/07/sample_img.png'
    }

  }

  onChange(){

  }


  captureScreenFunction=()=>{
    const DURATION = 10000;
    const PATTERN = [1000, 2000, 3000];
    Vibration.vibrate(DURATION);
     captureScreen({
      format: "jpg",
      quality: 0.8
    })
        .then(
            uri => {
              this.setState({ img : uri });
              Alert.alert(
                  'Alert Title',
                  uri,
                  [
                    {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
                    {
                      text: 'Cancel',
                      onPress: () => console.log('Cancel Pressed'),
                      style: 'cancel',
                    },
                    {text: 'OK', onPress: () => console.log('OK Pressed')},
                  ],
                  {cancelable: false},
              );
            },
            error => console.error("Oops, Something Went Wrong", error)
        );
  }

  render() {
    return (
      <View style={styles.container}>
          <Textarea
              containerStyle={styles.textareaContainer}
              style={styles.textarea}
              onChangeText={this.onChange}
              defaultValue={this.state.text}
              placeholder={'Ingresa texto'}
              placeholderTextColor={'#c7c7c7'}
              underlineColorAndroid={'transparent'}
          />
        <Text style={styles.textNombre}>@HugoSalazar</Text>
          <Button  title="Exportar" onPress={this.captureScreenFunction}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#FFFFE0',
  },
  containerText: {
    flex: 2,
    justifyContent: 'center'

  },
  textareaContainer: {
    height: '60%',
    textAlign:'center',
    width: '90%',
    padding: 5,
  },
  textarea: {
    justifyContent: 'center',
    textAlignVertical: 'top',
    textAlign:'center',// hack android
    height: '90%',
    fontSize: 23,
    width: '90%',
    color: '#000000',
  },
  textNombre: {
    fontSize: 20,
    color: '#000000',
    alignItems: 'flex-end',
    fontWeight: 'bold'
  }
});
