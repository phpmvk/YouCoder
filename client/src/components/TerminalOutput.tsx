import { useEffect, useState } from 'react';
import styles from './Content.module.css';

interface TerminalProps {
  output: null | string;
  terminalName?: string;
}

const Terminal = ({ output, terminalName = 'output' }: TerminalProps) => {
  const lines = output ? output.split('\n') : [];

  return (
    <div
      className="w-full h-full bg-[#1e1e1e] font-console text-gray-200 p-2 overflow-y-auto"
      style={{ wordWrap: 'break-word' }}
    >
      <div className="uppercase  w-fit pb-1 mb-2">{terminalName}</div>
      {lines.map((line, index) => (
        <div
          key={index}
          className="overflow-y-auto font-console"
          style={{ whiteSpace: 'pre-wrap' }}
        >
          {line}
        </div>
      ))}
    </div>
  );
};

export default Terminal;
