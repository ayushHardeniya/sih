import React, { useState } from 'react';
import { Building, Users, Search, Filter, Plus, MapPin } from 'lucide-react';
import { mockHostelRooms, mockHostelAllocations, mockStudents } from '../../utils/mockData';
import { HostelRoom, HostelAllocation } from '../../types';

const HostelPage: React.FC = () => {
  const [rooms] = useState<HostelRoom[]>(mockHostelRooms);
  const [allocations] = useState<HostelAllocation[]>(mockHostelAllocations);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterBuilding, setFilterBuilding] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'rooms' | 'allocations'>('rooms');

  const getStudentName = (studentId: string) => {
    const student = mockStudents.find(s => s.id === studentId);
    return student ? student.name : 'Unknown Student';
  };

  const getRoomNumber = (roomId: string) => {
    const room = rooms.find(r => r.id === roomId);
    return room ? room.number : 'Unknown Room';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'allocated': return 'text-blue-600 bg-blue-100';
      case 'checked_in': return 'text-green-600 bg-green-100';
      case 'checked_out': return 'text-gray-600 bg-gray-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getRoomTypeColor = (type: string) => {
    switch (type) {
      case 'single': return 'text-purple-600 bg-purple-100';
      case 'double': return 'text-blue-600 bg-blue-100';
      case 'triple': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const filteredRooms = rooms.filter(room => {
    const matchesSearch = room.number.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         room.building.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterBuilding === 'all' || room.building === filterBuilding;
    return matchesSearch && matchesFilter;
  });

  const filteredAllocations = allocations.filter(allocation => {
    const student = mockStudents.find(s => s.id === allocation.studentId);
    const room = rooms.find(r => r.id === allocation.roomId);
    const matchesSearch = student?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         room?.number.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  const totalRooms = rooms.length;
  const occupiedRooms = rooms.filter(room => room.occupancy > 0).length;
  const availableRooms = rooms.filter(room => room.occupancy < room.capacity).length;
  const occupancyRate = totalRooms > 0 ? Math.round((occupiedRooms / totalRooms) * 100) : 0;

  const buildings = [...new Set(rooms.map(room => room.building))];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Hostel Management</h1>
          <p className="text-gray-600 mt-2">
            Manage room allocations and student accommodations
          </p>
        </div>
        <div className="flex space-x-3 mt-4 sm:mt-0">
          <button className="btn-secondary">
            <MapPin size={20} className="mr-2" />
            Floor Plan
          </button>
          <button className="btn-primary">
            <Plus size={20} className="mr-2" />
            Allocate Room
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="card p-6">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Building className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Total Rooms</p>
              <p className="text-2xl font-bold text-gray-900">{totalRooms}</p>
            </div>
          </div>
        </div>
        <div className="card p-6">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <Users className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Occupied Rooms</p>
              <p className="text-2xl font-bold text-gray-900">{occupiedRooms}</p>
            </div>
          </div>
        </div>
        <div className="card p-6">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <Building className="h-6 w-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Available Rooms</p>
              <p className="text-2xl font-bold text-gray-900">{availableRooms}</p>
            </div>
          </div>
        </div>
        <div className="card p-6">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Users className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Occupancy Rate</p>
              <p className="text-2xl font-bold text-gray-900">{occupancyRate}%</p>
            </div>
          </div>
        </div>
      </div>

      {/* View Toggle */}
      <div className="card p-6">
        <div className="flex items-center justify-between">
          <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setViewMode('rooms')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                viewMode === 'rooms'
                  ? 'bg-white text-gray-900 shadow'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Room Overview
            </button>
            <button
              onClick={() => setViewMode('allocations')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                viewMode === 'allocations'
                  ? 'bg-white text-gray-900 shadow'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Allocations
            </button>
          </div>

          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder={viewMode === 'rooms' ? 'Search rooms...' : 'Search allocations...'}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            {viewMode === 'rooms' && (
              <div className="flex items-center space-x-2">
                <Filter size={20} className="text-gray-400" />
                <select
                  className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  value={filterBuilding}
                  onChange={(e) => setFilterBuilding(e.target.value)}
                >
                  <option value="all">All Buildings</option>
                  {buildings.map(building => (
                    <option key={building} value={building}>{building}</option>
                  ))}
                </select>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Content based on view mode */}
      {viewMode === 'rooms' ? (
        /* Rooms Table */
        <div className="card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Room
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Building
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Occupancy
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Floor
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amenities
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredRooms.map((room) => (
                  <tr key={room.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{room.number}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{room.building}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getRoomTypeColor(room.type)}`}>
                        {room.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {room.occupancy}/{room.capacity}
                        <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                          <div
                            className={`h-2 rounded-full ${
                              room.occupancy === room.capacity ? 'bg-red-600' : 
                              room.occupancy > 0 ? 'bg-yellow-600' : 'bg-green-600'
                            }`}
                            style={{ width: `${(room.occupancy / room.capacity) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{room.floor}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {room.amenities.slice(0, 2).join(', ')}
                        {room.amenities.length > 2 && ` +${room.amenities.length - 2} more`}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button className="text-primary-600 hover:text-primary-900 mr-3">
                        View Details
                      </button>
                      {room.occupancy < room.capacity && (
                        <button className="text-green-600 hover:text-green-900">
                          Allocate
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* Allocations Table */
        <div className="card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Student
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Room
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Allocation Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Check-in Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredAllocations.map((allocation) => (
                  <tr key={allocation.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {getStudentName(allocation.studentId)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{getRoomNumber(allocation.roomId)}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{allocation.allocationDate}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {allocation.checkInDate || 'Not checked in'}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(allocation.status)}`}>
                        {allocation.status.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                      <button className="text-primary-600 hover:text-primary-900">
                        View Details
                      </button>
                      {allocation.status === 'allocated' && (
                        <button className="text-green-600 hover:text-green-900">
                          Check In
                        </button>
                      )}
                      {allocation.status === 'checked_in' && (
                        <button className="text-red-600 hover:text-red-900">
                          Check Out
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default HostelPage;