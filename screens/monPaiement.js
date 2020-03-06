import React from 'react';
import { StyleSheet, View, StatusBar, TextInput } from 'react-native';

import { Text, Button } from 'react-native-elements';

import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';






export default function MonPaiement({navigation}) {




    return (
  
    <View style={{flex:1}}>
       
          <View>
            <StatusBar barStyle="light-content" />
          </View>
  
          <View style= {styles.title}>
            <Text style= {{fontSize: 25 }}>Payer par carte bancaire</Text>
          </View >

          <View style={styles.globalView}>

            <View>
              <Text style={styles.label}>E-mail</Text>
              <TextInput 
              style = {styles.inputLarge}
              placeholder = "  E-mail"
              style = {styles.inputLarge}
              />
            </View>

            <View style={{marginTop:hp('1%')}}>
              <Text style={styles.label}>Information de la carte</Text>
              <TextInput 
              style = {styles.inputLarge}
              placeholder = "  Information de la carte"
              style = {styles.inputLarge}
              />
              <TextInput 
              style = {styles.inputLarge}
              placeholder = "  Information de la carte"
              style = {styles.inputLarge}
              />
            </View>

          </View>

          
          
  

          <Button
          buttonStyle={{backgroundColor: '#50bda1', marginLeft:hp('7%'), marginRight:hp('7%'), height:hp('6%')}}
          title="PAYER 3,20 €"
          onPress={() => navigation.navigate('SuiviCommande')}
          />
         
      
    </View>
  
  
    
  
  
    );
  }
  
  const styles = StyleSheet.create({
    conatainer: {
      flex:1, 
      backgroundColor:'#F9F9F9'
    },
    globalView: {
      marginLeft:hp('2%'), 
      marginRight:hp('2%')
    },
    title: {
      justifyContent:"center", 
      alignItems:'center', 
      marginTop: hp('4%'), 
      marginBottom:hp('7%')
    },
    label: {
      marginBottom: hp('1%')
    },
    inputLarge: {
      width: hp('42%'),
      height: hp('4%'),
     
      marginRight: hp('2%'),
      borderColor: 'black',
      borderWidth:0.3
    },
  });