import React from "react";
import { View, StyleSheet, StatusBar } from 'react-native';

export default function Header() {
    return (
        <View style={styles.container}>
            
        </View>
    )
}

const statusBarHeight = StatusBar.currentHeight ? StatusBar.currentHeight + 22 : 64;

const styles = StyleSheet.create({
    container : {
        backgroundColor: '#17003d',
        paddingTop: statusBarHeight,
    }
})