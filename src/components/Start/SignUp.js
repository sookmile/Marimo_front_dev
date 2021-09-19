import React, { useState } from "react";
import {
  Text,
  Alert,
  SafeAreaView,
  StyleSheet,
  Button,
  Platform,
} from "react-native";
import { useEffect } from "react/cjs/react.production.min";
import Styled from "styled-components/native";

export const SignUp = ({  navigation }) => {
  const [naverToken, setNaverToken] = React.useState(null);
  const [name, setName] = useState("");

  return (
    <SafeAreaView style={styles.container}>
      <Cntr>
        <Text>안녕..</Text>
        <Text>{route.params.name}</Text>
      </Cntr>
      <Button
        title="prev"
        onPress={() => navigation.navigate("Login")}
      ></Button>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-evenly",
    alignItems: "center",
  },
});

export default SignUp;
const Cntr = Styled.View`
width:100%;
align-items:center;
justify-content:center;
`;
