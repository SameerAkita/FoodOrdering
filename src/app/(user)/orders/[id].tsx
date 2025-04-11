 import { useOrderDetails } from '@/src/api/orders'
import OrderItemListItem from '@/src/components/OrderItemListItem'
import OrderListItem from '@/src/components/OrderListItem'
import { Stack, useLocalSearchParams } from 'expo-router'
import { ActivityIndicator, FlatList, StyleSheet, Text, View} from 'react-native'

export default function OrderDetails() {
    const { id: idString } = useLocalSearchParams()
    const id = parseFloat(typeof idString === 'string' ? idString : idString[0])

    const { data: order, error, isLoading } = useOrderDetails(id)

    if (isLoading) {
        return <ActivityIndicator />
    }

    if (error) {
        return <Text>Failed to fetch</Text>
    }
  
    return (
        <View style={styles.container}>
            <Stack.Screen options={{title: `Order #${id}`}} />
            
            <OrderListItem order={order} />

            <FlatList 
                data={order.order_items}
                renderItem={({ item }) => <OrderItemListItem item={item} />}
                contentContainerStyle={{ gap: 10 }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        flex: 1,
        gap: 10,
    },
})