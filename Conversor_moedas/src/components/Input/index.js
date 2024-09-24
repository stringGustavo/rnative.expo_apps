import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { Picker } from '@react-native-picker/picker';

import CurrencyInput from 'react-native-currency-input';
import axios from 'axios';

export default function CurrencyConverter() {
    const [amount, setAmount] = useState('');
    const [fromCurrency, setFromCurrency] = useState('BRL');
    const [toCurrency, setToCurrency] = useState('USD');
    const [convertedAmount, setConvertedAmount] = useState('');
    const [error, setError] = useState(null);
    const fadeAnim = useState(new Animated.Value(0))[0];

    const convertCurrency = async () => {
        if (fromCurrency === toCurrency) {
            setConvertedAmount(amount);
            return;
        }

        if (!amount) {
            setError('Por favor, insira um valor');
            startFadeAnimation();
            return;
        }
        setError(null);

        try {
            const response = await axios.get(`https://economia.awesomeapi.com.br/json/last/${fromCurrency}-${toCurrency}`);
            const conversionRate = response.data[`${fromCurrency}${toCurrency}`].bid;
            const result = parseFloat(amount) * parseFloat(conversionRate);

            setConvertedAmount(result.toFixed(2));
        } catch (err) {
            setError('Erro ao buscar a taxa de câmbio');
            console.error(err);
        }
    };

    const startFadeAnimation = () => {
        fadeAnim.setValue(1);
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
                    setError("");
                });
            }, 1500);
        });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Conversor de Moedas</Text>
            <View style={styles.inputContainer}>
                <Text style={styles.text}>Converter de:</Text>
                <View style={styles.inputCurrency}>
                    <CurrencyInput
                        style={styles.input}
                        value={amount}
                        onChangeValue={setAmount}
                        onChangeText={ (formattedValue) => {}}
                        underlineColorAndroid="transparent"
                        keyboardType="numeric"
                    />
                    <View style={styles.pickerContainer}>
                        <Picker
                            selectedValue={fromCurrency}
                            style={styles.picker}
                            onValueChange={(itemValue) => setFromCurrency(itemValue)}
                        >
                            <Picker.Item label="BRL (Real)" value="BRL" />
                            <Picker.Item label="USD (Dólar)" value="USD" />
                            <Picker.Item label="EUR (Euro)" value="EUR" />
                            <Picker.Item label="GBP (Libra)" value="GBP" />
                            <Picker.Item label="CAD (Dólar Canadense)" value="CAD" />
                        </Picker>
                    </View>
                </View>
                <Text style={styles.text}>Para:</Text>
                <View style={styles.inputCurrency}>
                    <CurrencyInput
                        style={styles.input}
                        value={convertedAmount}
                        editable={false}
                        underlineColorAndroid="transparent"
                    />
                    <View style={styles.pickerContainer}>
                        <Picker
                            selectedValue={toCurrency}
                            style={styles.picker}
                            onValueChange={(itemValue) => setToCurrency(itemValue)}
                        >
                            <Picker.Item label="BRL (Real)" value="BRL" />
                            <Picker.Item label="USD (Dólar)" value="USD" />
                            <Picker.Item label="EUR (Euro)" value="EUR" />
                            <Picker.Item label="GBP (Libra)" value="GBP" />
                            <Picker.Item label="CAD (Dólar Canadense)" value="CAD" />
                        </Picker>
                    </View>
                </View>
            </View>

            <TouchableOpacity style={styles.button} onPress={convertCurrency}>
                <Text style={styles.text}>Converter</Text>
            </TouchableOpacity>

            <Animated.View style={{ opacity: fadeAnim }}>
                {error && <Text style={styles.error}>{error}</Text>}
            </Animated.View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    title: {
        color: '#cccccc',
        fontFamily: 'monospace',
        fontSize: 20,
        textAlign: 'center',
        marginBottom: 20
    },
    text: {
        fontSize: 18,
        color: "#cccccc"
    },
    inputContainer: {
        flexDirection: 'column',
        justifyContent: 'center'
    },
    inputCurrency: {
        flexDirection: 'row',
        marginBottom: 20
    },
    input: {
        backgroundColor: '#cccccc',
        color: "#000",
        width: 200,
        height: 50,
        paddingLeft: 10,
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
    },
    button: {
        flex: 0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#23005c',
        borderRadius: 10,
        height: 40
    },
    picker: {
        width: 170,
        height: 50,
        backgroundColor: "#cccccc",
    },
    pickerContainer: {
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
        borderLeftWidth: 0.5,
        borderColor: 'gray',
        overflow: 'hidden',
    },
    error: {
        color: 'red',
        textAlign: 'center',
        marginTop: 10,
    },
});
