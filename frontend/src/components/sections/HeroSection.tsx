import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { ArrowRight } from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';

interface HeroSectionProps {
  isAuthenticated: boolean;
  onGetStarted: () => void;
  onBookSpace: () => void;
}

export const HeroSection = ({ isAuthenticated, onGetStarted, onBookSpace }: HeroSectionProps) => {
  return (
    <section className="relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #1E3A8A 0%, #22D3EE 100%)' }}>
      <div className="absolute inset-0 bg-black/10"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 text-white">
            <div className="space-y-4">
              <Badge className="bg-white/20 text-white border-0 inline-flex animate-pulse">
                ✨ Grand Opening Special Offer
              </Badge>
              <h1 className="text-4xl lg:text-6xl leading-tight">
                Modern & Flexible
                <br />
                <span style={{ color: '#22D3EE' }}>Workspace Solutions</span>
              </h1>
              <p className="text-xl text-blue-100 leading-relaxed">
                Join a community of 500+ professionals working at Enosta Space. 
                Professional environment, complete amenities, unlimited connections.
              </p>
            </div>
            
            <div className="flex justify-center sm:justify-start">
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
                  Choose Your Plan
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              )}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-8 border-t border-white/20">
              <div className="text-center">
                <div className="text-2xl font-bold">500+</div>
                <div className="text-sm text-blue-200">Members</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">24/7</div>
                <div className="text-sm text-blue-200">Access</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">100%</div>
                <div className="text-sm text-blue-200">Satisfaction</div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="aspect-square rounded-xl overflow-hidden">
                  <ImageWithFallback 
                    src="https://images.unsplash.com/photo-1748346918817-0b1b6b2f9bab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBjb3dvcmtpbmclMjBzcGFjZSUyMHBlb3BsZSUyMHdvcmtpbmd8ZW58MXx8fHwxNzU4Mjg5ODU4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                    alt="Coworking space"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="aspect-video rounded-xl overflow-hidden">
                  <ImageWithFallback 
                    src="https://images.unsplash.com/photo-1700168333952-3d44a3f427af?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvZmZpY2UlMjB3b3Jrc3BhY2UlMjBicmlnaHQlMjBuYXR1cmFsJTIwbGlnaHR8ZW58MXx8fHwxNzU4Mjg5ODYxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                    alt="Office workspace"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="mt-8">
                <div className="aspect-[3/4] rounded-xl overflow-hidden">
                  <ImageWithFallback 
                    src="https://images.unsplash.com/photo-1559310278-18a9192d909f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3dvcmtpbmclMjBzcGFjZSUyMGludGVyaW9yJTIwZGVzaWdufGVufDF8fHx8MTc1ODI4OTg2NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                    alt="Coworking interior"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};