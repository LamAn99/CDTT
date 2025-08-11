import React from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image } from 'react-native';
import { useCart } from '../screens/hometab/CartContext';
import { GET_IMG } from '../api/apiService';

interface CartItem {
    name: string;
    price: string;
    quantity: number;
    photo: string; // Change the type to string for the image URL
}
const OrderScreen = ({ navigation }: { navigation: any }) => {
    const { cartItems, removeFromCart, clearCart } = useCart();
    console.log(cartItems);

    const renderCartItem = ({ item }: { item: CartItem }) => {
        return (
            <View style={styles.cartItem}>
                <Image
                    source={{ uri: GET_IMG("products", item.photo) }}
                    style={styles.itemImage}
                    onError={(e) => console.log('Error loading image:', e.nativeEvent.error)}
                />
                <View style={styles.itemDetails}>
                    <Text style={styles.itemName}>{item.name}</Text>
                    <Text style={styles.itemPrice}>{item.price}</Text>
                    <Text style={styles.itemQuantity}>Quantity: {item.quantity}</Text>
                </View>
                <TouchableOpacity
                    onPress={() => removeFromCart(item.name)}
                    style={styles.removeButton}
                    accessibilityLabel={`Remove ${item.name} from cart`}
                >
                    <Text style={styles.removeButtonText}>Remove</Text>
                </TouchableOpacity>
            </View>
        );
    };

    const totalAmount = cartItems.reduce((total, item) => {
        const price = parseInt(item.price.replace('.', '').replace(' VND', ''), 10);
        return isNaN(price) ? total : total + price * item.quantity; // Handle NaN
    }, 0);

    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.homeButton}
                onPress={() => navigation.navigate('Feed')}
                accessibilityLabel="Go to home"
            >
                <Image
                    source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Home_icon.svg/1200px-Home_icon.svg.png' }}
                    style={styles.homeIcon}
                    tintColor="black"
                />
            </TouchableOpacity>
            <Text style={styles.title}>Your Cart</Text>
            {cartItems.length === 0 ? (
                <Text style={styles.emptyCartText}>Your cart is empty!</Text>
            ) : (
                <>
                    <FlatList
                        data={cartItems}
                        renderItem={renderCartItem}
                        keyExtractor={(item) => item.name}
                    />
                    <Text style={styles.totalAmount}>Total Amount: {totalAmount.toLocaleString('vi-VN')} VND</Text>
                    <TouchableOpacity onPress={clearCart} style={styles.clearButton}>
                    <Text style={styles.clearButtonText}>Clear Cart</Text>
                    </TouchableOpacity>
                </>
            )}
            <TouchableOpacity
                style={styles.checkoutButton}
                onPress={() => navigation.navigate('Checkout')}
                accessibilityLabel="Proceed to checkout"
            >
                <Text style={styles.checkoutButtonText}>Proceed to Checkout</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F7F3E3',
        padding: 20,
    },
    homeButton: {
        position: 'absolute',
        top: 20,
        left: 20,
        zIndex: 1,
    },
    homeIcon: {
        width: 30,
        height: 30,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        color: '#4A4A4A',
    },
    cartItem: {
        backgroundColor: '#FFFFFF',
        padding: 15,
        borderRadius: 10,
        marginBottom: 10,
        elevation: 3,
        flexDirection: 'row',
        alignItems: 'center',
    },
    itemImage: {
        width: 60,
        height: 60,
        marginRight: 10,
        borderRadius: 5,
    },
    itemDetails: {
        flex: 1,
    },
    itemName: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#4A4A4A',
    },
    itemPrice: {
        fontSize: 18,
        color: '#F7941D',
    },
    itemQuantity: {
        fontSize: 16,
        color: '#4A4A4A',
    },
    removeButton: {
        marginTop: 10,
        backgroundColor: '#F7941D',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    removeButtonText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
    },
    emptyCartText: {
        fontSize: 18,
        color: '#4A4A4A',
        textAlign: 'center',
        marginTop: 50,
    },
    totalAmount: {
        fontSize: 22,
        fontWeight: 'bold',
        marginTop: 20,
        textAlign: 'center',
        color: '#4A4A4A',
    },
    clearButton: {
        backgroundColor: '#E7E7E7',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 10,
    },
    clearButtonText: {
        fontWeight: 'bold',
        color: '#4A4A4A',
    },
    checkoutButton: {
        backgroundColor: '#F7941D',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 20,
    },
    checkoutButtonText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
        fontSize: 18,
    },
});

export default OrderScreen;