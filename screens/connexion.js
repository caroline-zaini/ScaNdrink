import React from 'react';
import { StyleSheet, View, StatusBar } from 'react-native';

import { Input, Text, Button } from 'react-native-elements';

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
            containerStyle = {{width: wp('90%'), marginBottom:hp('8%')}}
            label='Votre Mot de Passe'
            secureTextEntry = {true}
            placeholder=' Mot de Passe'
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
  });