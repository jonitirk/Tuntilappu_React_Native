import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import { DatePickerInput } from 'react-native-paper-dates';
import * as SQLite from 'expo-sqlite';
import moment from 'moment';




const db = SQLite.openDatabase('tyotuntidb.db');

export default function Kirjaus({ navigation }) {


  const [tunnit, setTunnit] = useState('');
  const [data, setData] = useState([]);
  const [inputDate, setInputDate] = useState(moment().format("DD.MM.YYYY"));
  const [kohde, setKohde] = useState('');
  const [kilometrit, setKilometrit] = useState('');



  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql('create table if not exists tyotunnit (id integer primary key not null, tunnit int, pvm text, kohde text, kilometrit int);');
    }, () => console.error("Error when creating DB"), updateList);
  }, []);


  const updateList = () => {
    db.transaction(tx => {
      tx.executeSql('select * from tyotunnit;', [], (_, { rows }) =>
        setData(rows._array)
      );
    }, null, null);
  }

  const saveItem = () => {
    console.log(inputDate);
    db.transaction(tx => {
      tx.executeSql('insert into tyotunnit (tunnit, pvm, kohde, kilometrit) values (?, ?, ?, ?);',
        [parseInt(tunnit), moment(inputDate, "DD.MM.YYYY").format("YYYY-MM-DD"), kohde, parseInt(kilometrit)]);
    }, null, () => {
      updateList();
      setTunnit('');
      setKohde('');
      setKilometrit('');
    });
  }

  useEffect(() => {
    if (data.length > 0) {
      navigation.navigate('Historia', { data });
    }
  }, [data]);



  return (
    <View style={styles.container}>
      <Text style={styles.header}>Kirjaa työpäivä</Text>

      <View style={[styles.inputContainer, { marginBottom: 40 }]}>
        <Text style={styles.label}>Valitse päivämäärä:</Text>
        
        <DatePickerInput
          locale="fi"
          value={moment(inputDate, "DD.MM.YYYY").toDate()}
          onChange={(d) => setInputDate(moment(d).format("DD.MM.YYYY"))}
          inputMode="start"
          style={{ width: 200 }}
          mode="outlined"
        />
      </View>
      

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Työtuntien määrä:</Text>
        <TextInput
          keyboardType="numeric"
          style={styles.input}
          onChangeText={tunnit => setTunnit(tunnit)}
          value={tunnit}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Työmaakohde:</Text>
        <TextInput
          style={styles.input}
          onChangeText={kohde => setKohde(kohde)}
          value={kohde}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Matkakorvausten kilometrit:</Text>
        <TextInput
          keyboardType="numeric"
          style={styles.input}
          onChangeText={kilometrit => setKilometrit(kilometrit)}
          value={kilometrit}
        />
      </View>

      <View style={styles.button}>
        <Button onPress={saveItem} title="Tallenna" />
      </View>

      <StatusBar style="auto" />
    </View>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    marginTop: 10,
    paddingHorizontal: 20,
  },
  button: {
    marginTop: 20,
  },
  input: {
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  header: {
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
  },
  label: {
    marginBottom: 5,
  },
});