import { Platform, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import IonIcon from 'react-native-vector-icons/Ionicons';
import TicketComponent from '../../components/TicketComponent';

const Tracker = ({ navigation, route }) => {
    const { item } = route.params;

  return (
    <View>
         <MapView
            provider={Platform.OS === 'android' && PROVIDER_GOOGLE} // remove if not using Google Maps
            style={styles.map}
            region={{
                latitude: 37.78825,
                longitude: -122.4324,
                latitudeDelta: 0.015,
                longitudeDelta: 0.0121,
            }}
        >
        </MapView>
        <TicketComponent Component={'View'} navigation={navigation} on={null} arrival={item.arrival} departure={item.departure} duration={item.duration} from={item.from} name={item.name} fromExact={item.fromExact} price={item.price} remainingSeats={item.remainingSeats} to={item.to} toExact={item.toExact} tripType={item.tripType} />
        <TouchableOpacity activeOpacity={.7} style={{ 
            position: 'absolute',
            top: 50,
            left: 20,
            backgroundColor: '#090e2c',
            width: 40,
            height: 40,
            borderRadius: 15,
            justifyContent: 'center',
            alignItems: 'center'
        }} onPress={() => navigation.goBack()}>
            <IonIcon name='arrow-back' size={25} color='#fff' />
        </TouchableOpacity>
    </View>
  )
}

export default Tracker

const styles = StyleSheet.create({
    container: {
        height: 400,
        width: 400,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    map: {
        width: '100%',
        height: '70%',
    },
})