import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { connect } from 'react-redux'
import Bouton from '../components/Bouton';
//Import scanner qr code
import { BarCodeScanner } from 'expo-barcode-scanner';


import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import colors from '../components/colors';

export default function Scan({navigation}) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = async({ type, data }) => {

      setScanned(true);
    
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    console.log(data)
    const qrCode = await fetch("http://10.2.5.179:3000/qrcode", {
        method: 'POST',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        body: `qrCodeFromFront=${data}`
      })  
  
      var body = await qrCode.json() 
      navigation.navigate('Menu')
    };
    
    console.log("--------", scanned)

    // Passage au menu après 
    if(scanned == true){
      navigation.navigate('Menu')
    }
     
  if (hasPermission === null) {
    return <Text>Autoriser l'utilisation de la caméra</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View 
    style={styles.container}
    >  
              
      <BarCodeScanner onBarCodeScanned={scanned ? null : handleBarCodeScanned} style={StyleSheet.absoluteFillObject}/>

      <View style={styles.top}></View>

      <View style={styles.left}></View>
      <View style={styles.right}></View>

      <View style={styles.buttomMid}></View>
      
      <View style={styles.buttom}>


{/* BOUTON A SUPPRIMER LORS DU BON FONCTIONNEMENT DU QR CODE */}

      <Bouton title='Menu' destination='Menu' style={styles.bouton}/>
      <Bouton title={'Tap to Scan Again'} onPress={() => setScanned(false)} />

{/* BOUTON A SUPPRIMER LORS DU BON FONCTIONNEMENT DU QR CODE */}
      
      </View>
    </View>
  );
}


var styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: colors.primary,
    },
    top: {
        backgroundColor: colors.primary,
        position:'absolute',
        height: hp('25%'),
        position: 'relative',
        opacity: 0.3
    },
    buttom: {
        height: hp('26%'),
        backgroundColor: colors.primary,
        position: 'relative',
    },
    left:{
      backgroundColor: colors.primary,
        height: hp('50%'),
        width: wp('10%'),
        position: 'relative',
        opacity: 0.3
    },
    right:{
      backgroundColor: colors.primary,
        height: hp('35.75%'),
        width: wp('10%'),
        marginLeft: 'auto',
        marginTop: 'auto',
        position: 'relative',
        opacity: 0.3
    },
    buttomMid: {
      backgroundColor: colors.primary,
      position:'absolute',
      height: hp('5%'),
      position: 'relative',
      marginLeft: hp('5.3%'),
      opacity: 0.3

  },


})