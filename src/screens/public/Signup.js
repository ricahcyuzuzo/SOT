import { ActivityIndicator, Image, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import Icon from '../../assets/images/icon.png';
import FontAwasome5 from 'react-native-vector-icons/FontAwesome5';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import axios from 'axios';
import { API_URL } from '../../config/api';

const Signup = ({ navigation }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [pin, setPin] = useState('');
  const [securePassword, setSecurePassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignup = () => {
    const payload = {
        name,
        phone,
        pin,
    }
    setLoading(true);
    axios.post(`${API_URL}/signup?type=1`, payload)
        .then(res => {
            setLoading(false);
            setError('')
        }).catch(err => {
            setLoading(false);
            setError(err?.response?.data?.message || '');
        })
  }

  return (
    <SafeAreaView>
      <ScrollView>
          <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 5, }}>
            <Image source={Icon} style={styles.iconImage} />
            <Text style={styles.titleAppName}>Signup</Text>
          </View>
        <View>
            <TextInput
                placeholder='Names'
                placeholderTextColor={'#c4c4c4'}
                onChangeText={(val) => setName(val)}
                style={{
                    width: '90%',
                    height: 50,
                    borderRadius: 14,
                    borderWidth: 1,
                    borderColor: '#c4c4c4',
                    alignSelf: 'center',
                    marginTop: 10,
                    paddingLeft: 45,
                    fontSize: 16,
                    fontFamily: 'Quicksand-Regular',
                    color: '#000',
                }}
            />
            <FontAwasome5 name='user-alt' size={24} color={'#4c4c4c'} style={{
                position: 'absolute',
                left: 27,
                top: 24,
            }} />
        </View>
        <View>
            <TextInput
                placeholder='Phone number'
                placeholderTextColor={'#c4c4c4'}
                maxLength={10}
                onChangeText={(val) => setPhone(val)}
                style={{
                  width: '90%',
                  height: 50,
                  borderRadius: 14,
                  borderWidth: 1,
                  borderColor: '#c4c4c4',
                  alignSelf: 'center',
                  marginTop: 10,
                  paddingLeft: 45,
                  fontSize: 16,
                  fontFamily: 'Quicksand-Regular',
                  color: '#000',
                }}
            />
            <FontAwasome5 name='phone-alt' size={23} color={'#4c4c4c'} style={{
                position: 'absolute',
                left: 27,
                top: 24,
            }} />
        </View>
        <View>
            <TextInput
                secureTextEntry={securePassword}
                placeholder='Pin'
                onChangeText={(val) => setPin(val)}
                placeholderTextColor={'#c4c4c4'}
                style={{
                    width: '90%',
                    height: 50,
                    borderRadius: 14,
                    borderWidth: 1,
                    borderColor: '#c4c4c4',
                    alignSelf: 'center',
                    marginTop: 10,
                    paddingLeft: 45,
                    paddingRight: 38,
                    fontSize: 16,
                    fontFamily: 'Quicksand-Regular',
                    color: '#000',

                }}
            />
            <FontAwasome5 name='lock' size={23} color={'#4c4c4c'} style={{
                position: 'absolute',
                left: 25,
                top: 22,
            }} />
            <TouchableOpacity onPress={() => setSecurePassword(!securePassword)} style={{
                  position: 'absolute',
                  right: 30,
                  top: 22,
              }}>
              <FontAwasome5 name={securePassword ? 'eye-slash' : 'eye'} size={23} color={'#4c4c4c'} />
            </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={handleSignup} style={{
            width: '95%',
            height: 60,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 30,
            backgroundColor: '#090e2c',
            alignSelf: 'center',
            marginTop: 25
        }}>
            {loading ? <ActivityIndicator size={24} color={'#fff'} /> : <Text style={{ color: '#fff', fontFamily: 'Quicksand-Medium', fontSize: 18, }}>Sign up</Text>}
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Login')} style={{
            width: '95%',
            height: 60,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 30,
            alignSelf: 'center',
            marginTop: 15,
            borderWidth: 1,
            borderColor: '#090e2c'
        }}>
            <Text style={{ color: '#000', fontFamily: 'Quicksand-Medium', fontSize: 18, }}>Login</Text>
        </TouchableOpacity>
        <Text style={{ color: '#a12', fontFamily: 'Quicksand-Medium', fontSize: 18, textAlign: 'center', marginTop: 10, paddingHorizontal: 40 }}>{error?.slice(0, 1)?.toUpperCase() + error.slice(1)}</Text>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Signup

const styles = StyleSheet.create({
  iconImage: {
    width: 205,
    height: 205,
    resizeMode: 'stretch',
    alignSelf: 'center',
    borderRadius: 100,
  },
  titleAppName: {
    fontFamily: 'Quicksand-Bold',
    fontSize: 40,
    color: '#000',
    marginTop: 20,
    marginBottom: 30
  },
})