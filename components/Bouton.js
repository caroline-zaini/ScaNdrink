import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import colors from './colors';
import { withNavigation } from 'react-navigation';

import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

function Bouton(props) {

    return (
        
        <TouchableOpacity style={styles.btn} onPress={() => props.navigation.navigate(props.destination)}>
            <Text style={styles.txt}>{props.title}</Text>
        </TouchableOpacity>

    )
}

var styles = StyleSheet.create({
    btn: {
        backgroundColor: colors.secondary,
        marginLeft:hp('5%'),
        marginRight:hp('5%'),
        height:hp('6%'),
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 3,
        marginBottom: hp('5%')
    },
    txt: {
        fontSize: 16,
        fontWeight: '700',
        color: colors.tertiary
    }
  });

export default withNavigation(Bouton);