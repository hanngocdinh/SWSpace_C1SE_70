import { Plan, Benefit, Review } from '../types';

export const plans: Plan[] = [
  {
    name: 'HOT DESK',
    price: '110,000',
    period: '/ day',
    description: 'Flexible workspace solution',
    features: [
      'Daily access to shared workspace',
      'No fixed seating arrangement',
      'High-speed WiFi included',
      'Complimentary coffee & tea',
      'Business hours support'
    ],
    iconName: 'Briefcase',
    color: 'bg-slate-900 border-yellow-500 text-white',
    popular: false
  },
  {
    name: 'FIXED DESK',
    price: '2.3m',
    period: '/ month',
    description: 'Your dedicated workspace',
    features: [
      'Reserved desk space',
      '24/7 access to workspace',
      'Personal storage locker',
      'All basic amenities included',
      'Priority booking for meeting rooms'
    ],
    iconName: 'Monitor',
    color: 'bg-slate-900 border-yellow-500 text-white',
    popular: true
  },
  {
    name: 'PRIVATE OFFICE',
    price: '7.3m',
    period: '/ month',
    description: 'Complete privacy & control',
    features: [
      'Fully enclosed private office',
      'Customizable workspace layout',
      'Dedicated meeting room access',
      '24/7 premium support',
      'VIP concierge services'
    ],
    iconName: 'Building2',
    color: 'bg-slate-900 border-yellow-500 text-white',
    popular: false
  },
  {
    name: 'MEETING ROOM',
    price: '150,000',
    period: '/ hours',
    description: 'Flexible workspace solution',
    features: [
      'Equipped with a projector, whiteboard, and screen.',
      'Premium amenities',
      'High-speed WiFi included',
      'Quiet space, high concentration',
      'Available for 2-15 people'
    ],
    iconName: 'Home',
    color: 'bg-slate-900 border-yellow-500 text-white',
    popular: false
  },
  {
    name: 'NETWORKING SPACE',
    price: '250,000',
    period: '/ hour',
    description: 'Connect & collaborate',
    features: [
      'Large networking event space',
      'Professional AV equipment',
      'Catering services available',
      'Event planning support',
      'Flexible booking options'
    ],
    iconName: 'Network',
    color: 'bg-slate-900 border-yellow-500 text-white',
    popular: false
  },
  {
    name: 'VIRTUAL OFFICE',
    price: '1m',
    period: '/ month',
    description: 'Professional business address',
    features: [
      'Premium business address',
      'Mail handling & forwarding',
      'Professional receptionist service',
      'Meeting room access on demand',
      'Call forwarding services'
    ],
    iconName: 'UserCheck',
    color: 'bg-slate-900 border-yellow-500 text-white',
    popular: false
  }
];

export const benefits: Benefit[] = [
  {
    iconName: 'Wifi',
    title: 'High-Speed WiFi',
    description: 'Reliable 100Mbps internet connection, perfect for everything from video calls to large file uploads.',
    color: 'text-blue-600'
  },
  {
    iconName: 'Coffee',
    title: 'Complimentary Beverages',
    description: 'Enjoy unlimited coffee, tea, and refreshments throughout the day to keep your energy up.',
    color: 'text-orange-600'
  },
  {
    iconName: 'Users',
    title: 'Professional Community',
    description: 'Network with 500+ members from diverse industries and expand your professional connections.',
    color: 'text-green-600'
  },
  {
    iconName: 'Shield',
    title: '24/7 Security',
    description: 'State-of-the-art security system with keycard access and surveillance for complete peace of mind.',
    color: 'text-purple-600'
  },
  {
    iconName: 'Car',
    title: 'Free Parking',
    description: 'Spacious and secure parking area available at no extra cost for your daily convenience.',
    color: 'text-cyan-600'
  },
  {
    iconName: 'Clock',
    title: 'Always Open',
    description: 'Work on your schedule with 24/7 access, perfect for any work routine or deadline.',
    color: 'text-red-600'
  }
];

export const reviews: Review[] = [
  {
    name: 'Sarah Chen',
    position: 'UI/UX Designer',
    avatar: 'SC',
    rating: 5,
    comment: 'Amazing workspace! Very quiet and professional environment. My productivity has increased significantly since joining Enosta Space.',
    color: 'bg-pink-100 text-pink-700'
  },
  {
    name: 'Michael Johnson',
    position: 'Software Developer',
    avatar: 'MJ',
    rating: 5,
    comment: 'Excellent support team and full amenities. Super fast WiFi, perfect for coding and online meetings. Highly recommend!',
    color: 'bg-blue-100 text-blue-700'
  },
  {
    name: 'Emily Rodriguez',
    position: 'Marketing Manager',
    avatar: 'ER',
    rating: 5,
    comment: 'Great value and convenient location. The community here is very friendly - I\'ve made connections and found collaboration opportunities.',
    color: 'bg-green-100 text-green-700'
  }
];

export const timeSlots = [
  '8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM', 
  '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'
];

export const occupiedSeats = ['A3', 'A4', 'B5', 'B6', 'C2', 'D8', 'E1', 'F7', 'G9', 'H3'];
export const premiumSeats = ['D4', 'D5', 'D6', 'D7', 'E4', 'E5', 'E6', 'E7'];
export const seatRows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
export const seatsPerRow = 10;