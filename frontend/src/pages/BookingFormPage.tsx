import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';

interface BookingFormPageProps {
  onSubmit?: (formData: BookingFormData) => void;
}

export interface BookingFormData {
  name: string;
  email: string;
  phone: string;
  startTime: string;
  endTime: string;
  services: string;
  packages: string;
  people: string;
  additionalInfo: string;
}

export const BookingFormPage = ({ onSubmit }: BookingFormPageProps) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<BookingFormData>({
    name: '',
    email: '',
    phone: '',
    startTime: '',
    endTime: '',
    services: '',
    packages: '',
    people: '',
    additionalInfo: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (onSubmit) {
      onSubmit(formData);
    } else {
      // Save form data to local storage or session storage for later use
      sessionStorage.setItem('bookingFormData', JSON.stringify(formData));
      
      // Navigate to the seat selection page
      navigate('/booking/seat-selection');
    }
  };

  return (
    <>
      <Header 
        isAuthenticated={true} 
        userInfo={{firstName: 'User', lastName: '', email: '', phone: '', selectedPlan: '', signupDate: new Date(), planStatus: 'active'}} 
        onLogout={() => {}}
        onGetStarted={() => {}}
      />
      
      <div className="bg-blue-50 min-h-screen py-10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md">
            <h1 className="text-3xl font-bold text-center mb-6">WELCOME TO SWSPACE</h1>
            <h2 className="text-xl font-semibold text-center mb-4">Modern & Flexible Workspace</h2>
            
            <div className="text-center mb-10">
              <h3 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-yellow-500 inline-block transform hover:scale-105 transition-transform duration-300">Book Now</h3>
              <div className="h-1 w-24 bg-yellow-500 mx-auto mt-2 rounded-full"></div>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
                  <Input 
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                  <Input 
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                  <Input 
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="startTime" className="block text-sm font-medium text-gray-700 mb-1">Start Time</label>
                  <Input 
                    id="startTime"
                    name="startTime"
                    type="datetime-local"
                    value={formData.startTime}
                    onChange={handleChange}
                    className="w-full"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="endTime" className="block text-sm font-medium text-gray-700 mb-1">End Time</label>
                  <Input 
                    id="endTime"
                    name="endTime"
                    type="datetime-local"
                    value={formData.endTime}
                    onChange={handleChange}
                    className="w-full"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="services" className="block text-sm font-medium text-gray-700 mb-1">Services</label>
                  <Input 
                    id="services"
                    name="services"
                    value={formData.services}
                    onChange={handleChange}
                    className="w-full"
                  />
                </div>
                
                <div>
                  <label htmlFor="packages" className="block text-sm font-medium text-gray-700 mb-1">Packages</label>
                  <Input 
                    id="packages"
                    name="packages"
                    value={formData.packages}
                    onChange={handleChange}
                    className="w-full"
                  />
                </div>
                
                <div>
                  <label htmlFor="people" className="block text-sm font-medium text-gray-700 mb-1">Number of People</label>
                  <Input 
                    id="people"
                    name="people"
                    type="number"
                    min="1"
                    value={formData.people}
                    onChange={handleChange}
                    className="w-full"
                    required
                  />
                </div>
                
                <div className="md:col-span-2">
                  <label htmlFor="additionalInfo" className="block text-sm font-medium text-gray-700 mb-1">Tell us more about your demands here</label>
                  <Textarea 
                    id="additionalInfo"
                    name="additionalInfo"
                    value={formData.additionalInfo}
                    onChange={handleChange}
                    rows={4}
                    className="w-full"
                  />
                </div>
              </div>
              
              <div className="flex justify-center">
                <Button 
                  type="submit" 
                  className="px-12 py-3 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                  style={{ backgroundColor: '#F59E0B' }}
                >
                  Continue
                </Button>
              </div>
            </form>
          </div>

          {/* Testimonials Section */}
          <div className="max-w-5xl mx-auto mt-20 mb-16">
            <div className="text-center mb-8">
              <h3 className="text-3xl font-bold mb-2">What <span className="text-blue-600">Our Members Say</span></h3>
              <p className="text-gray-600">Real experiences from the SWSpace community</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 mt-12">
              {/* Testimonial 1 */}
              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow">
                <div className="flex mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg key={star} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-700 italic mb-6">"Amazing workspace! Very quiet and professional environment. My productivity has increased significantly since joining SWSpace."</p>
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-pink-200 flex items-center justify-center mr-3">
                    <span className="font-bold text-pink-800">SC</span>
                  </div>
                  <div>
                    <p className="font-bold">Sarah Chen</p>
                    <p className="text-sm text-gray-500">UI/UX Designer</p>
                  </div>
                </div>
              </div>
              
              {/* Testimonial 2 */}
              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow">
                <div className="flex mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg key={star} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-700 italic mb-6">"Excellent support team and full amenities. Super fast WiFi, perfect for coding and online meetings. Highly recommend!"</p>
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-blue-200 flex items-center justify-center mr-3">
                    <span className="font-bold text-blue-800">MJ</span>
                  </div>
                  <div>
                    <p className="font-bold">Michael Johnson</p>
                    <p className="text-sm text-gray-500">Software Developer</p>
                  </div>
                </div>
              </div>
              
              {/* Testimonial 3 */}
              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow">
                <div className="flex mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg key={star} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-700 italic mb-6">"Great value and convenient location. The community here is very friendly - I've made connections and found collaboration opportunities."</p>
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-green-200 flex items-center justify-center mr-3">
                    <span className="font-bold text-green-800">ER</span>
                  </div>
                  <div>
                    <p className="font-bold">Emily Rodriguez</p>
                    <p className="text-sm text-gray-500">Marketing Manager</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};