
"use client"

import React, { useState } from 'react';
import {
  Menu, X, LogOut, Settings, Bell, Search, ChevronDown,
  BarChart3, FileText, Users, Eye, MessageSquare, TrendingUp,
  Edit2, Trash2, Plus, Filter, Download, ArrowUp, ArrowDown
} from 'lucide-react';



export default function AdminNav() {

    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [activeTab, setActiveTab] = useState('dashboard');



  return (
    <div>
        
<aside
className={`${
  sidebarOpen ? 'w-64' : 'w-20'
} bg-gray-900 border-r border-gray-800 transition-all duration-300 flex flex-col`}
>
<div className="p-4 border-b border-gray-800 flex items-center justify-between">
  <div className={`flex items-center gap-3 ${!sidebarOpen && 'justify-center w-full'}`}>
    <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center font-bold text-sm">
      A
    </div>
    {sidebarOpen && <span className="font-bold text-lg">Admin</span>}
  </div>
</div>

<nav className="flex-1 p-4 space-y-2">
  {[
    { icon: <BarChart3 className="w-5 h-5" />, label: 'Dashboard', id: 'dashboard' },
    { icon: <FileText className="w-5 h-5" />, label: 'Posts', id: 'posts' },
    { icon: <Users className="w-5 h-5" />, label: 'Users', id: 'users' },
    { icon: <MessageSquare className="w-5 h-5" />, label: 'Comments', id: 'comments' },
    { icon: <Settings className="w-5 h-5" />, label: 'Settings', id: 'settings' },
  ].map((item) => (
    <button
      key={item.id}
      onClick={() => setActiveTab(item.id)}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${
        activeTab === item.id
          ? 'bg-gradient-to-r from-purple-500/30 to-pink-500/30 border border-purple-500/50 text-purple-300'
          : 'hover:bg-gray-800 text-gray-400'
      }`}
    >
      {item.icon}
      {sidebarOpen && <span className="text-sm font-medium">{item.label}</span>}
    </button>
  ))}
</nav>

<div className="p-4 border-t border-gray-800">
  <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-800 text-gray-400 transition">
    <LogOut className="w-5 h-5" />
    {sidebarOpen && <span className="text-sm font-medium">Logout</span>}
  </button>
</div>
</aside>



    </div>
  )
}

