import React from 'react';
import UserAvatar from '../../images/banner.jpg';
function WelcomeBanner() {
  return (
    <div className="relative p-4 rounded-sm overflow-hidden mb-2">
      {/* Content */}
      <div className="relative" style={{background:`url(${'/images/banner.jpg'})`}}>
        <h1 className="text-2xl md:text-3xl text-slate-800 font-bold mb-1">Xin chào, Hà Lê. 👋</h1>
      </div>

    </div>
  );
}

export default WelcomeBanner;
