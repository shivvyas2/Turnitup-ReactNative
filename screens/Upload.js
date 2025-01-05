import React, { useState } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';
import { db } from '../firebase';

const Upload = ({ navigation }) => {
  const [documentName, setDocumentName] = useState('');
  const [documentType, setDocumentType] = useState('Assignment');
  const [courseName, setCourseName] = useState('');
  const [professorName, setProfessorName] = useState('');
  const [universityName, setUniversityName] = useState('');
  const [googleDriveLink, setGoogleDriveLink] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);

  const showModal = () => {
    setModalVisible(true);
  };

  const hideModal = () => {
    setModalVisible(false);
  };

  const handleUpload = async () => {
    try {
      if (!documentType || !courseName || !professorName || !universityName || !googleDriveLink) {
        console.error('Please fill in all required fields');
        return;
      }

      // Save the data to Firebase Firestore
      await db.collection('documents').add({
        name: documentName,
        type: documentType,
        course: courseName,
        professor: professorName,
        university: universityName,
        googleDriveLink: googleDriveLink,
        createdAt: new Date(),
      });

      navigation.navigate('Home');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Modal isVisible={isModalVisible} animationIn="slideInUp" animationOut="slideOutDown">
        <View style={styles.modalContainer}>
          <TouchableOpacity
            style={styles.modalItem}
            onPress={() => {
              setDocumentType('Assignment');
              setModalVisible(false);
            }}
          >
            <Text>Assignment</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.modalItem}
            onPress={() => {
              setDocumentType('Notes');
              setModalVisible(false);
            }}
          >
            <Text>Notes</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      <Text style={styles.labelCenter}>Type of Document</Text>
      <TouchableOpacity style={styles.dropdown} onPress={showModal}>
        <Text>{documentType}</Text>
      </TouchableOpacity>

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

      <Text style={styles.label}>Google Drive Link</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Google Drive link"
        value={googleDriveLink}
        onChangeText={(text) => setGoogleDriveLink(text)}
      />

      <TouchableOpacity style={styles.uploadButton} onPress={handleUpload}>
        <Text style={styles.uploadButtonText}>Upload</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f8f8',
  },
  label: {
    fontSize: 16,
    marginTop: 10,
    color: '#333',
  },
  labelCenter: {
    fontSize: 16,
    marginTop: 10,
    color: '#333',
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginTop: 5,
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
  },
  dropdown: {
    height: 40,
    padding: 10,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderRadius: 8,
    justifyContent: 'center',
    marginTop: 5,
    marginBottom: 10,
  },
  modalContainer: {
    backgroundColor: '#fff',
    padding: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  modalItem: {
    padding: 10,
    fontSize: 18,
  },
  uploadButton: {
    backgroundColor: 'blue',
    paddingVertical: 14,
    borderRadius: 8,
    marginTop: 20,
    alignItems: 'center',
  },
  uploadButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default Upload;
