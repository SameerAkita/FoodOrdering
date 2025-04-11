import orders from '@/assets/data/orders'
import OrderItemListItem from '@/src/components/OrderItemListItem'
import OrderListItem from '@/src/components/OrderListItem'
import { Stack, useLocalSearchParams } from 'expo-router'
import { FlatList, StyleSheet, Text, View, Pressable, ActionSheetIOS, ActivityIndicator} from 'react-native'
import { OrderStatusList } from '@/src/types'
import Colors from '@/src/constants/Colors'
import { useOrderDetails, useUpdateOrder } from '@/src/api/orders'

export default function OrderDetails() {
    const { id: idString } = useLocalSearchParams()
    const id = parseFloat(typeof idString === 'string' ? idString : idString[0])

    const { data: order, error, isLoading } = useOrderDetails(id)
    const { mutate: updateOrder} = useUpdateOrder()

    if (isLoading) {
        return <ActivityIndicator />
    }

    if (error || !order ) {
        return <Text>failed to fetch</Text>
    }

    const updateStatus = (status: string) => {
        updateOrder({ id: id, updatedFields: { status } })
    }
 
    return (
        <View style={styles.container}>
            <Stack.Screen options={{title: `Order #${id}`}} />
            
            <OrderListItem order={order} />

            <FlatList 
                data={order.order_items}
                renderItem={({ item }) => <OrderItemListItem item={item} />}
                contentContainerStyle={{ gap: 10 }}
                ListFooterComponent={() => (
                    <>
                        <Text style={{ fontWeight: 'bold' }}>Status</Text>
                        <View style={{ flexDirection: 'row', gap: 5 }}>
                            {OrderStatusList.map((status) => (
                            <Pressable
                                key={status}
                                onPress={() => {updateStatus(status)}}
                                style={{
                                borderColor: Colors.light.tint,
                                borderWidth: 1,
                                padding: 10,
                                borderRadius: 5,
                                marginVertical: 10,
                                backgroundColor:
                                    order.status === status
                                    ? Colors.light.tint
                                    : 'transparent',
                                }}
                            >
                                <Text
                                style={{
                                    color:
                                    order.status === status ? 'white' : Colors.light.tint,
                                }}
                                >
                                {status}
                                </Text>
                            </Pressable>
                            ))}
                        </View>
                    </>
                )
                }
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