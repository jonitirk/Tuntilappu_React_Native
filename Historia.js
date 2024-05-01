import { StyleSheet, Text, View, FlatList } from 'react-native';
import * as SQLite from 'expo-sqlite';
import moment from 'moment';
import React, { useEffect, useState } from 'react';



const db = SQLite.openDatabase('tyotuntidb.db');

export default function Historia({ route, setData }) {
  const [listData, setListData] = useState([]);

  const { data } = route.params;

  useEffect(() => {
    updateList();
  }, [data]);

  const deleteItem = (id) => {
    db.transaction(
      tx => {
        tx.executeSql(`delete from tyotunnit where id = ?;`, [id]);
      },
      null,
      () => {
        updateList(); 
      }
    );
  }

  const updateList = () => {
    db.transaction(tx => {
      tx.executeSql('select * from tyotunnit;', [], (_, { rows }) => {
        setListData(rows._array); 
      });
    }, null, null);
  }

  const listSeparator = () => {
    return (
      <View
        style={{
          height: 5,
          width: "80%",
          backgroundColor: "#fff",
          marginLeft: "10%"
        }}
      />
    );
  };

  const formatDate = (date) => {
    return moment.utc(date).format('DD.MM.YYYY');
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={listData} 
        extraData={listData} 
        ItemSeparatorComponent={listSeparator}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.listcontainer}>
            <Text style={styles.header}>Pvm:</Text>
            <Text>{formatDate(item.pvm)}</Text>
            <Text style={styles.header}>Tunnit:</Text>
            <Text>{item.tunnit}</Text>
            <Text style={styles.header}>Kohde:</Text>
            <Text>{item.kohde}</Text>
            <Text style={styles.header}>Kilometrit:</Text>
            <Text>{item.kilometrit}</Text>
            <Text style={{ fontSize: 18, color: "#0000ff" }} onPress={() => deleteItem(item.id)}>
              Poista
            </Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'left',
    marginTop: 10,
    marginLeft: 10,
  },
  header: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  listcontainer: {
    flexDirection: 'column',
    backgroundColor: '#fff',
    alignItems: 'flex-start'
  },
});

