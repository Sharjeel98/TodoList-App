import { TextInput, StatusBar, StyleSheet, Text, View, Pressable, Keyboard, BackHandler, FlatList, PermissionsAndroid, Alert } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { SvgIcons, colors, devicePixel, fontFamily, isAndroid, responsiveHeight, } from '../../assets/utilities'
import LinearGradient from "react-native-linear-gradient"
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { TouchableRipple } from 'react-native-paper'
import Dialog from "react-native-dialog";
import { useDispatch, useSelector } from 'react-redux'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { setAppLoader, setCategories, setTasks } from '../../redux/user'
import moment from 'moment'
import DatePickerComp from '../../components/DatePickerComp'
import CustomBottomSheet from '../../components/CustomBottomSheet'
import notifee, { TimestampTrigger, TriggerType, AndroidImportance, AndroidVisibility, AndroidNotificationSetting } from '@notifee/react-native';

const Home = ({ navigation }) => {
    const { tasks, categories } = useSelector(state => state.user)
    const [date, setDate] = useState(new Date())
    const dispatch = useDispatch()
    const desRef = useRef()
    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("");
    const [description, setDescription] = useState("");
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false)
    const [isBsVisible, setIsBsVisible] = useState(false)
    const [isDialogVisible, setDialogVisible] = useState(false);
    const [inputValue, setInputValue] = useState('');

    const topInsets = useSafeAreaInsets()
    const gradientColors = ["#131313", "#232323", "#343434"]
    const topFix = devicePixel(35) + (isAndroid ? StatusBar.currentHeight : topInsets.top)

    const isValid = () => {
        return title && description
    }
    const onCreateTriggerNotification = async () => {
        dispatch(setAppLoader(true))

        const settings = await notifee.getNotificationSettings();
        if ((await settings).android.alarm == AndroidNotificationSetting.ENABLED) {
            //Create timestamp trigger

            // Create a time-based trigger
            const trigger: TimestampTrigger = {
                type: TriggerType.TIMESTAMP,
                timestamp: new Date(date).getTime(),
            };
            const channelId = await notifee.createChannel({
                id: 'important',
                name: 'Important Notifications',
                importance: AndroidImportance.HIGH,
            });

            let notificationId = await notifee.createTriggerNotification(
                {
                    title: title,
                    body: moment(date).format("DD-MM-YYYY hh:mm A"),
                    android: {
                        channelId,
                        importance: AndroidImportance.HIGH,
                        visibility: AndroidVisibility.PUBLIC,
                        smallIcon: 'ic_launcher',
                        // pressAction is needed if you want the notification to open the app when pressed
                        pressAction: {
                            id: 'default',
                        },
                    },
                },
                trigger,
            )
            dispatch(setTasks([...tasks, { title, category, description, date, id: notificationId }]))
            dispatch(setAppLoader(false))
            navigation.goBack()
        } else {
            dispatch(setAppLoader(false))
            Alert.alert("Enable Permission", "Please enable open alarm permissions", [
                {
                    text: "Go to Settings",
                    onPress: async () => {
                        await notifee.openAlarmPermissionSettings();
                    }
                }
            ])
        }
    }
    const onSave = () => {
        Keyboard.dismiss()
        onCreateTriggerNotification()

    }

    const generateRandomNumbers = (count) => {
        const randomNumbers = [];
        for (let i = 0; i < count; i++) {
            const randomNumber = Math.random(); // Generates a random number between 0 (inclusive) and 1 (exclusive)
            randomNumbers.push(randomNumber);
        }
        return randomNumbers;
    }


    const randomNumbers = generateRandomNumbers(10);
    const renderItemCategories = ({ item, index }) => {
        return (
            <TouchableRipple key={index} style={styles.cateSingle} onPress={() => { setCategory(item); setIsBsVisible(false) }}>
                <Text style={styles.cateNameText}>{(index + 1) + ". " + item}</Text>
            </TouchableRipple>
        )
    }
    const handleCancel = () => {
        setDialogVisible(false);
    };
    const handleSave = () => {
        dispatch(setCategories([inputValue, ...categories]))
        setDialogVisible(false);
    };

    useEffect(() => {
        const backAction = () => {
            isBsVisible ? setIsBsVisible(false) : navigation.goBack()
            return true;
        };
        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            backAction,
        );
        return () => backHandler.remove();
    }, []);

    return (
        <View style={styles.container}>
            <KeyboardAwareScrollView keyboardShouldPersistTaps="always" contentContainerStyle={{ flexGrow: 1 }}>
                <StatusBar translucent backgroundColor={"transparent"} barStyle={"light-content"} />
                <Pressable style={styles.keyboardDismissal} onPress={() => { Keyboard.dismiss() }}>
                    <LinearGradient colors={gradientColors}
                        style={[styles.header, { paddingTop: topFix }]}>
                        <Text style={styles.leftHeaderText} onPress={() => {
                            onCreateTriggerNotification()
                        }}>
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
                            onSubmitEditing={() => { desRef.current.focus() }}
                        />
                        <View style={styles.justifySpace90}>
                            <TouchableRipple style={styles.halfStyle} onPress={() => { setIsBsVisible(true) }}>
                                <View style={styles.justifySpace}>
                                    <Text style={styles.textStyle}>{category ? category : "Select Category"}</Text>
                                    <SvgIcons.dropDown style={isBsVisible && { transform: [{ rotate: "-90deg" }] }} height={devicePixel(20)} width={devicePixel(20)} />
                                </View>
                            </TouchableRipple>
                            <TouchableRipple style={styles.halfStyle} onPress={() => { setDatePickerVisibility(true) }}>
                                <View style={styles.justifySpace}>
                                    <Text style={styles.textStyle}>{moment(date).format("DD-MM-YYYY hh:mm A")}</Text>
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
                <DatePickerComp
                    date={date}
                    isDatePickerVisible={isDatePickerVisible}
                    setDatePickerVisibility={setDatePickerVisibility}
                    setDateTime={setDate}
                />
                <CustomBottomSheet
                    isBsVisible={isBsVisible}
                    setIsBsVisible={setIsBsVisible}
                >
                    <Text style={styles.cateSelect}>Select Category</Text>
                    <FlatList
                        style={{ maxHeight: "65%" }}
                        data={categories}
                        renderItem={renderItemCategories}
                        ListEmptyComponent={() => <Text style={styles.noCateText}>You haven't added any categories yet.</Text>}
                    />
                    <TouchableRipple style={{ marginTop: devicePixel(15), alignSelf: "flex-start" }} onPress={() => { setDialogVisible(true) }}><View style={styles.flexRow}>
                        <Text style={styles.addText}>Add Category</Text><SvgIcons.addHeader height={devicePixel(20)} width={devicePixel(20)} />
                    </View></TouchableRipple>
                </CustomBottomSheet>
                <Dialog.Container visible={isDialogVisible}>
                    <Dialog.Title>Enter Category</Dialog.Title>
                    <Dialog.Input
                        onChangeText={(text) => setInputValue(text)}
                    />
                    <Dialog.Button label="Cancel" onPress={handleCancel} />
                    <Dialog.Button label="Save" onPress={handleSave} />
                </Dialog.Container>
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
        fontSize: devicePixel(13.5)
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
        fontSize: devicePixel(13.5)
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
        fontSize: devicePixel(13.5)

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
    cateSelect: {
        fontFamily: fontFamily.appTextBold,
        color: "#000",
        fontSize: devicePixel(20),
        marginBottom: devicePixel(8),

    },
    noCateText: {
        fontFamily: fontFamily.appTextRegular,
        color: "#000",
        fontSize: devicePixel(14)
    },
    addText: {
        fontFamily: fontFamily.appTextSemibold,
        color: "#000",
        fontSize: devicePixel(15),
        marginRight: devicePixel(6)
    },
    flexRow: {
        flexDirection: 'row',
        alignItems: "center",
    },
    cateSingle: {
        alignSelf: "flex-start",
        padding: devicePixel(5),
        width: "80%",
        marginBottom: devicePixel(4)
    },
    cateNameText: {
        fontFamily: fontFamily.appTextRegular,
        color: "#000",
        fontSize: devicePixel(15)
    }
})