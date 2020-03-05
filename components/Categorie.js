import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Image } from 'react-native-elements';

import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

import colors from '../components/colors';

function Categorie(props) {

    const [selectedCategorie, setSelectedCategorie] = useState(false)

    var handleClick = () => {
        !selectedCategorie ? setSelectedCategorie(true) : setSelectedCategorie(false);
        props.handleClickParent(props.categorieName, props.produits);
    }

    var categorieColor = colors.primary
    selectedCategorie ? categorieColor = colors.primary : categorieColor = colors.tertiary;

    // console.log('produits :', props.produits);
    var icon = props.categorieImg
    ? props.categorieImg
    : require('../assets/images/missing.jpg') // Rechercher une image via google avec un algorithme

    return (
        <View style={styles.container}>

            <TouchableOpacity style={styles.elements} onPress={() => {handleClick()}}>

                <Image
                    style={styles.img}
                    source={icon}
                />
                <Text style={styles.txt}>{props.categorieName}</Text>

            </TouchableOpacity>

        </View>
    );
}

var styles = StyleSheet.create({
    container: {
        // backgroundColor: colors.primary,
        borderWidth: 1,
        // borderColor: colors.tertiary,
        borderRadius: hp('3%'),
        marginRight: hp('1%')
    },
    elements: {
        borderTopRightRadius: hp('3%'),
        borderTopLeftRadius: hp('3%'),
        overflow: 'hidden',
    },
    img: {
        width: hp('18%'),
        height: hp('12%'),
        overflow: 'hidden',
    },
    txt: {
        // color: colors.tertiary,
        marginTop: hp('0.8%'),
        fontWeight: 'bold',
        // width: '100%',
        // height: '100%',
        textAlign: 'center',
    },
  });
  

export default Categorie;