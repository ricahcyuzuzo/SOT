import { Platform, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import IonIcon from 'react-native-vector-icons/Ionicons';
import TicketComponent from '../../components/TicketComponent';
import moment from 'moment';
import axios from 'axios';
import { API_URL } from '../../config/api';

const AgencyList = ({ navigation, route }) => {
    const { date, from, destination } = route.params;
    const [tickets, setTickets] = useState([]);

    useEffect(() => {
        getTickets();
    }, [])

    const getTickets = async () => {
        axios.get(`${API_URL}/tickets`).then((res) => {
            setTickets(res.data.tickets);
            console.log(res.data);
        }).catch((err => {
            console.log(err);
        }));
    }

  return (
    <View>
        <StatusBar barStyle={'light-content'} backgroundColor={'#090e2c'} />
        <View style={styles.titleView}>
            <SafeAreaView>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', margin: 10, }}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <IonIcon name='arrow-back' size={34} color='#fff' />
                    </TouchableOpacity>
                    <View>
                        <Text style={{ fontFamily: 'Quicksand-Bold', color: '#fff', fontSize: 20, textAlign: 'center' }}>{from} to {destination}</Text>
                        <Text style={{ fontFamily: 'Quicksand-Regular', color: '#fff', fontSize: 17, textAlign: 'center' }}>{moment(date).format('DD MMM, YYYY')}</Text>
                    </View>
                    <View style={{ width: 30, }} />
                </View>
            </SafeAreaView>
        </View>
        <ScrollView style={{
            height: '80%'
        }}>
        {tickets.map((item, idx) => {
            const agency = JSON.parse(item.agency);
            console.log(agency);
            let distance = Math.abs(new Date(item.time) - new Date(item.arrival));
            const hours = Math.floor(distance / 3600000);
            distance -= hours * 3600000;
            const duration = `${hours} ${hours > 1 ? 'Hrs' : 'Hr' }`
            return <TicketComponent id={item._id} Component={'TouchableOpacity'} navigation={navigation} on={null} arrival={item.arrival.split("T")[1]} departure={item.time.split("T")[1]} duration={duration} from={item.from} name={agency.name} fromExact={item.from} price={item.price} remainingSeats={item.remainingSeats} to={item.destination} toExact={item.destination} tripType={item.tripType} key={idx} />
        })}
        </ScrollView>
    </View>
  )
}

export default AgencyList

const styles = StyleSheet.create({
    titleView: {
        width: '100%',
        height: Platform.OS === 'android' ? 100 : 150,
        backgroundColor: '#090e2c',
    }
})