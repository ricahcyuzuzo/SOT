import { ActivityIndicator, Alert, Modal, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import IonIcon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '../../config/api';

const Tickets = ({ navigation }) => {
    const [tickets, setTickets] = useState([]);
    const [price, setPrice] = useState('');
    const [from, setFrom] = useState('');
    const [destination, setDestination] = useState('');
    const [vehicle, setVehicle] = useState('');
    const [time, setTime] = useState('');
    const [arrival, setArrival] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getTickets();
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


    const addTicket = async () => {
        setLoading(true);
        const payload = {
            price, 
            from, 
            destination, 
            time, 
            vehicle, 
            arrival
        };

        const token = await AsyncStorage.getItem('token');
        axios.post(`${API_URL}/ticket`, payload, {
            headers: {
                Authorization: token,
            }
        }).then((res) => {
            getTickets();
            setLoading(false);
            setModalVisible(false);
        }).catch(err => {
            setLoading(false);
            Alert.alert('Travo', 'Something went wrong.')
        })
    }
  return (
    <SafeAreaView>
        <ScrollView showsVerticalScrollIndicator={false}>
            <TouchableOpacity style={{ marginLeft: 20, }} onPress={() => navigation.goBack()}>
                <IonIcon name='arrow-back' size={34} color='#000' />
            </TouchableOpacity>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, marginTop: 20 }}>
                <Text style={{
                    color: '#000',
                    fontSize: 30,
                    fontWeight: 'bold',
                }}>Tickets</Text>
                <TouchableOpacity onPress={() => setModalVisible(true)} style={{ backgroundColor: '#219ebc', width: 100, height: 40, justifyContent: 'center', alignItems: 'center', borderRadius: 10, }}>
                    <Text style={{ color: '#fff' }}>Add Ticket</Text>
                </TouchableOpacity>
            </View>
            <View>
                {tickets.map((item, key) => <View style={{
                    width: '90%',
                    height: 50,
                    borderRadius: 10,
                    backgroundColor: '#e5e5e5',
                    justifyContent: 'space-between',
                    alignSelf: 'center',
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingHorizontal: 20,
                    marginTop: 20,
                }} key={key}>
                    <View>
                        <Text>{item.from} to {item.destination}</Text>
                        <Text style={{ color: '#4c4c4c', fontSize: 12 }}>{item.vehicle}</Text>
                    </View>
                    <View>
                        <Text>{item.time}</Text>
                        <Text>{item.arrival}</Text>
                    </View>
                </View>)}
            </View>
            <Modal 
                visible={modalVisible}
                transparent={true}
            >
                <View style={{
                    flex: 1,
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <View style={{
                        width: '95%',
                        height: '65%',
                        backgroundColor: '#fff',
                        borderRadius: 30
                    }}>
                        <Text style={{ color: '#000', fontWeight: '800', fontSize: 20, textAlign: 'center', marginTop: 20 }}>Add Ticket</Text>

                        <TextInput 
                            style={{
                                width: '90%',
                                height: 50,
                                borderWidth: 1,
                                borderColor: '#588157',
                                alignSelf: 'center',
                                marginTop: 30,
                                borderRadius: 10,
                                paddingHorizontal: 10,
                            }}
                            placeholder='From'
                            onChangeText={(val) => setFrom(val)}
                        />
                        <TextInput 
                            style={{
                                width: '90%',
                                height: 50,
                                borderWidth: 1,
                                borderColor: '#588157',
                                alignSelf: 'center',
                                marginTop: 10,
                                borderRadius: 10,
                                paddingHorizontal: 10,
                            }}
                            placeholder='Destination'
                            onChangeText={(val) => setDestination(val)}
                        />
                        <TextInput 
                            style={{
                                width: '90%',
                                height: 50,
                                borderWidth: 1,
                                borderColor: '#588157',
                                alignSelf: 'center',
                                marginTop: 10,
                                borderRadius: 10,
                                paddingHorizontal: 10,
                            }}
                            placeholder='Departure time'
                            onChangeText={(val) => setTime(val)}
                        />
                        <TextInput 
                            style={{
                                width: '90%',
                                height: 50,
                                borderWidth: 1,
                                borderColor: '#588157',
                                alignSelf: 'center',
                                marginTop: 10,
                                borderRadius: 10,
                                paddingHorizontal: 10,
                            }}
                            placeholder='Arrival time'
                            onChangeText={(val) => setArrival(val)}
                        />
                        <TextInput 
                            style={{
                                width: '90%',
                                height: 50,
                                borderWidth: 1,
                                borderColor: '#588157',
                                alignSelf: 'center',
                                marginTop: 10,
                                borderRadius: 10,
                                paddingHorizontal: 10,
                            }}
                            placeholder='Price'
                            onChangeText={(val) => setPrice(val)}
                        />
                        <TextInput 
                            style={{
                                width: '90%',
                                height: 50,
                                borderWidth: 1,
                                borderColor: '#588157',
                                alignSelf: 'center',
                                marginTop: 10,
                                borderRadius: 10,
                                paddingHorizontal: 10,
                            }}
                            placeholder='Vehicle'
                            onChangeText={(val) => setVehicle(val)}
                        />
                        <TouchableOpacity onPress={addTicket} style={{ 
                            width: '90%',
                            height: 50,
                            backgroundColor: '#090e2c',
                            borderRadius: 15,
                            justifyContent: 'center',
                            alignItems: 'center',
                            alignSelf: 'center',
                            marginTop: 20,
                         }}>
                            { loading ? <ActivityIndicator color={'#fff'} size={24} /> : <Text style={{ color: '#fff', fontSize: 18, }}>Save</Text>}
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setModalVisible(false)} style={{
                            width: 40,
                            height: 40,
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: 10,
                            borderWidth: 1,
                            borderColor: '#a12',
                            position: 'absolute',
                            top: 10,
                            right: 10,
                        }}>
                            <IonIcon name='close' color="red" size={24} />
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </ScrollView>
    </SafeAreaView>
  )
}

export default Tickets

const styles = StyleSheet.create({})