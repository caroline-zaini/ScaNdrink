import React, {useState} from 'react';
import { StyleSheet, View, StatusBar, TextInput} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { Text, Button } from 'react-native-elements';
import {connect} from 'react-redux'
import Icon from 'react-native-vector-icons/FontAwesome';

import colors from '../components/colors';




function Inscription({navigation, addToken, addUserId}) {

    const [firstName, setfirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email_inscription, setEmail_inscription] = useState('')
    const [phone, setPhone] = useState('')
    const [password_inscription, setPassword_inscription] = useState('')

    const [userExist, setUserExist] = useState(false)
    const [listError_inscription, setError_inscription] = useState([])


    var sendUserInfo_Inscription = async() =>  {
       console.log('la',firstName)
    

      const data = await fetch("http://10.2.5.172:3000/inscription", {
        method: 'POST',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        body: `firstNameFromFront=${firstName}&lastNameFromFront=${lastName}&email_inscription=${email_inscription}&phone=${phone}&password_inscription=${password_inscription}`
      })

      var body = await data.json() 
      console.log('body.result :', body.result);

      if(body.result == true){
        addToken(body.token)
        // addUserId(body.userId)
        setUserExist(true)
       
        console.log('========userExist :', userExist);

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




          <View style={{flexDirection:'row', marginLeft: hp('5%'),}}>
            <TextInput 
              placeholder = "Prénom"
              style = {styles.inputSmall}
              onChangeText={(value) => setfirstName(value)} 
              value={firstName}
            />
            <TextInput
              placeholder = "Nom"
              style = {styles.inputSmall}
              onChangeText={(value) => setLastName(value)} 
              value={lastName}
            />
          </View>

            <View style={{flexDirection:'row', marginLeft: hp('4%'),}}>
              <Icon
                style={styles.searchIcon}
                name="envelope"
                size={15}
                color={colors.primary}
              />
              <TextInput
                placeholder = "Email"
                style = {styles.input}
                onChangeText={(value) => setEmail_inscription(value)} 
                value={email_inscription}
              />
            </View>
            <View style={{flexDirection:'row', marginLeft: hp('4%'),}}>
              <Icon       
                style={styles.searchIcon}
                name="phone"
                size={20}
                color={colors.primary}
                />
              <TextInput
                placeholder = "Téléphone"
                style = {styles.input}
                onChangeText={(value) => setPhone(value)} 
                value={phone}
              />
            </View>
            <View style={{flexDirection:'row', marginLeft: hp('4.2%'),}}>
              <Icon
                style={styles.searchIcon}
                name="lock"
                size={20}
                color= {colors.primary}
              />
              <TextInput 
                placeholder = "Mot de passe"
                style = {styles.input}
                secureTextEntry={true}
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
      backgroundColor: colors.tertiary
    },
    title: {
      justifyContent:"center", 
      alignItems:'center', 
      marginTop: hp('4%'), 
      marginBottom:hp('3%')
    },
    searchSection: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.tertiary,
    },
    searchIcon: {
        padding: 10,
        marginTop: 7,
        
    },
    input: {
        flex: 1,
        backgroundColor: colors.tertiary,
        borderBottomColor: colors.primary,
        borderBottomWidth:1,
        marginRight: hp('6%'),
        color: '#424242',
    },
    inputSmall: {
      width: hp('20%'),
      height: hp('4%'),
      // marginBottom: hp('3%'),
      marginRight: hp('2%'),
      
      borderBottomColor: colors.primary,
      borderBottomWidth:1
    },
    comment: {
      justifyContent:"center", 
      alignItems:'center',   
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
      // addUserId: function(userId){
      //   dispatch({type: 'addUserId', userId: userId})
        
      // }
    }
  }

  export default connect(
    null,
    mapDispatchToProps
  )(Inscription)
  

  
  