import { Button } from '../ui/button';
import { ArrowRight, Phone } from 'lucide-react';

interface CTASectionProps {
  isAuthenticated: boolean;
  onGetStarted: () => void;
  onBookSpace: () => void;
}

export const CTASection = ({ isAuthenticated, onGetStarted, onBookSpace }: CTASectionProps) => {
  return (
    <section id="contact-section" className="py-16 lg:py-24 text-white" style={{ background: 'linear-gradient(135deg, #1E3A8A 0%, #22D3EE 100%)' }}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
        <div className="space-y-4">
          <h2 className="text-3xl lg:text-4xl">
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl text-blue-100">
            Join our community and experience exceptional workspace solutions today
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {isAuthenticated ? (
            <Button 
              size="lg" 
              className="text-white border-0 px-8 text-lg h-14 hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              style={{ backgroundColor: '#F59E0B' }}
              onClick={onBookSpace}
            >
              Book Your Space
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          ) : (
            <Button 
              size="lg" 
              className="text-white border-0 px-8 text-lg h-14 hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              style={{ backgroundColor: '#F59E0B' }}
              onClick={onGetStarted}
            >
              Start Free Trial
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          )}
          <Button 
            size="lg" 
            variant="outline" 
            className="border-white/30 text-white hover:bg-white/10 px-8 text-lg h-14 transition-all duration-200"
          >
            <Phone className="w-5 h-5 mr-2" />
            Schedule Consultation
          </Button>
        </div>
      </div>
    </section>
  );
};