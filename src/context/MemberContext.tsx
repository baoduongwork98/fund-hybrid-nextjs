'use client';
import { createContext, ReactNode, useContext, useState } from 'react';

const MemberContext = createContext<any>(null);

export const MemberProvider = ({ children }: { children: ReactNode }) => {
  const [memberId, setMemberId] = useState<string | null>(null);
  return (
    <MemberContext.Provider value={{ memberId, setMemberId }}>
      {children}
    </MemberContext.Provider>
  );
};

export const useMember = () => useContext(MemberContext);
