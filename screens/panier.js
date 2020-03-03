import React from 'react';
import { StyleSheet, View, StatusBar, ScrollView } from 'react-native';
import { connect } from 'react-redux'
import { Text, Button } from 'react-native-elements';

import Produit from '../components/Produit';

import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

function Panier(props) {

    var listPanier = props.displayPanier.map((produit, j) => {
      return <Produit key={j} produitName={produit} />
    })

    return (
  
    <View style={{flex:1}}>
       <ScrollView>
          <View>
            <StatusBar barStyle="light-content" />
          </View>
  
          <View style= {{ justifyContent:"center", alignItems:'center', marginTop: hp('4%'), marginBottom:hp('7%') }}>
              {listPanier}
          </View>

          <Button
          buttonStyle={{backgroundColor: '#50bda1', marginLeft:hp('7%'), marginRight:hp('7%'), height:hp('6%')}}
          title="ETAPE SUIVANTE"
          onPress={() => props.navigation.navigate('Inscription')}
          />
         
         </ScrollView>
      
    </View>

    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop:'10%',
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

  function mapStateToProps(state) {
    console.log('state :', state.panier);
    return { displayPanier: state.panier }
  }

  export default connect(
    mapStateToProps,
    null
  )(Panier);