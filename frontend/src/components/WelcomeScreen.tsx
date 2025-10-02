import { Card, CardContent, CardHeader } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { CheckCircle, ArrowRight } from 'lucide-react';
import { plans } from '../utils/constants';
import { getIcon } from '../utils/iconUtils';
import { UserInfo } from '../types';

interface WelcomeScreenProps {
  userInfo: UserInfo;
  onContinue: () => void;
  onExploreServices: () => void;
}

export const WelcomeScreen = ({ userInfo, onContinue, onExploreServices }: WelcomeScreenProps) => {
  const selectedPlanDetails = plans.find(p => p.name === userInfo.selectedPlan);
  
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl bg-white border border-gray-200 shadow-xl">
        <CardHeader className="text-center space-y-4 pb-6">
          <div className="w-20 h-20 mx-auto rounded-full flex items-center justify-center animate-pulse" style={{ backgroundColor: '#22D3EE' }}>
            <CheckCircle className="w-10 h-10 text-white" />
          </div>
          <div className="space-y-2">
            <h1 className="text-3xl text-gray-900">Welcome to SWSpace!</h1>
            <p className="text-lg text-gray-600">
              Congratulations {userInfo.firstName}! Your account has been created successfully.
            </p>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-8">
          {selectedPlanDetails && (
            <div className="p-6 rounded-xl border-2 border-orange-200 bg-orange-50">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-gray-900">Your Selected Plan</h3>
                <Badge className="text-white" style={{ backgroundColor: '#F59E0B' }}>
                  {selectedPlanDetails.name}
                </Badge>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <div className="flex items-center space-x-3 mb-3">
                    {getIcon(selectedPlanDetails.iconName)}
                    <span className="font-semibold text-gray-900">{selectedPlanDetails.name}</span>
                  </div>
                  <p className="text-gray-600 text-sm mb-4">{selectedPlanDetails.description}</p>
                  <div className="flex items-baseline">
                    <span className="text-2xl font-bold text-gray-900">VND {selectedPlanDetails.price}</span>
                    <span className="text-gray-500 ml-1">{selectedPlanDetails.period}</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium text-gray-900">Plan Features:</h4>
                  <ul className="space-y-1">
                    {selectedPlanDetails.features.slice(0, 3).map((feature, index) => (
                      <li key={index} className="flex items-center space-x-2 text-sm text-gray-600">
                        <CheckCircle className="w-3 h-3 text-green-500 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">What's Next?</h3>
            <div className="grid gap-3">
              <div className="flex items-center space-x-3 p-3 rounded-lg bg-blue-50 border border-blue-200">
                <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center text-sm font-semibold">1</div>
                <span className="text-gray-700">Explore available spaces</span>
              </div>
              <div className="flex items-center space-x-3 p-3 rounded-lg bg-blue-50 border border-blue-200">
                <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center text-sm font-semibold">2</div>
                <span className="text-gray-700">Book your first workspace and complete payment</span>
              </div>
              <div className="flex items-center space-x-3 p-3 rounded-lg bg-blue-50 border border-blue-200">
                <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center text-sm font-semibold">3</div>
                <span className="text-gray-700">Receive your QR code for easy check-in access</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-6">
            <Button 
              size="lg" 
              className="flex-1 text-white border-0 h-12 hover:shadow-lg transition-all duration-200 transform hover:scale-105"
              style={{ backgroundColor: '#F59E0B' }}
              onClick={onContinue}
            >
              Continue
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="flex-1 border-gray-300 text-gray-700 hover:bg-gray-50 h-12 transition-all duration-200"
              onClick={onExploreServices}
            >
              Explore Services
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
