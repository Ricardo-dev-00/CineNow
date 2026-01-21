import React from 'react';

interface LoaderProps {
  size?: 'small' | 'medium' | 'large';
  fullScreen?: boolean;
}

const Loader: React.FC<LoaderProps> = ({ size = 'medium', fullScreen = false }) => {
  const sizeClasses = {
    small: 'w-8 h-8',
    medium: 'w-12 h-12',
    large: 'w-16 h-16',
  };

  const loader = (
    <div className={`${sizeClasses[size]} border-4 border-textSecondary border-t-accent rounded-full animate-spin`} />
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-primary bg-opacity-90 z-50">
        {loader}
      </div>
    );
  }

  return <div className="flex justify-center items-center p-8">{loader}</div>;
};

export default Loader;
