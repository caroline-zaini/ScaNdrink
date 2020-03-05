import React, { isValidElement } from 'react';
import { StyleSheet, View, StatusBar, Image } from 'react-native';
import colors from '../components/colors';


import { Input, Text, Badge} from 'react-native-elements';

import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';


// const colors = {
//     // primary: '#1b2d3a', // Bleu foncé (plutôt noir)
//     primary: '#1e1e1e',
//     secondary: '#50bda1', // Vert bizarre
//     tertiary: '#fff', // Blanc éclatant
    
// }


export default function SuiviCommande() {


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

            <ProgressStep label="Commande reçue" onNextStep={() => onNextStep()}>
                <View style={{ alignItems: 'center' }}>
                </View>
            </ProgressStep>

            <ProgressStep label="En cours de préparation">
                <View style={{ alignItems: 'center' }}>
                </View>
            </ProgressStep>

            <ProgressStep label="Commande prête">
                <View style={{ alignItems: 'center' }}>
                </View>
            </ProgressStep>

        </ProgressSteps>

        <View style={{justifyContent:"center", alignItems:'center', marginBottom:hp('15%')}}>
            <Text style= {{fontSize: 18, marginBottom:hp('2%') }}>Votre numéro de commande </Text>
            <Badge
            value="WC99" 

            badgeStyle={{height:hp('15%'), width: hp('30%'), backgroundColor: colors.primary}}
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
  });