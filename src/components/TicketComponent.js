import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext } from 'react'
import EvilIcon from 'react-native-vector-icons/EvilIcons';
import { AppContext } from '../context/AppContext';
import moment from 'moment';

const TicketComponent = ({ name, price, departure, arrival, Component, duration, from, to, fromExact, toExact, tripType, remainingSeats, on, date, navigation, id }) => {
    const { loggedIn } = useContext(AppContext);
  return (
    <TouchableOpacity disabled={ Component === 'TouchableOpacity' ? false : true } onPress={() => loggedIn ? navigation.navigate('Create', { name, price, departure, arrival, duration, from, to, fromExact, toExact, tripType, remainingSeats, on, date, navigation, ticketId: id }) : Alert.alert('SoT', 'You need to login first.')} activeOpacity={.8} style={styles.busTicketView}>
        <View style={styles.cardTitle}>
            <Text style={styles.agancyName}>{name}</Text>
            <Text style={styles.price}>{price} RWF</Text>
        </View>
        <View style={styles.timeView}>
            <Text style={styles.time}>{departure}</Text>
            <View style={styles.timeDesgnView}>
                <View style={styles.line} />
                <View style={styles.durationView}>
                    <Text style={styles.duration}>{duration}</Text>
                </View>
                <View style={styles.line} />
            </View>
            <Text style={styles.time}>{arrival}</Text>
        </View>
        <View style={styles.fromToView}>
            <Text style={styles.fromToText}>{from}</Text>
            <View style={styles.timeDesgnView} />
            <Text style={styles.fromToText}>{to}</Text>
        </View>
        <View style={styles.fromToView}>
            <Text style={styles.ExactFromTo}>{fromExact}</Text>
            <View style={styles.timeDesgnView} />
            <Text style={styles.ExactFromTo}>{toExact}</Text>
        </View>
        {on === null ? 
        <View style={styles.chipView}>
            <View style={styles.chip}>
                <Text style={styles.chipText}>One Way</Text>
            </View>
            {on === null ? <View style={styles.chip}>
                <Text style={styles.chipText}>{remainingSeats} Seats</Text>
            </View> : null}
        </View> 
        : 
        <View style={styles.chipView}>
            <View style={[styles.chip, { backgroundColor: on === true ? '#c2eabd' : '#ff9b85', borderWidth: on === true ? 0 : 1 }]}>
                <Text style={styles.chipText}>{on ? 'Trip On' : 'Trip Taken'}</Text>
            </View>
            <View style={[styles.chip ]}>
                <Text style={styles.chipText}>{moment(date).format('DD, MMM YYYY')}</Text>
            </View>
           { on && <TouchableOpacity onPress={() => navigation.navigate('Track', { item: { name, price, departure, arrival, Component, duration, from, to, fromExact, toExact, tripType, remainingSeats, on, date }})} activeOpacity={.7} style={styles.trackButton}>
                <EvilIcon name='location' size={24} color={'#fff'} />
                <Text style={[styles.chipText, { color: '#fff' }]}>Track</Text>
            </TouchableOpacity>}
        </View> 
        }
    </TouchableOpacity>
  )
}

export default TicketComponent

const styles = StyleSheet.create({
    trackButton: {
        width: 80,
        backgroundColor: '#20a4f3',
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 10,
        justifyContent: 'center'
    },
    chipView: {
        flexDirection: 'row',
        margin: 20,
        gap: 20,
    },
    chip: {
        minWidth: 80,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: '#c4c4c4',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 5,
        borderRadius: 10,
        backgroundColor: '#c4c4c4'
    },
    chipText: {
        fontSize: 12,
        fontFamily: 'Quicksand-Bold',
        color: '#4c4c4c',
    },
    ExactFromTo: {
        fontSize: 11,
        fontFamily: 'Quicksand-Bold',
        color: '#4c4c4c',
        width: 75,
    },
    fromToView: {
        flexDirection: 'row',
        gap: 17.5,
        marginHorizontal: 20,
    },
    fromToText: {
        fontSize: 14,
        fontFamily: 'Quicksand-Bold',
        width: 75,
        color: '#000',
    },
    timeDesgnView: {
        flexDirection: 'row',
        alignItems: 'center',
        width: 120,
    },
    line: {
        width: 20,
        borderWidth: 1,
        borderColor: '#c4c4c4'
    },
    timeView: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 15,
        marginHorizontal: 20,
    },
    durationView: {
        paddingVertical: 5,
        borderWidth: 1.5,
        borderColor: '#c4c4c4',
        width: 80,
        alignItems: 'center',
        borderRadius: 40,
    },
    duration: {
        fontSize: 14,
        fontFamily: 'Quicksand-SemiBold',
        color: '#c4c4c4'
    },
    time: {
        fontSize: 18,
        fontFamily: 'Quicksand-Bold',
        width: 80,
        color: '#000',
    },
    price: {
        fontSize: 18,
        fontFamily: 'Quicksand-SemiBold',
        color: '#000',
    },
    agancyName: {
        fontSize: 20,
        fontFamily: 'Quicksand-Bold',
        fontWeight: '900',
        color: '#ffbe0b'
    },
        cardTitle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 20,
    },
    busTicketView: {
        width: '90%',
        height: 200,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#c4c4c4',
        alignSelf: 'center',
        marginTop: 20,
    },
})