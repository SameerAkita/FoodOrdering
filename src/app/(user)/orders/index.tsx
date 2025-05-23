import { View, Text, FlatList, ActivityIndicator } from 'react-native'
import orders from '@/assets/data/orders'
import OrderListItem from '@/src/components/OrderListItem'
import { useMyOrderList } from '@/src/api/orders'

export default function Orders() {
    const { data: orders, isLoading, error } = useMyOrderList()

    if (isLoading) {
        return <ActivityIndicator />
    }

    if (error) {
        return <Text>Failed to fetch</Text>
    }

    return (
        <FlatList 
            data={orders}
            renderItem={({ item }) => <OrderListItem order={item} />}
            contentContainerStyle={{ gap: 10, padding: 10 }}
        />
    )
}