import { Dimensions, Platform } from "react-native";

const IMAGE_DIR = '../images/';
const AppImages = {
  drawerImg: require(IMAGE_DIR + 'drawerImg.png'),
};

import addHeader from '../icons/addHeader.svg';
import saveIcon from '../icons/saveIcon.svg';
import dropDown from '../icons/dropDown.svg';
import optionsIcon from '../icons/optionsIcon.svg';


const SvgIcons = {
  addHeader,
  saveIcon,
  dropDown,
  optionsIcon
};

const fontFamily = {
  appTextRegular: 'Poppins-Regular',
  appTextSemibold: 'Poppins-SemiBold',
  appTextBold: 'Poppins-Bold',
  appTextMedium: 'Poppins-Medium',
};

const responsiveWidth = e => {
  return (Dimensions.get('window').width / 100) * e;
};
const responsiveHeight = e => {
  return (Dimensions.get('window').height / 100) * e;
};
const responsiveFontSize = e => {
  const width = Dimensions.get('window').width;
  const height = Dimensions.get('window').height;
  return ((height + width) / 100) * e;
};

const screenHeight = Dimensions.get("screen").height

export const devicePixel = fontSize => {
  let px_1 = (responsiveFontSize(1.1) / 14)
  return px_1 * fontSize
};


const colors = {
  appPrimary: '#848489',
  appShadowGrey: '#8D8E8F',
  appBlack: '#25282A',
  appCyan: '#A1E6E0',
  appGreen: '#8CD47E',
  appRed: '#FF6961',
  appSolidBlack: '#000',
  appSolidWhite: '#fff',
  appLightBackground: '#F1F6FB',
  appTextDarkBlue: '#003B5C',
  appPrimaryBlue: "#005EB8",
  appBorderGrey: '#25282A1A',
  appOrange: '#FC4C02',
  appButtonGreen: '#00BF6F'
};

const isAndroid = Platform.OS === "android"
const isIOS = Platform.OS === "ios"

export {
  AppImages,
  SvgIcons,
  fontFamily,
  colors,
  responsiveWidth,
  responsiveHeight,
  responsiveFontSize,
  isAndroid,
  isIOS,
  screenHeight
};

