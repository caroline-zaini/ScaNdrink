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
        !selectedCategorie ? 
        <Text style={styles.txtSelected}>{props.categorieName}</Text>
        : <Text style={styles.txt}>{props.categorieName}</Text>
    }

    var categorieColor = colors.primary
    selectedCategorie ? categorieColor = colors.primary : categorieColor = colors.tertiary;

    // console.log('produitsTEST :', props.produits);
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
        borderWidth: 1,
        borderColor: '#e6e8eb',
        borderRadius: hp('3%'),
        marginRight: hp('1%'),
        height : hp('19%'),
        shadowOffset:{  width: 10,  height: 10,  },
        shadowColor: 'black',
        shadowOpacity: 1.0,
    },
    elements: {
        borderTopRightRadius: hp('3%'),
        borderTopLeftRadius: hp('3%'),
        overflow: 'hidden',
        width: hp('18%'),
    },
    img: {
        width: hp('18%'),
        height: hp('12%'),
        overflow: 'hidden',
    },
    txt: {
        marginTop: hp('2%'),
        fontWeight: 'bold',
        textAlign: 'center',
    },

    txtSelected: {
        marginTop:hp('0.8%'),
        fontWeight: "bold",
        textAlign: 'center',
        color: colors.secondary
        
    }
  });
  

export default Categorie;