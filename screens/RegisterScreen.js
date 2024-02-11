import React, { useLayoutEffect } from 'react';
import { StyleSheet, Text, View, Button, Image } from 'react-native';
import { KeyboardAvoidingView, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Input } from 'react-native-elements';
import { auth } from "../firebase";

const RegisterScreen = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  useLayoutEffect(() => {
    navigation.setOptions({
      headerBackTitle: "Login",
    });
  }, [navigation]);

  const register = () => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        authUser.user.updateProfile({
          displayName: name,
        });
      })
      .catch((error) => alert(error.message));
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <StatusBar style='dark' />
      <Image
        style={styles.image}
        source={require('../assets/logo.png')}
      />
      <View style={styles.inputContainer}>
        <Input
          placeholder='Name'
          type='name'
          value={name}
          onChangeText={(text) => setName(text)}
          inputStyle={styles.input}
        />
        <Input
          placeholder='Email'
          type='email'
          value={email}
          onChangeText={(text) => setEmail(text)}
          inputStyle={styles.input}
        />
        <Input
          placeholder='Password'
          type='password'
          secureTextEntry
          value={password}
          onChangeText={(text) => setPassword(text)}
          inputStyle={styles.input}
        />
      </View>
      <View style={styles.registerButton}>
        <Button color="#FCFDF2" containerStyle={styles.Button} onPress={register} title="Register" />
      </View>
      <View style={{ height: 100 }} />
    </ScrollView>
  );
}

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    backgroundColor: '#FFF',
    paddingBottom: 20,
  },
  inputContainer: {
    marginTop: 1,
    width: 300,
    paddingTop: 40,
    borderRadius: 5,
  },
  input: {
    color: '#000', // text color
  },
  Button: {
    width: 200,
    marginBottom: 10,
  },
  registerButton: {
    backgroundColor: '#12A1F9',
    alignContent: "center",
    justifyContent: "center",
    width: 200,
    padding: 5,
    margin: 20,
    borderRadius: 5,
    shadowRadius: 1,
    shadowColor: "#7743DB",
  },
  image: {
    width: 300,
    height: 300,
  },
});
