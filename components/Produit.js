import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import colors from '../components/colors';
import { connect } from 'react-redux'

import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

function Produits(props) {

    const [selectedQuantity, setSelectedQuantity] = useState(0);

    var addProduct = (produit) => {
        if (selectedQuantity >= 0) {
            setSelectedQuantity(selectedQuantity+1)
            props.addToBasket(produit)
        }
    }

    var deleteProduct = (produit) => {
        if (selectedQuantity > 0) {
            setSelectedQuantity(selectedQuantity-1)
            props.removeFromBasket(produit)
        }
    }

    if (selectedQuantity > 0) {

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
                            onPress={() => {deleteProduct(props.produitName)}} 
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
                            onPress={() => {addProduct(props.produitName)}} 
                            >
                            <Text style={[styles.txt, {fontSize: 18, marginTop: '18%'}]}>+</Text>
                        </TouchableOpacity>
                    </View>
                </View>

            </View>
        );

    } else {

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
                        {/* Vide */}
                    </View>
                    <View style={{width: '25%', height: '100%'}}>
                        {/* Vide */}
                    </View>
                    <View style={{width: '33%', height: '100%'}}>
                        <TouchableOpacity
                            style={[styles.btn]}
                            onPress={() => {addProduct(props.produitName)}} 
                            >
                            <Text style={[styles.txt, {fontSize: 18, marginTop: '18%'}]}>+</Text>
                        </TouchableOpacity>
                    </View>
                </View>

            </View>
        );

    }
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

function mapDispatchToProps(dispatch) {
    return {
        addToBasket: function(produit) {
            dispatch( {type: 'addProduit', produit: produit }) 
        },
        removeFromBasket: function(produit) {
            dispatch( {type: 'deleteProduit', produit: produit })
        }
    }
}

export default connect(
    null, 
    mapDispatchToProps
)(Produits);