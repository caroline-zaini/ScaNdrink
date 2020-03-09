import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { Overlay } from 'react-native-elements'
import colors from '../components/colors';
import { connect } from 'react-redux'

import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

function ProduitPanier(props) {

    const [selectedQuantity, setSelectedQuantity] = useState(props.produitQuantity);
    const [modalVisibility, setModalVisibility] = useState(false);


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
        var displayBoutonMoins = <TouchableOpacity
                            style={styles.btn}
                            onPress={() => {deleteProduct(props)}} 
                            >
                            <Text style={styles.txt}>-</Text>
                        </TouchableOpacity>
        var displayQantity = <Text style={[styles.txt, {fontSize: 18, marginTop: '20%', color: '#000'}]}>{selectedQuantity}</Text>
    } else {
        var displayQantity = null;
        var displayBoutonMoins = null;
    }

    return (

        <View>

            <TouchableOpacity style={styles.container} onPress={() => setModalVisibility(true)}>

                <View style={{width: wp('20%')}}>
                    <Text style={styles.quantitéProduit}>{props.produitQuantity}x</Text>
                </View>

                <View style={{width: wp('60%')}}>
                    <Text style={styles.nomProduit}>{props.produitName} (25cl)</Text>
                </View>

                <View style={{width: wp('20%')}}>
                    <Text style={styles.prixProduit}>{props.produitPrice}€</Text>
                </View>

            </TouchableOpacity>

                

            <Overlay
            isVisible={modalVisibility}
            onBackdropPress={ () => setModalVisibility(false)}
            height={'20%'}
            width={'85%'}
            overlayBackgroundColor={colors.tertiary}
            containerStyle={{}}
            >
                <View>

                    <View style={{flexDirection: 'row', paddingTop: '3%', alignItems: 'center', justifyContent: 'center'}}>

                        <Text style={styles.nomProduit}>{props.produitName} (25cl)</Text>

                    </View>

                    <View style={{flexDirection: 'row', marginTop: '3%', alignItems: 'center', justifyContent: 'center'}}>

                        <TouchableOpacity
                            style={styles.btn}
                            onPress={() => {deleteProduct(props)}} 
                            >
                            <Text style={styles.txt}>-</Text>
                        </TouchableOpacity>

                        <Text style={{marginLeft: '5%', marginRight: '5%'}}>{props.produitQuantity}</Text>

                        <TouchableOpacity
                            style={[styles.btn]}
                            onPress={() => {addProduct(props)}} 
                            >
                            <Text style={[styles.txt, {fontSize: 18, marginTop: '18%'}]}>+</Text>
                        </TouchableOpacity>    

                    </View>

                    <View style={{flexDirection: 'row', marginTop: '3%',alignItems: 'center', justifyContent: 'center'}}>

                        <Text>Prix: {props.produitPrice}€</Text>

                    </View>

                </View>

            </Overlay>

        </View>

        );

}

var styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        height: hp('10%'),
        backgroundColor: colors.tertiary,
        alignItems: 'center',
        paddingBottom: hp('2%')
    },
    btn: {
        height: 40,
        width: 40,
        backgroundColor: colors.secondary,
        borderRadius: 400/2,
    },
    nomProduit: {
        fontWeight: '500',
        fontSize: 16
    },
    quantitéProduit: {
        fontWeight: '700',
        fontSize: 18,
        color: colors.secondary,
        paddingLeft: '25%'
    },
    prixProduit: {
        fontSize: 16,
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
            dispatch( {type: 'addProduit', produitName: produit.produitName, produitPrice: produit.produitPrice, produitQuantity: produit.produitQuantity }) 
        },
        removeFromBasket: function(produit) {
            dispatch( {type: 'deleteProduit', produitName: produit.produitName, produitPrice: produit.produitPrice, produitQuantity: produit.produitQuantity })
        }
    }
}

export default connect(
    null, 
    mapDispatchToProps
)(ProduitPanier);