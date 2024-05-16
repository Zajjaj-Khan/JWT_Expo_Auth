import { Button, Image, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import { API_URL } from "../context/AuthContext";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { onLogin, onRegister } = useAuth();
  const login = async () => {
    const result = await onLogin!(email, password);
    if (result && result.error) {
      alert(result.msg);
    }
  };
  const registor = async () => {
    const result = await onRegister!(email, password);
    if (result && result.error) {
      alert(result.msg);
    } else {
      login();
    }
  };
  useEffect(()=>{
    const testCall = async ( ) =>{
        const result = await axios.get(`${API_URL}/users`);
        console.log(' these are the results', result.data);
    }
    testCall();
  },[])

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: "https://avatars.githubusercontent.com/u/81627562?v=4" }}
        style={styles.image}
      />
      <View style={styles.form}>
      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={(text: string) => setEmail(text)}
        value={email}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={(text: string) => setPassword(text)}
        secureTextEntry={true}
        value={password}
      />
      <Button onPress={login} title="Sign In" />
      <Button onPress={registor} title="Create Account" />
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
    image:{
        width: "50%",
        height: "50%",
        resizeMode: "contain",
    },
    form:{
        gap:10,
        width:'60%',
    },
    input:{
        height:44,
        borderWidth:1,
        borderRadius:4,
        padding:10,
        backgroundColor:'#fff',
    },
    container:{
        alignItems:'center',
        width:'100%',
    },
});
