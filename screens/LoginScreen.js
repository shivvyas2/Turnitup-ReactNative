// LoginScreen.js
import React, { useEffect } from 'react';
import { useState } from 'react';
import { StyleSheet, Text, View, Button, Image } from 'react-native';
import { Input } from 'react-native-elements';
import { KeyboardAvoidingView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { auth } from '../firebase';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      console.log(authUser);
      if (authUser) {
        navigation.replace("Home");
        console.log("User Login");
      }
    });
    return unsubscribe;
  }, []);

  const signIn = () => {
    auth.signInWithEmailAndPassword(email, password)
      .catch((error) => alert(error));
  };

  return (
    <KeyboardAvoidingView behavior='padding' style={styles.container}>
      <StatusBar style='dark' />
      <Image
        style={styles.image}
        source={require('../assets/logo.png')}
      />
      <View style={styles.inputContainer}>
        <Input
          placeholder='Email'
          type='email'
          value={email}
          onChangeText={(text) => setEmail(text)}
          containerStyle={styles.input}
        />

        <Input
          placeholder='Password'
          secureTextEntry
          type='password'
          value={password}
          onChangeText={(text) => setPassword(text)}
          containerStyle={styles.input}
          onSubmitEditing={signIn}
        />
      </View>
      <View style={styles.buttonViewStyle}>
        <Button
          color="#FCFDF2"
          containerStyle={styles.Button}
          onPress={signIn}
          title="Login"
        />
      </View>
      <View style={styles.buttonViewStyle2}>
        <Button
          color="#FCFDF2"
          onPress={() => navigation.navigate("Register")}
          containerStyle={styles.Button}
          title="Register "
        />
      </View>
      <View style={{ height: 150 }} />
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 50,
    backgroundColor: '#FFF',
  },
  image: {
    width: 300,
    height: 300,
  },
  inputContainer: {
    marginTop: 10,
    width: 300,
    paddingTop: 40,
    borderRadius: 10, // Apply border radius to create rounded rectangles
    borderColor: "#222222",
  },
  input: {
    borderRadius: 10, // Apply border radius to create rounded rectangles
  },
  Button: {
    width: 200,
  },
  buttonViewStyle: {
    backgroundColor: '#40A2E3',
    width: 200,
    alignContent: "center",
    justifyContent: "center",
    padding: 5,
    margin: 10,
    borderColor: "#222222",
    borderRadius: 5,
    shadowRadius: 1,
    shadowColor: "#7743DB",
  },
  buttonViewStyle2: {
    backgroundColor: '#40A2E3',
    alignContent: "center",
    justifyContent: "center",
    width: 200,
    padding: 5,
    margin: 2,
    borderRadius: 5,
    shadowRadius: 1,
    shadowColor: "#7743DB",
  },
});
