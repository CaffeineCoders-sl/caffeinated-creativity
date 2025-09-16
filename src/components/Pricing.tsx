import React from 'react';
import { Link } from 'react-router-dom';
import { Check } from 'lucide-react';

const Pricing = () => {
  const plans = [
    {
      name: 'Starter',
      price: 'LKR 299,000',
      description: 'Landing page or 5-page website — perfect to get started.',
      features: ['Responsive design', 'Basic SEO', 'Contact form', '1 week support'],
      cta: '/contact'
    },
    {
      name: 'Growth',
      price: 'LKR 899,000',
      description: 'Full-stack MVP or SaaS starter with essential integrations.',
      features: ['Full-stack development', 'Auth & roles', 'Payments integration', '4 weeks support'],
      cta: '/contact'
    },
    {
      name: 'Enterprise',
      price: 'Contact Us',
      description: 'Custom large-scale systems, integrations and dedicated support.',
      features: ['Custom architecture', 'Dedicated team', 'SLA & support', 'Onsite/remote consultancy'],
      cta: '/contact'
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold">Pricing</h2>
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">Simple, transparent pricing in LKR. Scale with confidence — start small and grow.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <div key={plan.name} className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold">{plan.name}</h3>
                <div className="text-sm text-gray-500">{plan.price}</div>
              </div>

              <p className="text-gray-600 mb-6">{plan.description}</p>

              <ul className="space-y-3 mb-6">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-3">
                    <Check size={18} className="text-green-500 mt-1" />
                    <span className="text-gray-700">{f}</span>
                  </li>
                ))}
              </ul>

              <div>
                <Link to={plan.cta} className="inline-flex items-center justify-center w-full px-4 py-3 bg-black text-white rounded-lg font-medium hover:bg-black/90 transition-colors">
                  {plan.name === 'Enterprise' ? 'Contact Us' : 'Book a Free Call'}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
