import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Users, Home, Settings, Search, Edit, Trash2, LogOut, UserPlus, Filter, Database, BookOpen } from 'lucide-react';
import ChatBot from './ChatBot';

const AdminDashboard = ({ users = [], onLogout }) => {
  // Add useEffect for debugging
  useEffect(() => {
    console.log("AdminDashboard rendered", { users });
    // Force a reset of the users array if it's undefined
    if (!users || users.length === 0) {
      // Mock users data if none provided
      setMockUsers([
        { id: 1, email: "admin@aquagrow.com", fullName: "Admin User", role: "admin" },
        { id: 2, email: "farmer1@aquagrow.com", fullName: "John Farmer", role: "farmer", farmId: 1 },
        { id: 3, email: "owner1@aquagrow.com", fullName: "Sarah Owner", role: "owner" },
        { id: 4, email: "farmer2@aquagrow.com", fullName: "Mike Johnson", role: "farmer", farmId: 2 },
        { id: 5, email: "farmer3@aquagrow.com", fullName: "Priya Sharma", role: "farmer", farmId: 4 }
      ]);
    }
  }, [users]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('all');
  const [activeTab, setActiveTab] = useState('users');
  const [mockUsers, setMockUsers] = useState([]);
  const navigate = useNavigate();
  
  // Farm data (using same data as in FarmDashboard)
  const farmData = [
    {id: 1, name: "Green Valley Farm", location: "Chennai", status: "active", farmer: "Bob Smith"},
    {id: 2, name: "Blue Water Systems", location: "Madurai", status: "active", farmer: "Sarah Johnson"},
    {id: 3, name: "Eco Harvest", location: "Coimbatore", status: "active", farmer: "Ravi Kumar"},
    {id: 4, name: "Urban Greens", location: "Bangalore", status: "maintenance", farmer: "Priya Sharma"},
    {id: 5, name: "Coastal Aquatics", location: "Kochi", status: "active", farmer: "Vijay Menon"}
  ];
  
  // Use mockUsers if no users were provided
  const effectiveUsers = users.length > 0 ? users : mockUsers;
  
  // Filter users based on search term and role filter
  const filteredUsers = effectiveUsers.filter(user => {
    const matchesSearch = 
      user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (user.fullName && user.fullName.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesRole = selectedRole === 'all' || user.role === selectedRole;
    
    return matchesSearch && matchesRole;
  });

  const handleLogout = () => {
    if (typeof onLogout === 'function') {
      onLogout();
      navigate('/login');
    }
  };

  // Count users by role
  const userCounts = {
    total: effectiveUsers.length,
    farmers: effectiveUsers.filter(user => user.role === 'farmer').length,
    owners: effectiveUsers.filter(user => user.role === 'owner').length,
    admins: effectiveUsers.filter(user => user.role === 'admin').length
  };

  const handleAddUser = () => {
    navigate('/');
  };

  const getStatusBadge = (status) => {
    switch(status) {
      case 'active':
        return <span className="inline-flex items-center bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
          <span className="w-2 h-2 mr-1 bg-green-500 rounded-full"></span>Active
        </span>;
      case 'maintenance':
        return <span className="inline-flex items-center bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
          <span className="w-2 h-2 mr-1 bg-yellow-500 rounded-full"></span>Maintenance
        </span>;
      case 'inactive':
        return <span className="inline-flex items-center bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
          <span className="w-2 h-2 mr-1 bg-red-500 rounded-full"></span>Inactive
        </span>;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation bar */}
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <img 
                  src="https://cdn-icons-png.flaticon.com/512/4721/4721490.png" 
                  alt="Aquaponics logo" 
                  className="h-8 w-auto"
                />
                <span className="ml-2 text-xl font-bold text-emerald-600">AquaGrow Admin</span>
              </div>
              <div className="ml-6 hidden md:flex space-x-8">
                <button 
                  className={`${activeTab === 'users' ? 'border-emerald-500 text-gray-900' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
                  onClick={() => setActiveTab('users')}
                >
                  <Users className="h-4 w-4 mr-1.5" />
                  Users
                </button>
                <button 
                  className={`${activeTab === 'farms' ? 'border-emerald-500 text-gray-900' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
                  onClick={() => setActiveTab('farms')}
                >
                  <Home className="h-4 w-4 mr-1.5" />
                  Farms
                </button>
                <button 
                  className={`${activeTab === 'settings' ? 'border-emerald-500 text-gray-900' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
                  onClick={() => setActiveTab('settings')}
                >
                  <Settings className="h-4 w-4 mr-1.5" />
                  Settings
                </button>
              </div>
            </div>
            <div className="flex items-center">
              <button 
                onClick={handleLogout}
                className="ml-4 px-3 py-1.5 border border-transparent rounded-md text-sm font-medium text-gray-500 hover:text-gray-700 flex items-center"
              >
                <LogOut className="mr-1.5 h-4 w-4" />
                Sign out
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="mt-1 text-sm text-gray-500">Manage users, farms, and system settings</p>
          </div>
          <div className="mt-4 md:mt-0">
            <button 
              onClick={handleAddUser}
              className="px-4 py-2 bg-emerald-600 text-white rounded-lg shadow-sm hover:bg-emerald-700 flex items-center text-sm font-medium"
            >
              <UserPlus className="mr-1.5 h-4 w-4" />
              Add New User
            </button>
          </div>
        </div>

        {/* Stats cards */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-4 mb-8">
          <div className="bg-white overflow-hidden shadow-sm rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-emerald-100 rounded-md p-3">
                  <Users className="h-6 w-6 text-emerald-600" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Total Users</dt>
                    <dd className="flex items-baseline">
                      <div className="text-2xl font-semibold text-gray-900">{userCounts.total}</div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow-sm rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-blue-100 rounded-md p-3">
                  <User className="h-6 w-6 text-blue-600" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Farmers</dt>
                    <dd className="flex items-baseline">
                      <div className="text-2xl font-semibold text-gray-900">{userCounts.farmers}</div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow-sm rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-amber-100 rounded-md p-3">
                  <User className="h-6 w-6 text-amber-600" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Farm Owners</dt>
                    <dd className="flex items-baseline">
                      <div className="text-2xl font-semibold text-gray-900">{userCounts.owners}</div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow-sm rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-purple-100 rounded-md p-3">
                  <Database className="h-6 w-6 text-purple-600" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Total Farms</dt>
                    <dd className="flex items-baseline">
                      <div className="text-2xl font-semibold text-gray-900">{farmData.length}</div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content based on selected tab */}
        {activeTab === 'users' && (
          <div className="bg-white shadow-sm rounded-lg overflow-hidden">
            <div className="border-b border-gray-200 bg-gray-50 px-6 py-4 flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
              <h2 className="text-lg font-medium text-gray-900">User Management</h2>
              
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-4 w-4 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    className="block w-full pl-10 pr-4 py-2 border border-gray-200 rounded-md text-sm"
                    placeholder="Search users..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                
                <select 
                  className="block w-full sm:w-auto border border-gray-200 rounded-md text-sm py-2 pl-3 pr-10"
                  value={selectedRole}
                  onChange={(e) => setSelectedRole(e.target.value)}
                >
                  <option value="all">All Roles</option>
                  <option value="farmer">Farmers</option>
                  <option value="owner">Farm Owners</option>
                  <option value="admin">Administrators</option>
                </select>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr className="bg-gray-50">
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      User
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Role
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Farm
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredUsers.length > 0 ? (
                    filteredUsers.map((user, index) => (
                      <tr key={user.id || index} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
                              {user.fullName ? user.fullName.charAt(0).toUpperCase() : user.email.charAt(0).toUpperCase()}
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{user.fullName || 'N/A'}</div>
                              <div className="text-sm text-gray-500">{user.email}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize
                            ${user.role === 'admin' ? 'bg-purple-100 text-purple-800' : ''}
                            ${user.role === 'owner' ? 'bg-amber-100 text-amber-800' : ''}
                            ${user.role === 'farmer' ? 'bg-blue-100 text-blue-800' : ''}
                          `}>
                            {user.role}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {user.role === 'farmer' && user.farmId ? `Farm #${user.farmId}` : '-'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button className="text-indigo-600 hover:text-indigo-900 mr-4">
                            <Edit className="h-4 w-4" />
                          </button>
                          <button className="text-red-600 hover:text-red-900">
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="px-6 py-10 text-center text-sm text-gray-500">
                        <Filter className="h-8 w-8 mx-auto mb-4 text-gray-400" />
                        <p>No users found matching your search criteria.</p>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            
            {users.length > 0 && (
              <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
                <div className="text-sm text-gray-500">
                  Showing <span className="font-medium">{filteredUsers.length}</span> of <span className="font-medium">{users.length}</span> users
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'farms' && (
          <div className="bg-white shadow-sm rounded-lg overflow-hidden">
            <div className="border-b border-gray-200 bg-gray-50 px-6 py-4">
              <h2 className="text-lg font-medium text-gray-900">Farm Management</h2>
            </div>
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr className="bg-gray-50">
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Farm ID
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Location
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Assigned Farmer
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {farmData.map((farm) => (
                    <tr key={farm.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        #{farm.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {farm.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {farm.location}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {getStatusBadge(farm.status)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {farm.farmer}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button className="text-indigo-600 hover:text-indigo-900 mr-4">
                          <Edit className="h-4 w-4" />
                        </button>
                        <button className="text-red-600 hover:text-red-900">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="bg-white shadow-sm rounded-lg overflow-hidden">
            <div className="border-b border-gray-200 bg-gray-50 px-6 py-4">
              <h2 className="text-lg font-medium text-gray-900">System Settings</h2>
            </div>
            
            <div className="p-6">
              <div className="space-y-6">
                <div>
                  <h3 className="text-md font-medium text-gray-900 mb-3 flex items-center">
                    <BookOpen className="h-5 w-5 text-emerald-500 mr-2" />
                    System Information
                  </h3>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-500">Version</p>
                        <p className="font-medium">AquaGrow 1.0.0</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Last Updated</p>
                        <p className="font-medium">{new Date().toLocaleDateString()}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Database Status</p>
                        <p className="font-medium text-green-600">Connected</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">API Status</p>
                        <p className="font-medium text-green-600">Online</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-md font-medium text-gray-900 mb-3 flex items-center">
                    <Settings className="h-5 w-5 text-emerald-500 mr-2" />
                    General Settings
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        System Name
                      </label>
                      <input
                        type="text"
                        className="block w-full max-w-lg border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
                        value="AquaGrow Management System"
                        readOnly
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Contact Email
                      </label>
                      <input
                        type="email"
                        className="block w-full max-w-lg border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
                        value="admin@aquagrow.com"
                        readOnly
                      />
                    </div>
                    <div className="pt-3">
                      <button
                        type="button"
                        className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
                      >
                        Save Changes
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Add the ChatBot component */}
      <ChatBot />
    </div>
  );
};

export default AdminDashboard;
