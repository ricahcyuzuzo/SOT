import { StyleSheet, Text, View, SafeAreaView, Image, TouchableOpacity, TextInput, ScrollView, Platform } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import Icon from '../../assets/images/icon.png';
import axios from 'axios';
import { AppContext } from '../../context/AppContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '../../config/api';
import moment from 'moment';

const AgencyHome = ({ navigation }) => {
    const {loggedIn } = useContext(AppContext);
    const [tickets, setTickets] = useState([]);
    const [bookings, setBookings] = useState([]);
    
    useEffect(() => {
        getTickets();
        getBookings()
    }, []);

    const getTickets = async () => {
        const token = await AsyncStorage.getItem('token');
        const tickets = await axios.get(`${API_URL}/ourtickets`, {
            headers: {
                Authorization: token,
            }
        });

        setTickets(tickets.data.tickets);
    }

    const getBookings = async () => {
        const token = await AsyncStorage.getItem('token');
        const bookings = await axios.get(`${API_URL}/bookings`, {
            headers: {
                Authorization: token,
            }
        });

        setBookings(bookings.data.bookings);
    }



  return (
    <SafeAreaView>
      <ScrollView showsVerticalScrollIndicator={false} style={{ height: '90%',}}>
        <View style={styles.titleView}>
            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 5, }}>
                <Image source={Icon} style={styles.iconImage} />
                <Text style={styles.titleAppName}>SoT</Text>
            </View>
            <TouchableOpacity disabled={loggedIn} onPress={() => navigation.navigate('Login')}><Image source={{ uri: loggedIn ? 'https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg' : 'https://static.vecteezy.com/system/resources/previews/008/442/086/original/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg' }} style={styles.profileStyle}  /></TouchableOpacity>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20, marginTop: 30 }}>
            <TouchableOpacity onPress={() => navigation.navigate('Tickets', { tickets })} style={{ width: '48%', height: 160, borderRadius: 30, backgroundColor: '#669bbc', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', gap: 20, }}>
                <Text style={{ fontSize: 35, color: '#fff', fontWeight: 'medium' }}>Tickets</Text>
                <Text style={{ fontSize: 25, color: '#fff', fontWeight: '900' }}>{tickets.length}</Text>
            </TouchableOpacity>
            <View style={{ width: '48%', height: 160, borderRadius: 30, backgroundColor: '#588157', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', gap: 20, }}>
                <Text style={{ fontSize: 35, color: '#fff', fontWeight: 'medium' }}>Bookings</Text>
                <Text style={{ fontSize: 25, color: '#fff', fontWeight: '900' }}>{bookings.length}</Text>
            </View>
        </View>

        <Text style={{ fontSize: 18, color: '#000', fontWeight: '800', margin: 20, }}>Top 8 Tickets</Text>
        {bookings.slice(0,8).map((item, key) => <View key={key} style={{
             width: '90%',
             height: 50,
             borderRadius: 10,
             backgroundColor: '#e5e5e5',
             justifyContent: 'space-between',
             alignSelf: 'center',
             flexDirection: 'row',
             alignItems: 'center',
             paddingHorizontal: 20,
             marginTop: 10,
        }}>
            <Text>{item.ticket.from} to {item.ticket.destination}</Text>
            <Text>{item.ticket.time}</Text>
        </View>)}
      </ScrollView>
    </SafeAreaView>
  )
}

export default AgencyHome

const styles = StyleSheet.create({
    profileStyle: {
        width: 45,
        height: 45,
        borderRadius: 25,
        resizeMode: 'contain'
    },
    titleAppName: {
        fontFamily: 'Quicksand-Bold',
        fontSize: 30,
        color: '#000'
    },
    titleView: {
        flexDirection: 'row',
        width: '95%',
        justifyContent: 'space-between',
        alignItems: 'center',   
        alignSelf: 'center',
        marginTop: 10,
    },
    iconImage: {
        width: 45,
        height: 45,
        resizeMode: 'stretch',
        alignSelf: 'flex-start',
        borderRadius: 15,
    },
})