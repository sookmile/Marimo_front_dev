import React from "react";
import { View, Text } from "react-native";
import { Card } from "react-native-elements";

function Details({ route }) {
  const { licenseUrl, licenses, parents, repository, name } = route.params;
  return (
    <Card>
      <Card.Title>LICENSE</Card.Title>
      <Card.Divider />
      <Text>{licenseUrl}</Text>
      {licenses && <Text>{licenses}</Text>}
      <Text>{parents}</Text>
      <Text>{repository}</Text>
    </Card>
  );
}

export default Details;
