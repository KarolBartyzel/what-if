import React from 'react';
import {
  AsyncStorage, StyleSheet, View, Image,
} from 'react-native';
import {
  ActivityIndicator, Avatar, Button, Card, HelperText,
} from 'react-native-paper';
import FaceCroppingCamera from './FaceCroppingCamera/FaceCroppingCamera';

const DEFAULT_AVATAR = 'DEFAULT_AVATAR';

export default function AvatarPicker({ setPhoto }) {
  const [tmpPhoto, setTmpPhoto] = React.useState(null);
  const [isTouched, setIsTouched] = React.useState(false);
  const [loading, setLoading] = React.useState(true);

  async function fetchAvatar() {
    const storedAvatar = false; // await AsyncStorage.getItem('AVATAR');
    console.log(storedAvatar);
    if (storedAvatar) {
      setPhoto(storedAvatar);
    } else {
      setLoading(false);
    }
  }

  React.useEffect(() => {
    fetchAvatar();
  });

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <Card
      style={styles.photoContainer}
    >
      <Card.Title title="Step 2: Take photo of yourself" subtitle="Photo will be used as avatar shown to other players" />
      <Card.Content style={styles.photoContent}>
        {
          tmpPhoto
            ? (
              <View>
                <Avatar.Image size={100} source={{ uri: `data:image/png;base64,${tmpPhoto}` }} />
                <Button
                  onPress={() => {
                    setTmpPhoto(null);
                  }}
                >
                  Retake
                </Button>
              </View>
            )
            : <FaceCroppingCamera setTmpPhoto={setTmpPhoto} />
        }
        {isTouched && (
          <HelperText
            type="error"
          >
            Take a photo or press skip to continue
          </HelperText>
        )}
      </Card.Content>
      <Card.Actions style={styles.photoActions}>
        <Button
          onPress={() => {
            AsyncStorage.setItem('AVATAR', DEFAULT_AVATAR);
            setPhoto(DEFAULT_AVATAR);
          }}
          style={styles.button}
        >
          Skip
        </Button>
        <Button
          onPress={() => {
            if (tmpPhoto !== null) {
              AsyncStorage.setItem('AVATAR', tmpPhoto);
              setPhoto(tmpPhoto);
            } else {
              setIsTouched(true);
            }
          }}
          mode="contained"
          style={styles.button}
        >
          Confirm
        </Button>
      </Card.Actions>
    </Card>
  );
}

const styles = StyleSheet.create({
  photoContainer: {
    marginTop: 10,
    flex: 1,
  },
  photoContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  photoActions: {
    position: 'absolute',
    bottom: 0,
    zIndex: 10,
    width: '100%',
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  button: {
    width: 200,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
  },
});
