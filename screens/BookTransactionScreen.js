import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet,TextInput,Image } from 'react-native';
import * as Permissions from 'expo-permissions';
import { BarCodeScanner } from 'expo-barcode-scanner';

export default class TransactionScreen extends React.Component {
    constructor(){
      super();
      this.state = {
        hasCameraPermissions: null,
        scanned: false,
        scannedBookId: '',
        scannedStudentId: '',
        buttonState: 'normal'
      }
    }

    getCameraPermissions = async (id) =>{
      const {status} = await Permissions.askAsync(Permissions.CAMERA);
      
      this.setState({
       
        hasCameraPermissions: status === "granted",
        buttonState: id,
        scanned: false
      });
    }

    handleBarCodeScanned = async({type, data})=>{
      const {buttonState}=this.state
      if(buttonState==="BookID"){
        this.setState({

          scanned: true,
          scannedBookId: data,
          buttonState: 'normal'
        });
      }
      
      else if(buttonState==="StudentID"){
        this.setState({

          scanned: true,
          scannedStudentId: data,
          buttonState: 'normal'
        });
      }
    }

    render() {
      const hasCameraPermissions = this.state.hasCameraPermissions;
      const scanned = this.state.scanned;
      const buttonState = this.state.buttonState;

      if (buttonState !== "normal" && hasCameraPermissions){
        return(
          <BarCodeScanner
            onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned}
            style={StyleSheet.absoluteFillObject}
          />
        );
      }

      else if (buttonState === "normal"){
        return(
          <View style={styles.container}>
              <Image style={{width:200,height:200}} source={require("../assets/booklogo.jpg")} />
              <Text style={{textAlign:"center",fontSize:30}}>WILY</Text>
              <View>
                <TextInput placeholder="Book ID" style={styles.inputBox} 
                value={this.state.scannedBookId}
                />

                <TouchableOpacity  onPress={this.getCameraPermissions("BookID")}
                style={styles.scanButton}>
                  <Text>Scan</Text>
                </TouchableOpacity>
                
                </View>   

                <View>
                <TextInput placeholder="Student ID" style={styles.inputBox} 
                value={this.state.scannedStudentId}
                />
                <TouchableOpacity  onPress={this.getCameraPermissions("StudentID")}
                style={styles.scanButton} >
                  <Text>Scan</Text>
                </TouchableOpacity>
                
                </View>   

          <TouchableOpacity
           
            style={styles.scanButton}>
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
        </View>
        );
      }
    }
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    displayText:{
      fontSize: 15,
      textDecorationLine: 'underline'
    },
    scanButton:{
      backgroundColor: '#2196F3',
      padding: 10,
      margin: 10,
      width:100,
    },
    buttonText:{
      fontSize: 20,
    },
    inputBox:{
      height:40,
      width:250,
      borderWidth:3,
      
    }
  });