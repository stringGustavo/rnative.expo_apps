import { StyleSheet, Text, TouchableOpacity, View, Linking, KeyboardAvoidingView, Platform } from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

export default function Counter() {
    const openGitHub = () => {
        Linking.openURL('https://github.com/stringGustavo');
    }

    return (
        <KeyboardAvoidingView style={styles.footer} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <TouchableOpacity style={styles.clickable} onPress={openGitHub}>
                <Text style={styles.footerText}>Feito por Gustavo Santos </Text>
                <Icon name="github" size={20} color="#cccccc" />
            </TouchableOpacity>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    footer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: 10,
        backgroundColor: '#17003d',
        alignItems: 'center',
    },
    footerText: {
        fontSize: 16,
        color: '#cccccc',
    },
    clickable: {
        flex: 1,
        justifyContent: 'center',
        flexDirection: "row",
    }
});