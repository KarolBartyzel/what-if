import React from 'react';
import { TouchableOpacity, StyleSheet, View, AsyncStorage } from 'react-native';
import { ActivityIndicator, Button, Card, Menu, Text } from 'react-native-paper';
import Flag from 'react-native-flags';
import * as Localization from 'expo-localization';
import i18n from 'i18n-js';

import { translations, LANGUAGES } from '../../constants/translations';

i18n.fallbacks = true;
i18n.translations = translations;

export default function LanguagePicker({ setLanguage }) {
  const [isLanguagePickerOpen, setIsLanguagePickerOpen] = React.useState(false);
  const [tmpLanguage, setTmpLanguage] = React.useState(null);

  async function fetchLang() {
    // await AsyncStorage.setItem('LANGUAGE', JSON.stringify(LANGUAGES[1])); //ONLY FOR TESTS
    const storedLanguage = await AsyncStorage.getItem('LANGUAGE');
    if (storedLanguage) {
      const parsedStoredLanguage = JSON.parse(storedLanguage);
      setLanguage(parsedStoredLanguage);
      i18n.locale = parsedStoredLanguage.code.toLowerCase();
    } else {
      [i18n.locale] = Localization.locale.split('-');
      setTmpLanguage(LANGUAGES.find(
        (lang) => lang.code === i18n.currentLocale(),
      ) || LANGUAGES[0]);
    }
  }

  React.useEffect(() => {
    fetchLang();
  }, []);

  if (tmpLanguage === null) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <Card
      style={styles.languageContainer}
    >
      <Card.Title title="Step 1: Pick language" subtitle="You can change it later in settings" />
      <Card.Content style={styles.languageContent}>
        <Menu
          visible={isLanguagePickerOpen}
          onDismiss={() => setIsLanguagePickerOpen(false)}
          style={styles.menu}
          anchor={(
            <View
              style={styles.anchor}
            >
              <TouchableOpacity
                style={styles.anchorButton}
                onPress={() => setIsLanguagePickerOpen(true)}
              >
                <View style={styles.languageOption}>
                  <Flag
                    code={tmpLanguage.code}
                    size={32}
                  />
                  <Text
                    style={[styles.languageLabel, styles.pickerLabel]}
                  >
                    {tmpLanguage.label}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          )}
        >
          {LANGUAGES.map((lang) => (
            <Menu.Item
              key={lang.code}
              onPress={() => {
                setTmpLanguage(lang);
                setIsLanguagePickerOpen(false);
                i18n.locale = lang.code.toLowerCase();
              }}
              title={lang.label}
              icon={() => <Flag code={lang.code} size={32} />}
            />
          ))}
        </Menu>
      </Card.Content>
      <Card.Actions style={styles.languageActions}>
        <Button
          onPress={() => {
            if (tmpLanguage !== null) {
              AsyncStorage.setItem('LANGUAGE', JSON.stringify(tmpLanguage));
              setLanguage(tmpLanguage);
            }
          }}
          mode="contained"
          style={styles.confirmButton}
        >
          Confirm
        </Button>
      </Card.Actions>
    </Card>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  languageContainer: {
    marginTop: 10,
    flex: 1,
  },
  languageOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 3,
  },
  languageLabel: {
    marginLeft: 5,
  },
  pickerLabel: {
    color: 'white',
  },
  anchor: {
    backgroundColor: '#6200ee',
    width: 250,
    height: 40,
  },
  anchorButton: {
    paddingLeft: 4,
  },
  languageContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  languageActions: {
    position: 'absolute',
    bottom: 0,
    zIndex: 10,
    width: '100%',
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  menu: {
    width: 250,
  },
  confirmButton: {
    width: 200,
  },
});
