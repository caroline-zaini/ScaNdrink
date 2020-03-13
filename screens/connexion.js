import React, {useState} from 'react';
import { StyleSheet, View, StatusBar, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Text, Button } from 'react-native-elements';
import colors from '../components/colors';

import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {connect} from 'react-redux'
import { Colors } from 'react-native/Libraries/NewAppScreen';






function Connexion({navigation, addToken, addUserId}) {

  
  const [email_connexion, setEmail_connexion] = useState('')
  const [password_connexion, setPassword_connexion] = useState('')
  const [userExist, setUserExist] = useState(false)
  const [listError_connexion, setError_connexion] = useState([])

 
  /**
  *connexion with router
  */

  var sendUserInfo_Connexion = async() =>  {
    setUserExist(true)

   const data = await fetch("http://10.2.5.210:3000/connexion", {
     method: 'POST',
     headers: {'Content-Type': 'application/x-www-form-urlencoded'},
     body: `email_connexion=${email_connexion}&password_connexion=${password_connexion}`
   })

   var body = await data.json()

   console.log('body :', body);
   console.log('body :', body.result);

   if(body.result){
    
    addToken(body.token)
    addUserId(body.idUser)
    
    console.log('=========');
     console.log('userExist :', userExist);
     console.log('body.idUser from connexion :', body.idUser);
    
     
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
          onPress= {() => {sendUserInfo_Connexion(), navigation.navigate('MonPaiement')}}
          />
   
  } else {
  button = <Button
          buttonStyle={styles.btn}
          title="SE CONNECTER"
          onPress= {() => {sendUserInfo_Connexion()}}
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
              color={colors.primary}
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
              color={colors.primary}
              />
            <TextInput
              placeholder = "Mot de Passe"
              style={styles.input}
              secureTextEntry={true}
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
      backgroundColor: colors.tertiary,
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
        backgroundColor: colors.tertiary,
        borderBottomColor: colors.primary,
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
      backgroundColor: colors.secondary, 
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
      },
      addUserId: function(idUser){
        dispatch({type: 'addUserId', idUser: idUser})
        
      }
    }
  }

  export default connect(
    null,
    mapDispatchToProps
  )(Connexion)