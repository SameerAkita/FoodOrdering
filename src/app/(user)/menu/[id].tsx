import { useLocalSearchParams, Stack, useRouter } from 'expo-router'
import { View, Text, Image, StyleSheet, Pressable, ActivityIndicator } from 'react-native';
import { useState } from 'react';
import { defaultPizzaImage } from '@/src/components/ProductListItem';
import Button from '@/src/components/Button';
import { useCart } from '@/src/providers/CartProvider';
import { PizzaSize } from '@/src/types';
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
    
    if (isLoading) {
        return <ActivityIndicator />
    }

    if (error) {
        return <Text>Failed to fetch product</Text>
    }

    return (
        <View style={styles.container}>
            <Stack.Screen options={{title: product.name}} />
            <Image 
                source={{ uri: product.image || defaultPizzaImage }}
                style={styles.image}
            />
            <Text>Select size</Text>
            <View style={styles.sizes}>
                {sizes.map((size) => (
                    <Pressable 
                        key={size} 
                        style={[styles.size, {backgroundColor: selectedSize === size ? 'gainsboro' : 'white'}]} 
                        onPress={() => setSelectedSize(size)}
                    >
                        <Text style={[styles.sizeText, {color: selectedSize === size ? 'black' : 'grey'}]}>{size}</Text>
                    </Pressable>
                ))}
            </View>

            <Text style={styles.price}>${product.price}</Text>
            <Button 
                text='Add to cart'
                onPress={addToCart}
            />
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
    price: {
        fontWeight: 'bold',
        fontSize: 18,
        marginTop: 'auto'
    },
    sizes: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginVertical: 10,
    },
    size: {
        borderRadius: '50%',
        aspectRatio: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10
    },
    sizeText: {
        fontSize: 20,
        fontWeight: 500
    }
});