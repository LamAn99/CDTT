import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity } from 'react-native'
import React from 'react'

const Itemproduct = ({ navigation }: { navigation: any }) => {
  const items = [
    { name: 'Espresso', price: '$20', image: require('../../../../assets/images/espresso.png') },
    { name: 'Chocolate', price: '$10', image: require('../../../../assets/images/chocolate.png') },
    { name: 'Frappuccino', price: '$15', image: require('../../../../assets/images/frappuccino.png') },
    { name: 'Latte', price: '$13', image: require('../../../../assets/images/latte.png') },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.itemContainer}>
        {items.map((item, index) => (
          <View key={index} style={styles.itemCard}>
            <TouchableOpacity onPress={() => navigation.navigate('Details', { product: item })}>
              <Image source={item.image} style={styles.itemImage} />
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemPrice}>Price: {item.price}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('Details', { product: item })}>
              <Text style={styles.addButtonText}>Add Item</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default Itemproduct

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5DC',
    padding: 20,
  },
  bannerImage: {
    width: '100%',
    height: 150,
    borderRadius: 10,
    marginBottom: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    width: 50,
    height: 50,
  },
  iconContainer: {
    flexDirection: 'row',
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  icon: {
    width: 30,
    height: 30,
    marginLeft: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  itemCard: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 10,
    width: '48%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  itemImage: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  itemPrice: {
    fontSize: 14,
    color: '#888',
  },
  addButton: {
    backgroundColor: '#D2B48C',
    borderRadius: 5,
    padding: 5,
    marginTop: 10,
  },
  addButtonText: {
    color: '#FFF',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 16,
    backgroundColor: '#A58446',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
});