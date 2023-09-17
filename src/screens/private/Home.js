import { StyleSheet, Text, View, SafeAreaView, Image, TouchableOpacity, TextInput, ScrollView, Platform } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import Icon from '../../assets/images/icon.png';
import FontAwasome5 from 'react-native-vector-icons/FontAwesome5';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import TicketComponent from '../../components/TicketComponent';
import { AppContext } from '../../context/AppContext';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { API_URL } from '../../config/api';
import moment from 'moment';


const Home = ({ navigation }) => {
    const [oneWay, setOneWay] = useState(false);
    const {loggedIn } = useContext(AppContext);
    const [tickets, setTickets] = useState([]); 
    const [dateOn, setDateOn] = useState(false);
    const [data, setData] = useState({
        from: '',
        to: '',
        date: new Date(),
        time: '',
        errorTravelView: '',
    });

    useEffect(() => {
        getTickets();
    }, [])

    const getTickets = async () => {
        axios.get(`${API_URL}/tickets`).then((res) => {
            setTickets(res.data.tickets);

        }).catch((err => {
            console.log(err, 'KKKK');
        }));
    }

  return (
    <SafeAreaView>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.titleView}>
            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 5, }}>
                <Image source={Icon} style={styles.iconImage} />
                <Text style={styles.titleAppName}>SoT</Text>
            </View>
            <TouchableOpacity disabled={loggedIn} onPress={() => navigation.navigate('Login')}><Image source={{ uri: loggedIn ? 'https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg' : 'https://static.vecteezy.com/system/resources/previews/008/442/086/original/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg' }} style={styles.profileStyle}  /></TouchableOpacity>
        </View>
        <View style={styles.searchView}>
            <View>
                <View style={{ flexDirection: 'row', gap: 10, margin: 10 }}>
                    <TouchableOpacity onPress={() => setOneWay(true)} activeOpacity={.6}>
                        <Text style={[styles.wayButton, { color: oneWay ? '#000' : '#4c4c4c' }]}>One-way</Text>
                    </TouchableOpacity>
                    {/* <TouchableOpacity onPress={() => setOneWay(false)} activeOpacity={.6}>
                        <Text style={[styles.wayButton, { color: !oneWay ? '#000' : '#4c4c4c' }]}>Round trip</Text>
                    </TouchableOpacity> */}
                </View>
                <View>
                    <TextInput
                        placeholder='From Place'
                        onChangeText={(val) => setData({ ...data, from: val })}
                        placeholderTextColor={'#c4c4c4'}
                        style={{
                            width: '95%',
                            height: 50,
                            borderRadius: 14,
                            borderWidth: 1,
                            borderColor: '#c4c4c4',
                            alignSelf: 'center',
                            marginTop: 10,
                            paddingLeft: 35,
                            fontSize: 16,
                            fontFamily: 'Quicksand-Regular',
                            color: '#000',

                        }}
                    />
                    <FontAwasome5 name='location-arrow' size={20} color={'#4c4c4c'} style={{
                        position: 'absolute',
                        left: 15,
                        top: 22,
                        transform: [{ rotate: '135deg' }]
                    }} />
                </View>
                <View>
                    <TextInput
                        placeholder='Destination'
                        onChangeText={(val) => setData({ ...data, to: val })}
                        placeholderTextColor={'#c4c4c4'}
                        style={{
                            width: '95%',
                            height: 50,
                            borderRadius: 14,
                            color: '#000',
                            borderWidth: 1,
                            borderColor: '#c4c4c4',
                            alignSelf: 'center',
                            marginTop: 10,
                            paddingLeft: 35,
                            fontSize: 16,
                            fontFamily: 'Quicksand-Regular'

                        }}
                    />
                    <Entypo name='location' size={24} color={'#4c4c4c'} style={{
                        position: 'absolute',
                        left: 15,
                        top: 22,
                    }} />
                </View>
                <View style={{
                    width: '95%',
                    height: 50,
                    borderRadius: 14,
                    borderWidth: 1,
                    borderColor: '#c4c4c4',
                    alignSelf: 'center',
                    marginTop: 10,
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 5,
                    paddingLeft: 30
                }}>
                    { Platform.OS === 'android' && <TouchableOpacity onPress={() => setDateOn(true)}><Text style={{ fontSize: 18, fontFamily: 'Quicksand-Medium', color: '#000', marginLeft: 10 }}>{moment(data.date).format('DD, MMM YYYY')}</Text></TouchableOpacity> }
                    {Platform.OS === 'ios' ? <RNDateTimePicker d onChange={(val) => {
                        setData({...data, date: new Date(val.nativeEvent.timestamp) });
                    }} locale="en-EN"  style={{ width: 90 }} mode="date" value={data.date} /> : dateOn && <RNDateTimePicker onChange={(val) => {
                        setDateOn(false)
                        setData({...data, date: new Date(val.nativeEvent.timestamp) })
                    }} locale="en-EN"  style={{ width: 90 }} mode="date" value={data.date} />}
                    <Feather name='calendar' size={24} color={'#4c4c4c'} style={{
                        position: 'absolute',
                        left: 5,
                        top: 12,
                    }} />
                </View>
                <TouchableOpacity onPress={() => {
                    if(data.from.length === 0){
                        setData({ ...data, errorTravelView: 'From Place is Required' });
                    }else if(data.to.length === 0){
                        setData({ ...data, errorTravelView: 'Destination is Required' });
                    }else{
                        setData({ ...data, errorTravelView: '' });
                        navigation.navigate('Agency', { date: data.date, from: data.from, destination: data.to });
                    }
                }} style={{
                    width: '95%',
                    height: 60,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 30,
                    backgroundColor: '#090e2c',
                    alignSelf: 'center',
                    marginTop: 25
                }}>
                    <Text style={{ color: '#fff', fontFamily: 'Quicksand-Medium', fontSize: 18, }}>Search</Text>
                </TouchableOpacity>
                {data.errorTravelView.length > 0 &&<Text style={{ color: '#a12', fontFamily: 'Quicksand-Medium', fontSize: 18, textAlign: 'center', marginTop: 10, paddingHorizontal: 40 }}>{data.errorTravelView?.slice(0, 1)?.toUpperCase() + data.errorTravelView.slice(1)}</Text>}
            </View>
        </View>
        <View style={{
            width: '90%',
            alignSelf: 'center',
            marginTop: 20,
        }}>
            <Text style={{
                fontFamily: 'Quicksand-Bold',
                fontSize: 17,
                color: '#000'
            }}>Most Booked Ticket</Text>
            <Text style={{
                fontFamily: 'Quicksand-Light',
                fontSize: 14,
                color: '#000'

            }}>Top 5 tickets</Text>
        </View>
        {tickets.slice(0, 2).map((item, idx) => {
            const agency = JSON.parse(item.agency);
            let distance = Math.abs(new Date(item.time) - new Date(item.arrival));
            const hours = Math.floor(distance / 3600000);
            distance -= hours * 3600000;
            const minutes = Math.floor(distance / 60000);
            const duration = `${hours} ${hours > 1 ? 'Hrs' : 'Hr' }`
            return <TicketComponent id={item._id} Component={'TouchableOpacity'} navigation={navigation} on={null} arrival={item.arrival.split("T")[1]} departure={item.time.split("T")[1]} duration={duration} from={item.from} name={agency.name} fromExact={item.from} price={item.price} remainingSeats={item.remainingSeats} to={item.destination} toExact={item.destination} tripType={item.tripType} key={idx} />
        })}
        <View style={{ height: 80 }} />
      </ScrollView>
    </SafeAreaView>
  )
}

export default Home

const styles = StyleSheet.create({
    wayButton: {
        fontFamily: 'Quicksand-Bold',
        fontSize: 17,
    },
    searchView: {
        width: '90%',
        minHeight: 320,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#c4c4c4',
        alignSelf: 'center',
        marginTop: 40,
        paddingBottom: 20,
    },
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