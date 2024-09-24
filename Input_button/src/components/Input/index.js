import { View, StyleSheet, Text, TextInput, TouchableOpacity, Keyboard, Animated } from "react-native";
import React, { useState } from "react";

import Icon from 'react-native-vector-icons/FontAwesome';

export default function App() {
    const [input, setInput] = useState("");
    const [name, setNome] = useState("");
    const [status, setStatus] = useState("");
    const fadeAnim = useState(new Animated.Value(0))[0];

    const gravarNome = () => {
        if (input.trim() != '') {
            setNome(`Olá ${input}`);
            Keyboard.dismiss();
            setStatus("Texto Salvo!");
        } else {
            setStatus("Texto Vazio!");
        }

        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
        }).start(() => {

            setTimeout(() => {
                Animated.timing(fadeAnim, {
                    toValue: 0,
                    duration: 300,
                    useNativeDriver: true,
                }).start(() => {
                    setStatus("");
                });
            }, 1500);
        });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Input & Button</Text>
            <View style={styles.inputContainer}>
                <TextInput style={styles.input} value={input} onChangeText={(text) => { setInput(text); }} underlineColorAndroid="transparent" />
                <TouchableOpacity style={styles.addButton} onPress={() => gravarNome()}>
                    <Text style={styles.text}>
                        <Icon name="arrow-right" size={20} color="#cccccc" />
                    </Text>
                </TouchableOpacity>
            </View>
            <Animated.View style={{ opacity: fadeAnim }}>
                <Text style={ [ styles.statusText, {color: status === "Texto Salvo!" ? "green" : "red"}] }>
                    {(status === "Texto Salvo!") ? <Icon name="check" size={20} color="green" /> : <Icon name="times" size={20} color="red" />}
                    {" " + status}
                </Text>
            </Animated.View>
            <Text style={styles.textOutput}>{name}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%'
    },
    title: {
        color: '#cccccc',
        fontFamily: 'monospace',
        fontSize: 20,
        textAlign: 'center',
        marginBottom: 20
    },
    inputContainer: {
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    input: {
        backgroundColor: '#cccccc',
        width: 300,
        height: 40,
        paddingLeft: 10,
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
    },
    addButton: {
        flex: 0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#23005c',
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
        width: 40,
        height: 40
    },
    text: {
        color: '#cccccc'
    },
    textOutput: {
        color: '#cccccc',
        textAlign: 'center',
        fontSize: 40,
        marginTop: 20
    },
    statusText: {
        textAlign: "right",
        marginTop: 10,
        marginRight: 30
    }
});
