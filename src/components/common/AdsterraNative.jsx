import React, { useEffect, useRef } from 'react';

const AdsterraNative = () => {
  const bannerRef = useRef(null);

  useEffect(() => {
    if (bannerRef.current && !bannerRef.current.firstChild) {
      
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.async = true;
      script.setAttribute('data-cfasync', 'false');

      
      script.src = <script async="async" data-cfasync="false" src="https://pl28671718.effectivegatecpm.com/63eeb8aff1cdc73bb078ccd466b4053a/invoke.js"></script> <div id="container-63eeb8aff1cdc73bb078ccd466b4053a"></div>

      bannerRef.current.appendChild(script);
    }
  }, []);

  return (
    <div 
      ref={bannerRef} 
      className="w-full my-4 flex justify-center items-center min-h-[100px] bg-white/5 rounded-xl border border-white/5 overflow-hidden"
    >
    </div>
  );
};

export default AdsterraNative;
