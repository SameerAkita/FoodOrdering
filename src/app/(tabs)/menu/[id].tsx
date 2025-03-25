import { useLocalSearchParams, Stack } from 'expo-router'
import { View, Text, Image, StyleSheet } from 'react-native';
import products from '@/assets/data/products';
import { defaultPizzaImage } from '@/src/components/ProductListItem';

const sizes = ['S', 'M', 'L', 'XL', ]

export default function ProductDetailsScreen() {
    const { id } = useLocalSearchParams();

    const product = products.find((p) => p.id.toString() === id)

    if (!product) {
        return <Text>Product not found</Text>
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
                    <View key={size} style={styles.size}>
                        <Text style={styles.sizeText}>{size}</Text>
                    </View>
                ))}
            </View>

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
    price: {
        fontWeight: 'bold',
        fontSize: 18,
    },
    sizes: {
        flexDirection: 'row',
    },
    size: {
        backgroundColor: 'gainsboro',
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