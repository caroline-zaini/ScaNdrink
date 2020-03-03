console.disableYellowBox = true;

import React, { useState, useEffect }  from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { Image, Card, Button} from 'react-native-elements';

import colors from '../components/colors';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

import Categorie from '../components/Categorie';
import Produit from '../components/Produit';




export default function Menu({navigation})  {

  var categoriesData = [
    {name: 'Bières', img: require(`../assets/images/biere.jpg`), produits: ['Leffe', 'Desperados', 'Skoll']},
    {name: 'Cocktails', img: require(`../assets/images/cocktail.jpg`), produits: ['porto', 'ricain', 'tequila framboise']},
    {name: 'Shooters'},
    {name: 'Softs'},
    {name: 'Vins'}
  ];

  const [produitsData, setProduitsData] = useState(categoriesData[0].produits);

  var handleClick = (name, produits) => {
    setProduitsData(produits)
  }

  var categorieList = categoriesData.map((categorie, i) => {
    return <Categorie key={i} categorieName={categorie.name} categorieImg={categorie.img} produits={categorie.produits} handleClickParent={handleClick} />
  });

  if (produitsData == undefined) {
    var produitList = <Text>Aucun produits disponible</Text>
  } else {
    var produitList = produitsData.map((produit, j) => {
      return <Produit key={j} produitName={produit} />
    })
  }

  return (
    <View style={styles.container}>

      <View style={styles.header}>
        <Text style={{fontSize: 25, marginTop: 25, color: '#fff'}}>Nom du bar</Text>
      </View>

      <ScrollView showsHorizontalScrollIndicator={false} horizontal={true} style={styles.categorieList}>
        {categorieList}
      </ScrollView>

      <ScrollView showsHorizontalScrollIndicator={false} style={styles.produitList}>
        {produitList}
      </ScrollView>

      <Button
        title="Panier"
        buttonStyle={{height: hp('10%'), backgroundColor: colors.primary}}
        onPress={() => navigation.navigate('Panier')}
      />

    </View>
  );
}

var styles = StyleSheet.create({
  container: {
    backgroundColor: colors.tertiary,
    flex: 1
  },
  header: {
    backgroundColor: colors.primary,
    height: hp('11.5%'),
    alignItems: "center",
    justifyContent: "center"
  },
  categorieList: {
    padding: hp('2%'),
    height: hp('18%')
  },
  produitList: {
    backgroundColor: '#fff',
    height: hp('57%'),
    marginTop: hp('1.5%')
  },
  nomProduit: {
    fontSize: 15,
    fontWeight: "bold",
    marginLeft: hp('2%'),
    marginTop: hp('2%'),
    color: colors.primary,
  },
  prixProduit: {
    fontSize: 13,
    marginLeft: hp('2%'),
    color: colors.primary,
  }


});



