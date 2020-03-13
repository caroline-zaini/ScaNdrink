console.disableYellowBox = true;

import React, { useState, useEffect }  from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';

import colors from '../components/colors';
import Bouton from '../components/Bouton';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

import Categorie from '../components/Categorie';
import Produit from '../components/Produit';

function Menu(props)  {

  // const [category, setCategory] = useState('')
  const [product, setProduct] = useState([])

  useEffect(async () => {
    const responseproduct = await fetch('http://10.2.5.210:3000/qrcode')
    const jsonResponse = await responseproduct.json()
    console.log(jsonResponse)

    setProduct(jsonResponse)

  }, [])

  var produits = [
   {
     name: 'Leffe',
     price: 3.50,
     quantity: 0,
     tva: 25,
   },
   {
    name: 'Desperados',
    price: 3.60,
    quantity: 0,
    litre: 33,
   },
   {
    name: 'Skoll',
    price: 4.50,
    quantity: 0,
    litre: 25,
   },
   {
    name: 'Brooklyn Lagers',
    price: 7.50,
    quantity: 0,
    litre: 50,
   },
   {
    name: 'Chouffe',
    price: 6.50,
    quantity: 0,
    litre: 50,
   },
   {
    name: 'Heineken',
    price: 4.50,
    quantity: 0,
    litre: 25,
   },
   {
    name: '1664',
    price: 4.50,
    quantity: 0,
    litre: 25,
   },
   {
    name: 'Corona',
    price: 4.50,
    quantity: 0,
    litre: 25,
   },
   {
    name: 'Blonde du moment',
    price: 4.50,
    quantity: 0,
    litre: 25,
   },

  ];

  var produitsTwo = [
    {
      name: 'Martini',
      price: 5.50,
      quantity: 0,
      litre: 25,
    },
    {
     name: 'Margarita',
     price: 5,
     quantity: 0,
     litre: 25,
    },
    {
     name: 'Cosmopolitain',
     price: 5.50,
     quantity: 0,
     litre: 25,
    },
   ];

  var categoriesData = [
    {name: 'Bières', img: require('../assets/images/biere.jpg'), produits: produits},
    {name: 'Cocktails', img: require('../assets/images/cocktail.jpg'), produits: produitsTwo},
    {name: 'Shooters', img: require('../assets/images/shooters.jpg')},
    {name: 'Softs', img: require('../assets/images/soft.jpg')},
    {name: 'Vins', img: require('../assets/images/vins.jpg')}
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
    var produitList = <Text style={styles.texte}>Aucun produits disponible</Text>
  } else {
    var produitList = produitsData.map((produit, j) => {

      var quantite = 0;
      for (let i = 0; i < props.displayPanier.length; i++) {
        if (produit.name == props.displayPanier[i].name && produit.name != undefined)
          quantite = props.displayPanier[i].quantity;
      }

      return <Produit key={j} produitName={produit.name} produitPrice={produit.price} produitQuantity={quantite} produitLitre={produit.litre} displayQuantity={props.displayPanier.quantity} />
    })
  }

  if (props.displayPanier[0]) {
    var boutonPanier = <Bouton title='PANIER' destination='Panier' />
  } else {
    var boutonPanier = <View style={{height: hp('12%')}}></View>
  }

  return (
    <View style={styles.container}>

  <ScrollView showsHorizontalScrollIndicator={false} horizontal={true} style={styles.categorieList}>
    {categorieList}
  </ScrollView>

  <ScrollView showsHorizontalScrollIndicator={false} style={styles.produitList}>
    {produitList}
  </ScrollView>

  <View style={styles.bouton}>

       {boutonPanier}
      </View>
        
    </View>
  );
}

var styles = StyleSheet.create({
  container: {
    backgroundColor: colors.tertiary,
    flex: 1
  },
  bouton :{
    padding: hp('0.5%'),
    marginTop: hp('0.5%'),
    alignContent: 'center'
  },
  texte :{
    padding: hp('10%'),
    alignSelf: 'center',
  },
  header: {
    backgroundColor: colors.primary,
    height: hp('11.5%'),

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
    backgroundColor: colors.tertiary,
    height: hp('52%'),
    marginTop: hp('1%'),
    marginBottom:hp('2%'),
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

function mapDispatchToProps(dispatch) {
  return {
      addTokenTable: function(token) {
        console.log('token :', token);
          dispatch( {type: 'addTokenTable', tokenTable: token }) 
      }
  }
}

function mapStateToProps(state) {
  console.log('state :', state);
  return { displayPanier: state.panier, displayTokenResto: state.tokenResto }
}

export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(Menu);