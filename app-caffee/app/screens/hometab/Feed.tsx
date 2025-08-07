import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, Image, TouchableOpacity, Dimensions } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import { GET_ALL, GET_IMG } from "../../api/apiService";

const Feed = ({ navigation }: { navigation: any }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [banners, setBanners] = useState([]);
  const [coffeeData, setCoffeeData] = useState<any[]>([]); // Tất cả sản phẩm
  const [isLoading, setIsLoading] = useState(true);
  const [cart, setCart] = useState<any[]>([]); // Giỏ hàng
  const [searchQuery, setSearchQuery] = useState(''); // Giá trị tìm kiếm
  const scrollViewRef = useRef<ScrollView>(null);
  const width = Dimensions.get('window').width;
  const [cateData, setCateData] = useState<any[]>([]);
  const [isChangCate, setIsChangCate] = useState(1);

  const handlCatea = () => {
    GET_ALL("categories")
      .then((response) => {
        const responseData = response.data;
        if (responseData && Array.isArray(responseData.content)) {
          setCateData(responseData.content);
        } else {
          console.error("Dữ liệu nhận được từ API không đúng định dạng.");
        }
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Lỗi khi lấy dữ liệu: ", error);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    GET_ALL("products")
      .then((response) => {
        const responseData = response.data;
        if (responseData && Array.isArray(responseData.content)) {
          setCoffeeData(responseData.content);
        } else {
          console.error("Dữ liệu nhận được từ API không đúng định dạng.");
        }
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Lỗi khi lấy dữ liệu: ", error);
        setIsLoading(false);
      });
    handlCatea();
  }, []);

  const handleSearchChange = (text: string) => {
    setSearchQuery(text);
  };

  // Lọc sản phẩm theo tên khi người dùng nhập vào thanh tìm kiếm
  const filteredCoffeeData = coffeeData.filter(item =>
    item.productName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddToCart = (item: any) => {
    setCart(prevCart => {
      // Tạo một bản sao của sản phẩm với một ID mới (sử dụng ID ngẫu nhiên để làm uniqueId)
      const newItem = { ...item, uniqueId: Math.random().toString() }; // Tạo ID ngẫu nhiên
      return [...prevCart, newItem]; // Thêm sản phẩm mới vào giỏ hàng
    });
  };

  const handleRemoveFromCart = (uniqueId) => {
    setCart(prevCart => prevCart.filter(item => item.uniqueId !== uniqueId));
  };


  const totalQuantity = cart.length; // Chỉ tính số lượng sản phẩm trong giỏ hàng

  const renderItem = (item: any) => (
    <View style={styles.itemCard} key={item.id}>
      <TouchableOpacity onPress={() => navigation.navigate('Details', { product: item })}>
        <Image source={{ uri: GET_IMG(item.image) }} style={styles.itemImage} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Details', { product: item })}>
        <Text style={styles.itemName}>{item.productName}</Text>
        <Text style={styles.itemPrice}>${item.price}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.addButton} onPress={() => handleAddToCart(item)}>
        <Text style={styles.addButtonText}>Thêm vào giỏ hàng</Text>
      </TouchableOpacity>
    </View>
  );


  const handleClickCatea = (id: number) => {
    setIsChangCate(id === isChangCate ? 0 : id);
    GET_ALL(`categories/${id}/products`)
      .then((response) => {
        const responseData = response.data;
        if (responseData && Array.isArray(responseData.content)) {
          setCoffeeData(responseData.content);
        } else {
          console.error("Dữ liệu nhận được từ API không đúng định dạng.");
        }
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Lỗi khi lấy dữ liệu: ", error);
        setIsLoading(false);
      });
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.headerContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Tìm kiếm sản phẩm..."
            value={searchQuery}
            onChangeText={handleSearchChange}
          />
          <TouchableOpacity style={styles.cartButton} onPress={() => navigation.navigate('Cart', { cart, setCart })}>
            <AntDesign name="shoppingcart" size={24} color="white" />
            {totalQuantity > 0 && ( // Hiển thị số lượng nếu lớn hơn 0
              <View style={styles.cartCount}>
                <Text style={styles.cartCountText}>{totalQuantity}</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        <View style={styles.header}>
          <Text style={styles.greeting}>Chào buổi sáng!</Text>
          <Text style={styles.subGreeting}>Cùng thưởng thức cà phê nào ☕</Text>
        </View>

        <View style={styles.promoBanner}>
          <Text style={styles.promoText}>Cà phê giao tận nhà</Text>
          <Text>Đặt 2 túi cà phê và nhận ngay sao bonus!</Text>
          <TouchableOpacity style={styles.shopNowButton} onPress={() => navigation.navigate('ProductPage')}>
            <Text style={styles.shopNowButtonText}>Mua ngay</Text>
          </TouchableOpacity>
        </View>

        {/* Danh mục sản phẩm */}
        <Text style={styles.sectionTitle}>Danh mục sản phẩm</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryContainer}>
          {cateData.map((cate) => (
            <TouchableOpacity
              key={cate.categoryId}
              style={[styles.categoryItem, isChangCate === cate.categoryId && styles.selectedCategory]}
              onPress={() => handleClickCatea(cate.categoryId)}
            >
              <Text style={styles.categoryText}>{cate.categoryName}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {isLoading ? (
          <Text>Đang tải...</Text>
        ) : (
          <>
            <Text style={styles.sectionTitle}>Tất cả sản phẩm</Text>
            <View style={styles.itemContainer}>
              {filteredCoffeeData.map(renderItem)}
            </View>

            <Text style={styles.sectionTitle}>Gợi ý cho bạn</Text>
            <View style={styles.itemContainer}>
              {filteredCoffeeData.slice(0, 2).map(renderItem)}
            </View>

            <Text style={styles.sectionTitle}>Sản phẩm mới nhất</Text>
            <View style={styles.itemContainer}>
              {filteredCoffeeData.slice(1, 3).map(renderItem)}
            </View>
          </>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5DC',
    padding: 20,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    alignItems: 'center',
  },
  searchInput: {
    backgroundColor: '#FFF',
    padding: 10,
    width: '80%',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  cartButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  header: {
    marginBottom: 20,
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  subGreeting: {
    fontSize: 18,
  },
  promoBanner: {
    backgroundColor: '#f7f7f7',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    alignItems: 'center',
  },
  promoText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  shopNowButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 10,
  },
  shopNowButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  categoryContainer: {
    marginBottom: 20,
  },
  categoryItem: {
    padding: 10,
    marginRight: 10,
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
  },
  selectedCategory: {
    backgroundColor: '#FF9800',
  },
  categoryText: {
    fontSize: 16,
    color: '#333',
  },
  itemContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  itemCard: {
    width: '48%',
    backgroundColor: '#fff',
    marginBottom: 20,
    borderRadius: 10,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  itemImage: {
    width: '100%',
    height: 250,
    borderRadius: 10,
  },
  itemName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    paddingHorizontal: 10,
  },
  itemPrice: {
    fontSize: 16,
    color: '#FF9800',
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  addButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    alignItems: 'center',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  cartCount: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: 'red',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartCountText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export default Feed;
