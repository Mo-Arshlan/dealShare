import React from 'react';
import AdminLayout from './AdminLayout';
import { Loader2, Hammer } from 'lucide-react'; // Icons from lucide-react (optional)

const Admins = () => {
  return (
    <AdminLayout>
      <div className="flex flex-col items-center justify-center h-[80vh] text-center px-4">
        <Hammer size={48} className="text-yellow-600 mb-4" />
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Page Under Construction</h1>
        <p className="text-gray-600 text-lg mb-4">The Admins section is coming soon. Please check back later!</p>
        <Loader2 className="animate-spin text-gray-500" size={32} />
      </div>
    </AdminLayout>
  );
};

export default Admins;
