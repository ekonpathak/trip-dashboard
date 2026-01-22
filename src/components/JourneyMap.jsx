import React, { useEffect, useRef, useState } from 'react';
import { MapPin, Plane, Train, Bus, Sparkles } from 'lucide-react';
import './JourneyMap.css';

function JourneyMap({ destinations }) {
  const svgRef = useRef();
  const containerRef = useRef();
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [expandedImage, setExpandedImage] = useState(null);

  useEffect(() => {
    if (!svgRef.current || !containerRef.current) return;

    const svg = svgRef.current;
    const container = containerRef.current;
    const flowElements = container.querySelectorAll('.destination-point');

    // Clear previous paths
    while (svg.firstChild) {
      svg.removeChild(svg.firstChild);
    }

    // Get positions of all markers
    const positions = Array.from(flowElements).map(el => {
      const marker = el.querySelector('.place-pin');
      if (!marker) return null;
      const rect = marker.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();
      return {
        x: rect.left - containerRect.left + rect.width / 2,
        y: rect.top - containerRect.top + rect.height / 2
      };
    }).filter(Boolean);

    // Create beautiful wavy/circular path through all points
    if (positions.length > 1) {
      const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
      
      // Gradient for the path
      const gradient = document.createElementNS('http://www.w3.org/2000/svg', 'linearGradient');
      gradient.setAttribute('id', 'pathGradient');
      gradient.setAttribute('x1', '0%');
      gradient.setAttribute('y1', '0%');
      gradient.setAttribute('x2', '0%');
      gradient.setAttribute('y2', '100%');
      
      const stop1 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
      stop1.setAttribute('offset', '0%');
      stop1.setAttribute('style', 'stop-color:#ff6b6b;stop-opacity:0.8');
      
      const stop2 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
      stop2.setAttribute('offset', '50%');
      stop2.setAttribute('style', 'stop-color:#ffd93d;stop-opacity:0.8');
      
      const stop3 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
      stop3.setAttribute('offset', '100%');
      stop3.setAttribute('style', 'stop-color:#6bcf7f;stop-opacity:0.8');
      
      gradient.appendChild(stop1);
      gradient.appendChild(stop2);
      gradient.appendChild(stop3);
      defs.appendChild(gradient);
      svg.appendChild(defs);

      // Create shadow path with wavy curves
      const shadowPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      let d = `M ${positions[0].x} ${positions[0].y}`;
      
      for (let i = 1; i < positions.length; i++) {
        const prev = positions[i - 1];
        const curr = positions[i];
        
        // Create circular/wavy curves with alternating direction
        const distY = curr.y - prev.y;
        const waveAmount = i % 2 === 0 ? 80 : -80;
        
        const controlX1 = prev.x + waveAmount;
        const controlY1 = prev.y + distY * 0.25;
        const controlX2 = curr.x - (waveAmount * 0.6);
        const controlY2 = curr.y - distY * 0.25;
        
        d += ` C ${controlX1} ${controlY1}, ${controlX2} ${controlY2}, ${curr.x} ${curr.y}`;
      }
      
      shadowPath.setAttribute('d', d);
      shadowPath.setAttribute('stroke', 'rgba(0,0,0,0.08)');
      shadowPath.setAttribute('stroke-width', '14');
      shadowPath.setAttribute('fill', 'none');
      shadowPath.setAttribute('stroke-linecap', 'round');
      shadowPath.setAttribute('stroke-linejoin', 'round');
      svg.appendChild(shadowPath);

      // Create main wavy path
      const mainPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      mainPath.setAttribute('d', d);
      mainPath.setAttribute('stroke', 'url(#pathGradient)');
      mainPath.setAttribute('stroke-width', '6');
      mainPath.setAttribute('fill', 'none');
      mainPath.setAttribute('stroke-linecap', 'round');
      mainPath.setAttribute('stroke-linejoin', 'round');
      
      // Animated dash
      const pathLength = mainPath.getTotalLength();
      mainPath.setAttribute('stroke-dasharray', `${pathLength}`);
      mainPath.setAttribute('stroke-dashoffset', `${pathLength}`);
      mainPath.style.animation = 'drawPath 3s ease-out forwards';
      
      svg.appendChild(mainPath);

      // Add animated train icon
      const trainGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
      trainGroup.setAttribute('class', 'animated-train');

      // Train body (brown, more realistic)
      const trainBase = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
      trainBase.setAttribute('x', '-16');
      trainBase.setAttribute('y', '-8');
      trainBase.setAttribute('width', '32');
      trainBase.setAttribute('height', '16');
      trainBase.setAttribute('rx', '3');
      trainBase.setAttribute('fill', '#8b5a2b');
      trainBase.setAttribute('stroke', '#3b2414');
      trainBase.setAttribute('stroke-width', '1.5');

      const trainCabin = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
      trainCabin.setAttribute('x', '4');
      trainCabin.setAttribute('y', '-13');
      trainCabin.setAttribute('width', '12');
      trainCabin.setAttribute('height', '10');
      trainCabin.setAttribute('rx', '2');
      trainCabin.setAttribute('fill', '#9c6b3c');
      trainCabin.setAttribute('stroke', '#3b2414');
      trainCabin.setAttribute('stroke-width', '1');

      const trainRoof = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
      trainRoof.setAttribute('x', '-10');
      trainRoof.setAttribute('y', '-12');
      trainRoof.setAttribute('width', '18');
      trainRoof.setAttribute('height', '6');
      trainRoof.setAttribute('rx', '2');
      trainRoof.setAttribute('fill', '#7a4a21');
      trainRoof.setAttribute('stroke', '#3b2414');
      trainRoof.setAttribute('stroke-width', '1');

      const window1 = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
      window1.setAttribute('x', '-8');
      window1.setAttribute('y', '-5');
      window1.setAttribute('width', '6');
      window1.setAttribute('height', '5');
      window1.setAttribute('rx', '1');
      window1.setAttribute('fill', '#f3e6d3');

      const window2 = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
      window2.setAttribute('x', '2');
      window2.setAttribute('y', '-5');
      window2.setAttribute('width', '6');
      window2.setAttribute('height', '5');
      window2.setAttribute('rx', '1');
      window2.setAttribute('fill', '#f3e6d3');

      const headlight = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      headlight.setAttribute('cx', '17');
      headlight.setAttribute('cy', '-2');
      headlight.setAttribute('r', '2');
      headlight.setAttribute('fill', '#f4d03f');
      headlight.setAttribute('stroke', '#b37b1e');
      headlight.setAttribute('stroke-width', '1');

      const wheel1 = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      wheel1.setAttribute('cx', '-9');
      wheel1.setAttribute('cy', '9');
      wheel1.setAttribute('r', '3');
      wheel1.setAttribute('fill', '#3b2414');

      const wheel2 = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      wheel2.setAttribute('cx', '2');
      wheel2.setAttribute('cy', '9');
      wheel2.setAttribute('r', '3');
      wheel2.setAttribute('fill', '#3b2414');

      const wheel3 = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      wheel3.setAttribute('cx', '12');
      wheel3.setAttribute('cy', '9');
      wheel3.setAttribute('r', '3');
      wheel3.setAttribute('fill', '#3b2414');

      trainGroup.appendChild(trainBase);
      trainGroup.appendChild(trainCabin);
      trainGroup.appendChild(trainRoof);
      trainGroup.appendChild(window1);
      trainGroup.appendChild(window2);
      trainGroup.appendChild(headlight);
      trainGroup.appendChild(wheel1);
      trainGroup.appendChild(wheel2);
      trainGroup.appendChild(wheel3);
      
      // Animate train along path
      const animateMotion = document.createElementNS('http://www.w3.org/2000/svg', 'animateMotion');
      animateMotion.setAttribute('dur', '15s');
      animateMotion.setAttribute('repeatCount', 'indefinite');
      animateMotion.setAttribute('rotate', 'auto');
      animateMotion.setAttribute('path', d);
      
      trainGroup.appendChild(animateMotion);
      svg.appendChild(trainGroup);
    }
  }, [destinations]);

  const getTransportIcon = (index) => {
    if (index === 0) return null;
    
    const modes = [
      { Icon: Train, label: 'Train', color: '#6366f1' },
      { Icon: Train, label: 'Train', color: '#6366f1' },
      { Icon: Train, label: 'Train', color: '#6366f1' },
      { Icon: Plane, label: 'Flight', color: '#f43f5e' },
      { Icon: Train, label: 'Train', color: '#6366f1' },
      { Icon: Train, label: 'Train', color: '#6366f1' },
      { Icon: Bus, label: 'Bus', color: '#10b981' },
      { Icon: Bus, label: 'Bus', color: '#10b981' },
      { Icon: Bus, label: 'Bus', color: '#10b981' },
      { Icon: Plane, label: 'Flight', color: '#f43f5e' },
      { Icon: Plane, label: 'Flight', color: '#f43f5e' }
    ];
    
    return modes[index - 1] || { Icon: Bus, label: 'Bus', color: '#10b981' };
  };

  return (
    <div className="journey-map-brochure">
      <div className="brochure-header">
        <Sparkles className="header-icon" size={24} />
        <h2 className="brochure-title">Your Journey Awaits</h2>
        <Sparkles className="header-icon" size={24} />
      </div>
      
      <div className="destinations-count">
        {destinations.length} Amazing Destinations
      </div>
      
      <div className="brochure-container" ref={containerRef}>
        <svg className="journey-path" ref={svgRef} />
        
        <div className="destinations-flow">
          {destinations.map((dest, index) => {
            const transport = getTransportIcon(index);
            const TransportIcon = transport?.Icon;
            
            return (
              <div 
                key={dest.id} 
                className={`destination-point ${hoveredIndex === index ? 'hovered' : ''}`}
                style={{ '--delay': `${index * 0.15}s` }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <div className="place-pin">
                  <div className="pin-head">
                    <MapPin size={18} className="pin-icon" />
                  </div>
                  <div className="pin-stem" />
                  <div className="pin-shadow" />
                  <div className="pin-number">{index + 1}</div>
                  {hoveredIndex === index && <div className="pin-glow" />}
                </div>
                
                <div className="destination-card">
                  <div className="card-corner-accent" />
                  
                  {transport && (
                    <div className="transport-indicator" style={{ '--transport-color': transport.color }}>
                      <TransportIcon size={14} />
                      <span>{transport.label}</span>
                    </div>
                  )}
                  
                  <div 
                    className={`card-image-frame ${expandedImage === index ? 'expanded' : ''}`}
                    onClick={() => setExpandedImage(expandedImage === index ? null : index)}
                  >
                    <div className="image-border-effect" />
                    <img 
                      src={dest.image} 
                      alt={dest.name}
                      className="destination-image"
                      loading="lazy"
                    />
                    <div className="image-gradient-overlay" />
                    {expandedImage === index && (
                      <div className="fast-info-overlay">
                        <div className="fast-info-item">
                          <span className="info-label">📍 Location:</span>
                          <span className="info-value">{dest.state}</span>
                        </div>
                        <div className="fast-info-item">
                          <span className="info-label">⏱️ Duration:</span>
                          <span className="info-value">{dest.duration}</span>
                        </div>
                        {dest.activities && dest.activities.length > 0 && (
                          <div className="fast-info-item">
                            <span className="info-label">📌 Top Activity:</span>
                            <span className="info-value">{dest.activities[0]}</span>
                          </div>
                        )}
                      </div>
                    )}
                    <div className="image-expand-hint">
                      {expandedImage === index ? '✕' : '🔍'}
                    </div>
                  </div>
                  
                  <div className="card-info">
                    <div className="location-header">
                      <h3 className="place-name">{dest.name}</h3>
                      <p className="place-state">{dest.state}</p>
                    </div>
                    
                    <div className="stay-duration">
                      <svg className="duration-icon" width="12" height="12" viewBox="0 0 12 12">
                        <circle cx="6" cy="6" r="5" stroke="currentColor" strokeWidth="1" fill="none" />
                        <path d="M6 2 L6 6 L9 6" stroke="currentColor" strokeWidth="1" fill="none" />
                      </svg>
                      {dest.duration}
                    </div>
                    
                    {dest.activities && dest.activities.length > 0 && (
                      <div className="activities-list">
                        {dest.activities.slice(0, 3).map((activity, i) => (
                          <div key={i} className="activity-item">
                            <span className="activity-bullet">✦</span>
                            <span className="activity-text">{activity}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      
      <div className="brochure-footer">
        <div className="footer-decoration" />
        <span>Crafted with Love for Your Perfect Journey</span>
        <div className="footer-decoration" />
      </div>
    </div>
  );
}

export default JourneyMap;
