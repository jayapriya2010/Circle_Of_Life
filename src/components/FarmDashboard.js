import React, { useState, useEffect } from 'react';
import Webcam from 'react-webcam';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { MapPin, User, Thermometer, Droplet, Activity, ArrowLeft, Clock, Phone, Award } from 'lucide-react';

const farmData = [
  {
    id: 1,
    name: "Farm 1",
    location: "123 Farm Road, Chennai",
    coordinates: "CHENNAI",
    farmer: {
      name: "John",
      contact: "+91 790-433-2119",
      experience: "5 years"
    },
    wsEndpoint: 'ws://192.168.90.224:81'
  },
  {
    id: 2,
    name: "Farm 2",
    location: "456 River Lane, Madurai",
    coordinates: "MADURAI",
    farmer: {
      name: "Sarah",
      contact: "+91 994-045-8344",
      experience: "3 years"
    },
    wsEndpoint: 'ws://192.168.90.224:81'
  }
];

const FarmDashboard = () => {
  const [selectedFarm, setSelectedFarm] = useState(null);
  const [sensorData, setSensorData] = useState({
    tempC: 0,
    tempF: 0,
    waterLevel: 0
  });
  const [historicalData, setHistoricalData] = useState([]);

  // WebSocket and data handling logic
  useEffect(() => {
    if (!selectedFarm) return;
    const ws = new WebSocket(selectedFarm.wsEndpoint);

    ws.onmessage = (event) => {
      try {
        const data = event.data.split(',');
        const newData = {
          tempC: parseFloat(data[0]),
          tempF: parseFloat(data[1]),
          waterLevel: parseFloat(data[2]),
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
          tempC: Math.random() * 5 + 20,
          tempF: Math.random() * 9 + 68,
          waterLevel: Math.random() * 2 + 8,
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

  const FarmList = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {farmData.map((farm) => (
        <div
          key={farm.id}
          className="bg-white rounded-lg shadow-md p-6 cursor-pointer hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
          onClick={() => setSelectedFarm(farm)}
        >
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xl font-semibold">
              <MapPin className="h-5 w-5 text-emerald-500" />
              {farm.name}
            </div>
            <p className="text-sm text-gray-500">{farm.coordinates}</p>
          </div>
          <div className="mt-4 space-y-2">
            <div className="flex items-center gap-2 text-gray-600">
              <Clock className="h-4 w-4" />
              <span>Last updated: Just now</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <User className="h-4 w-4" />
              <span>{farm.farmer.name}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const FarmDetail = ({ farm }) => (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <button
          onClick={() => setSelectedFarm(null)}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
          Back to Farm List
        </button>
        <div className="text-right">
          <h2 className="text-2xl font-bold text-gray-900">{farm.name}</h2>
          <p className="text-sm text-gray-500">{farm.coordinates}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="mb-4">
            <div className="flex items-center gap-2 text-xl font-semibold">
              <User className="h-5 w-5 text-blue-500" />
              Farmer Details
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <User className="h-4 w-4 text-gray-500" />
              <div>
                <p className="text-sm text-gray-500">Name</p>
                <p className="font-medium">{farm.farmer.name}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="h-4 w-4 text-gray-500" />
              <div>
                <p className="text-sm text-gray-500">Contact</p>
                <p className="font-medium">{farm.farmer.contact}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Award className="h-4 w-4 text-gray-500" />
              <div>
                <p className="text-sm text-gray-500">Experience</p>
                <p className="font-medium">{farm.farmer.experience}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 lg:col-span-2">
          <div className="mb-4">
            <div className="flex items-center gap-2 text-xl font-semibold">
              <Activity className="h-5 w-5 text-blue-500" />
              Real-time Metrics
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <Thermometer className="h-5 w-5 text-blue-500" />
                <span className="text-sm font-medium text-blue-700">Temperature (°C)</span>
              </div>
              <p className="text-3xl font-bold text-blue-700">{sensorData.tempC.toFixed(1)}°C</p>
            </div>

            <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <Thermometer className="h-5 w-5 text-red-500" />
                <span className="text-sm font-medium text-red-700">Temperature (°F)</span>
              </div>
              <p className="text-3xl font-bold text-red-700">{sensorData.tempF.toFixed(1)}°F</p>
            </div>

            <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <Droplet className="h-5 w-5 text-emerald-500" />
                <span className="text-sm font-medium text-emerald-700">Water Level (m)</span>
              </div>
              <p className="text-3xl font-bold text-emerald-700">{sensorData.waterLevel.toFixed(2)} m</p>
            </div>
          </div>
        </div>
      </div>

      {/* Webcam Component */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-semibold mb-4">Live Webcam Feed</h3>
        <Webcam className="w-full h-64 rounded-lg shadow-md" />
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-semibold mb-4">Historical Data</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={historicalData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="timestamp" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="tempC" stroke="#8884d8" name="Temp (°C)" />
            <Line type="monotone" dataKey="tempF" stroke="#82ca9d" name="Temp (°F)" />
            <Line type="monotone" dataKey="waterLevel" stroke="#ffc658" name="Water Level (m)" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Farm Dashboard</h1>
      {selectedFarm ? <FarmDetail farm={selectedFarm} /> : <FarmList />}
    </div>
  );
};

export default FarmDashboard;