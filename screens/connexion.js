import React from 'react';
import { StyleSheet, View, StatusBar, TextInput } from 'react-native';

import {Text, Button } from 'react-native-elements';

import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

import Icon from 'react-native-vector-icons/Ionicons';





export default function Inscription({navigation}) {




    return (
  
  
  
    <View style={{flex:1, backgroundColor:'#F9F9F9'}}>
       
          <View>
            <StatusBar  barStyle="light-content" />
          </View>
  
          <View style= {{ justifyContent:"center", alignItems:'center', marginTop: hp('4%'), marginBottom:hp('7%') }}>
            <Text style= {{fontSize: 25 }}>Me connecter</Text>
          </View >
  
  
          <View style={{marginLeft:hp('2%'), marginRight:hp('2%')}}>

            <TextInput
             placeholder = "Email"
             style = {styles.inputLarge}
             // onChangeText={(value) => setPassword(value)} 
             // value={password}
            />

            <TextInput
            placeholder = "Mot de Passe"
            style = {styles.inputLarge}
            // onChangeText={(value) => setPassword(value)} 
            // value={password}
            
            
            />

          </View>
  
          <Button
          buttonStyle={{backgroundColor: '#50bda1', marginLeft:hp('7%'), marginRight:hp('7%'), height:hp('6%')}}
          title="SE CONNECTER"
          onPress={() => navigation.navigate('MonPaiement')}
          />
         
      
    </View>
  
  
    
  
  
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop:'10%',
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputLarge: {
      width: hp('42%'),
      height: hp('4%'),
      marginBottom: hp('3%'),
      marginRight: hp('2%'),
      borderBottomColor: 'black',
      borderBottomWidth:1
    }
  });