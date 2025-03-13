import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Globe, 
  Smartphone, 
  Brain, 
  Lock, 
  CreditCard, 
  FileText, 
  BarChart, 
  Link2, 
  Check, 
  ArrowRight, 
  DollarSign, 
  Clock, 
  Shield,
  Users,
  LayoutGrid,
  Paintbrush,
  Download,
  Share2
} from 'lucide-react';

interface BudgetCalculatorProps {
  darkMode?: boolean;
  onGetQuote?: (estimate: { min: number, max: number }) => void;
}

const BudgetCalculator = ({ darkMode = true, onGetQuote }: BudgetCalculatorProps) => {
  // Project type state - expanded with more options
  const [projectType, setProjectType] = useState('web');
  // Project scope state
  const [projectScope, setProjectScope] = useState('small');
  // Selected features
  const [projectFeatures, setProjectFeatures] = useState<string[]>([]);
  // Budget estimation
  const [estimatedBudget, setEstimatedBudget] = useState<{min: number, max: number}>({min: 5000, max: 8000});
  // Timeline estimation
  const [estimatedTimeline, setEstimatedTimeline] = useState<{min: number, max: number}>({min: 4, max: 8});
  // Selected timeline unit (weeks or months)
  const [timelineUnit, setTimelineUnit] = useState<'weeks' | 'months'>('weeks');
  // Quality level (affects price multiplier)
  type QualityLevel = 'standard' | 'premium' | 'enterprise';
  const [qualityLevel, setQualityLevel] = useState<QualityLevel>('standard');
  // Show/hide detailed breakdown
  const [showBreakdown, setShowBreakdown] = useState(false);
  // Cost breakdown
  const [costBreakdown, setCostBreakdown] = useState({
    base: 3000,
    features: 0,
    qualityMultiplier: 1,
    scopeMultiplier: 1
  });

  // Project type options - expanded
  const projectTypeOptions = [
    {id: 'web', name: 'Website / Web App', icon: <Globe size={24} />},
    {id: 'mobile', name: 'Mobile Application', icon: <Smartphone size={24} />},
    {id: 'ai', name: 'AI / ML Solution', icon: <Brain size={24} />},
    {id: 'design', name: 'UI/UX Design', icon: <Paintbrush size={24} />},
    {id: 'ecommerce', name: 'E-commerce Platform', icon: <LayoutGrid size={24} />}
  ];
  
  // Project scope options
  const projectScopeOptions = [
    {id: 'small', name: 'Small', description: '1-5 pages/screens'},
    {id: 'medium', name: 'Medium', description: '5-10 pages/screens'},
    {id: 'large', name: 'Large', description: '10+ pages/screens'}
  ];
  
  // Quality level options
  const qualityLevelOptions = [
    {id: 'standard', name: 'Standard', description: 'Reliable quality for standard business needs'},
    {id: 'premium', name: 'Premium', description: 'Enhanced quality with advanced features'},
    {id: 'enterprise', name: 'Enterprise', description: 'Top-tier quality with full customization'}
  ];
  
  // Feature options - expanded with more choices and better categorization
  const featureOptions = [
    {id: 'auth', name: 'User Authentication', icon: <Lock size={18} />, category: 'core'},
    {id: 'payment', name: 'Payment Integration', icon: <CreditCard size={18} />, category: 'commerce'},
    {id: 'cms', name: 'Content Management', icon: <FileText size={18} />, category: 'content'},
    {id: 'analytics', name: 'Analytics Dashboard', icon: <BarChart size={18} />, category: 'data'},
    {id: 'multilingual', name: 'Multilingual Support', icon: <Globe size={18} />, category: 'content'},
    {id: 'api', name: 'API Integration', icon: <Link2 size={18} />, category: 'integration'},
    {id: 'security', name: 'Advanced Security', icon: <Shield size={18} />, category: 'core'},
    {id: 'roles', name: 'User Roles & Permissions', icon: <Users size={18} />, category: 'core'},
    {id: 'export', name: 'Data Export', icon: <Download size={18} />, category: 'data'},
    {id: 'social', name: 'Social Media Integration', icon: <Share2 size={18} />, category: 'integration'},
  ];
  
  // Calculate estimated budget based on selections - enhanced logic
  useEffect(() => {
    // Base price by project type - updated with more options
    let basePrice;
    switch(projectType) {
      case 'web': 
        basePrice = 3000;
        break;
      case 'mobile':
        basePrice = 5000;
        break;
      case 'ai':
        basePrice = 8000;
        break;
      case 'design':
        basePrice = 2500;
        break;
      case 'ecommerce':
        basePrice = 6000;
        break;
      default:
        basePrice = 3000;
    }
    
    // Multiplier based on scope
    let scopeMultiplier;
    switch(projectScope) {
      case 'small':
        scopeMultiplier = 1;
        break;
      case 'medium':
        scopeMultiplier = 1.8;
        break;
      case 'large':
        scopeMultiplier = 3;
        break;
      default:
        scopeMultiplier = 1;
    }
    
    // Quality level multiplier
    let qualityMultiplier;
    switch(qualityLevel) {
      case 'standard':
        qualityMultiplier = 1;
        break;
      case 'premium':
        qualityMultiplier = 1.5;
        break;
      case 'enterprise':
        qualityMultiplier = 2.2;
        break;
      default:
        qualityMultiplier = 1;
    }
    
    // Additional cost for features
    const featureCost = projectFeatures.length * 1000;
    
    // Store breakdown for detailed view
    setCostBreakdown({
      base: basePrice,
      features: featureCost,
      qualityMultiplier: qualityMultiplier,
      scopeMultiplier: scopeMultiplier
    });
    
    // Calculate total estimate
    const totalBaseCost = basePrice * scopeMultiplier * qualityMultiplier + featureCost;
    const minEstimate = Math.round(totalBaseCost * 0.9);
    const maxEstimate = Math.round(totalBaseCost * 1.1);
    
    setEstimatedBudget({min: minEstimate, max: maxEstimate});
    
    // Calculate timeline estimate
    let baseTimelineWeeks;
    switch(projectType) {
      case 'web': 
        baseTimelineWeeks = 4;
        break;
      case 'mobile':
        baseTimelineWeeks = 6;
        break;
      case 'ai':
        baseTimelineWeeks = 8;
        break;
      case 'design':
        baseTimelineWeeks = 3;
        break;
      case 'ecommerce':
        baseTimelineWeeks = 6;
        break;
      default:
        baseTimelineWeeks = 4;
    }
    
    // Adjust timeline based on scope and features
    const scopeTimelineMultiplier = scopeMultiplier * 0.8; // slightly less impact than on cost
    const featuresTimelineImpact = projectFeatures.length * 0.5; // each feature adds half a week
    
    const totalBaseTimelineWeeks = baseTimelineWeeks * scopeTimelineMultiplier + featuresTimelineImpact;
    
    // Convert to months if needed
    if (totalBaseTimelineWeeks > 12) {
      setTimelineUnit('months');
      setEstimatedTimeline({
        min: Math.round(totalBaseTimelineWeeks / 4 * 0.9),
        max: Math.round(totalBaseTimelineWeeks / 4 * 1.1)
      });
    } else {
      setTimelineUnit('weeks');
      setEstimatedTimeline({
        min: Math.round(totalBaseTimelineWeeks * 0.9),
        max: Math.round(totalBaseTimelineWeeks * 1.1)
      });
    }
    
  }, [projectType, projectScope, projectFeatures, qualityLevel]);
  
  // Toggle a feature selection
  const toggleFeature = (feature: string) => {
    if (projectFeatures.includes(feature)) {
      setProjectFeatures(projectFeatures.filter(f => f !== feature));
    } else {
      setProjectFeatures([...projectFeatures, feature]);
    }
  };
  
  // Handle get quote button click
  const handleGetQuote = () => {
    if (onGetQuote) {
      onGetQuote(estimatedBudget);
    }
  };
  
  // Dynamic classes based on dark/light mode
  const bgClass = darkMode ? 'bg-white/5 backdrop-blur-sm border border-white/10' : 'bg-black/5 backdrop-blur-sm border border-black/10';
  const textClass = darkMode ? 'text-white' : 'text-black';
  const headingClass = darkMode ? 'text-white' : 'text-black';
  const mutedTextClass = darkMode ? 'text-gray-300' : 'text-gray-600';
  const activeButtonClass = darkMode 
    ? 'border-white bg-white/10' 
    : 'border-black bg-black/10';
  const inactiveButtonClass = darkMode 
    ? 'border-white/10 hover:bg-white/5' 
    : 'border-black/10 hover:bg-black/5';
  const primaryButtonClass = darkMode
    ? 'bg-white text-black hover:bg-white/90'
    : 'bg-black text-white hover:bg-black/90';
  const secondaryButtonClass = darkMode
    ? 'bg-white/10 text-white hover:bg-white/20'
    : 'bg-black/10 text-black hover:bg-black/20';
  
  return (
    <div className={`rounded-2xl p-8 ${bgClass}`}>
      <div className="space-y-10">
        {/* Project Type Selection */}
        <div>
          <h3 className={`text-xl font-medium mb-4 ${headingClass}`}>Project Type</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {projectTypeOptions.map((type) => (
              <motion.button
                key={type.id}
                className={`p-4 rounded-xl border ${
                  projectType === type.id 
                    ? activeButtonClass 
                    : inactiveButtonClass
                } flex items-center transition-all duration-200 ${textClass}`}
                onClick={() => setProjectType(type.id)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="mr-3">{type.icon}</div>
                <span>{type.name}</span>
              </motion.button>
            ))}
          </div>
        </div>
        
        {/* Project Scope Selection */}
        <div>
          <h3 className={`text-xl font-medium mb-4 ${headingClass}`}>Project Scope</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {projectScopeOptions.map((scope) => (
              <motion.button
                key={scope.id}
                className={`p-4 rounded-xl border ${
                  projectScope === scope.id 
                    ? activeButtonClass 
                    : inactiveButtonClass
                } flex flex-col items-start transition-all duration-200 ${textClass}`}
                onClick={() => setProjectScope(scope.id)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="font-medium">{scope.name}</span>
                <span className={`text-sm ${mutedTextClass}`}>{scope.description}</span>
              </motion.button>
            ))}
          </div>
        </div>
        
        {/* Quality Level Selection */}
        <div>
          <h3 className={`text-xl font-medium mb-4 ${headingClass}`}>Quality Level</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {qualityLevelOptions.map((level) => (
              <motion.button
                key={level.id}
                className={`p-4 rounded-xl border ${
                  qualityLevel === level.id 
                    ? activeButtonClass 
                    : inactiveButtonClass
                }`}
                onClick={() => setQualityLevel(level.id as QualityLevel)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="font-medium">{level.name}</span>
                <span className={`text-sm ${mutedTextClass}`}>{level.description}</span>
              </motion.button>
            ))}
          </div>
        </div>
        
        {/* Features Selection */}
        <div>
          <h3 className={`text-xl font-medium mb-4 ${headingClass}`}>Additional Features</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {featureOptions.map((feature) => (
              <motion.button
                key={feature.id}
                className={`p-4 rounded-xl border ${
                  projectFeatures.includes(feature.id) 
                    ? activeButtonClass 
                    : inactiveButtonClass
                } flex items-center justify-between transition-all duration-200 ${textClass}`}
                onClick={() => toggleFeature(feature.id)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center">
                  <div className="mr-3">{feature.icon}</div>
                  <div>
                    <span>{feature.name}</span>
                    <span className={`text-xs block ${mutedTextClass}`}>{feature.category}</span>
                  </div>
                </div>
                <div className={`w-5 h-5 rounded-full ${
                  projectFeatures.includes(feature.id) 
                    ? darkMode ? 'bg-white' : 'bg-black' 
                    : darkMode ? 'border border-white/30' : 'border border-black/30'
                  } flex items-center justify-center`}>
                  {projectFeatures.includes(feature.id) && (
                    <Check size={12} className={darkMode ? 'text-black' : 'text-white'} />
                  )}
                </div>
              </motion.button>
            ))}
          </div>
        </div>
        
        {/* Results Section with Budget and Timeline */}
        <motion.div 
          className={`${darkMode ? 'bg-white/10' : 'bg-black/5'} rounded-xl p-6`}
          animate={{ scale: [1, 1.02, 1] }}
          transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
        >
          {/* Budget Estimate */}
          <div className="mb-6">
            <h3 className={`text-2xl mb-1 ${headingClass}`}>Estimated Budget</h3>
            <div className={`text-3xl md:text-4xl font-bold flex items-center justify-center ${headingClass}`}>
              <DollarSign className="mr-1" />
              <span>{estimatedBudget.min.toLocaleString()}</span>
              <span className="mx-2">-</span>
              <span>{estimatedBudget.max.toLocaleString()}</span>
            </div>
            
            {/* Visual budget scale */}
            <div className="mt-4 mb-2 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div 
                className={`h-full ${darkMode ? 'bg-white' : 'bg-black'} rounded-full`} 
                style={{ width: `${Math.min(100, (estimatedBudget.max / 20000) * 100)}%` }}
              ></div>
            </div>
            <div className="flex justify-between text-xs">
              <span>$0</span>
              <span>$10k</span>
              <span>$20k+</span>
            </div>
          </div>
          
          {/* Timeline Estimate */}
          <div className="mb-6">
            <h3 className={`text-2xl mb-1 ${headingClass}`}>Estimated Timeline</h3>
            <div className={`text-2xl font-bold flex items-center justify-center ${headingClass}`}>
              <Clock className="mr-1" />
              <span>{estimatedTimeline.min}</span>
              <span className="mx-2">-</span>
              <span>{estimatedTimeline.max} {timelineUnit}</span>
            </div>
          </div>
          
          {/* Show/Hide Cost Breakdown */}
          <button 
            onClick={() => setShowBreakdown(!showBreakdown)}
            className={`w-full text-left ${mutedTextClass} text-sm mb-4 flex items-center`}
          >
            <motion.div
              animate={{ rotate: showBreakdown ? 90 : 0 }}
              transition={{ duration: 0.3 }}
              className="mr-2"
            >
              <ArrowRight size={14} />
            </motion.div>
            {showBreakdown ? "Hide cost breakdown" : "Show cost breakdown"}
          </button>
          
          {/* Cost Breakdown Detail */}
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ 
              height: showBreakdown ? 'auto' : 0,
              opacity: showBreakdown ? 1 : 0
            }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden mb-6"
          >
            <table className={`w-full text-sm ${textClass}`}>
              <tbody>
                <tr>
                  <td className={mutedTextClass}>Base cost:</td>
                  <td className="text-right">${costBreakdown.base.toLocaleString()}</td>
                </tr>
                <tr>
                  <td className={mutedTextClass}>Features:</td>
                  <td className="text-right">+${costBreakdown.features.toLocaleString()}</td>
                </tr>
                <tr>
                  <td className={mutedTextClass}>Scope multiplier:</td>
                  <td className="text-right">×{costBreakdown.scopeMultiplier.toFixed(1)}</td>
                </tr>
                <tr>
                  <td className={mutedTextClass}>Quality multiplier:</td>
                  <td className="text-right">×{costBreakdown.qualityMultiplier.toFixed(1)}</td>
                </tr>
                <tr className="font-medium border-t border-dashed">
                  <td className="pt-2">Total (average):</td>
                  <td className="text-right pt-2">
                    ${Math.round((estimatedBudget.min + estimatedBudget.max) / 2).toLocaleString()}
                  </td>
                </tr>
              </tbody>
            </table>
            <p className={`text-xs mt-3 ${mutedTextClass}`}>
              *Final pricing may vary based on specific requirements and project complexity. This is an estimate only.
            </p>
          </motion.div>
          
          {/* Action Button */}
          <motion.div className="mt-6">
            <motion.button 
              onClick={handleGetQuote}
              className={`w-full inline-flex items-center justify-center px-8 py-4 font-medium rounded-full transition-all duration-300 ${primaryButtonClass}`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span>Get Detailed Quote</span>
              <ArrowRight className="ml-2" size={18} />
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default BudgetCalculator;
