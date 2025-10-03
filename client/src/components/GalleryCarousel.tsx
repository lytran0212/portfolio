import { useState, useEffect, useRef } from 'react';

export default function GalleryCarousel() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [galleryImages, setGalleryImages] = useState<string[]>([]);
  const [startX, setStartX] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);

  // Fetch images list from server
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch('/api/gallery-images');
        if (!res.ok) throw new Error('Failed to load images');
        const data: string[] = await res.json();
        if (!cancelled) setGalleryImages(data);
      } catch (e) {
        console.error('Failed to fetch gallery images', e);
      }
    })();
    return () => { cancelled = true; };
  }, []);

  const updateGallery = () => {
    if (trackRef.current) {
      const imgWidth = 260 + 48; // width + gap (3vw ≈ 48px)
      const containerWidth = trackRef.current.parentElement?.offsetWidth || 1000;
      
      // Tính toán offset để ảnh hiện tại ở giữa, nhưng không cắt ảnh đầu/cuối
      let offset = currentIdx * imgWidth;
      const centerOffset = containerWidth / 2 - imgWidth / 2;
      offset = offset - centerOffset;
      
      // Đảm bảo ảnh đầu tiên không bị cắt bên trái
      if (offset < 0) {
        offset = 0;
      }
      
      // Đảm bảo ảnh cuối cùng không bị cắt bên phải
      const totalWidth = galleryImages.length * imgWidth;
      const maxOffset = totalWidth - containerWidth;
      if (offset > maxOffset && maxOffset > 0) {
        offset = maxOffset;
      }
      
      trackRef.current.style.transform = `translateX(${-offset}px)`;
    }
  };

  useEffect(() => {
    const timer = setTimeout(updateGallery, 100);
    return () => clearTimeout(timer);
  }, [currentIdx]);

  const handlePrev = () => {
    if (galleryImages.length === 0) return;
    setCurrentIdx((prevIdx) => (prevIdx - 1 + galleryImages.length) % galleryImages.length);
  };

  const handleNext = () => {
    if (galleryImages.length === 0) return;
    setCurrentIdx((prevIdx) => (prevIdx + 1) % galleryImages.length);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const dx = e.changedTouches[0].clientX - startX;
    if (dx > 40) handlePrev();
    if (dx < -40) handleNext();
  };

  const getImageClass = (idx: number) => {
    let baseClass = "w-[260px] h-[180px] object-cover rounded-2xl shadow-lg transition-all duration-700 ease-out relative flex-shrink-0 ";
    
    if (idx === currentIdx) {
      return baseClass + "opacity-100 z-10 shadow-2xl filter-none";
    } else if (idx === (currentIdx - 1 + galleryImages.length) % galleryImages.length) {
      return baseClass + "opacity-85 z-[6] filter grayscale brightness-85 blur-[0.5px] -mr-[30px]";
    } else if (idx === (currentIdx + 1) % galleryImages.length) {
      return baseClass + "opacity-85 z-[6] filter grayscale brightness-85 blur-[0.5px] -ml-[30px]";
    } else {
      return baseClass + "opacity-70 z-[5] filter grayscale brightness-70 blur-[1px]";
    }
  };

  return (
    <section id="gallery" className="w-full bg-[#1a2633] text-[#f6f6f2] py-20 pb-24 flex flex-col items-center relative">
      {/* Top Ellipse */}
      <div className="absolute left-1/2 transform -translate-x-1/2 top-6 w-[90vw] max-w-[1200px] h-[90px] bg-[#1a2633] rounded-[50%] opacity-100 z-10 pointer-events-none md:h-[90px] max-md:w-[98vw] max-md:h-[60px]" />
      
      <div className="flex items-center justify-center gap-[2vw] w-full max-w-[1100px] relative z-[2]">
        {/* Left Arrow */}
        <button
          className="bg-[#17212b] border-2 border-dashed border-[#f35964] rounded-full w-14 h-14 text-[2.2rem] text-[#f35964] cursor-pointer transition-all duration-200 shadow-lg flex items-center justify-center z-[100] relative outline-none hover:bg-[#f35964] hover:text-[#17212b] hover:shadow-2xl hover:border-[#f6d89c] focus:bg-[#f35964] focus:text-[#17212b] focus:shadow-2xl focus:border-[#f6d89c] mr-[2vw]"
          onClick={handlePrev}
          aria-label="Previous"
        >
          ←
        </button>

        {/* Gallery Track Container */}
        <div className="w-[85vw] max-w-[1000px] overflow-hidden relative max-md:w-[98vw]">
          <div
            ref={trackRef}
            className="flex items-end gap-[3vw] transition-transform duration-700 ease-out px-4"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {galleryImages.map((src, idx) => (
              <img
                key={idx}
                src={src}
                className={`${getImageClass(idx)} max-md:w-[120px] max-md:h-[80px]`}
                alt={`Gallery ${idx + 1}`}
                style={{
                  boxShadow: idx === currentIdx 
                    ? '0 8px 32px rgba(243, 89, 100, 0.3), 0 2px 8px rgba(230, 211, 179, 0.3)'
                    : '0 4px 24px rgba(34, 34, 40, 0.5)'
                }}
              />
            ))}
          </div>
        </div>

        {/* Right Arrow */}
        <button
          className="bg-[#17212b] border-2 border-dashed border-[#f35964] rounded-full w-14 h-14 text-[2.2rem] text-[#f35964] cursor-pointer transition-all duration-200 shadow-lg flex items-center justify-center z-[100] relative outline-none hover:bg-[#f35964] hover:text-[#17212b] hover:shadow-2xl hover:border-[#f6d89c] focus:bg-[#f35964] focus:text-[#17212b] focus:shadow-2xl focus:border-[#f6d89c] ml-[2vw]"
          onClick={handleNext}
          aria-label="Next"
        >
          →
        </button>
      </div>

      {/* Bottom Ellipse */}
      <div className="absolute left-1/2 transform -translate-x-1/2 bottom-6 w-[90vw] max-w-[1200px] h-[90px] bg-[#1a2633] rounded-[50%] opacity-100 z-10 pointer-events-none md:h-[90px] max-md:w-[98vw] max-md:h-[60px]" />
    </section>
  );
}