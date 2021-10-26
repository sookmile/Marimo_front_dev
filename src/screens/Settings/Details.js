import React from "react";
import { View, Text } from "react-native";
import { Card } from "react-native-elements";

function Details({ route }) {
  const { licenseUrl, licenses, parents, repository, name } = route.params;
  return (
    <Card>
      <Card.Title
        style={{ fontFamily: "NotoSansCJKkr-Regular", lineHeight: 23 }}
      >
        LICENSE
      </Card.Title>
      <Card.Divider />
      <Text style={{ fontFamily: "NotoSansCJKkr-Regular", lineHeight: 23 }}>
        {licenseUrl}
      </Text>
      {licenses && (
        <Text style={{ fontFamily: "NotoSansCJKkr-Regular", lineHeight: 23 }}>
          {licenses}
        </Text>
      )}
      <Text style={{ fontFamily: "NotoSansCJKkr-Regular", lineHeight: 23 }}>
        {parents}
      </Text>
      <Text style={{ fontFamily: "NotoSansCJKkr-Regular", lineHeight: 23 }}>
        {repository}
      </Text>
    </Card>
  );
}

export default Details;
