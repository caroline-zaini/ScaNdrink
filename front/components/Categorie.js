import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
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
        <TouchableOpacity style={[styles.container, {backgroundColor: colors.primary}]} onPress={() => {handleClick()}}>
            <Image
                style={styles.img}
                source={icon}
            />
            <Text style={styles.txt}>{props.categorieName}</Text>
        </TouchableOpacity>
    );
}

var styles = StyleSheet.create({
    container: {
        backgroundColor: colors.primary,
        borderRadius: 20,
        marginRight: 15,
        width: 126,
        height: '100%',
    },
    img: {
        width: 126,
        height: 80,
    },
    txt: {
        color: colors.tertiary,
        marginTop: '5%',
        fontSize: 16, 
        width: '100%',
        height: '100%',
        textAlign: 'center',
    }
  });
  

export default Categorie;