import { useRouter } from 'expo-router';
import React from 'react';
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

import {
    AlertCircle,
    ArrowLeft,
    Bot,
    Home,
    Key,
    Lock,
    QrCode,
    RefreshCcw,
    Shield,
    Zap,
} from 'lucide-react-native';

const Security = () => {
  const router = useRouter();

  const faqs = [
    {
      question: 'How are my private keys stored?',
      answer:
        'Private keys are encrypted and stored locally on your device. We never have access to your private keys.',
    },
    {
      question: 'What happens if I lose my 2FA device?',
      answer:
        'You can use backup codes provided during 2FA setup to regain access to your account.',
    },
    {
      question: 'How do refunds work?',
      answer:
        'Our smart contracts include an automated refund mechanism that can be triggered within 24 hours of a transaction.',
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scroll}>
        {/* Back Button */}
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <ArrowLeft size={20} color="#ccc" />
          <Text style={styles.backText}>Back to Dashboard</Text>
        </TouchableOpacity>

        <Text style={styles.header}>Security & Privacy</Text>
        {/* Why Choose */}
        <View style={{ marginVertical: 32 }}>
          <Text style={styles.sectionTitle}>Why Choose CryptPayMe X?</Text>
          {[
            {
              icon: <Shield size={36} color="#00D4FF" />,
              title: 'End-to-End Encryption',
              desc: 'Your transactions are protected with military-grade encryption',
            },
            {
              icon: <Lock size={36} color="#00FF85" />,
              title: 'No Unauthorized Deductions',
              desc: 'Complete control over your funds with secure smart contracts',
            },
            {
              icon: <RefreshCcw size={36} color="#00D4FF" />,
              title: 'Instant Refunds',
              desc: 'Automated refund mechanism for peace of mind',
            },
          ].map((item) => (
            <View key={item.title} style={styles.featureCard}>
              <View style={{ marginBottom: 8 }}>{item.icon}</View>
              <Text style={styles.featureTitle}>{item.title}</Text>
              <Text style={styles.featureDesc}>{item.desc}</Text>
            </View>
          ))}
        </View>

        {/* Security */}
        <View style={{ marginVertical: 32 }}>
          <Text style={styles.sectionTitle}>Bank-Grade Security</Text>
          <Text style={styles.securityDesc}>
            Your security is our top priority. We use advanced encryption and secure protocols to protect your transactions.
          </Text>
          {[
            {
              icon: <Zap size={36} color="#00D4FF" />,
              title: 'Lightning Fast',
              desc: 'Transactions completed in seconds, not minutes',
            },
            {
              icon: <Shield size={36} color="#00FF85" />,
              title: 'Fully Protected',
              desc: 'Multi-signature security and 2FA authentication',
            },
          ].map((item) => (
            <View key={item.title} style={styles.featureCard}>
              <View style={{ marginBottom: 8 }}>{item.icon}</View>
              <Text style={styles.featureTitle}>{item.title}</Text>
              <Text style={styles.featureDesc}>{item.desc}</Text>
            </View>
          ))}
        </View>

        {/* 2FA Section */}
        <View style={styles.card}>
          <View style={styles.row}>
            <Key size={32} color="#00D4FF" />
            <View style={styles.content}>
              <Text style={styles.cardTitle}>Two-Factor Authentication</Text>
              <Text style={styles.cardText}>
                Add an extra layer of security to your account with 2FA. We support authenticator apps and hardware security keys.
              </Text>
              <TouchableOpacity style={styles.enableButton}>
                <Text style={styles.enableButtonText}>Enable 2FA</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Encryption Section */}
        <View style={styles.card}>
          <View style={styles.row}>
            <Shield size={32} color="#00FF85" />
            <View style={styles.content}>
              <Text style={styles.cardTitle}>End-to-End Encryption</Text>
              <Text style={styles.cardText}>
                All transactions are protected with military-grade encryption. Your private keys never leave your device.
              </Text>
              <View style={styles.featureBox}>
                <Text style={styles.featureTitle}>Security Features:</Text>
                <Text style={styles.featureText}>• AES-256 encryption for all data at rest</Text>
                <Text style={styles.featureText}>• SSL/TLS encryption for all data in transit</Text>
                <Text style={styles.featureText}>• Multi-signature wallet support</Text>
                <Text style={styles.featureText}>• Regular security audits</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Unauthorized Deductions */}
        <View style={styles.card}>
          <View style={styles.row}>
            <Lock size={32} color="#00D4FF" />
            <View style={styles.content}>
              <Text style={styles.cardTitle}>No Unauthorized Deductions</Text>
              <Text style={styles.cardText}>
                Our smart contracts ensure that no funds can be deducted without your explicit approval.
              </Text>
              <View style={styles.featureBox}>
                <Text style={styles.featureTitle}>Protection Measures:</Text>
                <Text style={styles.featureText}>• Transaction signing required for all transfers</Text>
                <Text style={styles.featureText}>• Spending limits and daily caps</Text>
                <Text style={styles.featureText}>• Real-time transaction monitoring</Text>
                <Text style={styles.featureText}>• Instant freeze capability</Text>
              </View>
            </View>
          </View>
        </View>

        {/* FAQs */}
        <View style={styles.card}>
          <Text style={styles.faqTitle}>Frequently Asked Questions</Text>
          {faqs.map((faq, index) => (
            <View key={index} style={styles.faqBox}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <AlertCircle size={18} color="#00D4FF" />
                <Text style={styles.faqQuestion}>{faq.question}</Text>
              </View>
              <Text style={styles.faqAnswer}>{faq.answer}</Text>
            </View>
          ))}
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

export default Security;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  scroll: {
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 80,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  backText: {
    marginLeft: 8,
    color: '#ccc',
  },
  header: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  card: {
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  content: {
    marginLeft: 16,
    flex: 1,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 6,
  },
  cardText: {
    color: '#ccc',
    marginBottom: 12,
  },
  enableButton: {
    backgroundColor: '#00D4FF',
    paddingVertical: 10,
    borderRadius: 8,
  },
  enableButtonText: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#000',
  },
  featureBox: {
    backgroundColor: 'rgba(0,0,0,0.3)',
    padding: 12,
    borderRadius: 8,
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
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 6,
  },
  featureDesc: {
    color: '#fdf9f9ff',
  },
  securityDesc: {
    color: '#fefefeff',
    textAlign: 'center',
    marginBottom: 24,
  },
  featureText: {
    color: '#ccc',
  },
  faqTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 16,
  },
  faqBox: {
    backgroundColor: 'rgba(0,0,0,0.3)',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  faqQuestion: {
    marginLeft: 8,
    fontWeight: 'bold',
    color: '#fff',
    flexShrink: 1,
  },
  faqAnswer: {
    color: '#ccc',
    marginTop: 6,
  },
  bottomTabs: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 14,
    backgroundColor: '#111',
    borderTopWidth: 0.5,
    borderTopColor: '#333',
  },
});
