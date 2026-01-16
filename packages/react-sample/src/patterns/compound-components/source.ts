export const compoundComponentsSource = `import React, { createContext, useContext, useState, ReactNode } from 'react';

// Tabs Context
interface TabsContextType {
  activeTab: string;
  setActiveTab: (id: string) => void;
}

const TabsContext = createContext<TabsContextType | null>(null);

// Tabs Root Component
interface TabsProps {
  defaultTab: string;
  children: ReactNode;
}

export function Tabs({ defaultTab, children }: TabsProps) {
  const [activeTab, setActiveTab] = useState(defaultTab);

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <div className="tabs">{children}</div>
    </TabsContext.Provider>
  );
}

// TabList Component
interface TabListProps {
  children: ReactNode;
}

function TabList({ children }: TabListProps) {
  return <div className="tab-list" role="tablist">{children}</div>;
}

// Tab Component
interface TabProps {
  id: string;
  children: ReactNode;
}

function Tab({ id, children }: TabProps) {
  const context = useContext(TabsContext);
  if (!context) throw new Error('Tab must be used within Tabs');

  const isActive = context.activeTab === id;

  return (
    <button
      role="tab"
      aria-selected={isActive}
      className={\`tab \${isActive ? 'active' : ''}\`}
      onClick={() => context.setActiveTab(id)}
      data-testid={\`tab-\${id}\`}
    >
      {children}
    </button>
  );
}

// TabPanel Component
interface TabPanelProps {
  id: string;
  children: ReactNode;
}

function TabPanel({ id, children }: TabPanelProps) {
  const context = useContext(TabsContext);
  if (!context) throw new Error('TabPanel must be used within Tabs');

  if (context.activeTab !== id) return null;

  return (
    <div role="tabpanel" data-testid="tab-panel" className="tab-panel">
      {children}
    </div>
  );
}

// Attach sub-components
Tabs.List = TabList;
Tabs.Tab = Tab;
Tabs.Panel = TabPanel;
`;
