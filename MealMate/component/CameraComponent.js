import React, { useState, useEffect, useCallback } from 'react';
import { View, Button, Image, Modal, TouchableOpacity, Pressable, StyleSheet } from 'react-native';
import { Camera } from 'expo-camera';

import AccessImage from './AccessImage';


const CameraComponent = ({onPictureTaken}) => {
  const [hasPermission, setHasPermission] = useState(null);

  const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);
  const [capturedPhoto, setCapturedPhoto] = useState(null);
  const [showCamera, setShowCamera] = useState(false);

  //Checks if user has accepted camera perms
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
   
      setHasPermission(status === 'granted');
      
    })();
  }, []);

  
  //Takes the current picture taken and is passed both set to display as a preview and return through the callback
  const takePicture = async () => {
    if (cameraRef.current) {
      const options = { quality: 0.5, base64: true, skipProcessing: true };
      const data = await cameraRef.current.takePictureAsync(options);
      setCapturedPhoto(data.uri);
      onPictureTaken(data)
      //AccessImage(data);
      setShowCamera(false);
    }
  };





  const cameraRef = React.useRef(null);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <View>
    <Modal visible={showCamera} animationType="slide">
      <View style={styles.cameraContainer}>
        <Camera style={styles.camera} type={cameraType} ref={cameraRef}>
          <View style={styles.camera}>
            <Pressable style={styles.closeButton} onPress={() => setShowCamera(false)}>
              <Image source={require('../assets/closeButton.png')} style={styles.closeIcon} />
            </Pressable>
          </View>
        </Camera>
        <Button title="Take Picture" onPress={takePicture} />
      </View>
    </Modal>
  
    <Pressable onPress={() => setShowCamera(true)} style={styles.cameraButtonContainer}>
      <Image source={require('../assets/cameraButton.png')} style={styles.cameraButton} />
    </Pressable>
  
    {capturedPhoto && (
      <Image source={{ uri: capturedPhoto }} style={styles.capturedPhoto} />
    )}
  </View>
  
  );
};

const styles = StyleSheet.create({
  cameraContainer: {
    flex: 1
  },
  camera: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'row'
  },
  closeButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    borderRadius: 50,
    backgroundColor: 'white'
  },
  closeIcon: {
    width: 30,
    height: 30
  },
  cameraButtonContainer: {
    borderRadius: 50,
    backgroundColor: 'white'
  },
  cameraButton: {
    width: 50,
    height: 50
  },
  capturedPhoto: {
    width: 200,
    height: 200
  }
});


export default CameraComponent;