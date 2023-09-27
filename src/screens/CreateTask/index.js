import { TextInput, StatusBar, StyleSheet, Text, View, Pressable, Keyboard } from 'react-native'
import React, { useRef, useState } from 'react'
import { AppImages, SvgIcons, colors, devicePixel, fontFamily, isAndroid, responsiveHeight, responsiveWidth } from '../../assets/utilities'
import LinearGradient from "react-native-linear-gradient"
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { TouchableRipple } from 'react-native-paper'
import { useDispatch, useSelector } from 'react-redux'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { setTasks } from '../../redux/user'
import moment from 'moment'
const Home = ({ navigation }) => {
    const { tasks } = useSelector(state => state.user)
    const [date, setDate] = useState(new Date())
    const dispatch = useDispatch()
    const desRef = useRef()
    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("");
    const [description, setDescription] = useState("");
    const topInsets = useSafeAreaInsets()
    const gradientColors = ["#131313", "#232323", "#343434"]
    const topFix = devicePixel(35) + (isAndroid ? StatusBar.currentHeight : topInsets.top)

    const isValid = () => {
        return title && description
    }
    const onSave = () => {
        Keyboard.dismiss()
        dispatch(setTasks([...tasks, { title, category, description, date }]))
        navigation.goBack()
    }

    return (
        <View style={styles.container}>
            <KeyboardAwareScrollView keyboardShouldPersistTaps="always" contentContainerStyle={{ flexGrow: 1 }}>
                <StatusBar translucent backgroundColor={"transparent"} barStyle={"light-content"} />
                <Pressable style={styles.keyboardDismissal} onPress={() => { Keyboard.dismiss() }}>
                    <LinearGradient colors={gradientColors}
                        style={[styles.header, { paddingTop: topFix }]}>
                        <Text style={styles.leftHeaderText}>
                            Create Task
                        </Text>
                        <View style={styles.addParent}>
                            <TouchableRipple disabled={!isValid()} onPress={() => { onSave() }} rippleColor={"#ffffff40"}
                                style={[!isValid() && { backgroundColor: "rgba(0,0,0,0.5)" }, styles.touchableArea]}>
                                <SvgIcons.saveIcon height={devicePixel(35)} width={devicePixel(35)}
                                    style={[!isValid() && { opacity: 0.5 }, styles.borderRadiusComplete]} />
                            </TouchableRipple>
                        </View>
                    </LinearGradient>
                    <View style={styles.secondContainer}>
                        <TextInput
                            autoFocus
                            cursorColor={"#000"}
                            value={title}
                            onChangeText={text => setTitle(text)}
                            style={styles.titleStyle}
                            returnKeyType='next'
                            placeholder='Title*'
                            placeholderTextColor={colors.appShadowGrey}
                            blurOnSubmit={false}
                            onSubmitEditing={() => {
                                desRef.current.focus()
                            }}
                        />
                        <View style={styles.justifySpace90}>
                            <TouchableRipple style={styles.halfStyle} onPress={() => console.log("ok")}>
                                <View style={styles.justifySpace}>
                                    <Text style={styles.textStyle}>
                                        Assign to category
                                    </Text>
                                    <SvgIcons.dropDown height={devicePixel(20)} width={devicePixel(20)} />
                                </View>
                            </TouchableRipple>
                            <TouchableRipple style={styles.halfStyle} onPress={() => console.log("ok")}>
                                <View style={styles.justifySpace}>
                                    <Text style={styles.textStyle}>
                                        {moment(date).format("DD-MM-YYYY")}
                                    </Text>
                                    <SvgIcons.dropDown height={devicePixel(20)} width={devicePixel(20)} />
                                </View>
                            </TouchableRipple>
                        </View>
                        <TextInput
                            ref={desRef}
                            cursorColor={"#000"}
                            value={description}
                            onChangeText={text => setDescription(text)}
                            style={styles.descriptionStyle}
                            placeholder='Description*'
                            multiline
                            maxLength={200}
                            placeholderTextColor={colors.appShadowGrey}
                        />
                    </View>
                </Pressable>
            </KeyboardAwareScrollView>
        </View>
    )
}

export default Home

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    leftRow: {
        flexDirection: "row",
        alignItems: "center",

    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingBottom: devicePixel(25),
        paddingHorizontal: devicePixel(10),
        // borderWidth: devicePixel(4),
        borderColor: "#161616",
        borderTopWidth: 0,

    },
    leftHeaderText: {
        fontFamily: fontFamily.appTextBold,
        color: colors.appSolidWhite,
        fontSize: devicePixel(24),
        marginLeft: devicePixel(10)
    },
    borderRadiusComplete: {
        borderRadius: 100,
        backgroundColor: "#fff"
    },
    touchableArea: {
        width: devicePixel(50),
        height: devicePixel(50),
        alignItems: 'center',
        justifyContent: "center"
    },
    addParent: {
        overflow: "hidden"
    },
    secondContainer: {
        flexGrow: 1,
        borderColor: "#161616",
        // borderWidth: devicePixel(4),
        borderTopWidth: devicePixel(2),
        backgroundColor: "#252525",
    },
    drawerIconStyle: {
        height: devicePixel(35),
        width: devicePixel(35)
    },
    titleStyle: {
        backgroundColor: "#fff",
        width: "90%",
        alignSelf: "center",
        borderRadius: devicePixel(4),
        marginTop: devicePixel(20),
        paddingHorizontal: devicePixel(18),
        fontFamily: fontFamily.appTextMedium,
        color: "#000",
        paddingVertical: devicePixel(10),
    },
    halfStyle: {
        backgroundColor: "#fff",
        width: "48.5%",
        alignSelf: "center",
        borderRadius: devicePixel(4),
        marginTop: devicePixel(20),
        paddingHorizontal: devicePixel(8),
        fontFamily: fontFamily.appTextMedium,
        color: "#000",
        paddingVertical: devicePixel(10),
    },
    textStyle: {
        fontFamily: fontFamily.appTextMedium,
        color: "#000",
    },
    descriptionStyle: {
        backgroundColor: "#fff",
        width: "90%",
        alignSelf: "center",
        borderRadius: devicePixel(4),
        marginTop: devicePixel(20),
        paddingHorizontal: devicePixel(18),
        fontFamily: fontFamily.appTextMedium,
        color: "#000",
        paddingVertical: devicePixel(15),
        height: responsiveHeight(28),
        textAlignVertical: "top",
    },
    keyboardDismissal: {
        flexGrow: 1
    },
    justifySpace: {
        justifyContent: "space-between",
        flexDirection: 'row',
        alignItems: "center"
    },
    justifySpace90: {
        justifyContent: "space-between",
        flexDirection: 'row',
        alignItems: "center",
        width: "90%",
        alignSelf: 'center'
    },
})