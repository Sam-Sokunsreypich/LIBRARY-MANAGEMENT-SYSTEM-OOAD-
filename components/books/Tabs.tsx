
import { TabType } from '@/types/common';

interface TabsProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
}

const Tabs: React.FC<TabsProps> = ({ activeTab, setActiveTab }) => {
  return (
    <div className="border-b border-gray-200 px-6">
      <nav className="-mb-px flex space-x-8">
        <button
          onClick={() => setActiveTab('now')}
          className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
            activeTab === 'now'
              ? 'border-amber-500 text-amber-600'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
          }`}
        >
          Now
        </button>
        <button
          onClick={() => setActiveTab('history')}
          className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
            activeTab === 'history'
              ? 'border-amber-500 text-amber-600'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
          }`}
        >
          History
        </button>
      </nav>
    </div>
  );
};

export default Tabs;