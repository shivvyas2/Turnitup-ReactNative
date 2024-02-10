// AddScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import firebase from './../firebase';

const AddScreen = ({ navigation }) => {
  const [documentName, setDocumentName] = useState('');
  const [documentType, setDocumentType] = useState('Assignments');
  const [courseName, setCourseName] = useState('');
  const [professorName, setProfessorName] = useState('');
  const [universityName, setUniversityName] = useState('');

  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({ type: 'application/pdf' });
      if (result.type === 'success' && result.uri) {
        setDocumentName(result.name);
        // You can also handle the document itself using result.uri
      }
    } catch (error) {
      console.error('Error picking document:', error);
    }
  };

  const handleUpload = async () => {
    try {
      // Upload document logic here (replace 'documentPath' with the actual path or content)
      const documentPath = 'example_document_path'; // Replace with actual document path
      const documentRef = await firebase.storage().ref('documents').child(documentName);
      await documentRef.put(documentPath);

      // Get the download URL
      const downloadURL = await documentRef.getDownloadURL();

      // Store data in Firebase Firestore
      await firebase.firestore().collection('documents').add({
        documentName,
        documentType,
        courseName,
        professorName,
        universityName,
        downloadURL,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      });

      // Navigate back to Home or perform any other navigation logic
      navigation.navigate('Home');
    } catch (error) {
      console.error('Error uploading document:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Choose the Document</Text>
      <Button title="Pick Document" onPress={pickDocument} />

      <Text style={styles.label}>Type of Document</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter document type"
        value={documentType}
        onChangeText={(text) => setDocumentType(text)}
      />

      <Text style={styles.label}>Name of the Course</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter course name"
        value={courseName}
        onChangeText={(text) => setCourseName(text)}
      />

      <Text style={styles.label}>Professor Name</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter professor name"
        value={professorName}
        onChangeText={(text) => setProfessorName(text)}
      />

      <Text style={styles.label}>University Name</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter university name"
        value={universityName}
        onChangeText={(text) => setUniversityName(text)}
      />

      <Button title="Upload" onPress={handleUpload} />
    </View>
  );
};

export default AddScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  label: {
    fontSize: 16,
    marginTop: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 5,
    marginBottom: 10,
    padding: 10,
  },
});
