import React, { Component } from "react";
import {
  ScrollView,
  Text,
  View,
  FlatList,
  StatusBar,
  StyleSheet,
  Platform,
  TouchableOpacity,
} from "react-native";

export default class CreditPage extends Component {
  renderItem(item) {
    console.log(item);
    return (
      <View style={styles.item}>
        <TouchableOpacity onPress={item.onPress}>
          <Text style={styles.title}>{item.name}</Text>
        </TouchableOpacity>
      </View>
    );
  }
  render() {
    const licenses = require("../../../licenses.json");
    const numberRegex = /\d+(\.\d+)*/;
    const atRegex = /(?:@)/gi;
    const finalLicense = [];
    Object.keys(licenses).map((idx) => {
      let item = licenses[idx];
      const version = idx.match(numberRegex);
      const nameWithoutVersion = idx
        .replace(atRegex, "")
        .replace(version ? version[0] : "", "");
      finalLicense.push({
        name: nameWithoutVersion,
        version: version ? version[0] : "",
        licenseSpecs: item,
        onPress: () =>
          this.props.navigation && this.props.navigation.push("Details", item),
      });
    });
    return (
      <View style={styles.container}>
        <FlatList
          data={finalLicense}
          renderItem={({ item }) => {
            return this.renderItem(item);
          }}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: "#f9c2ff",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 20,
  },
});
