import React from 'react';
import { StyleSheet, View, StatusBar } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

import { Input, Text, Button } from 'react-native-elements';

import Icon from 'react-native-vector-icons/Ionicons';





export default function Inscription({navigation}) {


    async function sendInfo() {
       
      var data = 'coucou'

      var rawResponse = await fetch("http://10.2.5.179:3000/upload", {
        method: 'POST',
        body: data
      })

      var response = await rawResponse.json()
      
    }

    return (
  
 
    <View style={{flex:1, backgroundColor:'#F9F9F9'}}>
       
        <View>
        <StatusBar barStyle="light-content" />
        </View>

        <View style= {{ justifyContent:"center", alignItems:'center', marginTop: hp('4%'), marginBottom:hp('7%')}}>
        <Text style= {{fontSize: 25 }}>Créer mon compte</Text>
        </View >


        <View style={{marginLeft:hp('2%'), marginRight:hp('2%')}}>

            <View style={{flexDirection:'row'}}>
            <Input 
            containerStyle = {{marginBottom: hp('3%'), width: wp('45%')}}
            label='Votre Prénom'
            placeholder=' Prénom'

            />
          
            <Input
            containerStyle = {{marginBottom: hp('3%'), width: wp('45%')}}
            label='Votre nom'
            placeholder=' Nom'  
            />
            </View>
        
            <Input
            containerStyle = {{marginBottom: hp('3%'), width: wp('90%')}}
            label='Votre adresse e-mail'
            placeholder=' Email'
            leftIcon={
              <Icon
              name='ios-mail'
              size={24}
              color='black'
              />
            }
            />
        
            <Input
            containerStyle = {{marginBottom: hp('3%'), width: wp('90%')}}
            label='Votre numéro de téléphone'
            placeholder=' Téléphone'
            leftIcon={
              <Icon
              name='ios-phone-portrait'
              size={24}
              color='black'
              />
            }
            />
          
            <Input
            containerStyle = {{width: wp('90%'), marginBottom:hp('8%')}}
            label='Votre mot de passe'
            placeholder=' Mot de passe'
            secureTextEntry = {true}
            leftIcon={
              <Icon
              name='ios-lock'
              size={24}
              color='black'
              />
            }
            />
          </View>
  
          <Button
          buttonStyle={{backgroundColor: '#50bda1', marginLeft:hp('7%'), marginRight:hp('7%'), height:hp('6%')}}
          title="S'INSCRIRE"
          onPress={() => navigation.navigate('MonPaiement')}
         
          />
          <Button
          buttonStyle={{backgroundColor: '#50bda1', marginLeft:hp('7%'), marginRight:hp('7%'), height:hp('6%')}}
          title="S'INSCRIRE"
          onPress={async () => sendInfo()}
         
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
  });


 
  

  
  