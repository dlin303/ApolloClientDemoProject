import React from 'react';
import {Button, SafeAreaView, Text, useColorScheme} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

function Home({navigation}) {
  return (
    <SafeAreaView style={{backgroundColor: Colors.lighter}}>
      <Button
        title="Click Here"
        onPress={() => {
          navigation.push('Countries');
        }}
      />
    </SafeAreaView>
  );
}

function Countries() {
  return (
    <SafeAreaView style={{backgroundColor: Colors.lighter}}>
      <Text>Stuff Here</Text>
    </SafeAreaView>
  );
}

function App(): JSX.Element {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Countries" component={Countries} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
