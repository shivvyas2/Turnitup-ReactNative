import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';

import firebase from './../firebase';

const HomeScreen = () => {
  const navigation = useNavigation();
  const [recentAssignments, setRecentAssignments] = useState([]);
  const [courseName, setCourseName] = useState('');
  const [instructorName, setInstructorName] = useState('');
  const [universityName, setUniversityName] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchRecentAssignments = async () => {
      setIsLoading(true);
      try {
        const snapshot = await firebase.database().ref('assignments').once('value');
        const assignments = snapshot.val() || [];
        setRecentAssignments(assignments.reverse());
      } catch (error) {
        console.error('Error fetching recent assignments:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecentAssignments();
  }, []);

  const handleSearch = async () => {
    setIsLoading(true);
    try {
      let query = firebase.database().ref('assignments');

      if (courseName) {
        query = query.orderByChild('courseName').equalTo(courseName);
      }

      if (instructorName) {
        query = query.orderByChild('instructorName').equalTo(instructorName);
      }

      if (universityName) {
        query = query.orderByChild('universityName').equalTo(universityName);
      }

      const snapshot = await query.once('value');
      const searchedAssignments = snapshot.val() || [];
      setRecentAssignments(searchedAssignments);
    } catch (error) {
      console.error('Error searching assignments:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <AntDesign
          name="pluscircle"
          size={24}
          color="black"
          onPress={() => navigation.navigate('AddScreen')}
          style={{ marginRight: 15 }}
        />
      ),
    });
  }, [navigation]);

  const renderRecentAssignment = ({ item }) => (
    <View style={styles.recentItem}>
      <Text style={styles.recentItemTitle}>{item.courseName}</Text>
      <Text style={styles.recentItemDetails}>
        {item.instructorName} - {item.universityName}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.recentsContainer}>
        <FlatList
          data={recentAssignments}
          renderItem={renderRecentAssignment}
          keyExtractor={(item) => item.id}
          horizontal
        />
      </View>

      <View style={styles.searchContainer}>
        <TextInput
          placeholder="Course Name"
          value={courseName}
          onChangeText={setCourseName}
          style={styles.searchInput}
        />
        <TextInput
          placeholder="Instructor Name"
          value={instructorName}
          onChangeText={setInstructorName}
          style={styles.searchInput}
        />
        <TextInput
          placeholder="University Name"
          value={universityName}
          onChangeText={setUniversityName}
          style={styles.searchInput}
        />
        <Button title="Submit" onPress={handleSearch} style={styles.searchButton} />
      </View>

      {recentAssignments.length === 0 && (
        <Text style={styles.noAssignments}>
          No recent assignments found. Search or add some!
        </Text>
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
  recentsContainer: {
    marginBottom: 20,
    height: 100,
  },
  searchContainer: {
    marginBottom: 20,
  },
  searchInput: {
    marginBottom: 10,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#ccc',
  },
  searchButton: {
    marginBottom: 10,
  },
  recentItem: {
    marginRight: 10,
    padding: 15,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#ccc',
  },
  recentItemTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  recentItemDetails: {
    fontSize: 12,
  },
  noAssignments: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
  },
});

export default HomeScreen;
