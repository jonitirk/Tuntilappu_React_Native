import 'react-native-gesture-handler';


import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import Kirjaus from './Kirjaus';
import Historia from './Historia';
import { registerTranslation } from 'react-native-paper-dates';


// Rekisteröi suomenkieliset käännökset
registerTranslation('fi', {
  save: 'Tallenna',
  selectSingle: 'Valitse päivämäärä',
  selectMultiple: 'Valitse päivämäärät',
  selectRange: 'Valitse ajanjakso',
  notAccordingToDateFormat: (inputFormat) =>
    `Päivämäärän muodon tulee olla ${inputFormat}`,
  mustBeHigherThan: (date) => `Tulee olla myöhempi kuin ${date}`,
  mustBeLowerThan: (date) => `Tulee olla aiempi kuin ${date}`,
  mustBeBetween: (startDate, endDate) =>
    `Tulee olla välillä ${startDate} - ${endDate}`,
  dateIsDisabled: 'Päivä ei ole sallittu',
  previous: 'Edellinen',
  next: 'Seuraava',
  typeInDate: 'Kirjoita päivämäärä',
  pickDateFromCalendar: 'Valitse päivämäärä kalenterista',
  close: 'Sulje',
});



const Drawer = createDrawerNavigator();



export default function App() {

  const [data, setData] = useState([]);


  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Kirjaus">
        <Drawer.Screen name="Kirjaus">
          {(props) => <Kirjaus {...props} setData={setData} />}
        </Drawer.Screen>
        <Drawer.Screen name="Historia">
          {(props) => <Historia {...props} data={data} setData={setData} />}
        </Drawer.Screen>
      </Drawer.Navigator>
    </NavigationContainer>
  );

}


