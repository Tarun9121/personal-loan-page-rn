import { View, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

export default function Demo() {
  return (
    <View style={styles.box}>
      {/* Top shadow */}
      <LinearGradient
        colors={['rgba(0,0,0,0.15)', 'transparent']}
        style={styles.shadowTop}
      />
       <LinearGradient
        colors={['rgba(0,0,0,0.15)', 'transparent']}
        style={styles.shadowLeft}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      />
      {/* Add more if needed */}
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    width: 200,
    height: 200,
    backgroundColor: '#fff',
    borderRadius: 16,
    overflow: 'hidden',
    position: 'relative',
  },
  shadowTop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 16,
  },
    shadowLeft: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    width: 16,
  },
});
