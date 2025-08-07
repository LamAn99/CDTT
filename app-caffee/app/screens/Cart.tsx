import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { GET_IMG } from "../api/apiService";
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Swipeable } from 'react-native-gesture-handler';

const CartScreen = ({ route }) => {
  const { cart, setCart } = route.params;
  const [localCart, setLocalCart] = useState(cart);
  const navigation = useNavigation();

  // Update localCart whenever the cart changes
  useEffect(() => {
    setLocalCart(cart);
  }, [cart]);

  // Handle adding new product to the cart
  const handleAddToCart = (product) => {
    const existingProduct = localCart.find(item => item.uniqueId === product.uniqueId);

    if (existingProduct) {
      // If product already exists, increase the quantity
      const updatedCart = localCart.map(item => {
        if (item.uniqueId === product.uniqueId) {
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      });
      setLocalCart(updatedCart);
      setCart(updatedCart);
    } else {
      // If product does not exist, add it with quantity 1
      const updatedCart = [...localCart, { ...product, quantity: 1 }];
      setLocalCart(updatedCart);
      setCart(updatedCart);
    }
  };

  // Handle removing item from cart
  const handleRemoveFromCart = (uniqueId) => {
    const updatedCart = localCart.filter(item => item.uniqueId !== uniqueId);
    setLocalCart(updatedCart);
    setCart(updatedCart);
  };

  // Handle increasing or decreasing quantity of product in the cart
  // const handleQuantityChange = (item, change) => {
  //   const updatedCart = localCart.map(cartItem => {
  //     if (cartItem.uniqueId === item.uniqueId) {
  //       const newQuantity = cartItem.quantity + change;
  //       if (newQuantity > 0) {
  //         return { ...cartItem, quantity: newQuantity };
  //       } else {
  //         return cartItem;
  //       }
  //     }
  //     return cartItem;
  //   });

  //   setLocalCart(updatedCart);
  //   setCart(updatedCart);
  // };
  const handleQuantityChange = (item, change) => {
    const updatedCart = localCart.map(cartItem => {
      if (cartItem.uniqueId === item.uniqueId) {
        // Nếu change là 1, chỉ cho tăng thêm 1 nếu chưa vượt quá giới hạn (có thể thêm điều kiện kiểm tra tồn kho ở đây nếu cần)
        if (change === 1 && cartItem.quantity < 1) {
          return { ...cartItem, quantity: cartItem.quantity + 1 };
        }

        // Nếu change là -1, giảm số lượng nhưng không cho nhỏ hơn 1
        if (change === -1 && cartItem.quantity > 1) {
          return { ...cartItem, quantity: cartItem.quantity - 1 };
        }
      }
      return cartItem;
    });

    setLocalCart(updatedCart);
    setCart(updatedCart);
  };


  // Calculate total price of the cart
  const calculateTotal = () => {
    return localCart.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);
  };

  const renderCartItem = ({ item }) => (
    <Swipeable
      renderRightActions={() => (
        <TouchableOpacity
          onPress={() => handleRemoveFromCart(item.uniqueId)}
          style={styles.deleteButton}
        >
          <Text style={styles.deleteText}>Xóa</Text>
        </TouchableOpacity>
      )}
    >
      <View style={styles.cartItem}>
        <Image source={{ uri: GET_IMG(item.image) }} style={styles.cartItemImage} />
        <View style={styles.cartItemDetails}>
          <Text style={styles.productName}>{item.productName}</Text>
          <Text style={styles.productPrice}>{item.price}$</Text>
          <View style={styles.quantityContainer}>
            <TouchableOpacity
              onPress={() => handleQuantityChange(item, -1)}
              style={styles.quantityButton}
            >
              <Text style={styles.quantityButtonText}>-</Text>
            </TouchableOpacity>
            <Text style={styles.quantityText}>{item.quantity}</Text> {/* Hiển thị số lượng sản phẩm */}
            <TouchableOpacity
              onPress={() => handleQuantityChange(item, 1)}
              style={styles.quantityButton}
            >
              <Text style={styles.quantityButtonText}>+</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Swipeable>
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.header}>Giỏ hàng của bạn</Text>
      </View>

      {localCart.length > 0 ? (
        <FlatList
          data={localCart}
          renderItem={renderCartItem}
          keyExtractor={item => item.uniqueId}
        />
      ) : (
        <Text style={styles.emptyCartText}>Giỏ hàng của bạn trống.</Text>
      )}

      {/* Total Price */}
      {localCart.length > 0 && (
        <View style={styles.totalContainer}>
          <Text style={styles.totalText}>Tổng tiền: {calculateTotal()}$</Text>
        </View>
      )}

      {/* Payment Button */}
      {localCart.length > 0 && (
        <TouchableOpacity
          style={styles.paymentButton}
          onPress={() => navigation.navigate('ProductPage', { cartItems: localCart })} >
          <Text style={styles.paymentButtonText}>Thanh toán</Text>
        </TouchableOpacity>
      )}

      {/* Button to add a product to the cart */}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => handleAddToCart({
          uniqueId: 'newProductId',
          productName: 'Sản phẩm mới',
          price: 20,
          image: 'product-image-url'
        })}
      >
        <Text style={styles.addButtonText}>Thêm sản phẩm</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#F5F5DC',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  backButton: {
    marginRight: 15,
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: '#FF5733',
    borderRadius: 5,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  cartItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  cartItemImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 15,
  },
  cartItemDetails: {
    flex: 1,
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  productPrice: {
    fontSize: 16,
    color: '#FF9800',
    marginVertical: 5,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    backgroundColor: '#FF5733',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
  quantityButtonText: {
    color: '#fff',
    fontSize: 18,
  },
  quantityText: {
    marginHorizontal: 10,
    fontSize: 18,
  },
  deleteButton: {
    backgroundColor: '#FF5733',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: 80,
    borderRadius: 5,
    marginLeft: 10,
  },
  deleteText: {
    color: '#fff',
    fontWeight: 'bold',
    padding: 10,
  },
  emptyCartText: {
    fontSize: 18,
    color: '#999',
    textAlign: 'center',
  },
  totalContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  totalText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FF5733',
  },
  paymentButton: {
    marginTop: 20,
    backgroundColor: '#FF5733',
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  paymentButtonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
  addButton: {
    marginTop: 20,
    backgroundColor: '#4CAF50',
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  addButtonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default CartScreen;
