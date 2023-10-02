import { Animated, Dimensions, Keyboard, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useRef } from 'react'
import { devicePixel, responsiveHeight, responsiveWidth, screenHeight } from '../assets/utilities'

const CustomBottomSheet = ({isBsVisible,setIsBsVisible,children}) => {
    const fadeAnim = useRef(new Animated.Value(0)).current;

    const fadeIn = () => {
        Keyboard.dismiss()
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: false,
      }).start();
    };
  
    const fadeOut = () => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 100,
        useNativeDriver: false,
      }).start();
      setTimeout(() => {setIsBsVisible?.(false)}, 100);
    };
    useEffect(()=>{
        isBsVisible ? fadeIn() : fadeOut()
    },[isBsVisible])
  return (
    <>
    {
        isBsVisible&&
        <>
        <Animated.View  style={[styles.cancelCont,{opacity:fadeAnim}]}>
        <Pressable style={styles.fullHW} onPress={()=>{fadeOut() }} />
        </Animated.View>
        <Animated.View  style={[styles.bottomSheetStyle,{opacity:fadeAnim}]}>
        <View>
        {children}
        </View>
        </Animated.View>
        </>
    }
    </>
  )}

export default CustomBottomSheet

const styles = StyleSheet.create({
    container:{
        height:screenHeight,
        width:responsiveWidth(100),
        position:"absolute",
        justifyContent:"space-between"
    },
    bottomSheetStyle:{
        height: responsiveHeight(40),
        backgroundColor:"#fff",
        borderTopRightRadius:devicePixel(15),
        borderTopLeftRadius:devicePixel(15),
        paddingHorizontal:devicePixel(17),
        paddingVertical:devicePixel(12),
        zIndex:2,
        position:'absolute',
        bottom:0,
        width:"100%"
    },
    cancelCont:{
        height:responsiveHeight(100),
        width:"100%",
        backgroundColor:"rgba(0,0,0,0.3)",
        position:"absolute",
        zIndex:1
    },
    fullHW:{
        height:"100%",
        width:"100%"
    }
})