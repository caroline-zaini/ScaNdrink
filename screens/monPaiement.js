import React from 'react';
import { StyleSheet, View, StatusBar } from 'react-native';

import { Text, Button } from 'react-native-elements';

import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';






export default function MonPaiement({navigation}) {




    return (
  
    <View style={{flex:1}}>
       
          <View>
            <StatusBar barStyle="light-content" />
          </View>
  
          <View style= {{ justifyContent:"center", alignItems:'center', marginTop: hp('4%'), marginBottom:hp('7%') }}>
            <Text>Implémentation Stripe</Text>
          </View >
  

          <Button
          buttonStyle={{backgroundColor: '#50bda1', marginLeft:hp('7%'), marginRight:hp('7%'), height:hp('6%')}}
          title="PAYER 3,20 €"
          onPress={() => navigation.navigate('SuiviCommande')}
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