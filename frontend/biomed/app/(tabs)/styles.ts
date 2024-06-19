import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  contentContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  logoText: {
    fontSize: 36,
    fontWeight: 'bold',
  },
  logoHealth: {
    writingDirection: 'rtl', // para texto vertical
    fontSize: 24,
  },
  logoEasy: {
    fontSize: 36,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '300',
  },
  leftAlignedText: {
    alignSelf: 'flex-start',
    fontSize: 16,
    marginBottom: 10,
  },
  leftAlignedInput: {
    alignSelf: 'flex-start',
    width: '100%',
    marginBottom: 10,
  },
});

export default styles;