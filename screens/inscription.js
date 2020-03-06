import React, {useState} from 'react';
import { StyleSheet, View, StatusBar, TextInput} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { Text, Button, Icon } from 'react-native-elements';
import {connect} from 'react-redux'

import colors from '../components/colors';




function Inscription({navigation}, props) {

    const [firstName, setfirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email_inscription, setEmail_inscription] = useState('')
    const [phone, setPhone] = useState('')
    const [password_inscription, setPassword_inscription] = useState('')

    const [userExist, setUserExist] = useState(false)
    const [listError_inscription, setError_inscription] = useState([])


    var sendUserInfo_Inscription = async() =>  {
       console.log('la',firstName)
    

      const data = await fetch("http://10.2.5.179:3000/inscription", {
        method: 'POST',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        body: `firstNameFromFront=${firstName}&lastNameFromFront=${lastName}&email_inscription=${email_inscription}&phone=${phone}&password_inscription=${password_inscription}`
      })

      var body = await data.json() 
      console.log('body.result :', body.result);

      if(body.result == true){
        // props.addToken(body.token)
        setUserExist(true)
        console.log('userExist :', userExist);

      } else {
        setError_inscription(body.error)
      }
    }

    var tabError= listError_inscription.map((error,i) => {
      return(<Text style = {styles.comment}>{error}</Text>)
    })

    var button;
    if (userExist) {
    button = <Button
            buttonStyle={styles.btn}
            title="S'INSCRIRE"
            onPress= {() => {sendUserInfo_Inscription(), navigation.navigate('MonPaiement')}}
            />
    
    } else {
    button = <Button
            buttonStyle={styles.btn}
            title="S'INSCRIRE"
            onPress= {() => {sendUserInfo_Inscription()}}
            />
    }

    return (
  
    <View style={styles.container}>
       
        <View>
        <StatusBar barStyle="light-content" />
        </View>

        <View style= {styles.title}>
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
              placeholder = "email_inscription"
              style = {styles.inputLarge}
              inlineImageLeft='ios-mail'
              onChangeText={(value) => setEmail_inscription(value)} 
              value={email_inscription}
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
              onChangeText={(value) => setPassword_inscription(value)}
              value={password_inscription}
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
      marginBottom:hp('3%')
    },
    inputViewGlobal: {
      marginLeft:hp('2%'), 
      marginRight:hp('2%'), 
      marginBottom:hp('2%')
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
    },
    comment: {
      justifyContent:"center", 
      alignItems:'center',   
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
  )(Inscription)
  

  
  