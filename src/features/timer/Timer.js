import React, {useState} from 'react';
import { View, Text, StyleSheet, Vibration, Platform } from 'react-native';
import {ProgressBar} from 'react-native-paper';
import { useKeepAwake} from 'expo-keep-awake';
import { Countdown } from '../../components/Countdown';
import {RoundedButton} from '../../components/RoundedButton';
import { spacing, fontSizes} from '../../utils/sizes';
import { colors} from '../../utils/colors';
import { Timing} from './Timing';

const DEFAULT_TIME = 0.1;

const ONE_SECOND_IN_MS = 1000;
const PATTERN = [
    1 * ONE_SECOND_IN_MS,
    2 * ONE_SECOND_IN_MS,
    3 * ONE_SECOND_IN_MS,
  ];

export const Timer = ({ focusSubject ,clearSubject, onTimerEnd}) => {
 useKeepAwake();

 const interval =React.useRef(null);
 const [minutes, setMinutes] = useState(DEFAULT_TIME);
  const [isStarted, setIsStarted] = useState(false);
  const [progress, setProgress] = useState(1);



const onProgress= (progress) => {
    setProgress(progress);
  };
  const vibrate = () => {
    if (Platform.OS === 'ios') {
      const interval= setInterval(() => Vibration.vibrate(), 100);
      setTimeout(() => clearInterval(interal), 10000);
    } else {
      vibration.vibrate(10000);
    }
  };

  const onEnd = (reset) => {
    Vibration.vibrate(PATTERN);
    setMinutes(DEFAULT_TIME);
    setProgress(1);
    setIsStarted(false);
    reset();
    onTimerEnd(focusSubject); 
  };

  const changeTime = (min) => {
    setMinutes(min);
    setProgress(1);
    setIsStarted(false);
  };

  return(
    <>
  <View style={styles.container}>
    <View style={styles.countdown}>
      <Countdown 
      minutes={minutes}
      isPaused={!isStarted} 
      onProgress={setProgress}
      onEnd={onEnd}
      />
    </View>
    <Text style= {styles.title}> Focusing on: </Text>
     <Text style= {styles.task}>{focusSubject}</Text>
    <View style={{paddingTop:  spacing.sm}}>
    <ProgressBar
    progress={progress}
    color={colors.progressBar}
    style={{height: spacing.md}}
    />
    <View style={styles.timingWrapper}>
    <Timing onChangeTime={changeTime}/>
    </View>
    </View>
    <View style={styles.buttonWrapper}>
    {!isStarted ? ( <RoundedButton title="start" onPress={() => setIsStarted(true)} /> ) : (
    <RoundedButton title="pause" onPress={() => setIsStarted(false)}  /> )}
    </View>
    <View style= {styles.clearSubjectWrapper}>
    <RoundedButton title="reset" size={75} onPress={() => clearSubject()} />
  </View>
  </View>
  </>
);
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  countdown: {
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonWrapper: {
    flex: 0.3,
    flexDirection: 'row',
    padding: 15,
    marginTop: spacing.md ,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
color: colors.white,
fontWeight: 'bold',
textAlign: 'center',
  },
  task: {
    color: colors.white,
    textAlign: 'center',

  },
timingWrapper: {
  flex: 0.1,
  flexDirection: 'row',
  paddingTop: spacing.xxl
},
clearSubjectWrapper: {
  text: fontSizes.small,
  flexDirection: 'row',
  justifyContent: 'center',
  paddingBottom: spacing.small,

}
});
