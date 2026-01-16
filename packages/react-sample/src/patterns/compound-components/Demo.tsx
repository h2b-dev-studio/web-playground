/**
 * Compound Components Demo - Tabs
 * @derives REQ-REACT-001
 */
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface TabsContextType {
  activeTab: string;
  setActiveTab: (id: string) => void;
}

const TabsContext = createContext<TabsContextType | null>(null);

interface TabsProps {
  defaultTab: string;
  children: ReactNode;
}

function TabsRoot({ defaultTab, children }: TabsProps) {
  const [activeTab, setActiveTab] = useState(defaultTab);

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <div className="tabs">{children}</div>
    </TabsContext.Provider>
  );
}

interface TabListProps {
  children: ReactNode;
}

function TabList({ children }: TabListProps) {
  return (
    <div className="tab-list" role="tablist">
      {children}
    </div>
  );
}

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
      className={`tab ${isActive ? 'active' : ''}`}
      onClick={() => context.setActiveTab(id)}
      data-testid={`tab-${id}`}
    >
      {children}
    </button>
  );
}

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

const Tabs = Object.assign(TabsRoot, {
  List: TabList,
  Tab: Tab,
  Panel: TabPanel,
});

interface DemoProps {
  defaultTab: string;
}

export function Demo({ defaultTab }: DemoProps) {
  return (
    <Tabs defaultTab={defaultTab}>
      <Tabs.List>
        <Tabs.Tab id="1">Tab 1</Tabs.Tab>
        <Tabs.Tab id="2">Tab 2</Tabs.Tab>
        <Tabs.Tab id="3">Tab 3</Tabs.Tab>
      </Tabs.List>
      <Tabs.Panel id="1">
        <p>Content for Tab 1</p>
        <p>This is the compound components pattern in action.</p>
      </Tabs.Panel>
      <Tabs.Panel id="2">
        <p>Content for Tab 2</p>
        <p>Each tab manages its own content while sharing state.</p>
      </Tabs.Panel>
      <Tabs.Panel id="3">
        <p>Content for Tab 3</p>
        <p>The parent Tabs component provides context to all children.</p>
      </Tabs.Panel>
    </Tabs>
  );
}
