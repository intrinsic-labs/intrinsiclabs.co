'use client';

import { ReactNode } from 'react';
import { FormspreeProvider as FormspreeSDKProvider } from '@formspree/react';

interface FormspreeProviderProps {
  children: ReactNode;
}

export function FormspreeProvider({ children }: FormspreeProviderProps) {
  const projectId = process.env.NEXT_PUBLIC_FORMSPREE_PROJECT_ID;
  
  // If no project ID is set, just render the children
  if (!projectId) {
    console.warn('Formspree project ID not set. Form will not work.');
    return <>{children}</>;
  }
  
  return (
    <FormspreeSDKProvider project={projectId}>
      {children}
    </FormspreeSDKProvider>
  );
} 