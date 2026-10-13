import { useState } from 'react';

export default function CoverImage({ sources, alt, fallback, className = '' }) {
  const [sourceIndex, setSourceIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const availableSources = sources.filter(Boolean);
  const currentSource = availableSources[sourceIndex];

  const handleError = () => {
    setIsLoaded(false);
    setSourceIndex((index) => index + 1);
  };

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      {fallback}
      {currentSource && (
        <img
          key={currentSource}
          src={currentSource}
          alt={alt}
          loading="lazy"
          decoding="async"
          onLoad={() => setIsLoaded(true)}
          onError={handleError}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        />
      )}
    </div>
  );
}
