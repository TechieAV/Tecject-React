import React, { useState } from 'react';
import { Box } from '@mui/material';
import AdminSidebar from './AdminSidebar';

// Temporary page mappings using your existing components
import About from '../About/About';
import Home from '../Home/Home';
import HomePageSection from '../MainPage/HomePageSection';
import MainPage from '../MainPage/mainPage';
import AddProject from './AddProjects';
import ViewProjects from './ViewProject';
import EnterpriseList from './EnterPriseList';
import StudentPurchaseTable from './StudentPurchasedDetails';
import EnterprisePurchases from '../EnterprisesPurchases/EnterprisesPurchases';
import ReportPage from '../ReportPage/ReportPage';
import Dashboard from '../Dashboard/Dashboard';
import AdminReceipts from './AdminReceipts';

const AdminLayout = () => {
  const [selectedMenu, setSelectedMenu] = useState('Dashboard');

  const renderContent = () => {
    switch (selectedMenu) {
      case 'Dashboard':
        return <Dashboard/>; // Placeholder
      case 'Enterprise Details':
        return <EnterpriseList/>; // Placeholder
      case 'Add Project':
        return <AddProject/>; // Placeholder
      case 'Update Project':
        return <ViewProjects />; // Placeholder
      case 'View Orders':
        return <AdminReceipts/>; // Placeholder text
      case 'Reports':
        return <ReportPage/>; // Reuse for now
      case 'Enterprises Purchase Details':
        return <EnterprisePurchases/>
      default:
        return <div>Page Not Found</div>;
    }
  };

  return (
    <Box display="flex">
      <AdminSidebar selected={selectedMenu} onSelect={setSelectedMenu} />
      <Box flexGrow={1} p={3}>
        {renderContent()}
      </Box>
    </Box>
  );
};

export default AdminLayout;
