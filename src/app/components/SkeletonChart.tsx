import { Spin } from "antd";
import React from "react";

const SkeletonChart: React.FC = () => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '375px',
        width: '740px',
        padding: '5px',
        backgroundColor: '#fff'
      }}
    >
      <Spin className="skeleton-chart" />
    </div>
  );
};

export default SkeletonChart;