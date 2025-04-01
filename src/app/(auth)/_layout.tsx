import { useAuth } from '@/src/providers/AuthProvider'
import { Redirect, router, Stack } from 'expo-router'
import { useEffect } from 'react';

export default function AuthLayout() {
    const { session } = useAuth()

    if (session) {
        return <Redirect href={'/'} />
    }

    return <Stack />
} 