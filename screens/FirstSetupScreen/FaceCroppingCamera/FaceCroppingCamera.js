import React from 'react';
import {
  Dimensions, StyleSheet, View, TouchableOpacity, ActivityIndicator,
} from 'react-native';
import { Text } from 'react-native-paper';
import * as Permissions from 'expo-permissions';
import * as FaceDetector from 'expo-face-detector';
import { Camera } from 'expo-camera';
import * as ImageManipulator from 'expo-image-manipulator';

const { width } = Dimensions.get('window');

export default function AddFacePhoto({ setTmpPhoto }) {
  const camera = React.useRef(null);
  let faceScan = null;
  const [hasCameraPermission, setHasCameraPermission] = React.useState(null);
  const [showLoader, setShowLoader] = React.useState(false);

  async function askForCameraPermission() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    setHasCameraPermission(status === 'granted');
  }


  async function handleFacesDetected(faces) {
    if (faces.faces.length === 1) {
      [faceScan] = faces.faces;
    } else {
      faceScan = null;
    }
  }

  async function takeFacePhoto() {
    if (faceScan && camera) {
      const lastFace = faceScan;
      const photo = await camera.current.takePictureAsync({ skipProcessing: false, quality: 0.7 });
      camera.current.pausePreview();
      setShowLoader(true);
      const { width: w } = photo;

      const R = w / width;

      const manipResult = await ImageManipulator.manipulateAsync(
        photo.uri,
        [
          {
            crop: {
              originX: lastFace.bounds.origin.x * R,
              originY: lastFace.bounds.origin.y * R,
              width: lastFace.bounds.size.width * R,
              height: lastFace.bounds.size.height * R,
            },
          },
          { resize: { width: 225, height: 300 } },
        ],
        {
          base64: true,
        },
      );
      setTmpPhoto(manipResult.base64);
    }
  }

  React.useEffect(() => {
    askForCameraPermission();
  }, []);

  return (
    <View style={styles.joinExistingGame}>
      {hasCameraPermission === null && (
        <Text>Requesting for camera permission</Text>
      )}
      {hasCameraPermission === false && (
        <Text>No access to camera</Text>
      )}
      {hasCameraPermission === true && (
        <Camera
          ref={camera}
          type={Camera.Constants.Type.front}
          style={[StyleSheet.absoluteFill, styles.joinExistingGame]}
          onFacesDetected={handleFacesDetected}
          faceDetectorSettings={{
            mode: FaceDetector.Constants.Mode.fast,
            detectLandmarks: FaceDetector.Constants.Landmarks.none,
            runClassifications: FaceDetector.Constants.Classifications.none,
            minDetectionInterval: 100,
            tracking: true,
          }}
        >
          {
            showLoader
              ? (
                <View style={{
                  width: '100%',
                  height: '100%',
                  justifyContent: 'center',
                  alignItems: 'center',
                  position: 'absolute',
                  left: 0,
                  top: 0,
                  opacity: 0.5,
                  backgroundColor: 'black',
                }}
                >
                  <ActivityIndicator />
                </View>
              )
              : (
                <View
                  style={{
                    flex: 1,
                    backgroundColor: 'transparent',
                    flexDirection: 'row',
                    justifyContent: 'center',
                  }}
                >
                  <TouchableOpacity
                    style={{
                      alignSelf: 'flex-end',
                      alignItems: 'center',
                    }}
                    onPress={takeFacePhoto}
                  >
                    <Text
                      style={[{ fontSize: 18, marginBottom: 10, color: 'white' }, { color: 'lightgray' }]}
                    >
                      {' '}
                    Snap
                      {' '}
                    </Text>
                  </TouchableOpacity>
                </View>
              )
          }
        </Camera>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  joinExistingGame: {
    width,
    aspectRatio: 0.75,
  },
  barCodeScannerContainer: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'stretch',
    flexDirection: 'column',
  },
  barCodeScannerOpacity: {
    backgroundColor: 'rgba(0, 0, 0, .6)',
    flex: 1,
  },
});
