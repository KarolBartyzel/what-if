import React from 'react';
import { AsyncStorage, StyleSheet, View } from 'react-native';
import { Button, Card, Text, ActivityIndicator } from 'react-native-paper';

const splashes = [
  {
    title: '1',
    subtitle: '1.1',
    img: '',
  },
  {
    title: '2',
    subtitle: '2.2',
    img: '',
  },
];

export default function Splash({ onSplashFinish }) {
  const [loading, setLoading] = React.useState(true);
  const [splashIndex, setSplashIndex] = React.useState(0);

  async function getSettings() {
    const firstTime = await AsyncStorage.getItem('FIRST_TIME');
    if (firstTime && JSON.parse(firstTime) === false) {
      onSplashFinish();
    } else {
      setLoading(false);
    }
  }

  React.useEffect(() => {
    getSettings();
  }, []);

  React.useEffect(() => {
    if (splashIndex === splashes.length) {
      AsyncStorage.setItem('FIRST_TIME', JSON.stringify(false));
      onSplashFinish();
    }
  }, [splashIndex]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator />
      </View>
    );
  }

  const splash = splashes[splashIndex];
  if (splash === undefined) {
    return null;
  }

  const { title, subtitle } = splash;
  return (
    <Card style={styles.splashContainer}>
      <Card.Title
        title={title}
        subtitle={subtitle}
      />
      <Card.Content style={styles.splashContent}>
        <Text>TODO</Text>
      </Card.Content>
      <Card.Actions style={styles.splashActions}>
        <Button
          onPress={() => {
            setSplashIndex(splashIndex - 1);
          }}
          disabled={splashIndex === 0}
          style={styles.button}
        >
          Previous
        </Button>
        <Button
          onPress={() => {
            setSplashIndex(splashIndex + 1);
          }}
          mode="contained"
          style={styles.button}
        >
          {splashIndex === splashes.length - 1 ? 'Let\'s go' : 'Next'}
        </Button>
      </Card.Actions>
    </Card>
  );
}

const styles = StyleSheet.create({
  splashContainer: {
    marginTop: 10,
    flex: 1,
  },
  splashContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  splashActions: {
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
