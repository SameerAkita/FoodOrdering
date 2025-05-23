import { Link, useLocalSearchParams, Stack, useRouter } from 'expo-router'
import { View, Text, Image, StyleSheet, Pressable, ActionSheetIOS, ActivityIndicator } from 'react-native';
import { useState } from 'react';
import { defaultPizzaImage } from '@/src/components/ProductListItem';
import Button from '@/src/components/Button';
import { useCart } from '@/src/providers/CartProvider';
import { PizzaSize } from '@/src/types';
import { FontAwesome } from '@expo/vector-icons';
import Colors from '@/src/constants/Colors';
import { useProduct } from '@/src/api/products';

const sizes: PizzaSize[] = ['S', 'M', 'L', 'XL', ]

export default function ProductDetailsScreen() {
    const { id: idString } = useLocalSearchParams();
    const id = parseFloat(typeof idString === 'string' ? idString : idString[0])

    const { data: product, error, isLoading } = useProduct(id)

    const { addItem } = useCart();

    const router = useRouter();

    const [selectedSize, setSelectedSize] = useState<PizzaSize>('M')

    const addToCart = () => {
        if (!product) {
            return;
        }

        addItem(product, selectedSize);
        router.push('/cart')
    }

    if (!product) {
        return <Text>Product not found</Text>
    }

    if (isLoading) {
        return <ActivityIndicator />
    }

    if (error) {
        return <Text>Failed to fetch product</Text>
    }

    return (
        <View style={styles.container}>
            <Stack.Screen 
                options={{
                    title: product.name,
                    headerRight: () => (
                        <Link href={`/menu/create?id=${id}`} asChild>
                            <Pressable>
                                {({ pressed }) => (
                                    <FontAwesome 
                                        name="pencil"
                                        size={25}
                                        color={Colors.light.tint}
                                        style={{marginRight: 15, opacity: pressed ? 0.5 : 1}}
                                    />
                                )}
                            </Pressable>
                        </Link>
                    )
                }}
            />
            <Image 
                source={{ uri: product.image || defaultPizzaImage }}
                style={styles.image}
            />

            <Text style={styles.title}>{product.name}</Text>
            <Text style={styles.price}>${product.price}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
        padding: 10,
    },
    image: {
        width: '100%',
        aspectRatio: 1,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    price: {
        fontWeight: 500,
        fontSize: 18,
    },
});