import { StyleSheet, Text, TouchableOpacity, View, } from 'react-native'
import React from 'react'
import Modal from "react-native-modal";
import { SvgIcons, colors, devicePixel, fontFamily } from '../assets/utilities';
import { TouchableRipple, } from 'react-native-paper';
const TimeAlert = ({
    isModalVisible = false,
    setModalVisible,
}) => {

    return (
        <Modal isVisible={isModalVisible}
            onBackdropPress={() => {
                setModalVisible?.(false)
            }}
            onBackButtonPress={() => {
                setModalVisible?.(false)
            }}
            style={{
                margin: 0, alignItems: "center",
            }}
            animationIn={"fadeIn"}
            animationOut={"fadeOut"}
            animationInTiming={200}
            animationOutTiming={1}
            backdropOpacity={0.3}
        >
            <View style={styles.mainContainer}>

            </View>
        </Modal>
    )
}

export default TimeAlert

const styles = StyleSheet.create({
    crossCont: {
        width: devicePixel(24),
        height: devicePixel(24),
        alignItems: "center",
        justifyContent: "center"
    },
    titleStyle: {
        // marginTop: devicePixel(20),
        fontSize: devicePixel(20),
        color: colors.appBlack,
        fontFamily: fontFamily.appTextSemibold
    },
    mainContainer: {
        width: "90%",
        backgroundColor: "#fff",
        borderRadius: devicePixel(10),
        paddingHorizontal: devicePixel(15),
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.30,
        shadowRadius: 4.65,
        elevation: 8,
        paddingTop: devicePixel(18),
        paddingBottom: devicePixel(25),

    },
    headerCont: {
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: "space-between",
    },
    rowSpaceBetween: {
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: "space-between",
    },
    alertText: {
        fontFamily: fontFamily.appTextMedium,
        color: colors.appOrange,
        width: "90%",
        fontSize: devicePixel(14)
    }
})