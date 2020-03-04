import React from 'react';
import { StyleSheet, View, StatusBar, ScrollView } from 'react-native';
import { connect } from 'react-redux'
import { Text, Button } from 'react-native-elements';

import ProduitPanier from '../components/ProduitPanier';
import Bouton from '../components/Bouton';

import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import colors from '../components/colors';

function Panier(props) {

    var total = 0;

    console.log('props.displayPanier :', props.displayPanier);

    var listPanier = props.displayPanier.map((produit, j) => {
      total += produit.price*produit.quantity;
      return <ProduitPanier key={j} produitName={produit.name} produitQuantity={produit.quantity} produitPrice={produit.price*produit.quantity} />
    })

    return (
  
    <View style={{flex:1}}>
       <ScrollView>

          <View>
            <StatusBar barStyle="light-content" />
          </View>
  
          <View style={styles.container}>

            <View style={styles.produitContainer}>
                {listPanier}
            </View>

            <View style={styles.totalContainer}>
              <View style={{width: wp('80%'), paddingLeft: '20%'}}>
                <Text>Total de votre commande:</Text>
              </View>
              <View style={{width: wp('20%')}}>
                  <Text style={styles.prixProduit}>{total}€</Text>
              </View>
            </View>
         
          </View>

         <Bouton title='ETAPE SUIVANTE' destination='Inscription' />

        </ScrollView>
      
    </View>

    );
  }
  
  const styles = StyleSheet.create({
    container: {
      height: hp('81%'),
    },
    produitContainer: {
      justifyContent: 'center',
      alignItems:'center',
      marginTop: hp('4%'),
      marginBottom:hp('7%'),
    },
    totalContainer: {
      flexDirection: 'row',
      height: hp('10%'),
      backgroundColor: colors.tertiary,
      alignItems: 'center',
      justifyContent: 'center',
    }
  });

  function mapStateToProps(state) {
    console.log('state :', state.panier);
    return { displayPanier: state.panier }
  }

  export default connect(
    mapStateToProps,
    null
  )(Panier);