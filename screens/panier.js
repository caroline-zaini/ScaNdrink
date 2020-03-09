import React from 'react';
import { StyleSheet, View, StatusBar, ScrollView } from 'react-native';
import { connect } from 'react-redux'
import { Text, Button } from 'react-native-elements';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

/**
 * import from components
 */
import colors from '../components/colors';
import Bouton from '../components/Bouton';
import ProduitPanier from '../components/ProduitPanier';






function Panier({displayPanier, navigation, takeTotalOnClick}) {

    var total = 0;

    console.log('displayPanier :', displayPanier);

    var listPanier = displayPanier.map((produit, j) => {
      total += produit.price*produit.quantity;
      return <ProduitPanier key={j} produitName={produit.name} produitQuantity={produit.quantity} produitPrice={produit.price*produit.quantity} />
    })


   

    return (
  
    <View style={{flex:1}}>
       
       

            <View>
            <StatusBar barStyle="light-content" />
            </View>

            <ScrollView style={{backgroundColor: colors.tertiary}}>
  
            <View style={styles.produitContainer}>
            {listPanier}
            </View>

            </ScrollView>

            <View style={styles.totalContainer}>
              
              <View style={{width: wp('80%'), paddingLeft: '5%'}}>
              <Text style={{ fontWeight: 'bold', fontSize:hp('1.8%')}}>Total de votre commande:</Text>
              </View>

              <View style={{width: wp('20%')}}>
              <Text style={{fontWeight: 'bold', fontSize:hp('1.8%')}}>{total}€</Text>
              </View>

            </View>
         

         {/* <Bouton title='ETAPE SUIVANTE' destination='Inscription' /> */}
         <Button
            buttonStyle={styles.btn}
            title="ETAPE SUIVANTE"
            onPress= {() => {takeTotalOnClick(total), navigation.navigate('Inscription')}}
            />

    </View>

    );
  }
  
  const styles = StyleSheet.create({
    container: {
      backgroundColor: colors.tertiary,
    },
    produitContainer: {
      justifyContent: 'center',
      alignItems:'center',
      marginTop: hp('4%'),
      height: hp('20%')
   
    },
    totalContainer: {
      flexDirection: 'row',
    
      marginTop: hp('2%'),
      marginBottom: hp('2%'),
      height: hp('10%'),
      backgroundColor: colors.tertiary,
      alignItems: 'center',
      justifyContent: 'center',
    },
    btn: {
      backgroundColor: colors.secondary, 
      marginLeft:hp('7%'), 
      marginRight:hp('7%'), 
      marginBottom:hp('5%'),
      height:hp('6%'),
     
    }
  });

  function mapStateToProps(state) {
    console.log('state :', state.panier);
    return { displayPanier: state.panier }
  }

  function mapDispatchToProps(dispatch) {
    return {
      takeTotalOnClick: function(total) {
        dispatch( { type: 'takeTotal', total: total} )
        console.log('total :', total);
      }
    }
  }

  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(Panier);