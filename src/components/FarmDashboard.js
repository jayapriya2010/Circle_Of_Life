import React, { useState, useEffect } from 'react';
import Webcam from 'react-webcam';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { MapPin, User, Thermometer, Droplet, Activity, ArrowLeft, Clock, Phone, Award, Leaf, Zap, Filter, CloudRain, Search, RefreshCw, ChevronDown, Bell, Settings, Calendar, BarChart2, PieChart, TrendingUp, LogOut } from 'lucide-react';
import Card from './ui/Card';
import CardHeader from './ui/CardHeader';
import CardContent from './ui/CardContent';
import CardTitle from './ui/CardTitle';
import CardFooter from './ui/CardFooter';
import ChatBot from './ChatBot';
import farm2Image from '../images/farm2.png';
import farm1Image from '../images/farm1.png'
import farm3Image from '../images/farm3.png'
import farm4Image from '../images/farm4.png'
import farm5Image from '../images/farm5.png'

const farmData = [
  {
    id: 1,
    name: "Green Valley Farm",
    location: "123 Farm Road, Chennai",
    coordinates: "CHENNAI",
    type: "Tilapia & Leafy Greens",
    status: "active",
    lastHarvest: "2023-05-15",
    image: farm1Image,
    farmer: {
      name: "John Smith",
      contact: "+91 790-433-2119",
      experience: "5 years",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80"
    },
    wsEndpoint: 'ws://192.168.90.224:81'
  },
  {
    id: 2,
    name: "Blue Water Systems",
    location: "456 River Lane, Madurai",
    coordinates: "MADURAI",
    type: "Carp & Herbs",
    status: "active",
    lastHarvest: "2023-06-10",
    image: farm2Image,
    farmer: {
      name: "Sarah Johnson",
      contact: "+91 994-045-8344",
      experience: "3 years",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1461&q=80"
    },
    wsEndpoint: 'ws://192.168.90.224:81'
  },
  {
    id: 3,
    name: "Eco Harvest",
    location: "789 Garden Blvd, Coimbatore",
    coordinates: "COIMBATORE",
    type: "Catfish & Tomatoes",
    status: "active",
    lastHarvest: "2023-07-22",
    image: farm3Image,
    farmer: {
      name: "Ravi Kumar",
      contact: "+91 822-101-4578",
      experience: "7 years",
      image: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80"
    },
    wsEndpoint: 'ws://192.168.90.224:81'
  },
  {
    id: 4,
    name: "Urban Greens",
    location: "321 Tech Park, Bangalore",
    coordinates: "BANGALORE",
    type: "Mixed Fish & Lettuce",
    status: "maintenance",
    lastHarvest: "2023-04-05",
    image: farm4Image,
    farmer: {
      name: "Priya Sharma",
      contact: "+91 909-335-6677",
      experience: "2 years",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1376&q=80"
    },
    wsEndpoint: 'ws://192.168.90.224:81'
  },
  {
    id: 5,
    name: "Coastal Aquatics",
    location: "567 Beach Road, Kochi",
    coordinates: "KOCHI",
    type: "Shrimp & Spinach",
    status: "active",
    lastHarvest: "2023-08-01",
    image: farm5Image,
    farmer: {
      name: "Vijay Menon",
      contact: "+91 855-667-9812",
      experience: "4 years",
      image: "https://images.unsplash.com/photo-1566753323558-f4e0952af115?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80"
    },
    wsEndpoint: 'ws://192.168.90.224:81'
  }
];

const FarmDashboard = ({ user, onLogout }) => {
  const [selectedFarm, setSelectedFarm] = useState(null);
  const [sensorData, setSensorData] = useState({
    tempC: 0,
    tempF: 0,
    waterLevel: 0,
    ph: 0,
    dissolved_oxygen: 0,
    humidity: 0
  });
  const [historicalData, setHistoricalData] = useState([]);
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [viewMode, setViewMode] = useState("grid");
  const [selectedTimeRange, setSelectedTimeRange] = useState("24h");

  // Filter farms based on user role
  const filteredFarmData = React.useMemo(() => {
    if (!user) return farmData;
    
    // If user is a farmer, only show the farm they are assigned to
    if (user.role === 'farmer' && user.farmId) {
      return farmData.filter(farm => farm.id.toString() === user.farmId.toString());
    }
    // If user is an owner or admin, show all farms
    return farmData;
  }, [user]);

  // WebSocket and data handling logic
  useEffect(() => {
    if (!selectedFarm) return;
    const ws = new WebSocket(selectedFarm.wsEndpoint);

    ws.onmessage = (event) => {
      try {
        const data = event.data.split(',');
        const newData = {
          tempC: parseFloat(data[0] || Math.random() * 5 + 25),
          tempF: parseFloat(data[1] || Math.random() * 9 + 77),
          waterLevel: parseFloat(data[2] || Math.random() * 2 + 8),
          ph: Math.random() * 1 + 6.5,
          dissolved_oxygen: Math.random() * 2 + 6,
          humidity: Math.random() * 15 + 65,
          timestamp: new Date().toLocaleTimeString('en-US', {
            hour12: false,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
          })
        };

        setSensorData(newData);
        setHistoricalData(prevData => {
          const updatedData = [...prevData, newData];
          return updatedData.slice(-20);
        });
      } catch (error) {
        console.error('Error processing WebSocket data:', error);
      }
    };

    ws.onopen = () => console.log('WebSocket Connected');
    ws.onerror = (error) => console.error('WebSocket Error:', error);
    ws.onclose = () => console.log('WebSocket Disconnected');

    return () => {
      if (ws.readyState === WebSocket.OPEN) {
        ws.close();
      }
    };
  }, [selectedFarm]);

  // Initialize historical data
  useEffect(() => {
    if (selectedFarm && historicalData.length === 0) {
      const initialData = Array.from({ length: 20 }, (_, i) => {
        const date = new Date();
        date.setSeconds(date.getSeconds() - (19 - i) * 5);
        return {
          tempC: Math.random() * 5 + 25,
          tempF: Math.random() * 9 + 77,
          waterLevel: Math.random() * 2 + 8,
          ph: Math.random() * 1 + 6.5,
          dissolved_oxygen: Math.random() * 2 + 6,
          humidity: Math.random() * 15 + 65,
          timestamp: date.toLocaleTimeString('en-US', {
            hour12: false,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
          })
        };
      });
      setHistoricalData(initialData);
    }
  }, [selectedFarm, historicalData.length]);

  // Add refresh animation
  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1000);
  };

  const filteredFarms = filteredFarmData.filter(farm => {
    // Apply filters
    if (activeFilter !== "all" && farm.status !== activeFilter) {
      return false;
    }
    
    // Apply search
    if (searchTerm && !farm.name.toLowerCase().includes(searchTerm.toLowerCase()) && 
        !farm.coordinates.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !farm.type.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    
    return true;
  });

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

  const handleLogoutClick = () => {
    if (typeof onLogout === 'function') {
      onLogout();
    }
  };

  const FarmList = () => (
    <div className="space-y-6">
      {/* Dashboard header with stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card variant="glass" className="col-span-full md:col-span-2 bg-gradient-to-r from-emerald-500/90 to-green-600/90 text-white">
          <CardContent padding="normal" className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold tracking-tight mb-1">Welcome {user?.fullName || 'to AquaGrow'}</h2>
              <p className="text-emerald-50/90">
                {user?.role === 'farmer' ? 'Managing your farm system' : 
                 user?.role === 'owner' ? `Overseeing ${filteredFarmData.length} farm systems` :
                 'Managing aquaponics systems'}
              </p>
            </div>
            <div className="flex space-x-2">
              <button className="p-2 rounded-full hover:bg-white/10 transition-colors">
                <Bell className="h-5 w-5" />
              </button>
              <button className="p-2 rounded-full hover:bg-white/10 transition-colors">
                <Settings className="h-5 w-5" />
              </button>
            </div>
          </CardContent>
        </Card>
        
        <StatCard 
          title="Active Farms" 
          value={filteredFarmData.filter(f => f.status === 'active').length} 
          total={filteredFarmData.length}
          icon={<Leaf className="h-5 w-5 text-emerald-500" />}
          trend={10}
        />
        
        <StatCard 
          title="Water Quality" 
          value="Good" 
          subtext="All parameters normal"
          icon={<Droplet className="h-5 w-5 text-blue-500" />}
          bgClass="bg-blue-50"
        />
        
        <StatCard 
          title="Last Harvest" 
          value="May 15" 
          subtext="293.5 kg total"
          icon={<Calendar className="h-5 w-5 text-amber-500" />}
          bgClass="bg-amber-50"
        />
        
        <StatCard 
          title="System Health" 
          value="98%" 
          subtext="Excellent condition"
          icon={<Activity className="h-5 w-5 text-green-500" />}
          trend={3}
          bgClass="bg-green-50"
        />
      </div>

      {/* Advanced filters and search */}
      <div className="bg-white rounded-xl shadow-sm p-4 md:p-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
          <div>
            <h2 className="text-lg font-semibold text-gray-800">
              {user?.role === 'farmer' ? 'Your Farm System' : 
               user?.role === 'owner' ? 'Your Farm Systems' :
               'Farm Systems'}
            </h2>
            <p className="text-sm text-gray-500">Monitor and manage your aquaponics farms</p>
          </div>
          
          <div className="flex items-center gap-3 flex-wrap">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search farms..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-full md:w-auto border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm"
              />
            </div>
            
            <div className="flex items-center">
              <button 
                onClick={() => setViewMode("grid")} 
                className={`p-2 rounded-l-lg border border-r-0 border-gray-300 ${viewMode === "grid" ? "bg-emerald-50 text-emerald-600 border-emerald-300" : "bg-white text-gray-500"}`}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path>
                </svg>
              </button>
              <button 
                onClick={() => setViewMode("list")} 
                className={`p-2 rounded-r-lg border border-gray-300 ${viewMode === "list" ? "bg-emerald-50 text-emerald-600 border-emerald-300" : "bg-white text-gray-500"}`}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                </svg>
              </button>
            </div>
            
            <button
              onClick={handleRefresh}
              className="p-2 bg-white rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors text-gray-600"
            >
              <RefreshCw className={`w-4 h-4 ${isRefreshing ? "animate-spin" : ""}`} />
            </button>
          </div>
        </div>
        
        {/* Role-based access control for filters */}
        {user?.role !== 'farmer' && (
          <div className="flex flex-wrap gap-2">
            <button 
              className={`px-4 py-2 text-sm font-medium rounded-full transition-colors ${activeFilter === 'all' ? 'bg-emerald-100 text-emerald-800 border border-emerald-200 shadow-sm' : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'}`}
              onClick={() => setActiveFilter('all')}
            >
              All Farms
            </button>
            <button 
              className={`px-4 py-2 text-sm font-medium rounded-full transition-colors ${activeFilter === 'active' ? 'bg-emerald-100 text-emerald-800 border border-emerald-200 shadow-sm' : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'}`}
              onClick={() => setActiveFilter('active')}
            >
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                Active
              </span>
            </button>
            <button 
              className={`px-4 py-2 text-sm font-medium rounded-full transition-colors ${activeFilter === 'maintenance' ? 'bg-emerald-100 text-emerald-800 border border-emerald-200 shadow-sm' : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'}`}
              onClick={() => setActiveFilter('maintenance')}
            >
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
                Maintenance
              </span>
            </button>
            <button 
              className={`px-4 py-2 text-sm font-medium rounded-full transition-colors ${activeFilter === 'inactive' ? 'bg-emerald-100 text-emerald-800 border border-emerald-200 shadow-sm' : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'}`}
              onClick={() => setActiveFilter('inactive')}
            >
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                Inactive
              </span>
            </button>
          </div>
        )}
      </div>
      
      {/* Show farmer view directly if user is a farmer and there's only one farm */}
      {user?.role === 'farmer' && filteredFarms.length === 1 ? (
        <div className="text-center py-8">
          <button
            onClick={() => setSelectedFarm(filteredFarms[0])}
            className="px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition-colors"
          >
            View Your Farm Dashboard
          </button>
        </div>
      ) : (
        <>
          {viewMode === "grid" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredFarms.length > 0 ? (
                filteredFarms.map((farm) => (
                  <Card 
                    key={farm.id} 
                    variant="elevated"
                    className="overflow-hidden group cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                    onClick={() => setSelectedFarm(farm)}
                  >
                    <div className="h-48 bg-gray-200 relative overflow-hidden">
                      <img 
                        src={farm.image} 
                        alt={farm.name}
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <div className="absolute top-3 right-3">
                        {getStatusBadge(farm.status)}
                      </div>
                    </div>
                    
                    <CardContent className="space-y-4 relative">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 flex items-center group-hover:text-emerald-600 transition-colors duration-300">
                          {farm.name}
                        </h3>
                        <div className="flex items-center mt-1 text-sm text-gray-500">
                          <MapPin className="h-3.5 w-3.5 text-emerald-500 mr-1 flex-shrink-0" />
                          {farm.coordinates}
                        </div>
                      </div>
                      
                      <div className="flex items-center text-sm text-gray-700">
                        <Leaf className="h-4 w-4 text-emerald-500 mr-1.5 flex-shrink-0" />
                        {farm.type}
                      </div>
                      
                      <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                        <div className="flex items-center">
                          <div className="h-8 w-8 rounded-full overflow-hidden ring-2 ring-white mr-2 shadow-sm">
                            <img 
                              src={farm.farmer.image} 
                              alt={farm.farmer.name}
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <span className="text-sm text-gray-700">{farm.farmer.name}</span>
                        </div>
                        
                        <div className="flex items-center text-xs text-gray-500 bg-gray-50 px-2 py-1 rounded-full">
                          <Clock className="h-3 w-3 mr-1" />
                          <span>Real-time</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <div className="col-span-full text-center py-10">
                  <div className="bg-gray-50 rounded-lg p-8 inline-block mx-auto">
                    <Filter className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-1">No farms found</h3>
                    <p className="text-gray-500">Try adjusting your search or filters</p>
                    <button 
                      onClick={() => {setSearchTerm(''); setActiveFilter('all');}}
                      className="mt-4 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50"
                    >
                      Reset filters
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <Card variant="default" className="overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Farm</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Manager</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredFarms.length > 0 ? (
                      filteredFarms.map((farm) => (
                        <tr 
                          key={farm.id} 
                          className="hover:bg-gray-50 cursor-pointer transition-colors"
                          onClick={() => setSelectedFarm(farm)}
                        >
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="h-10 w-10 rounded-md overflow-hidden flex-shrink-0">
                                <img src={farm.image} alt={farm.name} className="h-full w-full object-cover" />
                              </div>
                              <div className="ml-3">
                                <div className="text-sm font-medium text-gray-900">{farm.name}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-500">{farm.coordinates}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{farm.type}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="h-8 w-8 rounded-full overflow-hidden mr-2">
                                <img src={farm.farmer.image} alt={farm.farmer.name} className="h-full w-full object-cover" />
                              </div>
                              <div className="text-sm text-gray-900">{farm.farmer.name}</div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {getStatusBadge(farm.status)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <button className="text-emerald-600 hover:text-emerald-900">View Details</button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={6} className="px-6 py-12 text-center">
                          <Filter className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                          <p className="text-gray-500">No farms matching your filters</p>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </Card>
          )}
        </>
      )}
    </div>
  );

  const StatCard = ({ title, value, subtext, icon, trend, bgClass = "bg-gray-50" }) => (
    <Card variant="elevated" className={`${bgClass}`}>
      <CardContent className="p-4">
        <div className="flex justify-between">
          <div>
            <p className="text-sm text-gray-500 font-medium">{title}</p>
            <div className="flex items-end gap-2">
              <p className="text-2xl font-bold text-gray-800 mt-1">{value}</p>
              {trend && (
                <div className={`flex items-center text-xs ${trend > 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {trend > 0 ? (
                    <TrendingUp size={12} className="mr-0.5" />
                  ) : (
                    <TrendingUp size={12} className="mr-0.5 transform rotate-180" />
                  )}
                  {Math.abs(trend)}%
                </div>
              )}
            </div>
            {subtext && <p className="text-xs text-gray-500 mt-0.5">{subtext}</p>}
          </div>
          <div className="p-2 rounded-md bg-white shadow-sm">
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const FarmDetail = ({ farm }) => (
    <div className="space-y-8">
      {/* Back navigation and header */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => setSelectedFarm(null)}
          className="flex items-center gap-2 text-gray-700 hover:text-emerald-700 transition-colors group"
        >
          <div className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center group-hover:bg-emerald-50 group-hover:text-emerald-600 transition-colors">
            <ArrowLeft className="h-4 w-4" />
          </div>
          <span>Back to Farm List</span>
        </button>
        
        <div className="flex items-center gap-3">
          {getStatusBadge(farm.status)}
          <button
            onClick={handleRefresh}
            className="p-2 bg-white rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors text-gray-600"
          >
            <RefreshCw className={`w-4 h-4 ${isRefreshing ? "animate-spin" : ""}`} />
          </button>
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative h-72 sm:h-80 md:h-96 rounded-2xl overflow-hidden shadow-lg">
        <img 
          src={farm.image}
          alt={farm.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
        <div className="absolute bottom-0 left-0 p-6 text-white w-full">
          <div className="flex flex-col md:flex-row md:items-end justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="h-16 w-16 rounded-full overflow-hidden border-2 border-white shadow-lg">
                  <img 
                    src={farm.farmer.image} 
                    alt={farm.farmer.name}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div>
                  <h1 className="text-3xl font-bold tracking-tight">{farm.name}</h1>
                  <p className="text-white/80 flex items-center gap-1.5">
                    <MapPin className="h-4 w-4" />
                    {farm.coordinates}
                  </p>
                </div>
              </div>
              <p className="flex items-center gap-2 text-white/90 mt-1">
                <Leaf className="h-4 w-4" />
                {farm.type}
              </p>
            </div>

            <div className="mt-4 md:mt-0 flex flex-col sm:flex-row items-start sm:items-center gap-3">
              <div className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-full">
                <p className="text-sm font-medium">Last Harvest: <span className="text-white/80">{farm.lastHarvest}</span></p>
              </div>
              <button className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 rounded-full text-sm font-medium transition-colors">
                View Reports
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Quick stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card variant="glass" className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
          <CardContent className="p-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-blue-100">Temperature</p>
                <p className="text-3xl font-bold mt-1">{sensorData.tempC.toFixed(1)}°C</p>
                <p className="text-xs text-blue-100 mt-1">Normal range: 24-28°C</p>
              </div>
              <div className="p-2 rounded-full bg-white/10">
                <Thermometer className="h-5 w-5" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card variant="glass" className="bg-gradient-to-br from-emerald-500 to-emerald-600 text-white">
          <CardContent className="p-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-emerald-100">Water Level</p>
                <p className="text-3xl font-bold mt-1">{sensorData.waterLevel.toFixed(2)}m</p>
                <p className="text-xs text-emerald-100 mt-1">Optimal: 7-10m</p>
              </div>
              <div className="p-2 rounded-full bg-white/10">
                <Droplet className="h-5 w-5" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card variant="glass" className="bg-gradient-to-br from-amber-500 to-amber-600 text-white">
          <CardContent className="p-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-amber-100">pH Level</p>
                <p className="text-3xl font-bold mt-1">{sensorData.ph.toFixed(1)}</p>
                <p className="text-xs text-amber-100 mt-1">Ideal: 6.5-7.5</p>
              </div>
              <div className="p-2 rounded-full bg-white/10">
                <Filter className="h-5 w-5" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card variant="glass" className="bg-gradient-to-br from-indigo-500 to-indigo-600 text-white">
          <CardContent className="p-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-indigo-100">Dissolved O₂</p>
                <p className="text-3xl font-bold mt-1">{sensorData.dissolved_oxygen.toFixed(1)} mg/L</p>
                <p className="text-xs text-indigo-100 mt-1">Target: {'>'}6 mg/L</p>
              </div>
              <div className="p-2 rounded-full bg-white/10">
                <Zap className="h-5 w-5" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Farmer details card */}
        <Card variant="elevated">
          <CardHeader variant="colored" className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
            <CardTitle size="medium" className="flex items-center gap-2">
              <User className="h-5 w-5 text-blue-600" />
              Farmer Details
            </CardTitle>
          </CardHeader>
          
          <CardContent className="space-y-4">
            <div className="flex flex-col items-center py-4">
              <div className="h-24 w-24 rounded-full overflow-hidden border-4 border-gray-100 shadow-md mb-3">
                <img 
                  src={farm.farmer.image} 
                  alt={farm.farmer.name}
                  className="h-full w-full object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold text-gray-800">{farm.farmer.name}</h3>
              <p className="text-sm text-gray-500">Farm Manager • {farm.farmer.experience}</p>
            </div>
            
            <div className="space-y-4 pt-4 border-t border-gray-100">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-50 rounded-md">
                  <Phone className="h-5 w-5 text-blue-500" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Contact</p>
                  <p className="font-medium">{farm.farmer.contact}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-amber-50 rounded-md">
                  <Award className="h-5 w-5 text-amber-500" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Experience</p>
                  <p className="font-medium">{farm.farmer.experience}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-emerald-50 rounded-md">
                  <MapPin className="h-5 w-5 text-emerald-500" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Location</p>
                  <p className="font-medium">{farm.location}</p>
                </div>
              </div>
            </div>
            
            <button className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
              Contact Farmer
            </button>
          </CardContent>
        </Card>

        {/* Real-time metrics expanded */}
        <Card variant="elevated" className="lg:col-span-2">
          <CardHeader variant="colored" className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200 flex items-center justify-between">
            <CardTitle size="medium" className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-blue-600" />
              Additional Metrics
            </CardTitle>
            <span className="text-xs bg-blue-100 text-blue-800 px-2.5 py-1 rounded-full flex items-center gap-1">
              <span className="animate-pulse w-2 h-2 bg-blue-500 rounded-full"></span>
              Live Data
            </span>
          </CardHeader>
          
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Thermometer className="h-5 w-5 text-red-500" />
                  <span className="text-sm font-medium text-red-700">Temperature (°F)</span>
                </div>
                <p className="text-3xl font-bold text-red-700">{sensorData.tempF.toFixed(1)}°F</p>
                <div className="mt-2 text-xs text-red-600/70">
                  Normal range: 75-82°F
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-cyan-50 to-cyan-100 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <CloudRain className="h-5 w-5 text-cyan-500" />
                  <span className="text-sm font-medium text-cyan-700">Humidity</span>
                </div>
                <p className="text-3xl font-bold text-cyan-700">{sensorData.humidity.toFixed(1)}%</p>
                <div className="mt-2 text-xs text-cyan-600/70">
                  Ideal range: 65-80%
                </div>
              </div>
            </div>
            
            <div className="mt-4 p-4 bg-gradient-to-br from-violet-50 to-violet-100 rounded-xl">
              <div className="mb-3 flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <BarChart2 className="h-5 w-5 text-violet-500" />
                  <span className="text-sm font-medium text-violet-700">Water Quality Score</span>
                </div>
                <span className="px-2 py-0.5 bg-violet-200 text-violet-800 rounded-md text-xs font-medium">Excellent</span>
              </div>
              
              <div className="space-y-2">
                <div>
                  <div className="flex justify-between text-xs text-violet-700 mb-1">
                    <span>pH Balance</span>
                    <span>97%</span>
                  </div>
                  <div className="w-full h-2 bg-violet-200 rounded-full overflow-hidden">
                    <div className="h-full bg-violet-500 rounded-full" style={{width: "97%"}}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-xs text-violet-700 mb-1">
                    <span>Oxygen Levels</span>
                    <span>92%</span>
                  </div>
                  <div className="w-full h-2 bg-violet-200 rounded-full overflow-hidden">
                    <div className="h-full bg-violet-500 rounded-full" style={{width: "92%"}}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-xs text-violet-700 mb-1">
                    <span>Cleanliness</span>
                    <span>95%</span>
                  </div>
                  <div className="w-full h-2 bg-violet-200 rounded-full overflow-hidden">
                    <div className="h-full bg-violet-500 rounded-full" style={{width: "95%"}}></div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Webcam Component */}
        <Card variant="elevated">
          <CardHeader variant="colored" className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200 flex items-center justify-between">
            <CardTitle size="medium" className="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5 text-blue-600">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              Live Webcam Feed
            </CardTitle>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
              <span className="text-xs text-gray-500">LIVE</span>
            </div>
          </CardHeader>
          
          <CardContent className="p-0">
            <div className="relative">
              <Webcam className="w-full h-[300px] object-cover" />
              <div className="absolute bottom-3 left-3 px-2 py-1 bg-black/60 text-white text-xs rounded">
                {new Date().toLocaleTimeString()}
              </div>
            </div>
          </CardContent>
          
          <CardFooter variant="colored" className="flex justify-between items-center bg-gradient-to-r from-gray-50 to-gray-100">
            <div className="text-sm text-gray-600">Stream Quality: HD</div>
            <div className="flex gap-2">
              <button className="p-1.5 bg-gray-200 hover:bg-gray-300 rounded-md transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4 text-gray-700">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </button>
              <button className="p-1.5 bg-gray-200 hover:bg-gray-300 rounded-md transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4 text-gray-700">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </button>
              <button className="p-1.5 bg-gray-200 hover:bg-gray-300 rounded-md transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4 text-gray-700">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </button>
            </div>
          </CardFooter>
        </Card>

        {/* Historical temperature data */}
        <Card variant="elevated">
          <CardHeader variant="colored" className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200 flex items-center justify-between">
            <CardTitle size="medium" className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-blue-600" />
              Historical Temperature Data
            </CardTitle>
            
            <div className="flex items-center space-x-1 bg-white border border-gray-200 rounded-lg divide-x">
              {['6h', '24h', '7d'].map((range) => (
                <button
                  key={range}
                  onClick={() => setSelectedTimeRange(range)}
                  className={`px-3 py-1 text-xs font-medium ${selectedTimeRange === range 
                    ? 'bg-blue-50 text-blue-600' 
                    : 'text-gray-600 hover:bg-gray-50'}`}
                >
                  {range}
                </button>
              ))}
            </div>
          </CardHeader>
          
          <CardContent className="p-4">
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={historicalData}>
                <defs>
                  <linearGradient id="tempGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8884d8" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" opacity={0.2} vertical={false} />
                <XAxis 
                  dataKey="timestamp" 
                  tick={{ fontSize: 11 }}
                  tickLine={false}
                  axisLine={false}
                  tickMargin={10}
                />
                <YAxis 
                  tick={{ fontSize: 11 }} 
                  tickLine={false}
                  axisLine={false}
                  tickMargin={10}
                />
                <Tooltip 
                  contentStyle={{ 
                    borderRadius: '8px', 
                    boxShadow: '0 2px 10px rgba(0,0,0,0.1)', 
                    border: 'none' 
                  }} 
                  labelStyle={{ fontWeight: 'bold', marginBottom: '5px' }}
                />
                <Legend wrapperStyle={{ paddingTop: '15px', fontSize: '12px' }} />
                <Area 
                  type="monotone" 
                  dataKey="tempC" 
                  stroke="#8884d8" 
                  fill="url(#tempGradient)"
                  name="Temp (°C)" 
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 6 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Combined metrics chart */}
      <Card variant="elevated">
        <CardHeader variant="colored" className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200 flex items-center justify-between">
          <CardTitle size="medium" className="flex items-center gap-2">
            <Activity className="h-5 w-5 text-blue-600" />
            Combined Metrics History
          </CardTitle>
          
          <div className="flex items-center gap-2">
            <div className="text-xs text-gray-500">Show:</div>
            <select 
              className="text-xs border border-gray-200 rounded py-1 pl-2 pr-6 bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
              value="all"
              onChange={() => {}}
            >
              <option value="all">All Metrics</option>
              <option value="temp">Temperature</option>
              <option value="water">Water Level</option>
              <option value="ph">pH Level</option>
              <option value="oxygen">Dissolved O₂</option>
            </select>
          </div>
        </CardHeader>
        
        <CardContent className="p-4">
          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={historicalData}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.2} vertical={false} />
              <XAxis 
                dataKey="timestamp" 
                tick={{ fontSize: 11 }}
                tickLine={false}
                axisLine={false}
                tickMargin={10}
              />
              <YAxis 
                tick={{ fontSize: 11 }} 
                tickLine={false}
                axisLine={false}
                tickMargin={10}
              />
              <Tooltip 
                contentStyle={{ 
                  borderRadius: '8px', 
                  boxShadow: '0 2px 10px rgba(0,0,0,0.1)', 
                  border: 'none',
                  padding: '10px 14px'
                }} 
                labelStyle={{ fontWeight: 'bold', marginBottom: '8px', borderBottom: '1px solid #eee', paddingBottom: '6px' }}
              />
              <Legend 
                wrapperStyle={{ paddingTop: '20px', fontSize: '12px' }} 
                iconType="circle"
                iconSize={8}
              />
              <Line 
                type="monotone" 
                dataKey="tempC" 
                stroke="#8884d8" 
                name="Temp (°C)" 
                strokeWidth={2.5}
                dot={false}
                activeDot={{ r: 6, strokeWidth: 0 }}
              />
              <Line 
                type="monotone" 
                dataKey="waterLevel" 
                stroke="#4ade80" 
                name="Water Level (m)" 
                strokeWidth={2.5}
                dot={false}
                activeDot={{ r: 6, strokeWidth: 0 }}
              />
              <Line 
                type="monotone" 
                dataKey="ph" 
                stroke="#f59e0b" 
                name="pH" 
                strokeWidth={2.5}
                dot={false}
                activeDot={{ r: 6, strokeWidth: 0 }}
              />
              <Line 
                type="monotone" 
                dataKey="dissolved_oxygen" 
                stroke="#6366f1" 
                name="Dissolved O₂ (mg/L)" 
                strokeWidth={2.5}
                dot={false}
                activeDot={{ r: 6, strokeWidth: 0 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>

        <CardFooter variant="default" className="bg-gray-50 border-t border-gray-100">
          <div className="w-full flex items-center justify-between text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 bg-green-500 rounded-full"></span>
              All metrics within normal parameters
            </div>
            <button className="text-blue-600 hover:text-blue-800 font-medium">
              Download Data
            </button>
          </div>
        </CardFooter>
      </Card>

      {/* Farm insights card */}
      <Card variant="elevated" className="bg-gradient-to-br from-gray-900 to-gray-800 text-white overflow-hidden">
        <CardHeader variant="transparent">
          <CardTitle size="large" className="flex items-center gap-2">
            <PieChart className="h-5 w-5 text-emerald-400" />
            Farm Insights
          </CardTitle>
        </CardHeader>
        
        <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
            <div className="flex items-center gap-2 mb-3">
              <TrendingUp className="h-5 w-5 text-emerald-400" />
              <h3 className="font-semibold">Production Yield</h3>
            </div>
            <p className="text-3xl font-bold">+12%</p>
            <p className="text-sm text-gray-300 mt-1">Compared to last month</p>
            <div className="mt-4 pt-4 border-t border-white/10 text-sm">
              <div className="flex justify-between mb-1">
                <span>Current</span>
                <span>85kg</span>
              </div>
              <div className="flex justify-between text-emerald-400">
                <span>Projected</span>
                <span>95kg</span>
              </div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
            <div className="flex items-center gap-2 mb-3">
              <CloudRain className="h-5 w-5 text-blue-400" />
              <h3 className="font-semibold">Water Usage</h3>
            </div>
            <p className="text-3xl font-bold">-8%</p>
            <p className="text-sm text-gray-300 mt-1">Optimized circulation</p>
            <div className="mt-4 h-2 bg-white/20 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-blue-500 to-emerald-500 rounded-full" style={{width: "35%"}}></div>
            </div>
            <div className="mt-1 flex justify-between text-xs">
              <span>Efficient</span>
              <span>1,450L saved</span>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
            <div className="flex items-center gap-2 mb-3">
              <Leaf className="h-5 w-5 text-green-400" />
              <h3 className="font-semibold">Plant Growth</h3>
            </div>
            <div className="flex justify-between items-end">
              <p className="text-3xl font-bold">98%</p>
              <span className="text-xs bg-green-400/20 text-green-300 px-2 py-0.5 rounded">Healthy</span>
            </div>
            <p className="text-sm text-gray-300 mt-1">Optimal conditions</p>
            <div className="mt-2 space-y-1">
              <div className="flex justify-between text-xs">
                <span>Leafy Greens</span>
                <span className="text-green-400">Excellent</span>
              </div>
              <div className="flex justify-between text-xs">
                <span>Roots</span>
                <span className="text-green-400">Good</span>
              </div>
              <div className="flex justify-between text-xs">
                <span>Growth Rate</span>
                <span className="text-green-400">Above Average</span>
              </div>
            </div>
          </div>
        </CardContent>

        <CardFooter variant="transparent" className="border-t border-white/10">
          <button className="text-sm text-blue-300 hover:text-blue-100 transition-colors flex items-center">
            View detailed analytics
            <ChevronDown className="h-4 w-4 ml-1" />
          </button>
        </CardFooter>
      </Card>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
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
                <span className="ml-2 text-xl font-bold text-emerald-600">AquaGrow</span>
              </div>
              <div className="ml-6 hidden md:flex space-x-8">
                <button className="border-emerald-500 text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                  Dashboard
                </button>
                <button className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                  Reports
                </button>
                <button className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                  Settings
                </button>
              </div>
            </div>
            <div className="flex items-center">
              <div className="flex items-center space-x-3">
                <span className="text-sm text-gray-500">{user?.role && `${user.fullName} (${user.role})`}</span>
                <div className="relative">
                  <button 
                    onClick={handleLogoutClick}
                    className="ml-4 px-3 py-1.5 border border-transparent rounded-md text-sm font-medium text-gray-500 hover:text-gray-700 flex items-center"
                  >
                    <LogOut className="mr-1.5 h-4 w-4" />
                    Sign out
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
              {user?.role === 'farmer' ? 'Farm Dashboard' : 
               user?.role === 'owner' ? 'Owner Dashboard' : 
               'Farm Dashboard'}
            </h1>
            <p className="text-gray-500 mt-1">
              {user?.role === 'farmer' ? 'Monitor and manage your aquaponics system' : 
               user?.role === 'owner' ? 'Oversee all your farm operations' :
               'Monitor and manage your aquaponics systems'}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-500">Last synced: Just now</span>
            <button 
              className="p-2 bg-white rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
              onClick={handleRefresh}
            >
              <RefreshCw className={`w-4 h-4 text-gray-600 ${isRefreshing ? "animate-spin" : ""}`} />
            </button>
          </div>
        </div>
        
        {selectedFarm ? <FarmDetail farm={selectedFarm} /> : <FarmList />}
      </div>
      
      {/* Add the ChatBot component */}
      <ChatBot />
    </div>
  );
};

export default FarmDashboard;