import React, {useState} from 'react';
import { StyleSheet, View, StatusBar, TextInput } from 'react-native';
import {Text, Button } from 'react-native-elements';

import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {connect} from 'react-redux'

import Icon from 'react-native-vector-icons/Ionicons';
import { Redirect } from 'react-router-dom';



function Connexion({navigation, props}) {

  
  const [email_connexion, setEmail_connexion] = useState('')
  const [password_connexion, setPassword_connexion] = useState('')
  const [userExist, setUserExist] = useState(false)
  const [listError_connexion, setError_connexion] = useState([])

 
  /**
  *connexion with router
  */

  var sendUserInfo_Connexion = async() =>  {
    
    console.log('la',email_connexion)

   const data = await fetch("http://10.2.5.179:3000/connexion", {
     method: 'POST',
     headers: {'Content-Type': 'application/x-www-form-urlencoded'},
     body: `email_connexion=${email_connexion}&password_connexion=${password_connexion}`
   })

   var body = await data.json()

   console.log('body :', body);
   console.log('body :', body.result);

   if(body.result){
    
    setUserExist(true)
    //  props.addToken(body.token)
    
     console.log('userExist :', userExist);
    
     
   } else {
    setError_connexion(body.error)
    
   } 
 }

 /**
  * condition for connexion
  */
 var button;
  if (userExist) {
  button = <Button
          buttonStyle={styles.btn}
          title="SE CONNECTER"
          onPress= {() => {console.log('ic'),sendUserInfo_Connexion(), navigation.navigate('MonPaiement')}}
          />
   
  } else {
  button = <Button
          buttonStyle={styles.btn}
          title="SE CONNECTER"
          onPress= {() => {console.log('ic'),sendUserInfo_Connexion()}}
          />
  }

  var tabError= listError_connexion.map((error,i) => {
    return(<Text style = {styles.comment}>{error}</Text>)
  })

  
  

    return (
  
    <View style={styles.container}>
       
          <View>
            <StatusBar  barStyle="light-content" />
          </View>
  
          <View style= {styles.title}>
            <Text style= {{fontSize: 25 }}>Me connecter</Text>
          </View >
  
  
          <View style={{marginLeft:hp('2%'), marginRight:hp('2%')}}>

            <TextInput
             placeholder = "email_connexion"
             style = {styles.inputLarge}
             onChangeText={(value) => setEmail_connexion(value)} 
             value={email_connexion}
            />

            <TextInput
              placeholder = "Mot de Passe"
              style = {styles.inputLarge}
              onChangeText={(value) => setPassword_connexion(value)} 
              value={password_connexion}
            />

          </View>

          {tabError}
  
          {button}
         
      
    </View>
  
  
    
  
  
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex:1, 
      backgroundColor:'#F9F9F9'
    },
    title: {
      justifyContent:"center", 
      alignItems:'center', 
      marginTop: hp('4%'), 
      marginBottom:hp('7%')
    },
    inputLarge: {
      width: hp('42%'),
      height: hp('4%'),
      marginBottom: hp('3%'),
      marginRight: hp('2%'),
      borderBottomColor: 'black',
      borderBottomWidth:1
    },
    comment: {
      justifyContent:"center", 
      alignItems:'center', 
      marginTop: hp('1%'), 
      marginLeft:hp('2%'),
      color: 'grey'
    },
    btn: {
      backgroundColor: '#50bda1', 
      marginLeft:hp('7%'), 
      marginRight:hp('7%'), 
      marginTop: hp('4%'), 
      height:hp('6%')
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
  )(Connexion)