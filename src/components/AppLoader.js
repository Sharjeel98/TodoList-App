import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Spinner from 'react-native-loading-spinner-overlay';
import { useSelector } from 'react-redux';

const AppLoader = () => {
    const { appLoader } = useSelector(state => state.user)
    return (
        <Spinner
            visible={appLoader}
        />
    )
}

export default AppLoader

const styles = StyleSheet.create({})