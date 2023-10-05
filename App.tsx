import React, {useState, useEffect} from 'react';
import {View, Text, Button, StyleSheet,Image, TextInput, ScrollView} from 'react-native';
import axios from 'axios';
import math from 'mathjs';

const MyComponent = () => {
  // State to store the fetched data
  const [data, setData] = useState(0);
  const [Image1, setImage] = useState("");
  const [Location, setLocation] = useState("");
  const [Description, setDescription] = useState("");
  const [humidity, sethumidity] = useState("");
  const [pressure, setpressure] = useState("");
  const [ILocation, setILocation] = useState("Lahore");
  const [feels_like, setfeels_like] = useState(0);

  // Function to fetch data
  const fetchData = () => {
    const apiUrl =
      `https://api.openweathermap.org/data/2.5/weather?q=${ILocation}&units=metric&appid=e500e16c6e7a46f7da2ce99ac36b9ac6`;

    axios
      .get(apiUrl)
      .then(response => {
        const tempFloat = parseFloat(response.data.main.temp);
        const flooredTemp = Math.ceil(tempFloat);
        setData(flooredTemp);
        setDescription(response.data.weather[0].description);
        sethumidity(response.data.main.humidity);
        setpressure(response.data.main.pressure);

        const ftempFloat = parseFloat(response.data.main.feels_like);
        const fflooredTemp = Math.ceil(ftempFloat);
        setfeels_like(fflooredTemp);
        const loca = response.data.name + ', ' + response.data.sys.country;
        setLocation(loca);
        

        const iconUrl = `http://openweathermap.org/img/w/${response.data.weather[0].icon}.png`;
        setImage(iconUrl);

      })
      .catch(error => {
        // setData("");
        // console.error('Error:', error);
      });
  };

  // Use the useEffect hook to fetch data when the component mounts
  useEffect(() => {
    fetchData();
  }, [ILocation]);

  return (
    <View style={styles.container}>
      {data ? (
        <ScrollView>
        <View style={styles.container}>
          <View style={styles.upperComp}>
            <TextInput style={{fontSize:30,borderRadius:20,padding:20,borderColor:'black', borderWidth:3, marginBottom:50, marginTop:20, width:300}} onChangeText={(text)=>{setILocation(text)}} value={ILocation} placeholder="Location..." ></TextInput>
            <Text style={styles.Location}>{Location}</Text>
            <Image
              source={{uri: Image1}} // Replace with the path to your image
              style={styles.image}
            />
            <Text style={styles.Description}>{Description}</Text>
            <Text style={styles.tempCal}>{data}°C</Text>



          </View>
            <View style={{justifyContent:'center', alignContent:'center', flexDirection:'row', marginVertical:10,}}>
              <Text style={styles.stats}>
                <View>
                  <Text style={{fontSize:35, color:'white', textAlign:'center'}}>{humidity}</Text>
                  <Text style={{fontSize:20, color:'white', textAlign:'center', fontWeight:'600'}}>Humidity</Text>
                </View>
              </Text>
              <Text style={styles.stats}>
                <View>
                  <Text style={{fontSize:35, color:'white', textAlign:'center'}}>{pressure}</Text>
                  <Text style={{fontSize:20, color:'white', textAlign:'center', fontWeight:'600'}}>Pressure</Text>
                </View>
              </Text>
              <Text style={styles.stats}>
                <View>
                  <Text style={{fontSize:35, color:'white', textAlign:'center'}}>{feels_like}°C</Text>
                  <Text style={{fontSize:20, color:'white', textAlign:'center', fontWeight:'600'}}>Feels Like</Text>
                </View>
              </Text>

            </View>        
        </View>
        </ScrollView>
      ) : (
        <Text>Loading data...</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: '#010B1D',
  },
  stats: {
    fontSize:40,
    marginEnd:10,
    borderColor:'skyblue',
    borderWidth:5,
    padding:10,
    paddingStart:15,
    color:'white',
    borderRadius:15
  },
  upperComp: {
    backgroundColor: 'skyblue',
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom:30,
  },
  image: {
    width: 150, // Adjust the width as needed
    height: 150, // Adjust the height as needed
  },
  tempCal:{
    color:'black',
    fontSize:90,
    fontWeight:'900',
  },
  Description:{
    color:'black',
    fontSize:25,
    fontWeight:'600',
  },
  Location:{
    color:'black',
    fontSize:35,
    fontWeight:'800',
  },
});

export default MyComponent;
