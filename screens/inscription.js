import React, {useState} from 'react';
import { StyleSheet, View, StatusBar, TextInput } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { Text, Button } from 'react-native-elements';
import {connect} from 'react-redux'

import Icon from 'react-native-vector-icons/Ionicons';





function Inscription({navigation, props}) {

    const [firstName, setfirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [password, setPassword] = useState('')
    const [listErrorsSignin, setErrorsSignin] = useState([])

    var sendInfo = async() =>  {
       console.log('la',firstName)
      const data = await fetch("http://10.2.5.179:3000/inscription", {
        method: 'POST',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        body: `firstNameFromFront=${firstName}&lastNameFromFront=${lastName}&emailFromFront=${email}&phoneFromFront=${phone}&passwordFromFront=${password}`

      })

      var body = await data.json()

      if(body.result == true){
        props.addToken(body.token)
        setUserExists(true)
        
      }  else {
        setErrorsSignin(body.error)
      }
      
    }

  




    return (
  
 
    <View style={{flex:1, backgroundColor:'#F9F9F9'}}>
       
        <View>
        <StatusBar barStyle="light-content" />
        </View>

        <View style= {{ justifyContent:"center", alignItems:'center', marginTop: hp('4%'), marginBottom:hp('5%')}}>
        <Text style= {{fontSize: 25 }}>Créer mon compte</Text>
        </View >


        <View style={styles.inputViewGlobal}>

            <View style={{flexDirection:'row'}}>
            <TextInput 
              placeholder = "Prénom"
              style = {styles.inputSmall}
              onChangeText={(value) => setfirstName(value)} 
              value={firstName}
            />
          
            <TextInput
              placeholder = "nom"
              style = {styles.inputSmall}
              onChangeText={(value) => setLastName(value)} 
              value={lastName}
            />
            </View>
        
            <TextInput
              placeholder = "email"
              style = {styles.inputLarge}
              inlineImageLeft='ios-mail'
              onChangeText={(value) => setEmail(value)} 
              value={email}
            />
        
            <TextInput
              placeholder = "Téléphone"
              style = {styles.inputLarge}
              onChangeText={(value) => setPhone(value)} 
              value={phone}
            />
          
            <TextInput
            placeholder = "Mot de passe"
            style = {styles.inputLarge}
            onChange={(value) => setPassword(value)}
            value={password}
           
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
          onPress={() => {console.log('ic'),sendInfo()}}
         
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
    inputViewGlobal: {
      marginLeft:hp('2%'), 
      marginRight:hp('2%'), 
      marginBottom:hp('8%')
    },
    inputSmall: {
      width: hp('20%'),
      height: hp('4%'),
      marginBottom: hp('3%'),
      marginRight: hp('2%'),
      borderBottomColor: 'black',
      borderBottomWidth:1
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



  function mapDispatchToProps(dispatch){
    return {
      addToken: function(token){
        dispatch({type: 'addToken', token: token})
      }
    }
  }

  export default connect(
    null,
    mapDispatchToProps
  )(Inscription)
  

  
  