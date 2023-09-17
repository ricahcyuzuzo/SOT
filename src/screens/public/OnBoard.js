import { Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Bus from '../../assets/images/bus.png';
import Icon from '../../assets/images/icon.png';
import Route from '../../assets/images/route.png';

const OnBoard = ({ navigation }) => {

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Image source={Icon} style={styles.iconImage} />
        <Image source={Bus} style={styles.busImage} />
        <Image source={Route} style={styles.routeImage} />
        <View style={styles.buttonView}>
            <Text style={styles.header}>Welcome to SoT App</Text>
            <Text style={styles.text}>With Soft Ticket App you have the ability to book and track a bus and get a smooth ride.</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Bottom')} activeOpacity={.8} style={styles.button}>
                <Text style={styles.buttonText}>Get Started</Text>
            </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default OnBoard

const styles = StyleSheet.create({
    buttonText: {
        fontSize: 18,
        fontFamily: 'Quicksand-SemiBold',
        color: '#fff'
    },
    buttonView: {
        position: 'absolute',
        bottom: 20,
        alignSelf: 'center',
        width: '90%',
    },
    button: {
        width: 200,
        height: 50,
        borderRadius: 20,
        backgroundColor: '#090e2c',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
    },
    header: {
        fontFamily: 'Quicksand-Bold',
        color: '#000',
        fontSize: 30,
    },
    text: {
        fontFamily: 'Quicksand-Light',
        color: '#000',
        fontSize: 17,
        alignSelf: 'center',
        marginTop: 10
    },
    busImage: {
        width: '70%',
        height: 200,
        resizeMode: 'stretch',
        margin: 10,
    },
    routeImage: {
        width: 100,
        height: 100,
        resizeMode: 'contain',
        alignSelf: 'flex-end',
        margin: 10,
    },
    iconImage: {
        width: 80,
        height: 80,
        resizeMode: 'stretch',
        alignSelf: 'flex-start',
        borderRadius: 30,
        margin: 10,
    },
    container: {
        width: '100%',
        height: '100%',
    }
})