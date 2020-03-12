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
      style={{
        flex: 1,
        flexDirection: 'column',
        
      }}>  
              
      <BarCodeScanner
        onBarCodeScanned={scanned ? null : handleBarCodeScanned}
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