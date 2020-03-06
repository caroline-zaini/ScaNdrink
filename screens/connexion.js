import React, {useState} from 'react';
import { StyleSheet, View, StatusBar, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Text, Button } from 'react-native-elements';
import colors from '../components/colors';

// primary: '#1e1e1e',
// secondary: '#50bda1', // Vert bizarre
// tertiary: '#fff', // Blanc éclatant

import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {connect} from 'react-redux'






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
  
  
          <View style={styles.searchSection}>
            <Icon
              style={styles.searchIcon}
              name="envelope"
              size={15}
              color="black"
              />
            <TextInput
             placeholder = "Email"
             style={styles.input}
             onChangeText={(value) => setEmail_connexion(value)} 
             value={email_connexion}
            />
          </View>
          <View style={styles.searchSection}>
            <Icon
              style={styles.searchIcon}
              name="lock"
              size={20}
              color="black"
              />
            <TextInput
              placeholder = "Mot de Passe"
              style={styles.input}
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
      backgroundColor: colors.tertiary
    },
    title: {
      justifyContent:"center", 
      alignItems:'center', 
      marginTop: hp('4%'), 
      marginBottom:hp('7%')
    },
    searchSection: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#fff',
    },
    searchIcon: {
        padding: 10,
        marginLeft: hp('5%'),
    },
    input: {
        flex: 1,
        paddingTop: 10,
        paddingRight: 10,
        paddingBottom: 10,
        paddingLeft: 0,
        backgroundColor: '#fff',
        borderBottomColor: 'black',
        borderBottomWidth:1,
        marginRight: hp('7%'),
        color: '#424242',
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