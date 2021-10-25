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
import { ListItem } from "react-native-elements";

export default class CreditPage extends Component {
  renderItem(item) {
    return (
      <TouchableOpacity onPress={item.onPress}>
        <ListItem key={item.title} bottomDivider>
          <ListItem.Content>
            <ListItem.Title>{item.name}</ListItem.Title>
            <ListItem.Subtitle>{item.version}</ListItem.Subtitle>
          </ListItem.Content>
          <ListItem.Chevron />
        </ListItem>
      </TouchableOpacity>
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
          // ItemSeparatorComponent={this.renderSeparator}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 18,
  },
  seperator: {
    height: 1,
    width: "100%",
    backgroundColor: "#000",
  },
});
