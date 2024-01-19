import React from 'react';
import {Button, SafeAreaView, Text, useColorScheme} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {ApolloClient, InMemoryCache, ApolloProvider, gql, useQuery} from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://countries.trevorblades.com/graphql',
  cache: new InMemoryCache(),
});

const getCountryLanguagesQuery = gql(`
  query Query {
    country(code: "BR") {
      languages {
        code 
        name
      }
    }
  }
`);

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
  const {data} = useQuery(getCountryLanguagesQuery);

  console.log('Data', JSON.stringify(data));

  return (
    <SafeAreaView style={{backgroundColor: Colors.lighter}}>
      <Text>Stuff Here</Text>
    </SafeAreaView>
  );
}

function App(): JSX.Element {
  const Stack = createNativeStackNavigator();

  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Countries" component={Countries} />
        </Stack.Navigator>
      </NavigationContainer>
    </ApolloProvider>
  );
}

export default App;
