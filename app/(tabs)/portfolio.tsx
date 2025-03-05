import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { TrendingUp, TrendingDown, ChartPie as PieChart, ChartBar as BarChart3, ArrowRight, Plus } from 'lucide-react-native';

export default function PortfolioScreen() {
  const [activeTab, setActiveTab] = useState('Overview');

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Portfolio</Text>
          <TouchableOpacity style={styles.addButton}>
            <Plus size={20} color="#FFF" />
          </TouchableOpacity>
        </View>

        <LinearGradient
          colors={['#6C5CE7', '#8E7CF3']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.portfolioCard}>
          <View style={styles.portfolioHeader}>
            <Text style={styles.portfolioTitle}>Total Value</Text>
            <Text style={styles.portfolioDate}>June 12, 2025</Text>
          </View>
          <Text style={styles.portfolioValue}>₹9,24,685.75</Text>
          <View style={styles.portfolioChange}>
            <TrendingUp size={16} color="#FFFFFF" />
            <Text style={styles.changeText}>+₹12,234.56 (5.2%)</Text>
          </View>
          <View style={styles.portfolioStats}>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Invested</Text>
              <Text style={styles.statValue}>₹7,45,000</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Return</Text>
              <Text style={styles.statValue}>+₹1,23,575</Text>
            </View>
          </View>
        </LinearGradient>

        <View style={styles.tabsContainer}>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'Overview' && styles.activeTab]}
            onPress={() => setActiveTab('Overview')}>
            <Text style={[styles.tabText, activeTab === 'Overview' && styles.activeTabText]}>
              Overview
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'Holdings' && styles.activeTab]}
            onPress={() => setActiveTab('Holdings')}>
            <Text style={[styles.tabText, activeTab === 'Holdings' && styles.activeTabText]}>
              Holdings
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'History' && styles.activeTab]}
            onPress={() => setActiveTab('History')}>
            <Text style={[styles.tabText, activeTab === 'History' && styles.activeTabText]}>
              History
            </Text>
          </TouchableOpacity>
        </View>

        {activeTab === 'Overview' && (
          <>
            <View style={styles.sectionHeader}>
              <View style={styles.sectionTitleContainer}>
                <PieChart size={18} color="#6C5CE7" />
                <Text style={styles.sectionTitle}>Asset Allocation</Text>
              </View>
              <TouchableOpacity>
                <Text style={styles.seeAllText}>Details</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.allocationContainer}>
              <View style={styles.allocationChart}>
                <View style={styles.pieChartPlaceholder}>
                  <View style={[styles.pieSegment, { backgroundColor: '#6C5CE7', transform: [{ rotate: '0deg' }], zIndex: 5 }]} />
                  <View style={[styles.pieSegment, { backgroundColor: '#00C087', transform: [{ rotate: '140deg' }], zIndex: 4 }]} />
                  <View style={[styles.pieSegment, { backgroundColor: '#FF4D4F', transform: [{ rotate: '210deg' }], zIndex: 3 }]} />
                  <View style={[styles.pieSegment, { backgroundColor: '#FFB946', transform: [{ rotate: '280deg' }], zIndex: 2 }]} />
                  <View style={[styles.pieSegment, { backgroundColor: '#4DABF7', transform: [{ rotate: '320deg' }], zIndex: 1 }]} />
                  <View style={styles.pieChartCenter} />
                </View>
              </View>
              <View style={styles.allocationLegend}>
                {assetAllocation.map((asset, index) => (
                  <View key={index} style={styles.legendItem}>
                    <View style={[styles.legendColor, { backgroundColor: asset.color }]} />
                    <Text style={styles.legendLabel}>{asset.name}</Text>
                    <Text style={styles.legendValue}>{asset.percentage}%</Text>
                  </View>
                ))}
              </View>
            </View>

            <View style={styles.sectionHeader}>
              <View style={styles.sectionTitleContainer}>
                <BarChart3 size={18} color="#6C5CE7" />
                <Text style={styles.sectionTitle}>Performance</Text>
              </View>
              <View style={styles.periodSelector}>
                <TouchableOpacity style={[styles.periodButton, styles.activePeriodButton]}>
                  <Text style={[styles.periodButtonText, styles.activePeriodButtonText]}>1M</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.periodButton}>
                  <Text style={styles.periodButtonText}>3M</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.periodButton}>
                  <Text style={styles.periodButtonText}>1Y</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.periodButton}>
                  <Text style={styles.periodButtonText}>All</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.chartContainer}>
              <View style={styles.chartPlaceholder}>
                <View style={styles.chartLine} />
                <View style={styles.chartDots}>
                  <View style={styles.chartDot} />
                  <View style={styles.chartDot} />
                  <View style={styles.chartDot} />
                  <View style={styles.chartDot} />
                  <View style={styles.chartDot} />
                </View>
              </View>
              <View style={styles.chartLabels}>
                <Text style={styles.chartLabel}>May 12</Text>
                <Text style={styles.chartLabel}>May 19</Text>
                <Text style={styles.chartLabel}>May 26</Text>
                <Text style={styles.chartLabel}>Jun 2</Text>
                <Text style={styles.chartLabel}>Jun 9</Text>
              </View>
            </View>
          </>
        )}

        {activeTab === 'Holdings' && (
          <View style={styles.holdingsContainer}>
            {portfolioHoldings.map((holding, index) => (
              <TouchableOpacity key={index} style={styles.holdingItem}>
                <View style={styles.holdingInfo}>
                  <Image source={{ uri: holding.logo }} style={styles.holdingLogo} />
                  <View>
                    <Text style={styles.holdingSymbol}>{holding.symbol}</Text>
                    <Text style={styles.holdingName}>{holding.name}</Text>
                  </View>
                </View>
                <View style={styles.holdingDetails}>
                  <Text style={styles.holdingValue}>${holding.value}</Text>
                  <View style={styles.holdingChangeContainer}>
                    {holding.change > 0 ? (
                      <TrendingUp size={12} color="#00C087" />
                    ) : (
                      <TrendingDown size={12} color="#FF4D4F" />
                    )}
                    <Text
                      style={[
                        styles.holdingChangeText,
                        { color: holding.change > 0 ? '#00C087' : '#FF4D4F' },
                      ]}>
                      {holding.change > 0 ? '+' : ''}{holding.change}%
                    </Text>
                  </View>
                  <Text style={styles.holdingShares}>{holding.shares} shares</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {activeTab === 'History' && (
          <View style={styles.historyContainer}>
            {transactionHistory.map((transaction, index) => (
              <TouchableOpacity key={index} style={styles.transactionItem}>
                <View style={styles.transactionInfo}>
                  <View style={[
                    styles.transactionTypeIndicator, 
                    { backgroundColor: transaction.type === 'buy' ? '#00C087' : '#FF4D4F' }
                  ]} />
                  <View>
                    <Text style={styles.transactionTitle}>
                      {transaction.type === 'buy' ? 'Bought' : 'Sold'} {transaction.symbol}
                    </Text>
                    <Text style={styles.transactionDate}>{transaction.date}</Text>
                  </View>
                </View>
                <View style={styles.transactionDetails}>
                  <Text style={styles.transactionValue}>
                    {transaction.type === 'buy' ? '-' : '+'}${transaction.value}
                  </Text>
                  <Text style={styles.transactionShares}>{transaction.shares} shares</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {/* Bottom padding */}
        <View style={{ height: 20 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

// Sample data
const assetAllocation = [
  { name: 'Technology', percentage: 45, color: '#6C5CE7' },
  { name: 'Healthcare', percentage: 20, color: '#00C087' },
  { name: 'Finance', percentage: 15, color: '#FF4D4F' },
  { name: 'Consumer', percentage: 12, color: '#FFB946' },
  { name: 'Energy', percentage: 8, color: '#4DABF7' },
];

const portfolioHoldings = [
  {
    symbol: 'AAPL',
    name: 'Apple Inc.',
    logo: 'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?q=80&w=100&auto=format&fit=crop',
    value: '5,694.60',
    change: 1.25,
    shares: 30,
  },
  {
    symbol: 'MSFT',
    name: 'Microsoft Corporation',
    logo: 'https://images.unsplash.com/photo-1583339793403-3d9b001b6008?q=80&w=100&auto=format&fit=crop',
    value: '4,155.00',
    change: 0.75,
    shares: 10,
  },
  {
    symbol: 'GOOGL',
    name: 'Alphabet Inc.',
    logo: 'https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?q=80&w=100&auto=format&fit=crop',
    value: '3,504.00',
    change: -0.32,
    shares: 20,
  },
  {
    symbol: 'AMZN',
    name: 'Amazon.com Inc.',
    logo: 'https://images.unsplash.com/photo-1523474253046-8cd2748b5fd2?q=80&w=100&auto=format&fit=crop',
    value: '3,646.00',
    change: 2.15,
    shares: 20,
  },
  {
    symbol: 'TSLA',
    name: 'Tesla Inc.',
    logo: 'https://images.unsplash.com/photo-1617704548623-340376564e68?q=80&w=100&auto=format&fit=crop',
    value: '1,775.00',
    change: -1.45,
    shares: 10,
  },
];

const transactionHistory = [
  {
    type: 'buy',
    symbol: 'AAPL',
    date: 'June 10, 2025',
    value: '1,898.40',
    shares: 10,
  },
  {
    type: 'sell',
    symbol: 'MSFT',
    date: 'June 5, 2025',
    value: '2,077.50',
    shares: 5,
  },
  {
    type: 'buy',
    symbol: 'GOOGL',
    date: 'May 28, 2025',
    value: '1,752.00',
    shares: 10,
  },
  {
    type: 'buy',
    symbol: 'AMZN',
    date: 'May 20, 2025',
    value: '1,823.00',
    shares: 10,
  },
  {
    type: 'sell',
    symbol: 'TSLA',
    date: 'May 15, 2025',
    value: '887.50',
    shares: 5,
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
  portfolioCard: {
    marginHorizontal: 20,
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
  },
  portfolioHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  portfolioTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: '#FFF',
  },
  portfolioDate: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  portfolioValue: {
    fontFamily: 'Poppins-Bold',
    fontSize: 28,
    color: '#FFF',
    marginBottom: 5,
  },
  portfolioChange: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  changeText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#FFF',
    marginLeft: 5,
  },
  portfolioStats: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 12,
    padding: 12,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 4,
  },
  statValue: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
    color: '#FFF',
  },
  statDivider: {
    width: 1,
    height: '80%',
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  tabsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    borderBottomColor: '#6C5CE7',
  },
  tabText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: '#999',
  },
  activeTabText: {
    color: '#6C5CE7',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  sectionTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sectionTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    color: '#333',
    marginLeft: 5,
  },
  seeAllText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#6C5CE7',
  },
  allocationContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 25,
  },
  allocationChart: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pieChartPlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    position: 'relative',
    overflow: 'hidden',
  },
  pieSegment: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: 60,
    top: 0,
    left: 0,
  },
  pieChartCenter: {
    position: 'absolute',
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F8F9FA',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -20 }, { translateY: -20 }],
    zIndex: 10,
  },
  allocationLegend: {
    flex: 1.5,
    paddingLeft: 10,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  legendColor: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  legendLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#666',
    flex: 1,
  },
  legendValue: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: '#333',
  },
  periodSelector: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    borderRadius: 20,
    padding: 4,
  },
  periodButton: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 16,
  },
  activePeriodButton: {
    backgroundColor: '#6C5CE7',
  },
  periodButtonText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: '#666',
  },
  activePeriodButtonText: {
    color: '#FFF',
  },
  chartContainer: {
    paddingHorizontal: 20,
    marginBottom: 25,
  },
  chartPlaceholder: {
    height: 150,
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 15,
    position: 'relative',
    marginBottom: 10,
  },
  chartLine: {
    position: 'absolute',
    top: 30,
    left: 20,
    right: 20,
    height: 2,
    backgroundColor: 'rgba(108, 92, 231, 0.2)',
    borderRadius: 1,
  },
  chartDots: {
    position: 'absolute',
    top: 25,
    left: 20,
    right: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  chartDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#6C5CE7',
  },
  chartLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  chartLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#999',
  },
  holdingsContainer: {
    paddingHorizontal: 20,
  },
  holdingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
  holdingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  holdingLogo: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  holdingSymbol: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: '#333',
  },
  holdingName: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#666',
  },
  holdingDetails: {
    alignItems: 'flex-end',
  },
  holdingValue: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: '#333',
  },
  holdingChangeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  holdingChangeText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    marginLeft: 4,
  },
  holdingShares: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#999',
  },
  historyContainer: {
    paddingHorizontal: 20,
  },
  transactionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
  transactionInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  transactionTypeIndicator: {
    width: 8,
    height: 40,
    borderRadius: 4,
    marginRight: 12,
  },
  transactionTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: '#333',
  },
  transactionDate: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#666',
  },
  transactionDetails: {
    alignItems: 'flex-end',
  },
  transactionValue: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: '#333',
  },
  transactionShares: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#999',
  },
});