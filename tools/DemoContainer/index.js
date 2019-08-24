import React from 'react';
import { Card, Row, Col } from 'antd';

export default function DemoContainer({ children, style }) {
  return (
    <div style={{ minHeight: 500, justifyContent: 'center', alignItems: 'center', display: 'flex', ...style }}>
      {children}
    </div>
  )
}