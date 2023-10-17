
import React, { useEffect, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OnBoard from './src/screens/public/OnBoard';
import Tabs from './src/screens/public/Tabs';
import AgencyList from './src/screens/private/AgencyList';
import CreateTicket from './src/screens/private/CreateTicket';
import Tracker from './src/screens/private/Tracker';
import Login from './src/screens/public/Login';
import Signup from './src/screens/public/Signup';
import { AppContext } from './src/context/AppContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwtDecode from 'jwt-decode';
import AgencyHome from './src/screens/private/AgencyHome';
import Tickets from './src/screens/private/Tickets';

const Stack = createNativeStackNavigator();

function App(){
  const [loggedIn, setLoggedIn] = useState('');

  useEffect(() => {
    checkLoggedIn();
  }, []);

  const checkLoggedIn = async () => {
    const token = await AsyncStorage.getItem('token');
    if(token){
      const userType = jwtDecode(token).user.type;
      setLoggedIn(userType);
    }else{
      setLoggedIn('not-logged-in');
    }
  }

  return (
    <AppContext.Provider value={{ loggedIn, setLoggedIn }}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <>
            {loggedIn === 'traveller' ? 
            <>
              <Stack.Screen name='Bottom' navigationKey={loggedIn ? 'user' : 'guest'} component={Tabs} />
              <Stack.Screen name='Agency' component={AgencyList} />
              <Stack.Screen name='Create' component={CreateTicket} />
              <Stack.Screen name='Track' component={Tracker} />
            </>
            :
            loggedIn === 'agency' ?
            <>
              <Stack.Screen name='Home' component={AgencyHome} />
              <Stack.Screen name='Tickets' component={Tickets} />
            </>
            :
            <>
              <Stack.Screen name='OnBoard' component={OnBoard} />
              <Stack.Screen name='Login' component={Login} />
              <Stack.Screen name='Signup' component={Signup} />
              <Stack.Screen name='Bottom' component={Tabs} />
              <Stack.Screen name='Agency' component={AgencyList} />
            </>
            }
          </>
        </Stack.Navigator>
      </NavigationContainer>
    </AppContext.Provider>
  );
}

export default App;
