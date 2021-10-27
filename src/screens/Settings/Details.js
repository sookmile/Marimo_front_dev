import React from "react";
import { Text, StyleSheet } from "react-native";
import { Card } from "react-native-elements";

function Details({ route }) {
  const { licenseUrl, licenses, parents, repository, name } = route.params;
  return (
    <Card>
      <Card.Title style={styles.text}>LICENSE</Card.Title>
      <Card.Divider />
      <Text style={styles.text}>{licenseUrl}</Text>
      {licenses && <Text style={styles.text}>{licenses}</Text>}
      <Text style={styles.text}>{parents}</Text>
      <Text style={styles.text}>{repository}</Text>
    </Card>
  );
}

export default Details;

const styles = StyleSheet.create({
  text: {
    fontSize: 14,
  },
});
