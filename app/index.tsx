import { useRouter } from 'expo-router';
import { ArrowRight, Bot, Home, QrCode, Shield, Wallet } from 'lucide-react-native';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Type for cryptoRates
type CryptoRate = {
  name: string;
  price: string;
  change: string;
};

const HomeScreen = () => {
  const router = useRouter();
  const [cryptoRates, setCryptoRates] = useState<CryptoRate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRates = async () => {
      try {
        setError(null);
        const res = await fetch(
          'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,solana,tether&vs_currencies=inr&include_24hr_change=true'
        );
        const data = await res.json();
        if (!data.bitcoin || !data.ethereum || !data.solana || !data.tether) {
          throw new Error('API data missing');
        }
        const formatted: CryptoRate[] = [
          {
            name: 'Bitcoin',
            price: `₹${data.bitcoin.inr?.toLocaleString?.() ?? 'N/A'}`,
            change: `${data.bitcoin.inr_24h_change?.toFixed?.(2) ?? '0.00'}%`,
          },
          {
            name: 'Ethereum',
            price: `₹${data.ethereum.inr?.toLocaleString?.() ?? 'N/A'}`,
            change: `${data.ethereum.inr_24h_change?.toFixed?.(2) ?? '0.00'}%`,
          },
          {
            name: 'Solana',
            price: `₹${data.solana.inr?.toLocaleString?.() ?? 'N/A'}`,
            change: `${data.solana.inr_24h_change?.toFixed?.(2) ?? '0.00'}%`,
          },
          {
            name: 'USDT',
            price: `₹${data.tether.inr?.toLocaleString?.() ?? 'N/A'}`,
            change: `${data.tether.inr_24h_change?.toFixed?.(2) ?? '0.00'}%`,
          }
        ];
        setCryptoRates(formatted);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch crypto rates.');
        setLoading(false);
        console.error(err);
      }
    };

    fetchRates();
    const interval = setInterval(fetchRates, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {/* Sticky Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Wallet size={28} color="#00D4FF" />
          <Text style={styles.headerTitle}>CryptPayMe X</Text>
        </View>
        <TouchableOpacity onPress={() => router.push('../dashboard')} style={styles.connectBtn}>
          <Text style={styles.connectBtnText}>Connect Wallet</Text>
        </TouchableOpacity>
      </View>

      {/* Scrollable Content */}
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Hero Section */}
        <View style={styles.heroContainer}>
          <Text style={styles.heroTitle}>Secure & Fast Crypto Payments</Text>
          <Text style={styles.heroSubtitle}>
            Experience the future of payments with end-to-end encryption and lightning-fast transactions
          </Text>
          <TouchableOpacity onPress={() => router.push('../dashboard')} style={styles.getStartedBtn}>
            <Text style={styles.getStartedBtnText}>Get Started</Text>
            <ArrowRight color="black" size={20} style={{ marginLeft: 8 }} />
          </TouchableOpacity>
        </View>

        {/* Live Rates */}
        <View style={{ marginVertical: 32 }}>
          <Text style={styles.sectionTitle}>Live Crypto Rates (INR)</Text>
          {loading ? (
            <ActivityIndicator size="large" color="#00D4FF" />
          ) : error ? (
            <Text style={{ color: 'red', textAlign: 'center' }}>{error}</Text>
          ) : (
            cryptoRates.map((crypto) => {
              const change = parseFloat(crypto.change.replace('%', ''));
              return (
                <View key={crypto.name} style={styles.rateCard}>
                  <Text style={styles.cryptoName}>{crypto.name}</Text>
                  <Text style={styles.cryptoPrice}>{crypto.price}</Text>
                  <Text style={[styles.cryptoChange, { color: change >= 0 ? '#00FF85' : '#EF4444' }]}>
                    {crypto.change}
                  </Text>
                </View>
              );
            })
          )}
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomTabs}>
        <TouchableOpacity onPress={() => router.push('/security')}>
          <Shield size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push('/')}>
          <Home size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity>
          <QrCode size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Bot size={24} color="white" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#121212' },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 12,
    backgroundColor: '#121212',
    zIndex: 1,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
    marginLeft: 8,
  },
  connectBtn: {
    backgroundColor: '#00D4FF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 999,
  },
  connectBtnText: {
    color: 'black',
    fontWeight: 'bold',
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 100, // so it doesn't hide under tabs
  },
  heroContainer: {
    alignItems: 'center',
    marginVertical: 40,
  },
  heroTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#00D4FF',
  },
  heroSubtitle: {
    color: '#A3A3A3',
    fontSize: 18,
    marginTop: 16,
    textAlign: 'center',
  },
  getStartedBtn: {
    backgroundColor: '#00FF85',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 12,
    marginTop: 24,
    borderRadius: 999,
  },
  getStartedBtnText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 18,
  },
  sectionTitle: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 24,
  },
  featureCard: {
    backgroundColor: 'rgba(255,255,255,0.05)',
    padding: 16,
    borderRadius: 24,
    marginBottom: 16,
  },
  featureTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  featureDesc: {
    color: '#A3A3A3',
  },
  rateCard: {
    backgroundColor: 'rgba(255,255,255,0.05)',
    padding: 16,
    borderRadius: 16,
    marginBottom: 16,
  },
  cryptoName: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  cryptoPrice: {
    color: 'white',
    fontSize: 24,
  },
  cryptoChange: {
    fontWeight: '500',
  },
  securityDesc: {
    color: '#A3A3A3',
    textAlign: 'center',
    marginBottom: 24,
  },
  bottomTabs: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#1C1C1E',
    paddingVertical: 12,
    position: 'absolute',
    bottom: 0,
    width: '100%',
    borderTopColor: '#2E2E2E',
    borderTopWidth: 1,
  },
});

export default HomeScreen;
