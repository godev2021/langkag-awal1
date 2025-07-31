'use client';

import React, { useState, createContext, useContext } from 'react';

const TabsContext = createContext();

export function Tabs({ defaultValue, children, className }) {
  const [value, setValue] = useState(defaultValue);

  return (
    <TabsContext.Provider value={{ value, setValue }}>
      <div className={className}>{children}</div>
    </TabsContext.Provider>
  );
}

export function TabsList({ children, className = '' }) {
  return <div role='tablist' className={`tabs tabs-lift ${className}`}>{children}</div>;
}

export function TabsTrigger({ value, children }) {
  const ctx = useContext(TabsContext);
  if (!ctx) throw new Error('TabsTrigger must be used within Tabs');

  const isActive = ctx.value === value;

  return (
    <a
      className={`tab ${isActive ? 'tab-active' : ''}`}
      onClick={() => ctx.setValue(value)}
    >
      {children}
    </a>
  );
}

export function TabsContent({ value, children, className = '' }) {
  const ctx = useContext(TabsContext);
  if (!ctx) throw new Error('TabsContent must be used within Tabs');

  if (ctx.value !== value) return null;

  return <div className={className}>{children}</div>;
}
