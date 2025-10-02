import { Card, CardContent } from '../ui/card';
import { benefits } from '../../utils/constants';
import { getIcon } from '../../utils/iconUtils';

export const BenefitsSection = () => {
  return (
    <section className="py-16 lg:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl lg:text-4xl text-gray-900">
            Why Choose SWSpace?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We provide everything you need to work efficiently and grow your career
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <Card key={index} className="border-0 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group">
              <CardContent className="p-8 text-center space-y-4">
                <div className={`w-16 h-16 mx-auto rounded-xl bg-gray-50 flex items-center justify-center ${benefit.color} group-hover:scale-110 transition-transform duration-300`}>
                  {getIcon(benefit.iconName)}
                </div>
                <h3 className="text-xl font-semibold text-gray-900">{benefit.title}</h3>
                <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};