import { Keyboard, Platform, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Home from '../private/Home';
import History from '../private/History';
import Account from '../private/Account';

const Tab = createBottomTabNavigator();

const Tabs = () => {
    const [isKeyboardVisible, setKeyboardVisible] = useState(false);
    
    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener(
          'keyboardDidShow',
          () => {
            setKeyboardVisible(true); // or some other action
          }
        );
        const keyboardDidHideListener = Keyboard.addListener(
          'keyboardDidHide',
          () => {
            setKeyboardVisible(false); // or some other action
          }
        );
    
        return () => {
          keyboardDidHideListener.remove();
          keyboardDidShowListener.remove();
        };
      }, []);
  return (
      <Tab.Navigator 
        screenOptions={({ route }) => ({
            headerShown: false,
            tabBarIcon: ({ focused, color, size }) => {
                let iconName;
                if (route.name === 'Home') {
                    iconName = focused
                        ? 'home'
                        : 'home-outline';
                } else if (route.name === 'History') {
                    iconName = focused ? 'ticket' : 'ticket-outline';
                } else if (route.name === 'Account') {
                    iconName = focused ? 'person' : 'person-outline';
                }

                // You can return any component that you like here!
                return  (<Ionicons name={iconName} size={size} color={color} />);
            },
            tabBarActiveTintColor: 'white',
            tabBarInactiveTintColor: 'white',
            tabBarStyle: {
                backgroundColor: '#090e2c',
                width: isKeyboardVisible ? '100%' : '80%',
                height: 70,
                bottom: isKeyboardVisible ? 0 : 30,
                alignSelf: isKeyboardVisible ? 'flex-start' : 'center',
                justifyContent: 'center',
                borderRadius: 40,
                paddingHorizontal: 20,
                alignItems: 'center'
            },
            tabBarItemStyle: {
                height: Platform.OS === 'ios' ? '110%' : '70%',
                borderRadius: 20,
                marginTop: Platform.OS === 'android' ? 8 : 10,
            },
            tabBarHideOnKeyboard: true,
            tabBarLabel: ({ focused, color, size }) => {
                return (focused && <Text style={{ color: '#fff', fontFamily: 'Quicksand-Regular' }}>{route.name}</Text>)
            }
        })}>
        <Tab.Screen name="Home" component={Home}  />
        <Tab.Screen name="History" component={History} />
        <Tab.Screen name="Account" component={Account} />
      </Tab.Navigator>
  )
}

export default Tabs

const styles = StyleSheet.create({
    labelText: { 
        color: '#fff',
        fontFamily: 'Quicksand-Regular',
        fontSize: 16, 
    }
})