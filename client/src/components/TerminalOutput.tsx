import { useEffect, useState } from 'react';
import styles from './Content.module.css';

interface TerminalProps {
  output: string[] | null | string;
  terminalName?: string;
}

const Terminal = ({ output, terminalName = 'output' }: TerminalProps) => {
  return (
    <div className='w-full h-full bg-[#1e1e1e] font-sans text-[#CCCCCC] p-2'>
      <div className='uppercase border-b-2 w-fit pb-1 mb-2'>{terminalName}</div>
      {output &&
        typeof output === 'object' &&
        output.map((line, index) => (
          <div
            key={index}
            className='overflow-y-auto font-console'
          >
            {line}
          </div>
        ))}
      {output && typeof output === 'string' && (
        <div className='overflow-y-auto font-console'>{output}</div>
      )}
    </div>
  );
};

export default Terminal;
