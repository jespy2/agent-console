import { Routes, Route, Navigate } from 'react-router-dom';

import { PoliciesPage } from '../features/policies/pages/PoliciesPage';
import { CasesPage } from '../features/cases/pages/CasesPage';
import { SettingsPage } from '../features/settings/pages/SettingsPage';

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<Navigate to='/policies' replace />} />
      
      <Route path='/policies' element={<PoliciesPage />} />
      <Route path='/cases' element={<CasesPage />} />
      <Route path='/settings' element={<SettingsPage />} />

      <Route path='*' element={<h1>404 - Not Found</h1>} />
    </Routes>
  )
}