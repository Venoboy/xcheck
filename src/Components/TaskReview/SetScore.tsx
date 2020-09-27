import React from 'react';
import { Col, InputNumber, Row, Slider } from 'antd';

export const SetTaskScore: React.FC<{
  score: number;
  maxScore: number;
  minScore: number;
  onChange: (value: number | string | undefined) => void;
}> = ({ score, maxScore, minScore, onChange }) => {
  return (
    <Row>
      <Col span={12}>
        <Slider min={minScore} max={maxScore} onChange={onChange} value={score} />
      </Col>
      <Col span={4}>
        <InputNumber
          min={minScore}
          max={maxScore}
          style={{ margin: '0 16px' }}
          value={score}
          onChange={onChange}
        />
      </Col>
    </Row>
  );
};
