import React from "react";
import { View, Text } from "react-native";

function Details({ route }) {
  const { licenseUrl, licenses, parents, repository } = route.params;
  return (
    <View style={{ flex: 1 }}>
      <Text>{licenseUrl}</Text>
      <Text>{licenses}</Text>
      <Text>{parents}</Text>
      <Text>{repository}</Text>
    </View>
  );
}

export default Details;
