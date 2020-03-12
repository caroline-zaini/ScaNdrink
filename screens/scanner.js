import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { connect } from 'react-redux';
import Bouton from '../components/Bouton';
//Import scanner qr code
import { BarCodeScanner } from 'expo-barcode-scanner';


import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import colors from '../components/colors';

function Scan(props) {
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
    
      // alert(`Bar code with type ${type} and data ${data} has been scanned!`);

      var restoToken = "";
      var tableToken = "";
      var before = false;

      for (let i = 0; i < data.length; i++) {
        if (data[i] == '/') {
          before = true;
          i++;
        }
        !before ? restoToken += data[i] : tableToken += data[i];
      }

      console.log('restoToken :', restoToken);
      console.log('tableToken :', tableToken);

      props.addTokenTable(tableToken);
      props.addTokenResto(restoToken);
    };
    
    console.log("--------", scanned)

    // Passage au menu après 
    if(scanned == true){
      // props.navigation.navigate('Menu')
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
        <Text style={{color: 'black', textAlign:'center', fontSize: 18, opacity: 0.3, backgroundColor: colors.primary }}>Scan le QR Code pour passer commande</Text>
      <View style={styles.topOpacity}></View>

      <View style={{flexDirection: 'row', justifyContent : 'space-between'}}>
        <View style={styles.left}></View>
        <View style={styles.right}></View>
      </View>

      <View style={styles.buttomOpacity}></View>

      <View style={styles.buttomAdd}></View>

      <View style={styles.buttom}>

      {/* <Bouton title='Menu' destination='Menu'/> */}
      <Bouton style={styles.btn} title={'Tap to Scan Again'} onPress={() => setScanned(false)}/>

      </View>

      


    </View>

    
    
  );
}


var styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: colors.primary,
        // backgroundColor: 'red',
    },
    top: {
        backgroundColor: colors.primary,
        height: hp('15%'),
        width:hp('100%'),
        opacity: 0.3,
    },
    topOpacity: {
      backgroundColor: colors.primary,
      // backgroundColor: 'brown',
      height: hp('5%'),
      width:hp('100%'),
      opacity: 0.3,
  },
        left:{
      backgroundColor: colors.primary,
        // backgroundColor: 'green',
        height: hp('45%'),
        width: wp('10%'),
        opacity: 0.3
    },
        right:{
      backgroundColor: colors.primary,
        // backgroundColor: 'yellow',
        height: hp('45%'),
        width: wp('10%'),
        opacity: 0.3
    },
    buttomOpacity: {
      height: hp('5%'),
      backgroundColor: colors.primary,
      opacity: 0.3,
      // backgroundColor: 'pink',
      position: 'relative',
  },
  buttomAdd: {
      height: hp('5%'),
      backgroundColor: colors.primary,
      // backgroundColor: 'orange',
      position: 'relative',
      opacity: 0.3,
  },

    buttom: {
        height: hp('30%'),
        backgroundColor: colors.primary,
        // backgroundColor: 'red',
        position: 'relative',
        opacity: 0.3,
    },
    btn: {
      backgroundColor: 'red',
      position: 'relative',
  },




})

function mapDispatchToProps(dispatch) {
  return {
      addTokenResto: function(token) {
          dispatch( {type: 'addTokenResto', tokenResto: token }) 
      },
      addTokenTable: function(token) {
        dispatch( {type: 'addTokenTable', tokenTable: token} )
      }
  }
}

export default connect(
  null,
  mapDispatchToProps
)(Scan);