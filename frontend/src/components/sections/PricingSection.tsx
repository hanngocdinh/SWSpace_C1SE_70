import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { CheckCircle } from 'lucide-react';
import { plans } from '../../utils/constants';
import { getIcon } from '../../utils/iconUtils';

interface PricingSectionProps {
  onSelectPlan: (planName: string) => void;
  isAuthenticated?: boolean;
  onBookSpace?: () => void;
}

export const PricingSection = ({ onSelectPlan, isAuthenticated = false, onBookSpace }: PricingSectionProps) => {
  const handlePlanClick = (planName: string) => {
    if (isAuthenticated && onBookSpace) {
      // If user is authenticated, set the selected plan and go to booking page
      onSelectPlan(planName); // This will set the selected plan for the booking
      onBookSpace();
    } else {
      // If user is not authenticated, show signup modal
      onSelectPlan(planName);
    }
  };
  return (
    <section className="py-16 lg:py-24 bg-white/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl lg:text-4xl text-gray-900">
            Choose Your Perfect Plan
          </h2>
          <p className="text-xl text-gray-600">
            Flexible upgrades and downgrades anytime to fit your needs
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {plans.map((plan, index) => (
            <Card 
              key={index}
              className={`relative border-2 transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1 group ${
                plan.popular 
                  ? 'border-yellow-500 shadow-lg scale-105' 
                  : 'border-yellow-500/30 hover:border-yellow-500'
              } ${plan.color}`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                  <Badge className="text-black border-0 px-6 animate-pulse" style={{ backgroundColor: '#F59E0B' }}>
                    Most Popular
                  </Badge>
                </div>
              )}
              
              <CardHeader className="text-center pb-6">
                <div className="w-16 h-16 mx-auto mb-4 bg-black/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  {getIcon(plan.iconName, "w-8 h-8 text-yellow-500")}
                </div>
                <CardTitle className="text-xl text-yellow-500 font-bold">{plan.name}</CardTitle>
                <CardDescription className="text-gray-300 text-base">{plan.description}</CardDescription>
                <div className="space-y-1 pt-4">
                  <p className="text-sm text-gray-400">Starting at</p>
                  <div className="flex items-baseline justify-center">
                    <span className="text-2xl text-white">VND </span>
                    <span className="text-3xl text-white font-bold">{plan.price}</span>
                    <span className="text-gray-300 ml-1">{plan.period}</span>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-6">
                <ul className="space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center space-x-3">
                      <CheckCircle className="w-4 h-4 text-yellow-500 flex-shrink-0" />
                      <span className="text-gray-300 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Button 
                  className="w-full h-12 text-base border border-yellow-500 bg-transparent text-yellow-500 hover:bg-yellow-500 hover:text-black transition-all duration-200 hover:shadow-lg"
                  onClick={() => handlePlanClick(plan.name)}
                >
                  {isAuthenticated ? 'Book Now' : 'Booking'}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};