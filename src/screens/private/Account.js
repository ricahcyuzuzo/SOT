import { StyleSheet, Text, View, SafeAreaView, Image, TouchableOpacity } from 'react-native'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwasome5 from 'react-native-vector-icons/FontAwesome5';
import { AppContext } from '../../context/AppContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwtDecode from 'jwt-decode';
import { useFocusEffect } from '@react-navigation/native';

const Account = ({ navigation }) => {
    const { setLoggedIn, loggedIn } = useContext(AppContext);
    const [user, setUser] = useState({});
    
    useFocusEffect(useCallback(() => {
        getUserDetails();
    }, []));

    const getUserDetails = async () => {
        const token = await AsyncStorage.getItem('token');
        const tokenDecoded = jwtDecode(token);
        setUser(tokenDecoded?.user);
    }

  return (
    <SafeAreaView>
        <View style={styles.titleView}>
            <Text style={styles.titleAppName}>Account</Text>
        </View>
        {
            loggedIn ?
            <>
                <View style={{
                    flexDirection: 'column',
                }}>
                    <Image source={{ uri: 'https://static.vecteezy.com/system/resources/previews/008/442/086/original/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg' }} style={styles.image} />
                    <View style={[styles.TextView, { marginTop: 30, }]}>
                        <Text style={{ fontFamily: 'Quicksand-Bold', color: '#4c4c4c', }}>{user?.name}</Text>
                    </View>
                    <View style={styles.TextView}>
                        <Text style={{ fontFamily: 'Quicksand-Bold', color: '#4c4c4c', }}>{user?.phone}</Text>
                    </View>
                    <View style={styles.TextView}>
                        <Text style={{ fontFamily: 'Quicksand-Bold', color: '#4c4c4c', }}>{user?.address || 'No address added yet'}</Text>
                    </View>
                </View>
                <TouchableOpacity onPress={ async () => {
                    await AsyncStorage.removeItem('token');
                    setLoggedIn(false);
                }} activeOpacity={.7} style={[styles.buttonDelete, { backgroundColor: '#090e2c' }]}>
                    <AntDesign name='logout' size={24} color={'#fff'} />
                    <Text style={{ fontFamily: 'Quicksand-Bold', color: '#fff', }}>Logout</Text>
                </TouchableOpacity>
            </>
            :
            <View>
                <Text style={{
                    fontSize: 50,
                    alignSelf: 'center',
                    marginVertical: 20,
                    fontFamily: 'Quicksand-Bold', 
                    color: '#000'
                }}>Guest</Text>
                <FontAwasome5 name='lock' size={204} style={{ alignSelf: 'center', marginTop: 50, }} color='#4c4c4c' />
                <Text style={{
                    fontSize: 20,
                    alignSelf: 'center',
                    marginVertical: 20,
                    fontFamily: 'Quicksand-Regular',
                    textAlign: 'center',
                    width: '90%' ,
                    color: '#000'
                }}>You need to log in or create an account first to see this screen</Text>

                <TouchableOpacity onPress={ async () => {
                    navigation.navigate('Login');
                }} activeOpacity={.7} style={[styles.buttonDelete, { backgroundColor: '#090e2c' }]}>
                    <AntDesign name='lock' size={24} color={'#fff'} />
                    <Text style={{ fontFamily: 'Quicksand-Bold', color: '#fff', }}>Login</Text>
                </TouchableOpacity>
            </View>
        }
    </SafeAreaView>
  )
}

export default Account

const styles = StyleSheet.create({
    buttonDelete: {
        width: '80%',
        height: 60,
        borderRadius: 20,
        backgroundColor: '#a12',
        alignSelf: 'center',
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        justifyContent: 'center'
    },
    TextView: {
        width: '80%',
        height: 50,
        borderRadius: 15,
        borderWidth: 2,
        borderColor: '#c4c4c4',
        alignSelf: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
        marginTop: 10,
    },
    image: {
        width: 200,
        height: 200,
        borderRadius: 80,
        alignSelf: 'center',
        marginTop: 30,
    },
    titlePastTrips: {
        fontFamily: 'Quicksand-SemiBold',
        fontSize: 20,
    },
    titleAppName: {
        fontFamily: 'Quicksand-Bold',
        fontSize: 34,
        color: '#000'
    },
    titleView: {
        flexDirection: 'row',
        width: '90%',
        justifyContent: 'space-between',
        alignItems: 'center',   
        alignSelf: 'center',
        marginTop: 10,
    },
})