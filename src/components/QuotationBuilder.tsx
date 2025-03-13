import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  DollarSign, 
  Check, 
  X, 
  Plus, 
  Minus, 
  Calculator, 
  Download, 
  Code, 
  Smartphone, 
  Brain, 
  Paintbrush, 
  ShoppingCart, 
  Database,
  FileText,
  Sparkles
} from 'lucide-react';

interface ServiceOption {
  id: string;
  name: string;
  description: string;
  basePrice: number;
  icon: JSX.Element;
}

interface QuotationItem {
  serviceId: string;
  serviceName: string;
  description: string;
  basePrice: number;
  quantity: number;
  customizations: string[];
  totalPrice: number;
}

interface QuotationBuilderProps {
  onQuoteGenerated?: (items: QuotationItem[], total: number) => void;
  darkMode?: boolean;
}

const QuotationBuilder = ({ onQuoteGenerated, darkMode = false }: QuotationBuilderProps) => {
  // Services that can be added to the quote
  const [services, setServices] = useState<ServiceOption[]>([
    {
      id: 'web-dev',
      name: 'Web Development',
      description: 'Custom websites and web applications',
      basePrice: 5000,
      icon: <Code size={24} />
    },
    {
      id: 'mobile-dev',
      name: 'Mobile App Development',
      description: 'Native and cross-platform mobile apps',
      basePrice: 8000,
      icon: <Smartphone size={24} />
    },
    {
      id: 'ai-ml',
      name: 'AI & Machine Learning',
      description: 'Custom AI solutions and integrations',
      basePrice: 12000,
      icon: <Brain size={24} />
    },
    {
      id: 'ui-design',
      name: 'UI/UX Design',
      description: 'User-centered design and prototyping',
      basePrice: 4000,
      icon: <Paintbrush size={24} />
    },
    {
      id: 'ecommerce',
      name: 'E-commerce Solutions',
      description: 'Online stores and payment systems',
      basePrice: 7000,
      icon: <ShoppingCart size={24} />
    },
    {
      id: 'data-eng',
      name: 'Data Engineering',
      description: 'Data pipelines and analytics platforms',
      basePrice: 9000,
      icon: <Database size={24} />
    }
  ]);
  
  // Currently selected service for editing
  const [selectedService, setSelectedService] = useState<string | null>(null);
  
  // Items in the quotation
  const [quotationItems, setQuotationItems] = useState<QuotationItem[]>([]);
  
  // Total price
  const [totalPrice, setTotalPrice] = useState(0);
  
  // Current quantity for selected service
  const [quantity, setQuantity] = useState(1);
  
  // Custom text fields for the selected service
  const [customization, setCustomization] = useState('');
  const [customizationList, setCustomizationList] = useState<string[]>([]);
  
  // Helper to find service by id
  const getServiceById = (id: string) => {
    return services.find(service => service.id === id);
  };
  
  // Update total price whenever quotation items change
  useEffect(() => {
    const total = quotationItems.reduce((sum, item) => sum + item.totalPrice, 0);
    setTotalPrice(total);
    
    // If onQuoteGenerated callback was provided, call it
    if (onQuoteGenerated) {
      onQuoteGenerated(quotationItems, total);
    }
  }, [quotationItems, onQuoteGenerated]);
  
  // Handle service selection
  const handleSelectService = (serviceId: string) => {
    setSelectedService(serviceId);
    setQuantity(1);
    setCustomization('');
    setCustomizationList([]);
  };
  
  // Handle adding customization
  const handleAddCustomization = () => {
    if (customization.trim()) {
      setCustomizationList([...customizationList, customization.trim()]);
      setCustomization('');
    }
  };
  
  // Handle removing customization
  const handleRemoveCustomization = (index: number) => {
    setCustomizationList(customizationList.filter((_, i) => i !== index));
  };
  
  // Handle quantity change
  const handleQuantityChange = (delta: number) => {
    setQuantity(Math.max(1, quantity + delta));
  };
  
  // Handle adding service to quote
  const handleAddToQuote = () => {
    if (!selectedService) return;
    
    const service = getServiceById(selectedService);
    if (!service) return;
    
    // Calculate total price based on base price, quantity, and customizations
    // We're assuming each customization adds 10% to the base price
    const customizationMultiplier = 1 + (customizationList.length * 0.1);
    const itemTotalPrice = service.basePrice * quantity * customizationMultiplier;
    
    const newItem: QuotationItem = {
      serviceId: service.id,
      serviceName: service.name,
      description: service.description,
      basePrice: service.basePrice,
      quantity: quantity,
      customizations: [...customizationList],
      totalPrice: itemTotalPrice
    };
    
    setQuotationItems([...quotationItems, newItem]);
    
    // Reset selection state
    setSelectedService(null);
    setQuantity(1);
    setCustomization('');
    setCustomizationList([]);
  };
  
  // Handle removing item from quote
  const handleRemoveItem = (index: number) => {
    setQuotationItems(quotationItems.filter((_, i) => i !== index));
  };
  
  // Style classes based on dark mode
  const bgClass = darkMode ? 'bg-gray-800' : 'bg-white';
  const textClass = darkMode ? 'text-white' : 'text-gray-800';
  const borderClass = darkMode ? 'border-gray-600' : 'border-gray-200';
  const inputBgClass = darkMode ? 'bg-gray-700' : 'bg-white';
  const buttonPrimaryClass = darkMode 
    ? 'bg-white text-gray-800 hover:bg-gray-200' 
    : 'bg-blue-600 text-white hover:bg-blue-700';
  const buttonSecondaryClass = darkMode 
    ? 'bg-gray-700 text-white hover:bg-gray-600' 
    : 'bg-gray-100 text-gray-800 hover:bg-gray-200';
  
  return (
    <div className={`rounded-lg shadow-lg overflow-hidden ${bgClass}`}>
      <div className="p-6">
        <h2 className={`text-2xl font-bold mb-6 ${textClass}`}>Custom Quotation Builder</h2>
        
        {/* Service Selection */}
        <div className="mb-8">
          <h3 className={`text-lg font-medium mb-3 ${textClass}`}>Select a Service</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {services.map(service => (
              <motion.button
                key={service.id}
                onClick={() => handleSelectService(service.id)}
                className={`p-4 rounded-lg border ${borderClass} flex items-start ${
                  selectedService === service.id 
                    ? darkMode ? 'bg-gray-700' : 'bg-blue-50 border-blue-200' 
                    : 'hover:bg-gray-50 dark:hover:bg-gray-700'
                } transition-all`}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
              >
                <div className="mr-3 mt-1 text-blue-600 dark:text-blue-400">
                  {service.icon}
                </div>
                <div className="text-left">
                  <p className={`font-medium ${textClass}`}>{service.name}</p>
                  <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>
                    From ${service.basePrice.toLocaleString()}
                  </p>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
        
        {/* Service Configuration (if selected) */}
        {selectedService && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-8 overflow-hidden"
          >
            <div className={`p-6 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
              <div className="flex justify-between items-center mb-4">
                <h3 className={`text-lg font-medium ${textClass}`}>
                  {getServiceById(selectedService)?.name}
                </h3>
                <p className={`font-medium ${textClass}`}>
                  ${getServiceById(selectedService)?.basePrice.toLocaleString()}
                </p>
              </div>
              
              {/* Quantity Selector */}
              <div className="mb-6">
                <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  Quantity
                </label>
                <div className="flex items-center">
                  <button
                    onClick={() => handleQuantityChange(-1)}
                    className={`p-2 rounded-l-md border ${borderClass} ${buttonSecondaryClass}`}
                    disabled={quantity <= 1}
                  >
                    <Minus size={16} />
                  </button>
                  <div className={`px-4 py-2 w-16 text-center border-t border-b ${borderClass} ${textClass} ${inputBgClass}`}>
                    {quantity}
                  </div>
                  <button
                    onClick={() => handleQuantityChange(1)}
                    className={`p-2 rounded-r-md border ${borderClass} ${buttonSecondaryClass}`}
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>
              
              {/* Customizations */}
              <div className="mb-6">
                <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  Custom Requirements (Optional)
                </label>
                <div className="flex">
                  <input
                    type="text"
                    value={customization}
                    onChange={(e) => setCustomization(e.target.value)}
                    placeholder="Add special requirements, features, etc."
                    className={`flex-1 px-4 py-2 rounded-l-md border ${borderClass} ${inputBgClass} ${textClass} focus:outline-none ${
                      darkMode ? 'focus:border-blue-500' : 'focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                    }`}
                  />
                  <button
                    onClick={handleAddCustomization}
                    className={`px-4 py-2 rounded-r-md ${buttonPrimaryClass}`}
                    disabled={!customization.trim()}
                  >
                    Add
                  </button>
                </div>
                
                {customizationList.length > 0 && (
                  <div className="mt-3">
                    <p className={`text-sm mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      Added requirements:
                    </p>
                    <ul className="space-y-1">
                      {customizationList.map((item, index) => (
                        <li 
                          key={index} 
                          className={`flex items-center justify-between text-sm p-2 rounded ${
                            darkMode ? 'bg-gray-600 text-white' : 'bg-gray-100 text-gray-700'
                          }`}
                        >
                          <span>{item}</span>
                          <button 
                            onClick={() => handleRemoveCustomization(index)}
                            className="text-red-500 hover:text-red-600"
                          >
                            <X size={14} />
                          </button>
                        </li>
                      ))}
                    </ul>
                    <p className={`text-xs mt-2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      Note: Each customization may increase the base price by approximately 10%
                    </p>
                  </div>
                )}
              </div>
              
              {/* Action Buttons */}
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setSelectedService(null)}
                  className={`px-4 py-2 rounded-md ${buttonSecondaryClass}`}
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddToQuote}
                  className={`px-4 py-2 rounded-md ${buttonPrimaryClass} flex items-center`}
                >
                  <Plus size={16} className="mr-1" />
                  Add to Quote
                </button>
              </div>
            </div>
          </motion.div>
        )}
        
        {/* Quotation Summary */}
        <div className="mb-6">
          <h3 className={`text-lg font-medium mb-4 ${textClass}`}>Your Custom Quote</h3>
          
          {quotationItems.length === 0 ? (
            <div className={`text-center py-10 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              <Calculator className="mx-auto h-10 w-10 mb-3 opacity-50" />
              <p>No items in your quote yet</p>
              <p className="text-sm mt-1">Select services above to build your quote</p>
            </div>
          ) : (
            <div className={`rounded-lg border ${borderClass} overflow-hidden`}>
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className={darkMode ? 'bg-gray-700' : 'bg-gray-50'}>
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300">
                      Service
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300">
                      Qty
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300">
                      Price
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className={`divide-y ${borderClass}`}>
                  {quotationItems.map((item, index) => (
                    <tr key={index} className={index % 2 === 0 ? (darkMode ? 'bg-gray-800' : 'bg-white') : (darkMode ? 'bg-gray-750' : 'bg-gray-50')}>
                      <td className="px-6 py-4">
                        <div className={textClass}>
                          <div className="font-medium">{item.serviceName}</div>
                          <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                            {item.description}
                          </div>
                          {item.customizations.length > 0 && (
                            <ul className={`mt-1 text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'} list-disc list-inside`}>
                              {item.customizations.map((customization, i) => (
                                <li key={i}>{customization}</li>
                              ))}
                            </ul>
                          )}
                        </div>
                      </td>
                      <td className={`px-6 py-4 ${textClass}`}>
                        {item.quantity}
                      </td>
                      <td className={`px-6 py-4 text-right ${textClass}`}>
                        ${item.totalPrice.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button
                          onClick={() => handleRemoveItem(index)}
                          className="text-red-500 hover:text-red-600"
                        >
                          <X size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                  <tr className={darkMode ? 'bg-gray-700' : 'bg-gray-50'}>
                    <td colSpan={2} className={`px-6 py-4 text-right font-medium ${textClass}`}>
                      Total
                    </td>
                    <td className={`px-6 py-4 text-right font-bold ${textClass}`}>
                      ${totalPrice.toLocaleString()}
                    </td>
                    <td></td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>
        
        {/* Download/Share Buttons */}
        {quotationItems.length > 0 && (
          <div className="flex justify-end space-x-3">
            <button
              className={`px-4 py-2 rounded-md ${buttonSecondaryClass} flex items-center`}
            >
              <Download size={16} className="mr-1" />
              Save Quote
            </button>
            <button
              className={`px-4 py-2 rounded-md ${buttonPrimaryClass} flex items-center`}
              onClick={() => onQuoteGenerated && onQuoteGenerated(quotationItems, totalPrice)}
            >
              <FileText size={16} className="mr-1" />
              Finalize Quote
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuotationBuilder;
