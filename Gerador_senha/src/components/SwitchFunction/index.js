import React from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';

export default function PasswordSwitch ({ label, isEnabled, onToggle }) {
    return (
        <View style={[styles.passwordFunctions]}>
            <Text style={[styles.text, { "color": isEnabled ? "white" : "gray" }]}>
                {label}
            </Text>
            <Switch
                trackColor={{ false: '#929292', true: '#929292' }}
                thumbColor={isEnabled ? '#4400ff' : '#e2e2e2'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={onToggle}
                value={isEnabled}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    passwordFunctions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: "#17003d",
        borderRadius: 10,
        paddingHorizontal: 10,
        marginBottom: 10,
        width: "100%",
        height: 40
    },
    text: {
        flex: 0,
        justifyContent: 'flex-start',
        color: '#ffffff',
    }
});
