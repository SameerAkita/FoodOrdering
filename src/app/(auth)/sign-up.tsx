import { Stack, Link } from 'expo-router'
import { useState } from 'react'
import { View, Text, TextInput, StyleSheet } from 'react-native'
import Button from '@/src/components/Button'
import Colors from '@/src/constants/Colors'

export default function SignUp() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    return (
        <View style={styles.container}>
            <Stack.Screen options={{title: 'Sign up'}} />

            <Text style={styles.label}>Email</Text>
            <TextInput 
                style={styles.input}
                placeholder='john@gmail.com' 
                value={email}
                onChangeText={setEmail}
            />

            <Text style={styles.label}>Password</Text>
            <TextInput
                style={styles.input}
                placeholder=''
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />

            <Button text='Create account' />
            <Link  href='/sign-in' style={styles.textButton}>
                Sign in
            </Link>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20
    },
    label: {
        color: 'gray',
    },
    input: {
        backgroundColor: 'white',
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
        marginTop: 5,
        marginBottom: 20,
    },
    textButton: {
        alignSelf: 'center',
        fontWeight: 'bold',
        color: Colors.light.tint,
        marginVertical: 10,
    }
})