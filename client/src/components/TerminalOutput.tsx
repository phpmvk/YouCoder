import { useEffect, useState } from 'react';
import styles from './Content.module.css';

interface TerminalProps {
  output: string;
}

const Terminal = ({ output }: TerminalProps) => {
  return (
    <div className='w-full h-full bg-[#1e1e1e] font-sans text-[#CCCCCC] p-2'>
      <div className='uppercase border-b-2 w-fit pb-1 mb-2'>output</div>
      <div className='overflow-y-auto font-console'>{output}</div>
    </div>
  );
};

export default Terminal;
