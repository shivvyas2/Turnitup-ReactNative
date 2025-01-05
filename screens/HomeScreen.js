import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Image, TouchableOpacity, FlatList, StyleSheet, Linking } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';
// Adjust the path based on your actual file structure

// Assuming your images are in the 'assets/subject' folder
const getSubjectImage = (courseName) => {
  switch (courseName.toLowerCase()) {
    case 'cs 612 - concepts of internet computing':
      return require('../assets/computer.jpeg');
    case 'mar 625 marketing management':
      return require('../assets/marketing.png');
    case 'mathematical foundations':
      return require('../assets/subjects/3.png');
    // Add more cases for other subjects as needed
    default:
      return null;
  }
};

// Sample data for recent assignments
const dummyAssignments = [
  {
    id: '1',
    courseName: 'CS 612 - Concepts of Internet Computing',
    instructorName: 'Prof. Vandovich',
    universityName: 'Pace University',
  },
  {
    id: '2',
    courseName: 'MAR 625 Marketing Management',
    instructorName: 'Dr. Johnson',
    universityName: 'NYIT University',
  },
  {
    id: '3',
    courseName: 'Mathematical Foundations',
    instructorName: 'Prof. Brown',
    universityName: 'Columbia University',
  },
  // Add more dummy assignments as needed
];

const HomeScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  // Function to open a link using Linking
  const openLink = (url) => {
    Linking.openURL(url).catch((err) => console.error('An error occurred', err));
  };

  // Fetch recent assignments or perform other operations on focus
  useFocusEffect(() => {
    const fetchRecentAssignments = async () => {
      // Fetch logic here
    };

    fetchRecentAssignments();

    // Cleanup logic if needed
    return () => {
      // Cleanup logic if needed
    };
  });

  // Set navigation options, including the headerRight button
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={() => navigation.navigate('Upload')}>
          <AntDesign name="pluscircle" size={24} color="black" style={styles.headerIconLeft} />
        </TouchableOpacity>
      ),
      headerLeft: () => (
        <TouchableOpacity onPress={() => dispatch(logout())}>
          <AntDesign name="logout" size={24} color="black" style={styles.headerIcon} />
        </TouchableOpacity>
      ),
    });
  }, [navigation, dispatch]);

  // Render individual recent assignment item
  const renderRecentAssignment = ({ item }) => (
    <TouchableOpacity style={styles.recentItem} onPress={() => openLink('https://drive.google.com')}>
      <Image source={getSubjectImage(item.courseName)} style={styles.recentItemImage} />
      <View style={styles.textContainer}>
        <Text style={styles.recentItemTitle}>{item.courseName}</Text>
        <Text style={styles.recentItemSubtitle}>
          Instructor: {item.instructorName}
        </Text>
        <Text style={styles.recentItemSubtitle}>
          University: {item.universityName}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Featured Courses</Text>
      <Carousel
        data={dummyAssignments}
        renderItem={renderRecentAssignment}
        keyExtractor={(item) => item.id}
        sliderWidth={350}
        itemWidth={300}
        itemHeight={200}
        layout={'default'}
        layoutCardOffset={18}
        contentContainerCustomStyle={styles.carouselContentContainer}
      />

      <View style={styles.searchContainer}>
        <TextInput placeholder="Course Name" style={styles.searchInput} />
        <TextInput placeholder="Instructor Name" style={styles.searchInput} />
        <TextInput placeholder="University Name" style={styles.searchInput} />
        <Button title="Search" onPress={() => {}} color="#841584" style={styles.searchButton} />
      </View>

      {dummyAssignments.length === 0 && (
        <Text style={styles.noAssignments}>No recent assignments found. Search or add some!</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'black',
  },
  carouselContentContainer: {
    alignItems: 'center',
  },
  recentItem: {
    padding: 20,
    borderRadius: 20,
    backgroundColor: '#f7f7f7',
    width: '100%',
    marginBottom: 20,
  },
  recentItemImage: {
    width: '100%',
    height: 150,
    borderRadius: 20,
    marginBottom: 10,
  },
  recentItemTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: 'black',
  },
  recentItemDetails: {
    fontSize: 16,
    color: 'black',
  },
  searchContainer: {
    marginBottom: 40,
  },
  searchInput: {
    marginBottom: 20,
    paddingVertical: 15,
    paddingHorizontal: 16,
    borderWidth: 2,
    borderRadius: 8,
    borderColor: 'black',
    fontSize: 16,
  },
  searchButton: {
    backgroundColor: 'black',
    width: 200,
    alignContent: "center",
    justifyContent: "center",
    padding: 5,
    margin: 10,
    borderColor: "black",
    borderRadius: 5,
    shadowRadius: 1,
    shadowColor: "#7743DB",
  },
  noAssignments: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 40,
    color: 'black',
  },
  headerIcon: {
    marginLeft: 10,
  },
  headerIconLeft: {
    marginRight: 10,
  },
  textContainer: {
    marginLeft: 15,
  },
  recentItemSubtitle: {
    fontSize: 14,
    color: 'black',
  },
});

export default HomeScreen;
