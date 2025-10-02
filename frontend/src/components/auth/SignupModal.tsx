import { useState } from 'react';
import { Card, CardContent, CardHeader } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { X, Eye, EyeOff } from 'lucide-react';
import { plans } from '../../utils/constants';

interface SignupModalProps {
  isOpen: boolean;
  selectedPlan: string;
  onClose: () => void;
  onSignup: (formData: any) => void;
  onPlanChange: (planName: string) => void;
}

export const SignupModal = ({ isOpen, selectedPlan, onClose, onSignup, onPlanChange }: SignupModalProps) => {
  const [showPassword, setShowPassword] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    onSignup({
      firstName: formData.get('firstName'),
      lastName: formData.get('lastName'),
      email: formData.get('email'),
      phone: formData.get('phone')
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md max-h-[90vh] overflow-y-auto bg-white border border-gray-200 shadow-xl">
        <CardHeader className="relative">
          <Button 
            variant="ghost" 
            size="icon" 
            className="absolute right-0 top-0"
            onClick={onClose}
          >
            <X className="w-4 h-4" />
          </Button>
          <div className="text-center space-y-2">
            <h2 className="text-2xl">Create Your Account</h2>
            {selectedPlan && (
              <Badge className="text-white" style={{ backgroundColor: '#F59E0B' }}>
                {selectedPlan}
              </Badge>
            )}
            <p className="text-gray-600">
              Start your amazing coworking experience today
            </p>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Social Login */}
          <div className="space-y-3">
            <Button variant="outline" className="w-full h-12 hover:bg-gray-50 transition-colors">
              <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Continue with Google
            </Button>
            
            <Button variant="outline" className="w-full h-12 hover:bg-gray-50 transition-colors">
              <svg className="w-5 h-5 mr-3" fill="#1877F2" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              Continue with Facebook
            </Button>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-3 bg-white text-gray-500 border border-gray-100 rounded">Or sign up with email</span>
            </div>
          </div>

          {/* Registration Form */}
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input 
                  id="firstName" 
                  name="firstName"
                  placeholder="Enter first name" 
                  className="focus:ring-2 focus:ring-orange-500 transition-all"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input 
                  id="lastName" 
                  name="lastName"
                  placeholder="Enter last name"
                  className="focus:ring-2 focus:ring-orange-500 transition-all"
                  required
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input 
                id="email" 
                name="email"
                type="email" 
                placeholder="example@email.com"
                className="focus:ring-2 focus:ring-orange-500 transition-all"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input 
                id="phone" 
                name="phone"
                placeholder="+84 987 654 321"
                className="focus:ring-2 focus:ring-orange-500 transition-all"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input 
                  id="password" 
                  type={showPassword ? "text" : "password"} 
                  placeholder="Create password"
                  className="pr-10 focus:ring-2 focus:ring-orange-500 transition-all"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </Button>
              </div>
              <p className="text-xs text-gray-500">
                Password must be at least 8 characters long
              </p>
            </div>

            {selectedPlan && (
              <div className="p-4 rounded-lg border-2 border-orange-200 bg-orange-50">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">Selected Plan: {selectedPlan}</span>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => onPlanChange('')}
                    className="hover:bg-orange-100"
                  >
                    Change
                  </Button>
                </div>
                <div className="text-sm text-gray-600">
                  VND {plans.find(p => p.name === selectedPlan)?.price} {plans.find(p => p.name === selectedPlan)?.period}
                </div>
              </div>
            )}
            
            <Button 
              type="submit"
              className="w-full h-12 text-white hover:shadow-lg transition-all duration-200 transform hover:scale-105"
              style={{ backgroundColor: '#F59E0B' }}
            >
              Create Account
            </Button>
          </form>

          <div className="text-center text-sm text-gray-500">
            By signing up, you agree to our{' '}
            <button className="text-blue-600 hover:underline transition-colors">Terms of Service</button>
            {' '}and{' '}
            <button className="text-blue-600 hover:underline transition-colors">Privacy Policy</button>
            .
          </div>
        </CardContent>
      </Card>
    </div>
  );
};