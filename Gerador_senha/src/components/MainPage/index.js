import { View, StyleSheet, Text, TouchableOpacity, Animated } from "react-native";
import React, { useState } from "react";

import SwitchFunction from "../SwitchFunction/index.js";

import * as Clipboard from 'expo-clipboard';
import Slider from '@react-native-community/slider';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function App() {
    const [value, setValue] = useState(16);
    const [password, setPassword] = useState('');
    const [clipboardMessage, setClipboardMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isUpperCaseEnabled, setIsUpperCaseEnabled] = useState(true);
    const [isLowerCaseEnabled, setIsLowerCaseEnabled] = useState(true);
    const [isNumberEnabled, setIsNumberEnabled] = useState(true);
    const [isSpecialEnabled, setIsSpecialEnabled] = useState(true);
    const fadeAnim = useState(new Animated.Value(0))[0];

    const generatePassword = (passwordLength) => {
        setValue(passwordLength);
        const baseString = checkPasswordConfig();
        if (baseString != '') {
            const rngPassword = randomPassword(passwordLength, baseString);
            setPassword(rngPassword);
        } else {
            setErrorMessage("Nenhum caractere selecionado!");
            startFadeAnimationError();
        }
    }

    const randomPassword = (passwordLength, baseString) => {
        let generatedPassword = '';

        for (let i = 0; i < passwordLength; i++) {
            let rng = Math.floor(Math.random() * baseString.length);
            generatedPassword += baseString[rng];
        }
        
        return generatedPassword;
    }

    const checkPasswordConfig = () => {
        let characters = '';

        characters += (isUpperCaseEnabled) ? 'ABCDEFGHIJKLMNOPQRSTUVXWYZ' : '';
        characters += (isLowerCaseEnabled) ? 'abcdefghijklmnopqrstuvxwyz' : '';
        characters += (isNumberEnabled) ? '0123456789' : '';
        characters += (isSpecialEnabled) ? '!@#$%&*' : '';

        return characters;
    }

    const copyToClipboard = async () => {
        await Clipboard.setStringAsync(password);
        setClipboardMessage("Senha copiada!");
        startFadeAnimationClipboard();
    };

    const startFadeAnimationClipboard = () => {
        fadeAnim.setValue(1);
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
        }).start( () => {
            Animated.timing(fadeAnim, {
                toValue: 0,
                duration: 1500,
                useNativeDriver: true,
            }).start(() => {
                setClipboardMessage("");
            });
        });
    };
    const startFadeAnimationError = () => {
        fadeAnim.setValue(1);
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 1500,
            useNativeDriver: true,
        }).start( () => {
            Animated.timing(fadeAnim, {
                toValue: 0,
                duration: 1500,
                useNativeDriver: true,
            }).start(() => {
                setErrorMessage("");
            });
        });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Gerador de Senhas</Text>

            <Text style={[styles.text, styles.subtitle]}>Senha Gerada</Text>
            <View style={styles.passwordContainer}>
                <View style={[styles.passwordFunctions]}>
                    <Text style={[styles.text, styles.password, {'fontSize': (password.length >= 28) ? 11 : 14}]}>{password}</Text>
                    <View style={styles.functions}>
                        <TouchableOpacity onPress={copyToClipboard}>
                            <Icon name="copy" size={22} color="#2600ff" />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={ () => generatePassword(value)}>
                            <Icon name="refresh" size={22} color="#2600ff" />
                        </TouchableOpacity>
                    </View>
                </View>
                    <View style={styles.messageContainer}>
                        { (clipboardMessage) &&
                            <Animated.View style={[ styles.clipboardMessage, {opacity: fadeAnim} ]}>
                                <Icon name="check" size={20} color="#2600ff" />
                                <Text style={styles.message}> {clipboardMessage}</Text>
                            </Animated.View>
                        }
                        { (errorMessage) &&
                            <Animated.View style={[ styles.clipboardMessage, {opacity: fadeAnim, borderColor: 'red'} ]}>
                                <Icon name="times" size={20} color="#ff0000" />
                                <Text style={[styles.message, {color: 'red'}]}> {errorMessage}</Text>
                            </Animated.View>
                        }
                    </View>
            </View>
            <Text style={[styles.text, styles.subtitle]}>Tamanho da Senha</Text>
            <View style={[styles.passwordFunctions]}>
                <Slider
                    style={{ width: 310, height: 40 }}
                    minimumValue={1}
                    maximumValue={32}
                    step={1}
                    value={value}
                    onValueChange={ (passwordLength) => generatePassword(passwordLength)}
                    minimumTrackTintColor="#929292"
                    maximumTrackTintColor="#929292"
                    thumbTintColor="#4400ff"
                />
                <Text style={styles.text}>{value}</Text>
            </View>

            <Text style={[styles.text, styles.subtitle]}>Configurações</Text>
            <SwitchFunction
                label="Permitir letras maiúsculas"
                isEnabled={isUpperCaseEnabled}
                onToggle={() => setIsUpperCaseEnabled(previousState => !previousState)}
            />

            <SwitchFunction
                label="Permitir letras minúsculas"
                isEnabled={isLowerCaseEnabled}
                onToggle={() => setIsLowerCaseEnabled(previousState => !previousState)}
            />

            <SwitchFunction
                label="Permitir números"
                isEnabled={isNumberEnabled}
                onToggle={() => setIsNumberEnabled(previousState => !previousState)}
            />

            <SwitchFunction
                label="Permitir caracteres especiais"
                isEnabled={isSpecialEnabled}
                onToggle={() => setIsSpecialEnabled(previousState => !previousState)}
            />

            <View>
                <TouchableOpacity>
                    <Text></Text>
                </TouchableOpacity>
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '90%'
    },
    title: {
        color: '#cccccc',
        fontFamily: 'monospace',
        fontSize: 20,
        textAlign: 'center',
        marginBottom: 20
    },
    subtitle: {
        marginBottom: 3,
        marginTop: 10
    },
    password: {
        letterSpacing: 3
    },
    passwordContainer: {
        flex: 0,
        width: '100%',
        alignItems: 'flex-end'
    },
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
    functions: {
        flexDirection: 'row',
        gap: 15
    },
    text: {
        flex: 0,
        justifyContent: 'flex-start',
        color: '#ffffff',
    },
    messageContainer: {
        height: 40
    },
    message: {
        flex: 0,
        textAlign: 'center',
        color: '#2600ff',
    },
    clipboardMessage: {
        flex: 0,
        flexDirection: 'row',
        alignItems: 'center',
        color: '#2600ff',
        marginBottom: 2,
        paddingVertical: 2,
        paddingHorizontal: 5,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#2600ff',
        backgroundColor: '#00000000',
    }
});
