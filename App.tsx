import React, { useEffect } from 'react';
import {Button, SafeAreaView, Text} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  gql,
  useQuery,
  TypePolicies,
} from '@apollo/client';

const typePolicies: TypePolicies = {
  Language: {
    fields: {
      code: {
        read(code) {
          const rand = Math.floor(Math.random() * 100);
          const computed = `${code} ${rand}`;
          console.log(
            `TypePolicy Invoked: Returning computed value for code: ${computed}`,
          );
          return computed;
        },
      },
    },
  },
};

const cache = new InMemoryCache({typePolicies});

const client = new ApolloClient({
  uri: 'https://countries.trevorblades.com/graphql',
  cache: cache,
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

  // Uncomment for cached data
  // const cachedData = client.readQuery({query: getCountryLanguagesQuery});
  // console.log('Cached Data', JSON.stringify(cachedData));

  console.log('Server Data', JSON.stringify(data));

  const output = data?.country.languages.map(lang => lang.code);

  return (
    <SafeAreaView style={{backgroundColor: Colors.lighter}}>
      <Text>
        {output ? output.join('\n') : 'No response from demo graphQL server'}
      </Text>
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
