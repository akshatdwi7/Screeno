import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TrendingUp, TrendingDown, Plus, MoveVertical as MoreVertical } from 'lucide-react-native';

export default function WatchlistScreen() {
  const [activeTab, setActiveTab] = useState('All');

  const renderStockItem = ({ item }: { item: any }) => (
    <TouchableOpacity style={styles.stockItem}>
      <View style={styles.stockInfo}>
        <Image source={{ uri: item.logo }} style={styles.stockLogo} />
        <View>
          <Text style={styles.stockSymbol}>{item.symbol}</Text>
          <Text style={styles.stockName}>{item.name}</Text>
        </View>
      </View>
      <View style={styles.stockPriceContainer}>
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
      <TouchableOpacity style={styles.moreButton}>
        <MoreVertical size={20} color="#999" />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  const filteredStocks = activeTab === 'All' 
    ? watchlistStocks 
    : watchlistStocks.filter(stock => stock.category === activeTab);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Watchlist</Text>
        <TouchableOpacity style={styles.addButton}>
          <Plus size={20} color="#FFF" />
        </TouchableOpacity>
      </View>

      <View style={styles.tabsContainer}>
        <ScrollableTabs
          tabs={['All', 'Tech', 'Finance', 'Energy', 'Healthcare']}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>15</Text>
          <Text style={styles.statLabel}>Stocks</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={styles.statValue}>+2.4%</Text>
          <Text style={styles.statLabel}>Avg. Change</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={styles.statValue}>3</Text>
          <Text style={styles.statLabel}>Alerts</Text>
        </View>
      </View>

      <FlatList
        data={filteredStocks}
        renderItem={renderStockItem}
        keyExtractor={(item) => item.symbol}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const ScrollableTabs = ({ tabs, activeTab, onTabChange }: { 
  tabs: string[], 
  activeTab: string, 
  onTabChange: (tab: string) => void 
}) => {
  return (
    <View style={styles.tabsScrollContainer}>
      {tabs.map((tab) => (
        <TouchableOpacity
          key={tab}
          style={[
            styles.tab,
            activeTab === tab && styles.activeTab,
          ]}
          onPress={() => onTabChange(tab)}>
          <Text
            style={[
              styles.tabText,
              activeTab === tab && styles.activeTabText,
            ]}>
            {tab}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

// Sample data
const watchlistStocks = [
  {
    symbol: 'AAPL',
    name: 'Apple Inc.',
    logo: 'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?q=80&w=100&auto=format&fit=crop',
    price: '189.84',
    change: 1.25,
    category: 'Tech',
  },
  {
    symbol: 'MSFT',
    name: 'Microsoft Corporation',
    logo: 'https://images.unsplash.com/photo-1583339793403-3d9b001b6008?q=80&w=100&auto=format&fit=crop',
    price: '415.50',
    change: 0.75,
    category: 'Tech',
  },
  {
    symbol: 'GOOGL',
    name: 'Alphabet Inc.',
    logo: 'https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?q=80&w=100&auto=format&fit=crop',
    price: '175.20',
    change: -0.32,
    category: 'Tech',
  },
  {
    symbol: 'AMZN',
    name: 'Amazon.com Inc.',
    logo: 'https://images.unsplash.com/photo-1523474253046-8cd2748b5fd2?q=80&w=100&auto=format&fit=crop',
    price: '182.30',
    change: 2.15,
    category: 'Tech',
  },
  {
    symbol: 'TSLA',
    name: 'Tesla Inc.',
    logo: 'https://images.unsplash.com/photo-1617704548623-340376564e68?q=80&w=100&auto=format&fit=crop',
    price: '177.50',
    change: -1.45,
    category: 'Energy',
  },
  {
    symbol: 'JPM',
    name: 'JPMorgan Chase & Co.',
    logo: 'https://images.unsplash.com/photo-1501167786227-4cba60f6d58f?q=80&w=100&auto=format&fit=crop',
    price: '198.45',
    change: 0.65,
    category: 'Finance',
  },
  {
    symbol: 'BAC',
    name: 'Bank of America Corp.',
    logo: 'https://images.unsplash.com/photo-1501167786227-4cba60f6d58f?q=80&w=100&auto=format&fit=crop',
    price: '39.28',
    change: -0.42,
    category: 'Finance',
  },
  {
    symbol: 'JNJ',
    name: 'Johnson & Johnson',
    logo: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?q=80&w=100&auto=format&fit=crop',
    price: '152.75',
    change: 0.28,
    category: 'Healthcare',
  },
  {
    symbol: 'XOM',
    name: 'Exxon Mobil Corp.',
    logo: 'https://images.unsplash.com/photo-1627636608840-1e28d31f2ab8?q=80&w=100&auto=format&fit=crop',
    price: '118.90',
    change: 1.05,
    category: 'Energy',
  },
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 15,
  },
  title: {
    fontFamily: 'Poppins-Bold',
    fontSize: 24,
    color: '#333',
  },
  addButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#6C5CE7',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#6C5CE7',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  tabsContainer: {
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  tabsScrollContainer: {
    flexDirection: 'row',
  },
  tab: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginRight: 10,
    backgroundColor: '#FFF',
  },
  activeTab: {
    backgroundColor: '#6C5CE7',
  },
  tabText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#666',
  },
  activeTabText: {
    color: '#FFF',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#FFF',
    marginHorizontal: 20,
    borderRadius: 12,
    padding: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    color: '#333',
  },
  statLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#666',
  },
  statDivider: {
    width: 1,
    height: '80%',
    backgroundColor: '#EEE',
  },
  listContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  stockItem: {
    flexDirection: 'row',
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
    flex: 1,
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
  stockPriceContainer: {
    alignItems: 'flex-end',
    marginRight: 10,
  },
  stockPrice: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: '#333',
  },
  stockChangeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stockChangeText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    marginLeft: 4,
  },
  moreButton: {
    padding: 5,
  },
});