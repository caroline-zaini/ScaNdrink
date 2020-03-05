import React, {useState} from 'react';
import { StyleSheet, View, StatusBar, TextInput } from 'react-native';
import {Text, Button } from 'react-native-elements';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {connect} from 'react-redux'

import Icon from 'react-native-vector-icons/Ionicons';



function Connexion({navigation}) {

  
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  var sendUserInfo = async() =>  {
    console.log('la',firstName)
   const data = await fetch("http://10.2.5.179:3000/connexion", {
     method: 'POST',
     headers: {'Content-Type': 'application/x-www-form-urlencoded'},
     body: `emailFromFront=${email}&passwordFromFront=${password}`

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
  
    <View style={styles.container}>
       
          <View>
            <StatusBar  barStyle="light-content" />
          </View>
  
          <View style= {styles.title}>
            <Text style= {{fontSize: 25 }}>Me connecter</Text>
          </View >
  
  
          <View style={{marginLeft:hp('2%'), marginRight:hp('2%')}}>

            <TextInput
             placeholder = "Email"
             style = {styles.inputLarge}
             onChangeText={(value) => setEmail(value)} 
              value={email}
            />

            <TextInput
            placeholder = "Mot de Passe"
            style = {styles.inputLarge}
            onChangeText={(value) => setPassword(value)} 
              value={password}
            
            
            />

          </View>
  
          <Button
          buttonStyle={{backgroundColor: '#50bda1', marginLeft:hp('7%'), marginRight:hp('7%'), marginTop: hp('4%'), height:hp('6%')}}
          title="SE CONNECTER"
          onPress= {() => {console.log('ic'),sendUserInfo(), navigation.navigate('MonPaiement')}}
          />
         
      
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