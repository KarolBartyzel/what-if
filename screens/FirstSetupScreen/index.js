import React from 'react';

import LanguagePicker from './Language';
import AvatarPicker from './Avatar';
import Splash from './Splash';

export default function FirstSetupScreen(props) {
  const [splashFinished, setSplashFinished] = React.useState(false);
  const [language, setLanguage] = React.useState(null);
  const [photo, setPhoto] = React.useState(null);

  React.useEffect(() => {
    if (language !== null && photo !== null) {
      props.navigation.navigate('Home', { language });
    }
  }, [language, photo]);

  if (!splashFinished) {
    return (
      <Splash
        onSplashFinish={() => setSplashFinished(true)}
      />
    );
  }

  if (!language) {
    return (
      <LanguagePicker
        setLanguage={setLanguage}
      />
    );
  }

  return (
    <AvatarPicker
      setPhoto={setPhoto}
    />
  );
}
