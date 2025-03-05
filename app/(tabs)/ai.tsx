import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Search, TrendingUp, TrendingDown, ChartBar as BarChart3, ChartPie as PieChart, ChartLine as LineChart, TriangleAlert as AlertTriangle, Award, Target, ArrowRight, Lock } from 'lucide-react-native';

export default function AIAnalysisScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStock, setSelectedStock] = useState<any>(null);
  const [isPremium, setIsPremium] = useState(false);

  const handleSearch = (text: string) => {
    setSearchQuery(text);
    // Simulate API call
    if (text.toUpperCase() === 'AAPL') {
      setSelectedStock(stockAnalysis);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
        
          <Text style={styles.title}>Screener With built in Ai</Text>
        </View> 

        <View style={styles.searchContainer}>
          <View style={styles.searchInputContainer}>
            <Search size={20} color="#999" style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Enter stock symbol (e.g., Infosys,Tcs)"
              placeholderTextColor="#999"
              value={searchQuery}
              onChangeText={handleSearch}
            />
          </View>
        </View>

        {!isPremium && (
          <TouchableOpacity style={styles.premiumBanner}>
            <LinearGradient
              colors={['#6C5CE7', '#8E7CF3']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.premiumBannerContent}>
              <View style={styles.premiumTextContainer}>
                <Text style={styles.premiumTitle}>Upgrade to Premium</Text>
                <Text style={styles.premiumDescription}>
                  Get unlimited AI-powered stock Screener ,analysis, real-time alerts, and advanced metrics
                </Text>
              </View>
              <Lock size={24} color="#FFF" />
            </LinearGradient>
          </TouchableOpacity>
        )}

        {selectedStock ? (
          <View style={styles.analysisContainer}>
            {/* Stock Overview */}
            <View style={styles.stockHeader}>
              <Image source={{ uri: selectedStock.logo }} style={styles.stockLogo} />
              <View style={styles.stockInfo}>
                <Text style={styles.stockName}>{selectedStock.name}</Text>
                <Text style={styles.stockSymbol}>{selectedStock.symbol}</Text>
              </View>
              <View style={styles.stockPrice}>
                <Text style={styles.priceText}>${selectedStock.price}</Text>
                <View style={styles.changeContainer}>
                  {selectedStock.change > 0 ? (
                    <TrendingUp size={16} color="#00C087" />
                  ) : (
                    <TrendingDown size={16} color="#FF4D4F" />
                  )}
                  <Text
                    style={[
                      styles.changeText,
                      { color: selectedStock.change > 0 ? '#00C087' : '#FF4D4F' },
                    ]}>
                    {selectedStock.change > 0 ? '+' : ''}{selectedStock.change}%
                  </Text>
                </View>
              </View>
            </View>

            {/* AI Sentiment Analysis */}
            <View style={styles.sentimentCard}>
              <View style={styles.cardHeader}>
                <Award size={20} color="#6C5CE7" />
                <Text style={styles.cardTitle}>AI Sentiment Analysis</Text>
              </View>
              <View style={styles.sentimentMeter}>
                <View style={[styles.sentimentBar, { width: `${selectedStock.sentiment}%` }]} />
                <Text style={styles.sentimentText}>Bullish ({selectedStock.sentiment}%)</Text>
              </View>
              <Text style={styles.sentimentDescription}>{selectedStock.sentimentAnalysis}</Text>
            </View>

            {/* Key Metrics */}
            <View style={styles.metricsContainer}>
              <View style={styles.cardHeader}>
                <BarChart3 size={20} color="#6C5CE7" />
                <Text style={styles.cardTitle}>Key Metrics</Text>
              </View>
              <View style={styles.metricsGrid}>
                {selectedStock.metrics.map((metric: any, index: number) => (
                  <View key={index} style={styles.metricItem}>
                    <Text style={styles.metricLabel}>{metric.label}</Text>
                    <Text style={styles.metricValue}>{metric.value}</Text>
                  </View>
                ))}
              </View>
            </View>

            {/* Technical Analysis */}
            <View style={styles.technicalCard}>
              <View style={styles.cardHeader}>
                <LineChart size={20} color="#6C5CE7" />
                <Text style={styles.cardTitle}>Technical Analysis</Text>
              </View>
              {selectedStock.technicalAnalysis.map((analysis: any, index: number) => (
                <View key={index} style={styles.technicalItem}>
                  <View style={styles.technicalHeader}>
                    <Text style={styles.technicalTitle}>{analysis.title}</Text>
                    <Text
                      style={[
                        styles.technicalSignal,
                        { color: analysis.signal === 'Buy' ? '#00C087' : '#FF4D4F' },
                      ]}>
                      {analysis.signal}
                    </Text>
                  </View>
                  <Text style={styles.technicalDescription}>{analysis.description}</Text>
                </View>
              ))}
            </View>

            {/* Risk Assessment */}
            <View style={styles.riskCard}>
              <View style={styles.cardHeader}>
                <AlertTriangle size={20} color="#6C5CE7" />
                <Text style={styles.cardTitle}>Risk Assessment</Text>
              </View>
              <View style={styles.riskMeter}>
                <View 
                  style={[
                    styles.riskBar, 
                    { width: `${selectedStock.riskScore}%`, backgroundColor: getRiskColor(selectedStock.riskScore) }
                  ]} 
                />
              </View>
              <Text style={styles.riskLevel}>
                Risk Level: {getRiskLevel(selectedStock.riskScore)}
              </Text>
              <Text style={styles.riskDescription}>{selectedStock.riskAnalysis}</Text>
            </View>

            {/* Price Targets */}
            <View style={styles.targetCard}>
              <View style={styles.cardHeader}>
                <Target size={20} color="#6C5CE7" />
                <Text style={styles.cardTitle}>AI Price Targets</Text>
              </View>
              <View style={styles.targetContainer}>
                {selectedStock.priceTargets.map((target: any, index: number) => (
                  <View key={index} style={styles.targetItem}>
                    <Text style={styles.targetPeriod}>{target.period}</Text>
                    <Text style={styles.targetPrice}>${target.price}</Text>
                    <Text 
                      style={[
                        styles.targetChange,
                        { color: target.change > 0 ? '#00C087' : '#FF4D4F' },
                      ]}>
                      {target.change > 0 ? '+' : ''}{target.change}%
                    </Text>
                  </View>
                ))}
              </View>
            </View>

            <TouchableOpacity style={styles.fullReportButton}>
              <Text style={styles.fullReportText}>Download Full AI Report</Text>
              <ArrowRight size={20} color="#FFF" />
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.placeholderContainer}>
            <Image 
              source={{ uri: 'https://images.unsplash.com/photo-1642790106117-e829e14a795f?q=80&w=400&auto=format&fit=crop' }}
              style={styles.placeholderImage}
            />
            <Text style={styles.placeholderTitle}>AI-Powered Stock Analysis</Text>
            <Text style={styles.placeholderText}>
              Enter a stock symbol to get comprehensive AI analysis, including sentiment, technical indicators, and price predictions
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const getRiskColor = (score: number) => {
  if (score <= 30) return '#00C087';
  if (score <= 60) return '#FFB946';
  return '#FF4D4F';
};

const getRiskLevel = (score: number) => {
  if (score <= 30) return 'Low Risk';
  if (score <= 60) return 'Moderate Risk';
  return 'High Risk';
};

// Sample data
const stockAnalysis = {
  symbol: 'AAPL',
  name: 'Apple Inc.',
  logo: 'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?q=80&w=100&auto=format&fit=crop',
  price: '189.84',
  change: 1.25,
  sentiment: 85,
  sentimentAnalysis: 'Strong buy signal based on positive market sentiment, robust financial performance, and upcoming product launches. AI analysis indicates high institutional confidence and growing retail interest.',
  metrics: [
    { label: 'P/E Ratio', value: '28.5' },
    { label: 'Market Cap', value: '$2.95T' },
    { label: 'Revenue Growth', value: '+8.2%' },
    { label: 'Profit Margin', value: '25.3%' },
    { label: 'Free Cash Flow', value: '$96.1B' },
    { label: 'Dividend Yield', value: '0.5%' },
  ],
  technicalAnalysis: [
    {
      title: 'Moving Averages',
      signal: 'Buy',
      description: 'Price above both 50-day and 200-day MAs, indicating strong upward momentum',
    },
    {
      title: 'RSI (14)',
      signal: 'Neutral',
      description: 'Current RSI at 58, suggesting balanced buying and selling pressure',
    },
    {
      title: 'MACD',
      signal: 'Buy',
      description: 'Bullish crossover detected, suggesting potential upward movement',
    },
  ],
  riskScore: 25,
  riskAnalysis: 'Low risk profile based on strong balance sheet, diverse revenue streams, and market leadership position. Company shows excellent financial health and stability.',
  priceTargets: [
    { period: '3 Months', price: '205.00', change: 8.2 },
    { period: '6 Months', price: '225.00', change: 18.5 },
    { period: '12 Months', price: '250.00', change: 31.7 },
  ],
};

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
  premiumBanner: {
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 16,
    overflow: 'hidden',
  },
  premiumBannerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
  },
  premiumTextContainer: {
    flex: 1,
    marginRight: 15,
  },
  premiumTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    color: '#FFF',
    marginBottom: 4,
  },
  premiumDescription: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
  },
  analysisContainer: {
    paddingHorizontal: 20,
  },
  stockHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  stockLogo: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  stockInfo: {
    flex: 1,
    marginLeft: 15,
  },
  stockName: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    color: '#333',
  },
  stockSymbol: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#666',
  },
  stockPrice: {
    alignItems: 'flex-end',
  },
  priceText: {
    fontFamily: 'Poppins-Bold',
    fontSize: 20,
    color: '#333',
  },
  changeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  changeText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    marginLeft: 4,
  },
  sentimentCard: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  cardTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    color: '#333',
    marginLeft: 10,
  },
  sentimentMeter: {
    height: 8,
    backgroundColor: '#F0F0F0',
    borderRadius: 4,
    marginBottom: 10,
    overflow: 'hidden',
  },
  sentimentBar: {
    height: '100%',
    backgroundColor: '#6C5CE7',
    borderRadius: 4,
  },
  sentimentText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: '#6C5CE7',
    marginBottom: 10,
  },
  sentimentDescription: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  metricsContainer: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -10,
  },
  metricItem: {
    width: '50%',
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  metricLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  metricValue: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: '#333',
  },
  technicalCard: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  technicalItem: {
    marginBottom: 15,
  },
  technicalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  technicalTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#333',
  },
  technicalSignal: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
  },
  technicalDescription: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  riskCard: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  riskMeter: {
    height: 8,
    backgroundColor: '#F0F0F0',
    borderRadius: 4,
    marginBottom: 10,
    overflow: 'hidden',
  },
  riskBar: {
    height: '100%',
    borderRadius: 4,
  },
  riskLevel: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: '#333',
    marginBottom: 10,
  },
  riskDescription: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  targetCard: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  targetContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  targetItem: {
    alignItems: 'center',
  },
  targetPeriod: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  targetPrice: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    color: '#333',
    marginBottom: 2,
  },
  targetChange: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
  },
  fullReportButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#6C5CE7',
    borderRadius: 12,
    padding: 16,
    marginBottom: 30,
  },
  fullReportText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#FFF',
    marginRight: 8,
  },
  placeholderContainer: {
    alignItems: 'center',
    paddingHorizontal: 40,
    paddingTop: 40,
  },
  placeholderImage: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginBottom: 30,
  },
  placeholderTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 24,
    color: '#333',
    textAlign: 'center',
    marginBottom: 15,
  },
  placeholderText: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 24,
  },
});