import { X, Download, ZoomIn, ZoomOut, ChevronLeft, ChevronRight } from 'lucide-react';
import { useMemo, useState } from 'react';
import './ScreenshotModal.css';

function ScreenshotModal({ screenshot, ticketInfo, onClose }) {
  const [zoom, setZoom] = useState(1);
  const [currentIndex, setCurrentIndex] = useState(0);
  const screenshots = useMemo(
    () => (Array.isArray(screenshot) ? screenshot : [screenshot]),
    [screenshot]
  );
  const currentScreenshot = screenshots[currentIndex];
  const hasMultiple = screenshots.length > 1;

  const handleDownload = () => {
    const link = document.createElement('a');
    // Ensure URL is properly encoded for download
    link.href = encodeURI(currentScreenshot);
    link.download = `${ticketInfo.from.replace(/[^a-zA-Z0-9]/g, '_')}_to_${ticketInfo.to.replace(/[^a-zA-Z0-9]/g, '_')}_ticket_${currentIndex + 1}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleZoomIn = () => {
    setZoom(prev => Math.min(prev + 0.25, 3));
  };

  const handleZoomOut = () => {
    setZoom(prev => Math.max(prev - 0.25, 0.5));
  };

  const handlePrev = () => {
    setCurrentIndex(prev => (prev - 1 + screenshots.length) % screenshots.length);
    setZoom(1);
  };

  const handleNext = () => {
    setCurrentIndex(prev => (prev + 1) % screenshots.length);
    setZoom(1);
  };

  return (
    <div className="screenshot-modal-overlay" onClick={onClose}>
      <div className="screenshot-modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="screenshot-modal-header">
          <h3>{ticketInfo.from} → {ticketInfo.to}</h3>
          <div className="screenshot-modal-controls">
            {hasMultiple && (
              <>
                <button onClick={handlePrev} className="control-btn nav-btn" title="Previous">
                  <ChevronLeft size={20} />
                </button>
                <span className="screenshot-index">
                  {currentIndex + 1} / {screenshots.length}
                </span>
                <button onClick={handleNext} className="control-btn nav-btn" title="Next">
                  <ChevronRight size={20} />
                </button>
              </>
            )}
            <button onClick={handleZoomOut} className="control-btn" title="Zoom Out">
              <ZoomOut size={20} />
            </button>
            <span className="zoom-level">{Math.round(zoom * 100)}%</span>
            <button onClick={handleZoomIn} className="control-btn" title="Zoom In">
              <ZoomIn size={20} />
            </button>
            <button onClick={handleDownload} className="control-btn download-btn" title="Download">
              <Download size={20} />
              Download
            </button>
            <button onClick={onClose} className="control-btn close-btn" title="Close">
              <X size={20} />
            </button>
          </div>
        </div>
        <div className="screenshot-modal-body">
          <img 
            src={encodeURI(currentScreenshot)} 
            alt={`Ticket from ${ticketInfo.from} to ${ticketInfo.to}`}
            style={{ transform: `scale(${zoom})` }}
            className="screenshot-image"
          />
        </div>
      </div>
    </div>
  );
}

export default ScreenshotModal;
