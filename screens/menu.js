console.disableYellowBox = true;

import React, { useState, useEffect }  from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux'

import colors from '../components/colors';
import Bouton from '../components/Bouton';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

import Categorie from '../components/Categorie';
import Produit from '../components/Produit';


function Menu(props)  {

  var produits = [
   {
     name: 'Leffe',
     price: 3.50,
     quantity: 0,
   },
   {
    name: 'Desperados',
    price: 3.50,
    quantity: 0,
   },
   {
    name: 'Skoll',
    price: 4.50,
    quantity: 0,
   },
  ];

  var produitsTwo = [
    {
      name: 'Martini',
      price: 5.50,
      quantity: 0,
    },
    {
     name: 'Margarita',
     price: 5,
     quantity: 0,
    },
    {
     name: 'Cosmopolitain',
     price: 5.50,
     quantity: 0,
    },
   ];

  var categoriesData = [
    {name: 'Bières', img: require(`../assets/images/biere.jpg`), produits: produits},
    {name: 'Cocktails', img: require(`../assets/images/cocktail.jpg`), produits: produitsTwo},
    {name: 'Shooters'},
    {name: 'Softs'},
    {name: 'Vins'}
  ];

  const [produitsData, setProduitsData] = useState(categoriesData[0].produits);


  // console.log('produitsDataTT :', produitsData);
  // console.log('props.displayPanier :', props.displayPanier.quantity);

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

      var quantite = 0;
      for (let i = 0; i < props.displayPanier.length; i++) {
        if (produit.name == props.displayPanier[i].name && produit.name != undefined)
          quantite = props.displayPanier[i].quantity;
      }
      console.log('quantite :', quantite);
      return <Produit key={j} produitName={produit.name} produitPrice={produit.price} produitQuantity={quantite} displayQuantity={props.displayPanier.quantity} />
    })
  }

  if (props.displayPanier[0]) {
    var boutonPanier = <Bouton title='PANIER' destination='Panier' />
  } else {
    var boutonPanier = <View style={{height: hp('11%')}}></View>
  }

  return (
    <View style={styles.container}>

      <ScrollView showsHorizontalScrollIndicator={false} horizontal={true} style={styles.categorieList}>
        {categorieList}
      </ScrollView>

      <ScrollView showsHorizontalScrollIndicator={false} style={styles.produitList}>
        {produitList}
      </ScrollView>
    
      {boutonPanier}

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
    // paddingHorizontal: hp('0.9%'),
    // paddingVertical: hp('1.5%'),
    paddingRight: hp('0.9%'),
    paddingLeft: hp('0.9%'),
    paddingTop: hp('1.5%'),
    paddingBottom: hp('1.5%'),
    height: hp('23%')
  },
  produitList: {
    backgroundColor: '#fff',
    height: hp('52%'),
    marginTop: hp('1%')
  },
  nomProduit: {
    fontSize: 15,
    fontWeight: "bold",
    marginLeft: hp('5%'),
    marginTop: hp('2%'),
    color: colors.primary,
  },
  prixProduit: {
    fontSize: 13,
    marginLeft: hp('2%'),
    color: colors.primary,
  }


});

function mapStateToProps(state) {
  console.log('state :', state.panier);
  return { displayPanier: state.panier }
}

export default connect(
  mapStateToProps,
  null
)(Menu);