console.disableYellowBox = true;

import React from 'react';
import { StyleSheet, View, StatusBar, Image } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import colors from './components/colors';
/**
 * Module for navigations
 */
import {createAppContainer} from 'react-navigation';
import {createMaterialTopTabNavigator} from 'react-navigation-tabs';
import {createStackNavigator} from 'react-navigation-stack';

/**
 * Import the components
 */
import Scan from './screens/scanner'
import Menu from './screens/menu'
import Panier from './screens/panier'
import Inscription from './screens/inscription'
import Connexion from './screens/connexion'
import SuiviCommande from './screens/suiviCommande'
import MonPaiement from './screens/monPaiement'

/**
 * Import redux
 */
import {createStore, combineReducers} from 'redux';
import {Provider} from 'react-redux';

/**
 * Import reducer
 */
import token from './reducers/token'
import panier from './reducers/panier';
import totalBasket from './reducers/total'
import idUser from './reducers/userId'
import tokenResto from './reducers/tokenResto'
import tokenTable from './reducers/tokenTable'

const store = createStore(combineReducers({panier, token, totalBasket, idUser, tokenResto, tokenTable}));

var TopNavigator = createMaterialTopTabNavigator({
  Inscription: Inscription,
  Connexion: Connexion,
},


  {
    defaultNavigationOptions: ({ navigation }) => ({
      
    }),
    tabBarOptions: {
      activeTintColor: colors.secondary,
      inactiveTintColor: colors.tertiary,
      style: {
        backgroundColor: colors.primary,
        paddingTop: hp('0%'),
      },
      indicatorStyle: {
        backgroundColor: colors.secondary,
        height:hp('0.4%')
      }
    }  
   
  
  });

 

  var StackNavigator = createStackNavigator({
    Scan: {
      screen: Scan,
      navigationOptions: {
        headerTitle:( <Image source={require('./assets/images/Logo.png')} style={{height:40, width:80, marginLeft: wp('33%'), marginTop:5}}/>),
        headerStyle: {
          backgroundColor: colors.primary,  
          poisition : 'relative'
         },
         headerTintColor: colors.tertiary,
         headerBackTitle: '',
        }
      },
    Menu: {
      screen: Menu,
      navigationOptions: {
        headerTitle:( <Image source={require('./assets/images/Logo.png')} style={{height:40, width:80, marginLeft: wp('18%'), marginTop:5}}/>),
        headerStyle: {
          backgroundColor: colors.primary,
        },
        headerTintColor: colors.tertiary,
         headerBackTitle: '',
      }
    },
    Panier: {
      screen: Panier,
      navigationOptions: {
        title: 'Mon Panier',
        headerStyle: {
          backgroundColor: colors.primary
        },
        headerTintColor: colors.tertiary,
        headerBackTitle: '',
      }
    },

    TopNavigator: {
      screen: TopNavigator,
      navigationOptions:{
        title:'',
        headerStyle: {
          backgroundColor: colors.primary,
        },   
        headerTintColor: colors.tertiary,
        headerBackTitle: '',  
      }
    
    },
    MonPaiement: {
      screen: MonPaiement,
      navigationOptions: {
        title: 'Mon paiement',
      headerStyle: {
        backgroundColor: colors.primary
      },
      headerTintColor: colors.tertiary,
      headerBackTitle: '',
    }
    },
    SuiviCommande: {
      screen: SuiviCommande,
      navigationOptions: {
        title: 'Suivi commande',
        headerStyle:{
          backgroundColor: colors.primary
        },
        headerTintColor: colors.tertiary,
        headerBackTitle: '',
      }
    }
  }, 
  );

  const Navigation = createAppContainer(StackNavigator);

function App() {

  // console.log('store.getState() :', store.getState());

  return (
    <Provider store={store}>
      <Navigation/>
    </Provider>
  );
}

export default App;