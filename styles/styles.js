import {StyleSheet} from 'react-native';

const palette = {
  darkPurple: 'rgb(28, 29, 43)',
  greyPurple: 'rgb(46,48,89)',
  brightPurple: 'rgb(84, 44, 242)',
  blue: 'rgb(25,130,252)',
  black: 'rgb(38,38,38)',
  white: 'rgb(255,255,255)',
  shade: 'rgba(85,88,125,0.38)',
  dialogShade: 'rgba(103,112,163,0.35)',
};

export const theme = {
  colors: {
    background: palette.darkPurple,
    foreground: palette.black,
    primary: palette.white,
    secondary: palette.brightPurple,
    shade: palette.shade,
    input: palette.greyPurple,
    inputContainer: palette.shade,
    header: palette.brightPurple,
    chat: palette.blue,
    headerTint: palette.blue,
    dialog: palette.dialogShade,
  },
  spacing: {
    s: 8,
    m: 16,
    l: 24,
    xl: 40,
  },
  textVariants: {
    logo: {
      fontFamily: 'Montserrat',
      fontSize: 65,
    },
    h1: {
      fontFamily: 'Montserrat',
      fontSize: 50,
    },
    h2: {
      fontFamily: 'Montserrat',
      fontSize: 40,
    },
    h3: {
      fontFamily: 'Montserrat',
      fontSize: 18,
    },
    button: {
      fontFamily: 'Montserrat',
      fontSize: 18,
    },
    body: {
      fontFamily: 'Montserrat',
      fontSize: 15,
    },
  },
  breakpoints: {
    smallPhone: 0,
    phone: 321,
    tablet: 768,
  },
};

export const globalStyles = StyleSheet.create({
  flex: {
    flex: 1,
    // justifyContent: 'flex-start',
    // alignItems: 'flex-start'
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
  },
  button: {
    width: 210,
    height: 58,
    margin: 65,
    fontFamily: 'Montserrat',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.secondary,
    borderColor: theme.colors.primary,
    borderRadius: 10,
    borderWidth: 1,
  },
  input: {
    backgroundColor: theme.colors.input,
    padding: 10,
  },
  secondaryInput: {
    backgroundColor: theme.colors.shade,
    padding: 10,
  },
});
