import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-elements';

import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

import colors from '../components/colors';

function Produits(props) {

    const [selectedQuantity, setSelectedQuantity] = useState(0);

    return (
        <View style={styles.container}>

            <View style={{width: wp('65%')}}>
                <View style={{marginLeft: '10%'}}>
                    <Text style={styles.nomProduit}>{props.produitName} (25cl)</Text>
                    <Text style={styles.prixProduit}>3.50€</Text>
                </View>
            </View>

            <View style={{flexDirection: 'row', width: wp('35%')}}>
                <View style={{width: '33%', height: '100%'}}>
                    <TouchableOpacity
                        style={styles.btn}
                        onPress={() => {setSelectedQuantity(selectedQuantity-1)}} 
                        >
                        <Text style={styles.txt}>-</Text>
                    </TouchableOpacity>
                </View>
                <View style={{width: '25%', height: '100%'}}>
                    <Text style={[styles.txt, {fontSize: 18, marginTop: '20%', color: '#000'}]}>{selectedQuantity}</Text>
                </View>
                <View style={{width: '33%', height: '100%'}}>
                    <TouchableOpacity
                        style={[styles.btn]}
                        onPress={() => {setSelectedQuantity(selectedQuantity+1)}} 
                        >
                        <Text style={[styles.txt, {fontSize: 18, marginTop: '18%'}]}>+</Text>
                    </TouchableOpacity>
                </View>
            </View>

        </View>
    );
}

var styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        height: hp('10%'),
        backgroundColor: '#fff',
    },
    img: {
        width: 126,
        height: 80,
    },
    btn: {
        height: 40,
        width: 40,
        backgroundColor: colors.secondary,
        borderRadius: 400/2,
    },
    nomProduit: {
        fontWeight: '700',
        fontSize: 16
    },
    txt: {
        color: colors.tertiary,
        marginTop: '5%',
        fontSize: 25, 
        width: '100%',
        height: '100%',
        textAlign: 'center',
    }
  });
  

export default Produits;