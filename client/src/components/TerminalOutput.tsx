import { useEffect, useState } from 'react';
import styles from './Content.module.css';

interface TerminalProps {
  output: null | string;
  terminalName?: string;
  theme?: 'dark' | 'light';
}

const Terminal = ({
  output,
  terminalName = 'output',
  theme = 'dark',
}: TerminalProps) => {
  const lines = output ? output.split('\n') : [];

  return (
    <div
      className={`w-full h-full border border-bg-pri/30 ${
        theme === 'light'
          ? 'bg-[#fffffe] text-black/90'
          : 'bg-[#1e1e1e] text-gray-200'
      } font-console p-2 overflow-y-auto`}
      style={{ wordWrap: 'break-word' }}
    >
      <div className='uppercase w-fit pb-1 mb-2 underline underline-offset-4 decoration-1'>
        {terminalName}
      </div>
      {lines.map((line, index) => (
        <div
          key={index}
          className='overflow-y-auto font-console'
          style={{ whiteSpace: 'pre-wrap' }}
        >
          {line}
        </div>
      ))}
    </div>
  );
};

export default Terminal;
