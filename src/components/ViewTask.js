import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Modal from "react-native-modal";
import { SvgIcons, colors, devicePixel, fontFamily, responsiveHeight, responsiveWidth } from '../assets/utilities';
import { TouchableRipple } from 'react-native-paper';
import moment from 'moment';

const ViewTask = ({
    isModalVisible = false,
    setModalVisible,
    title = "",
    description = "",
    date = "",
    category = ""
}) => {

    const ViewComp = ({ itemTitle, itemText }) => {
        return (
            <View style={styles.rowCenter}>
                <Text style={styles.viewTitle}>
                    {itemTitle}:{"   "}
                    <Text style={styles.viewText}>
                        {itemText}
                    </Text>
                </Text>
            </View>

        )
    }

    return (
        <Modal isVisible={isModalVisible}
            onBackdropPress={() => { setModalVisible?.(false) }}
            style={{ margin: 0, alignItems: "center" }}
            animationIn={"fadeIn"}
            animationOut={"fadeOut"}
            animationInTiming={200}
            animationOutTiming={1}
            backdropOpacity={0.3}
        >
            <View style={styles.mainContainer}>
                <ScrollView>
                    <ViewComp itemTitle={"Title"} itemText={title} />
                    {category && <ViewComp itemTitle={"Category"} itemText={category} />}
                    <ViewComp itemTitle={"Date & Time"} itemText={moment(date).format("DD-MM-YYYY hh:mm A")} />
                    <ViewComp itemTitle={"Description"} itemText={description} />
                </ScrollView>
            </View>
        </Modal>
    )
}

export default ViewTask

const styles = StyleSheet.create({
    crossCont: {
        // width: devicePixel(24),
        height: devicePixel(24),
        alignItems: "center",
        justifyContent: "center"
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
        maxHeight: responsiveHeight(60)

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
        color: colors.appBlack,
        width: "90%",
        fontSize: devicePixel(14)
    },

    viewTitle: {
        fontFamily: fontFamily.appTextBold,
        color: "#000",
        fontSize: devicePixel(15)
    },
    viewText: {
        fontFamily: fontFamily.appTextRegular,
        color: "#000",
        fontSize: devicePixel(14.5),
    },
    rowCenter: {
        marginBottom: devicePixel(4)
    }
})