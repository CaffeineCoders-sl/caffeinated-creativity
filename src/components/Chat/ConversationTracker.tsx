import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

interface ConversationTrackerProps {
  containerRef: React.RefObject<HTMLDivElement>;
  messageCount: number;
  onScrollToBottom: () => void;
}

/**
 * A component that tracks conversation visibility and provides a scroll-to-bottom button
 * when new messages are out of view
 */
const ConversationTracker = ({ 
  containerRef,
  messageCount,
  onScrollToBottom
}: ConversationTrackerProps) => {
  const [showIndicator, setShowIndicator] = useState(false);
  const [newMessages, setNewMessages] = useState(0);
  const prevMessageCount = useRef(messageCount);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    
    // Track new messages
    if (messageCount > prevMessageCount.current) {
      const diff = messageCount - prevMessageCount.current;
      setNewMessages(prev => prev + diff);
      prevMessageCount.current = messageCount;
    }
    
    const handleScroll = () => {
      if (!container) return;
      
      const { scrollTop, scrollHeight, clientHeight } = container;
      const isBottomVisible = scrollTop + clientHeight >= scrollHeight - 50;
      
      setShowIndicator(!isBottomVisible && newMessages > 0);
      
      // Reset new message count when user scrolls to bottom
      if (isBottomVisible) {
        setNewMessages(0);
      }
    };
    
    // Check visibility when messages change
    handleScroll();
    
    // Add scroll listener
    container.addEventListener('scroll', handleScroll);
    
    return () => container.removeEventListener('scroll', handleScroll);
  }, [messageCount, containerRef, newMessages]);

  const handleClick = () => {
    onScrollToBottom();
    setNewMessages(0);
  };

  return (
    <AnimatePresence>
      {showIndicator && (
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          className="absolute bottom-24 right-4 bg-black text-white px-3 py-2 rounded-full shadow-lg flex items-center"
          onClick={handleClick}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <ChevronDown size={16} className="mr-1" />
          <span className="text-sm font-medium">{newMessages > 0 ? `${newMessages} new` : 'Scroll down'}</span>
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default ConversationTracker;
