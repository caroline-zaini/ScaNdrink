import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { connect } from 'react-redux'
import Bouton from '../components/Bouton';

//Import scanner qr code
import { BarCodeScanner } from 'expo-barcode-scanner';


import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import colors from '../components/colors';

export default function Scan() {
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
    const qrCode = await fetch("http://10.2.5.179:3000/inscription", {
        method: 'POST',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        body: `qrCodeFromFront=${data}`
      })
      console.log(data)
      var body = await qrCode.json() 
  };



  if (hasPermission === null) {
    return <Text>Autoriser l'utilisation de la caméra</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'column',
        
      }}>  
              
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
        <View style={styles.top}></View>
       
        <View style={styles.buttom}>
        <Bouton
          title='Menu' destination='Menu'
          style={styles.bouton}
          />
      <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />
      
{/* <Bouton
          title={'Appuyer pour voir le menu'} onPress={() => setScanned(false)}
          /> */}
    </View>
    </View>
  );
}


var styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'black'
        ,
    },
    top: {
        backgroundColor: colors.primary,
        position:'absolute',
        height: hp('15%'),
        position: 'relative',
        marginTop: hp('0%')
    },
    buttom: {
        height: hp('25%'),
        backgroundColor: colors.primary,
        position: 'relative',
        marginTop: hp('50%')
    },
    left:{
        height: hp('25%'),
        width: wp('25%'),
        position: 'relative',
    },
    bouton: {
        marginTop: hp('8%'),
        position:'relative',
        // verticalAlign: 'center'
    },

})