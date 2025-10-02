import { useState } from 'react';
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
      alert('Booking submitted successfully!');
      console.log('Form Data:', formData);
    }
  };

  return (
    <>
      <Header isAuthenticated={true} userInfo={{firstName: 'User', lastName: '', email: '', phone: '', selectedPlan: '', signupDate: new Date(), planStatus: 'active'}} onLogout={() => {}} />
      
      <div className="bg-blue-50 min-h-screen py-10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md">
            <h1 className="text-3xl font-bold text-center mb-6">WELCOME TO SWSPACE</h1>
            <h2 className="text-xl font-semibold text-center mb-8">Modern & Flexible Workspace</h2>
            
            <h3 className="text-2xl font-bold text-blue-600 text-center mb-8">Book Now</h3>
            
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
                  className="px-10 py-2 rounded-full font-medium"
                  style={{ backgroundColor: '#F59E0B' }}
                >
                  Continue
                </Button>
              </div>
            </form>
          </div>

          {/* Testimonials Section */}
          <div className="max-w-4xl mx-auto mt-20">
            <h3 className="text-2xl font-bold mb-2">What <span className="text-blue-600">Our Member's</span></h3>
            <h4 className="text-2xl font-bold mb-6">Saying About Us</h4>
            
            <div className="flex justify-between items-center">
              <div className="flex space-x-2">
                <p className="text-sm text-gray-500">From experiences shared across SWSpace networks</p>
              </div>
              
              <div className="flex -space-x-2">
                {[1, 2, 3, 4, 5].map((item) => (
                  <div key={item} className="w-8 h-8 rounded-full bg-blue-500 border-2 border-white flex items-center justify-center">
                    <span className="text-xs text-white font-bold">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6 mt-8">
              <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-yellow-500 flex items-center justify-center mr-4">
                    <span className="font-bold text-white">JC</span>
                  </div>
                  <div>
                    <p className="font-bold">John Cooper</p>
                    <p className="text-sm text-gray-500">Graphic Designer</p>
                  </div>
                  <div className="ml-auto flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg key={star} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
                <p className="text-gray-700">"Working workspace there is just zen and unbelievable experience. The productivity has increased significantly since joining Eworks space."</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};