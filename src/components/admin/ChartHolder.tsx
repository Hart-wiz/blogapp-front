"use client"
import {
    Menu, X, LogOut, Settings, Bell, Search, ChevronDown,
    BarChart3, FileText, Users, Eye, MessageSquare, TrendingUp,
    Edit2, Trash2, Plus, Filter, Download, ArrowUp, ArrowDown
  } from 'lucide-react';
import React from 'react'

export default function ChartHolder() {
  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
    <h3 className="font-bold mb-4 flex items-center gap-2">
      <TrendingUp className="w-5 h-5 text-purple-400" />
      Views Trend
    </h3>
    <div className="h-64 flex items-end justify-around gap-2 bg-gray-800/30 rounded-lg p-4">
      {[40, 60, 35, 80, 55, 70, 65].map((height, idx) => (
        <div
          key={idx}
          className="flex-1 bg-gradient-to-t from-purple-500 to-pink-500 rounded-t hover:opacity-80 transition"
          style={{ height: `${height}%` }}
        ></div>
      ))}
    </div>
  </div>
  )
}

  
