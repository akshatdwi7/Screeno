import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Search, X, TrendingUp, TrendingDown } from 'lucide-react-native';

export default function SearchScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = (text: string) => {
    setSearchQuery(text);
    if (text.length > 0) {
      setIsSearching(true);
      // Simulate search results
      const filteredResults = popularStocks.filter(
        (stock) =>
          stock.name.toLowerCase().includes(text.toLowerCase()) ||
          stock.symbol.toLowerCase().includes(text.toLowerCase())
      );
      setSearchResults(filteredResults);
    } else {
      setIsSearching(false);
      setSearchResults([]);
    }
  };

  const clearSearch = () => {
    setSearchQuery('');
    setIsSearching(false);
    setSearchResults([]);
  };

  const renderStockItem = ({ item }: { item: any }) => (
    <TouchableOpacity style={styles.stockItem}>
      <View style={styles.stockInfo}>
        <Image source={{ uri: item.logo }} style={styles.stockLogo} />
        <View>
          <Text style={styles.stockSymbol}>{item.symbol}</Text>
          <Text style={styles.stockName}>{item.name}</Text>
        </View>
      </View>
      <View>
        <Text style={styles.stockPrice}>${item.price}</Text>
        <View style={styles.stockChangeContainer}>
          {item.change > 0 ? (
            <TrendingUp size={12} color="#00C087" />
          ) : (
            <TrendingDown size={12} color="#FF4D4F" />
          )}
          <Text
            style={[
              styles.stockChangeText,
              { color: item.change > 0 ? '#00C087' : '#FF4D4F' },
            ]}>
            {item.change > 0 ? '+' : ''}{item.change}%
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Search</Text>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <Search size={20} color="#999" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search stocks, ETFs, indices..."
            placeholderTextColor="#999"
            value={searchQuery}
            onChangeText={handleSearch}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={clearSearch} style={styles.clearButton}>
              <X size={16} color="#999" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {isSearching ? (
        <View style={styles.resultsContainer}>
          <Text style={styles.resultsTitle}>Search Results</Text>
          {searchResults.length > 0 ? (
            <FlatList
              data={searchResults}
              renderItem={renderStockItem}
              keyExtractor={(item) => item.symbol}
              showsVerticalScrollIndicator={false}
            />
          ) : (
            <View style={styles.noResultsContainer}>
              <Text style={styles.noResultsText}>No results found for "{searchQuery}"</Text>
            </View>
          )}
        </View>
      ) : (
        <>
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Popular Searches</Text>
            <FlatList
              data={popularStocks}
              renderItem={renderStockItem}
              keyExtractor={(item) => item.symbol}
              showsVerticalScrollIndicator={false}
            />
          </View>

          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Trending</Text>
            <View style={styles.trendingTagsContainer}>
              {trendingTags.map((tag, index) => (
                <TouchableOpacity key={index} style={styles.trendingTag}>
                  <Text style={styles.trendingTagText}>{tag}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </>
      )}
    </SafeAreaView>
  );
}

// Sample data
const popularStocks = [
  {
    symbol: 'AAPL',
    name: 'Apple Inc.',
    logo: 'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?q=80&w=100&auto=format&fit=crop',
    price: '189.84',
    change: 1.25,
  },
  {
    symbol: 'MSFT',
    name: 'Microsoft Corporation',
    logo: 'https://images.unsplash.com/photo-1583339793403-3d9b001b6008?q=80&w=100&auto=format&fit=crop',
    price: '415.50',
    change: 0.75,
  },
  {
    symbol: 'GOOGL',
    name: 'Alphabet Inc.',
    logo: 'https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?q=80&w=100&auto=format&fit=crop',
    price: '175.20',
    change: -0.32,
  },
  {
    symbol: 'AMZN',
    name: 'Amazon.com Inc.',
    logo: 'https://images.unsplash.com/photo-1523474253046-8cd2748b5fd2?q=80&w=100&auto=format&fit=crop',
    price: '182.30',
    change: 2.15,
  },
  {
    symbol: 'TSLA',
    name: 'Tesla Inc.',
    logo: 'https://images.unsplash.com/photo-1617704548623-340376564e68?q=80&w=100&auto=format&fit=crop',
    price: '177.50',
    change: -1.45,
  },
];

const trendingTags = [
  'Tech Stocks',
  'Dividend',
  'AI',
  'Crypto',
  'Green Energy',
  'Biotech',
  'Metaverse',
  'Semiconductors',
  'EV',
  'Fintech',
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 15,
  },
  title: {
    fontFamily: 'Poppins-Bold',
    fontSize: 24,
    color: '#333',
  },
  searchContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 12,
    paddingHorizontal: 15,
    height: 50,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#333',
  },
  clearButton: {
    padding: 5,
  },
  resultsContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  resultsTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    color: '#333',
    marginBottom: 15,
  },
  noResultsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 50,
  },
  noResultsText: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
  },
  sectionContainer: {
    paddingHorizontal: 20,
    marginBottom: 25,
  },
  sectionTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    color: '#333',
    marginBottom: 15,
  },
  stockItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  stockInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stockLogo: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  stockSymbol: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: '#333',
  },
  stockName: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#666',
  },
  stockPrice: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: '#333',
    textAlign: 'right',
  },
  stockChangeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  stockChangeText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    marginLeft: 4,
  },
  trendingTagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  trendingTag: {
    backgroundColor: '#FFF',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginRight: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  trendingTagText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#6C5CE7',
  },
});