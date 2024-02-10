import React, { useLayoutEffect } from 'react'
import { StyleSheet, Text, View, Button, Image} from 'react-native'
import { KeyboardAvoidingView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Input} from 'react-native-elements';
import {auth} from "../firebase";


const RegisterScreen = ({navigation}) => {
    const [name, setName] = useState("");
    // const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [imageUrl, setImageUrl] = useState("");

    useLayoutEffect(() => {
        navigation.setOptions({
            headerBackTitle: "Login",

        })

    },[navigation]);
    const register = () =>{
        auth
        .createUserWithEmailAndPassword(email, password)
        .then((authUser) => {
            authUser.user.updateProfile({
                displayName: name,
                // displayName: lastName,
            });

        })
        .catch((error) => alert(error.message));
        
    };


    return (
        
        <KeyboardAvoidingView behavior ="padding" style={styles.container} >
            <StatusBar style='dark'/>
            <Image 
            style = {styles.image}
            source = {require('../assets/img/1.png')}
            />
            <View style={styles.inputContainer}>
            <Input placeholder='Name'
             type='name' 
             value={name} 
             onChangeText={(text) => setName(text)}/>


            <Input placeholder='Email'
             type='email' 
             value={email} 
             onChangeText={(text) => setEmail(text)}/> 

            <Input placeholder='Password'
             type='password' 
             secureTextEntry
             value={password} 
             onChangeText={(text) => setPassword(text)}/>   

            </View>  
            <View style = {styles.registerButton}>
            <Button color = "#FCFDF2" containerStyle ={styles.Button} onPress={register} title= "Register"/>       
            </View>
        <View style = {{height: 100}}/>
        </KeyboardAvoidingView>
    )
}

export default RegisterScreen

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems: 'center',
        justifyContent: 'center',
        padding:10,
        backgroundColor:'#FFF6E9', 

    },
    Text:{
        backgroundColor:"#000000"

    },
    inputContainer:{
        marginTop:10,
        width:300,
        paddingTop: 40,
        borderRadius:2,
        borderColor:"#000000",
        borderRadius: 3,
    },
    Button:{

        width:200,
        marginBottom:10,
        // backgroundColor:"#3B3486", 

    },
    headerText:{
        fontSize:30,
        fontWeight:"bold",

    },
    registerButton:{
        backgroundColor: '#000000',
        alignContent:"center",
        justifyContent:"center",
        width: 200,
        padding: 5,
        margin: 20,
        borderRadius: 5,
        shadowRadius: 1,
        shadowColor:"#7743DB",
    },
    image:{
        width: 300,
        height: 300,
        

    },

});