interface LoadingSpinnerProps {
  show: boolean;
}

const LoadingSpinner = ({ show }: LoadingSpinnerProps) => {
  if (!show) {
    return null;
  }

  return (
    <div className='fixed inset-0 z-[99999] flex items-center justify-center'>
      <div className='absolute inset-0 bg-gray-700/30' />

      <div className='relative w-24 h-24 border-t-2 border-bg-sec animate-spin rounded-full' />
    </div>
  );
};

export default LoadingSpinner;
