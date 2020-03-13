import React, { isValidElement, useEffect, useState } from 'react';
import { StyleSheet, View, StatusBar, Image } from 'react-native';
import colors from '../components/colors';
import { connect } from 'react-redux'


import { Input, Text, Badge} from 'react-native-elements';

import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';
import { clockRunning } from 'react-native-reanimated';



function SuiviCommande({sendUserId}) {

    const[orderStatus, setOrderStatus] = useState('')
    const[orderId, setOrderId] = useState ('')


    useEffect( () => {

      const fetchData = async () => {
        const data = await fetch("http://10.2.5.210:3000/order", {
        method: 'POST',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        body: `idUser=${sendUserId}`
      })

      var body = await data.json() 
      console.log('monPaiement / body :', body);
      setOrderStatus(body.status)

      setOrderId(body.orderId)
      console.log('orderId :', orderId);
  
      }
      fetchData();
    
    }, []);
      
      console.log('suiviCommande / orderStatus :', orderStatus);


      var stepOne;

      if (orderStatus == 'Payed') {

        
        
      
      }


    return (
  
    <View style={{flex: 1, backgroundColor: colors.tertiary}}>

        <View>
          <StatusBar barStyle="light-content" />
        </View>

        <View style= {{ justifyContent:"center", alignItems:'center', marginTop: hp('4%'), marginBottom:hp('7%')}}>
            <Text style= {{fontSize: 25, fontWeight:'bold', marginBottom:hp('2%')}}>Félicitations !</Text>
            <Text style= {{fontSize: 18, marginBottom:hp('4%') }}>Votre commande est confirmée </Text>
        </View >

        <View style={{flexDirection:'row'}}>
            <Image      
            source={require('../assets/icons/001-clock.png')}
            style={{ width: hp('5%'), height: hp('5%'), marginLeft: wp('20%') }}
            />
            <Image
            source={require('../assets/icons/002-prepare.png')}
            style={{ width: hp('5%'), height: hp('5%'), marginLeft: wp('14%') }}
            />
            <Image
            source={require('../assets/icons/003-ready.png')}
            style={{ width: hp('5%'), height: hp('5%'), marginLeft: wp('14%') }}
            />
        </View>


        <ProgressSteps>

            <ProgressStep label="Commande reçue" nextBtnTextStyle={styles.buttonTextStyle} >
                <View style={{ alignItems: 'center' }}>
                </View>
             </ProgressStep>

            <ProgressStep label="En cours de préparation" nextBtnTextStyle={styles.buttonTextStyle} previousBtnTextStyle={styles.buttonTextStyle}>
                <View style={{ alignItems: 'center' }}>
                </View>
            </ProgressStep>

            <ProgressStep label="Commande prête" previousBtnTextStyle={styles.buttonTextStyle} nextBtnTextStyle={styles.buttonTextStyle}>
                <View style={{ alignItems: 'center' }}>
                </View>
            </ProgressStep>

        </ProgressSteps>

        <View style={{justifyContent:"center", alignItems:'center', marginBottom:hp('15%')}}>
            <Text style= {{fontSize: 18, marginBottom:hp('2%') }}>Votre numéro de commande </Text>
            <Badge
            value={orderId.slice(20,24).toUpperCase()}

            badgeStyle={{height:hp('15%'), width: hp('30%'), backgroundColor: colors.primary, color:"white"}}
            textStyle={{fontSize:40}}
            />
            
        </View>

    </View>
  
    

    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop:'10%',
      backgroundColor: colors.tertiary,
      alignItems: 'center',
      justifyContent: 'center',
    },
    buttonTextStyle : {
      // display:'none'
      color:'white'
    }
  });

  function mapStateToProps(state) {

  
    console.log('state.idUser  :', state.idUser );

    return { 
             sendUserId: state.idUser 
          }
  }
  
  export default connect(
    mapStateToProps,
    null
  )(SuiviCommande);