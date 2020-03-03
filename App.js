console.disableYellowBox = true;

import React from 'react';
import { StyleSheet, View, StatusBar } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

/**
 * Module for navigations
 */
import {createAppContainer} from 'react-navigation';
import {createMaterialTopTabNavigator} from 'react-navigation-tabs';
import {createStackNavigator} from 'react-navigation-stack';

/**
 * Import the composents
 */
import Menu from './screens/menu'
import Panier from './screens/panier'
import Inscription from './screens/inscription'
import Connexion from './screens/connexion'
import SuiviCommande from './screens/suiviCommande'
import MonPaiement from './screens/monPaiement'









var TopNavigator = createMaterialTopTabNavigator({
  Inscription: Inscription,
  Connexion: Connexion,
},
  {
    defaultNavigationOptions: ({ navigation }) => ({
      
    }),
    tabBarOptions: {
      activeTintColor: '#50bda1',
      inactiveTintColor: '#FFFFFF',
      style: {
        backgroundColor: '#152228',
        paddingTop: hp('0%'),
      },
      indicatorStyle: {
        backgroundColor: '#50bda1',
        height:hp('0.4%')
      }
    }  
   
  
  });

 

  var StackNavigator = createStackNavigator({
    Menu: {
      screen: Menu,
      navigationOptions: {
        title: '',
        headerStyle: {
          backgroundColor: '#152228',
        }
      }
    },
    Panier: {
      screen: Panier,
      navigationOptions: {
        title: 'Mon Panier',
        headerStyle: {
          backgroundColor: '#152228'
        },
        headerTintColor: '#FFFF',
        headerBackTitle: '',
      }
    },

    TopNavigator: {
      screen: TopNavigator,
      navigationOptions:{
        title:'',
        headerStyle: {
          backgroundColor: '#152228',
        },     
      }
    
    },
    MonPaiement: {
      screen: MonPaiement,
      navigationOptions: {
        title: 'Mon paiement',
      headerStyle: {
        backgroundColor: '#152228'
      },
      headerTintColor: '#FFFF',
      headerBackTitle: '',
    }
    },
    SuiviCommande: {
      screen: SuiviCommande,
      navigationOptions: {
        title: 'Suivi commande',
        headerStyle:{
          backgroundColor: '#152228'
        },
        headerTintColor: '#FFFF',
        headerBackTitle: '',
      }
    }
  }, 
  );

  const Navigation = createAppContainer(StackNavigator);

  export default function App() {
    return (
    
        <Navigation/>
      
    );
   }

