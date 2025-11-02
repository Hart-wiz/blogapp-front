"use client"

import React from 'react'

export default function RecentCard() {
  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
    <h3 className="font-bold mb-4">Recent Activity</h3>
    <div className="space-y-3">
      {[
        { action: 'New post published', time: '2 hours ago' },
        { action: 'Comment approved', time: '5 hours ago' },
        { action: 'User registered', time: '1 day ago' },
        { action: 'Post updated', time: '2 days ago' },
      ].map((item, idx) => (
        <div key={idx} className="flex justify-between items-center p-3 bg-gray-800/30 rounded-lg">
          <span className="text-sm">{item.action}</span>
          <span className="text-xs text-gray-500">{item.time}</span>
        </div>
      ))}
    </div>
  </div>
  
 
  )
}
