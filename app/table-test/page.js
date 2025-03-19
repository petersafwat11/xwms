"use client";
import React, { useState, useEffect } from 'react';
import Wrapper from '@/ui/wrapper/Wrapper';

const requiredFields = [
  'name', 
  'email', 
  'role', 
  'is_active', 
  'account_status',
  'is_admin',
  'created_at'
];

const sortableFields = [
  'name', 
  'email', 
  'created_at'
];

const TestPage = () => {
  const [data, setData] = useState({
    data: {
      totalRecords: 5,
      data: [
        {
          id: 1,
          name: 'John Doe',
          email: 'john@example.com',
          role: 'Admin',
          is_active: 'Y',
          account_status: 'active',
          is_admin: 'Y',
          created_at: '2023-01-01'
        },
        {
          id: 2,
          name: 'Jane Smith',
          email: 'jane@example.com',
          role: 'User',
          is_active: 'N',
          account_status: 'inactive',
          is_admin: 'N',
          created_at: '2023-01-02'
        },
        {
          id: 3,
          name: 'Bob Johnson',
          email: 'bob@example.com',
          role: 'Manager',
          is_active: 'Y',
          account_status: 'pending',
          is_admin: 'N',
          created_at: '2023-01-03'
        },
        {
          id: 4,
          name: 'Alice Brown',
          email: 'alice@example.com',
          role: 'Editor',
          is_active: 'Y',
          account_status: 'processing',
          is_admin: 'N',
          created_at: '2023-01-04'
        },
        {
          id: 5,
          name: 'Charlie Wilson',
          email: 'charlie@example.com',
          role: 'Viewer',
          is_active: 'N',
          account_status: 'completed',
          is_admin: 'N',
          created_at: '2023-01-05'
        }
      ]
    }
  });

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Table Auto-Formatting Test</h1>
      <p className="mb-4">This page demonstrates automatic field formatting based on key names and values.</p>
      
      <div className="mb-4">
        <h2 className="text-lg font-semibold mb-2">Fields with automatic formatting:</h2>
        <ul className="list-disc pl-5">
          <li><strong>is_active</strong> - Shows as Active/Inactive with colored dot</li>
          <li><strong>account_status</strong> - Shows as a colored badge</li>
          <li><strong>is_admin</strong> - Shows as Yes/No</li>
        </ul>
      </div>
      
      <Wrapper
        data={data}
        requiredFields={requiredFields}
        sortableFields={sortableFields}
      />
    </div>
  );
};

export default TestPage;
