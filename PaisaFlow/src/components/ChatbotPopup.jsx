import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User, Minimize2, Maximize2 } from 'lucide-react';
import { formatCurrency, calculateFinancialSummary } from '../utils';

const ChatbotPopup = ({ transactions, budgets, goals }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: '1',
      message: "Hi! I'm your AI Finance Assistant. I can help you with questions about your spending, budgets, and financial goals. Try asking me something like 'How much did I spend on food this month?' or 'Am I under budget?'",
      isUser: false,
      timestamp: new Date().toISOString()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateResponse = (userMessage) => {
    const message = userMessage.toLowerCase();
    const summary = calculateFinancialSummary(transactions);

    // Food spending queries
    if (message.includes('food') && (message.includes('spend') || message.includes('spent'))) {
      const foodSpending = summary.categoryBreakdown['Food'] || 0;
      return `You've spent ${formatCurrency(foodSpending)} on food this month. This represents ${((foodSpending / summary.totalExpenses) * 100).toFixed(1)}% of your total expenses.`;
    }

    // Budget queries
    if (message.includes('budget') || message.includes('under budget')) {
      const overBudgetCategories = budgets.filter(b => b.spent > b.limit);
      if (overBudgetCategories.length === 0) {
        return `Great news! You're within budget for all categories. Your overall spending is well managed.`;
      } else {
        const overBudgetList = overBudgetCategories.map(b =>
          `${b.category}: ${formatCurrency(b.spent)} spent vs ${formatCurrency(b.limit)} budget`
        ).join(', ');
        return `You're over budget in ${overBudgetCategories.length} category(ies): ${overBudgetList}. Consider adjusting your spending in these areas.`;
      }
    }

    // Savings rate queries
    if (message.includes('savings rate') || message.includes('save')) {
      return `Your current savings rate is ${summary.savingsRate.toFixed(1)}%. You're saving ${formatCurrency(summary.savings)} out of your total income of ${formatCurrency(summary.totalIncome)}. ${summary.savingsRate >= 20 ? 'Excellent savings rate!' : summary.savingsRate >= 10 ? 'Good savings rate, but there\'s room for improvement.' : 'Consider increasing your savings rate for better financial health.'}`;
    }

    // Total spending queries
    if (message.includes('total') && (message.includes('spend') || message.includes('spent'))) {
      return `Your total expenses this month are ${formatCurrency(summary.totalExpenses)}. Your biggest spending categories are: ${Object.entries(summary.categoryBreakdown).sort(([, a], [, b]) => b - a).slice(0, 3).map(([cat, amt]) => `${cat} (${formatCurrency(amt)})`).join(', ')}.`;
    }

    // Goals queries
    if (message.includes('goal') || message.includes('goals')) {
      const activeGoals = goals.filter(g => g.currentAmount < g.targetAmount);
      const completedGoals = goals.filter(g => g.currentAmount >= g.targetAmount);

      if (completedGoals.length > 0) {
        return `You've completed ${completedGoals.length} goal(s): ${completedGoals.map(g => g.title).join(', ')}. ${activeGoals.length > 0 ? `You still have ${activeGoals.length} active goal(s) to work on.` : 'Congratulations on achieving all your goals!'}`;
      } else {
        return `You have ${activeGoals.length} active goals. Your closest to completion is "${activeGoals.sort((a, b) => (b.currentAmount / b.targetAmount) - (a.currentAmount / a.targetAmount))[0]?.title}" at ${((activeGoals[0]?.currentAmount / activeGoals[0]?.targetAmount) * 100).toFixed(1)}% complete.`;
      }
    }

    // Income queries
    if (message.includes('income') || message.includes('earn')) {
      return `Your total income this month is ${formatCurrency(summary.totalIncome)}. After expenses of ${formatCurrency(summary.totalExpenses)}, your net savings are ${formatCurrency(summary.savings)}.`;
    }

    // Transportation queries
    if (message.includes('transport') || message.includes('travel') || message.includes('uber') || message.includes('metro')) {
      const transportSpending = summary.categoryBreakdown['Transport'] || 0;
      return `You've spent ${formatCurrency(transportSpending)} on transportation this month.`;
    }

    // Entertainment queries
    if (message.includes('entertainment') || message.includes('netflix') || message.includes('movie')) {
      const entertainmentSpending = summary.categoryBreakdown['Entertainment'] || 0;
      return `Your entertainment expenses this month total ${formatCurrency(entertainmentSpending)}.`;
    }

    // Greeting responses
    if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
      return `Hello! I'm here to help you with your finances. You can ask me about your spending, budgets, savings rate, or financial goals. What would you like to know?`;
    }

    // Default response
    return `I can help you with questions about your spending, budgets, and financial goals. Try asking about specific categories like food, transport, or entertainment, or ask about your overall budget status and savings rate.`;
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: Date.now().toString(),
      message: inputMessage,
      isUser: true,
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate AI processing time
    setTimeout(() => {
      const response = generateResponse(inputMessage);
      const botMessage = {
        id: (Date.now() + 1).toString(),
        message: response,
        isUser: false,
        timestamp: new Date().toISOString()
      };

      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsOpen(true)}
          className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 group"
        >
          <MessageCircle className="h-6 w-6 group-hover:animate-pulse" />
        </button>
        <div className="absolute -top-12 right-0 bg-gray-800 text-white px-3 py-1 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          Ask me about your finances!
        </div>
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div className={`bg-white rounded-2xl shadow-2xl border border-gray-200 transition-all duration-300 ${
        isMinimized ? 'w-80 h-16' : 'w-96 h-[500px]'
      }`}>
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-t-2xl flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
              <Bot className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-semibold">AI Finance Assistant</h3>
              {!isMinimized && <p className="text-xs text-blue-100">Online • Ready to help</p>}
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setIsMinimized(!isMinimized)}
              className="p-1 hover:bg-white/20 rounded-lg transition-colors"
            >
              {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 hover:bg-white/20 rounded-lg transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {!isMinimized && (
          <>
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 h-80">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs px-4 py-2 rounded-2xl ${
                      message.isUser
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    <div className="flex items-start space-x-2">
                      {!message.isUser && <Bot className="h-4 w-4 mt-1 flex-shrink-0" />}
                      <div className="flex-1">
                        <p className="text-sm">{message.message}</p>
                        <p className={`text-xs mt-1 ${message.isUser ? 'text-blue-100' : 'text-gray-500'}`}>
                          {new Date(message.timestamp).toLocaleTimeString()}
                        </p>
                      </div>
                      {message.isUser && <User className="h-4 w-4 mt-1 flex-shrink-0" />}
                    </div>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 text-gray-800 px-4 py-2 rounded-2xl max-w-xs">
                    <div className="flex items-center space-x-2">
                      <Bot className="h-4 w-4" />
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="border-t p-4">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask me about your finances..."
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-transparent text-sm"
                  disabled={isTyping}
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!inputMessage.trim() || isTyping}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-2 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ChatbotPopup;