import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { GET_IMG } from '../api/apiService';
import { AntDesign } from '@expo/vector-icons';

const ProductDetailsScreen = ({ route, navigation }: { route: any, navigation: any }) => {
  const { product } = route.params;
  const [cart, setCart] = useState<any[]>([]); // Giỏ hàng

  const handleAddToCart = () => {
    const updatedCart = (() => {
      const existingProduct = cart.find(item => item.id === product.id);
      if (existingProduct) {
        return cart.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...cart, { ...product, quantity: 1 }];
      }
    })();

    setCart(updatedCart);

    // ✅ Sau khi thêm, chuyển sang CartScreen
    navigation.navigate("Cart", { cart: updatedCart });
  };


  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Hình ảnh sản phẩm */}
      <Image source={{ uri: GET_IMG(product.image) }} style={styles.productImage} />

      {/* Nút quay lại */}
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <AntDesign name="arrowleft" size={24} color="black" />
      </TouchableOpacity>
      {/* <TouchableOpacity style={styles.cartButton} onPress={() => navigation.navigate('Cart', { cart, setCart })}>
        <AntDesign name="shoppingcart" size={24} color="white" />
        {totalQuantity > 0 && ( // Hiển thị số lượng nếu lớn hơn 0
          <View style={styles.cartCount}>
            <Text style={styles.cartCountText}>{totalQuantity}</Text>
          </View>
        )}
      </TouchableOpacity> */}

      {/* Tên sản phẩm */}
      <Text style={styles.productName}>{product.productName}</Text>

      {/* Giá sản phẩm */}
      <Text style={styles.productPrice}>${product.price}</Text>
      {/* Đánh giá sao mặc định */}
      <View style={styles.ratingContainer}>
        <AntDesign name="star" size={22} color="#FFD700" />
        <AntDesign name="star" size={22} color="#FFD700" />
        <AntDesign name="star" size={22} color="#FFD700" />
        <AntDesign name="star" size={22} color="#FFD700" />
        <AntDesign name="staro" size={22} color="#FFD700" />
        <Text style={styles.ratingText}>4/5 (120 đánh giá)</Text>
      </View>

      {/* Mô tả sản phẩm */}
      <Text style={styles.productDescription}>{product.description}</Text>

      {/* Nút thêm vào giỏ hàng */}
      <TouchableOpacity style={styles.addToCartButton} onPress={handleAddToCart}>
        <Text style={styles.addToCartText}>🛒 Thêm vào giỏ hàng</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
    padding: 20,
    paddingBottom: 40,
  },
  productImage: {
    width: '100%',
    height: 500,
    borderRadius: 10,
  },
  productName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
  },
  productPrice: {
    fontSize: 20,
    color: '#FF9800',
    marginVertical: 10,
  },
  productDescription: {
    fontSize: 16,
    color: '#555',
    marginBottom: 20,
  },
  ratingContainer:
  {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  ratingText: {
    marginLeft: 8,
    fontSize: 16,
    color: '#444',
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    padding: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 50,
    zIndex: 10,
  },
  addToCartButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  addToCartText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ProductDetailsScreen;


// import React from 'react';
// import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
// import { GET_IMG } from '../api/apiService';
// import { AntDesign } from '@expo/vector-icons';

// const ProductDetailsScreen = ({ route, navigation }: { route: any, navigation: any }) => {
//   const { product, cart, setCart } = route.params; // Nhận thêm cart và setCart từ Feed

//   const handleAddToCart = () => {
//     const newItem = { ...product, uniqueId: Math.random().toString() };
//     setCart((prevCart: any[]) => [...prevCart, newItem]);
//     alert('✅ Đã thêm vào giỏ hàng');
//   };

//   return (
//     <ScrollView contentContainerStyle={styles.container}>
//       {/* Hình ảnh sản phẩm */}
//       <Image source={{ uri: GET_IMG(product.image) }} style={styles.productImage} />

//       {/* Nút quay lại */}
//       <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
//         <AntDesign name="arrowleft" size={24} color="black" />
//       </TouchableOpacity>

//       {/* Tên sản phẩm */}
//       <Text style={styles.productName}>{product.productName}</Text>

//       {/* Giá sản phẩm */}
//       <Text style={styles.productPrice}>${product.price}</Text>

//       {/* Mô tả sản phẩm */}
//       <Text style={styles.productDescription}>{product.description}</Text>

//       {/* Nút thêm vào giỏ hàng */}
//       <TouchableOpacity style={styles.addToCartButton} onPress={handleAddToCart}>
//         <Text style={styles.addToCartText}>🛒 Thêm vào giỏ hàng</Text>
//       </TouchableOpacity>
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flexGrow: 1,
//     backgroundColor: '#fff',
//     padding: 20,
//     paddingBottom: 40,
//   },
//   productImage: {
//     width: '100%',
//     height: 500,
//     borderRadius: 10,
//   },
//   productName: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginTop: 20,
//   },
//   productPrice: {
//     fontSize: 20,
//     color: '#FF9800',
//     marginVertical: 10,
//   },
//   productDescription: {
//     fontSize: 16,
//     color: '#555',
//     marginBottom: 20,
//   },
//   backButton: {
//     position: 'absolute',
//     top: 20,
//     left: 20,
//     padding: 10,
//     backgroundColor: 'rgba(255, 255, 255, 0.7)',
//     borderRadius: 50,
//     zIndex: 10,
//   },
//   addToCartButton: {
//     backgroundColor: '#4CAF50',
//     padding: 15,
//     borderRadius: 8,
//     alignItems: 'center',
//     marginTop: 20,
//   },
//   addToCartText: {
//     color: '#fff',
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
// });

// export default ProductDetailsScreen;
