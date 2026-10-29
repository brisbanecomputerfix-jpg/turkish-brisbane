"use client";

import * as React from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { BusinessItem } from "@/components/directory-section";
import { getBusinessCoordinates } from "@/data/suburb-coordinates";
import { MapPin, Phone, Globe, Navigation, ExternalLink, ShieldCheck } from "lucide-react";

interface DirectoryMapProps {
  businesses: BusinessItem[];
  selectedBusinessId?: string | null;
  onSelectBusiness?: (id: string) => void;
  className?: string;
}

export function DirectoryMap({
  businesses,
  selectedBusinessId,
  onSelectBusiness,
  className = "h-[600px] w-full",
}: DirectoryMapProps) {
  const mapContainerRef = React.useRef<HTMLDivElement>(null);
  const mapInstanceRef = React.useRef<L.Map | null>(null);
  const markersRef = React.useRef<Map<string, L.Marker>>(new Map());

  // Initialize Map
  React.useEffect(() => {
    if (!mapContainerRef.current || mapInstanceRef.current) return;

    // Center on Greater Brisbane by default
    const map = L.map(mapContainerRef.current, {
      center: [-27.4698, 153.0251],
      zoom: 12,
      zoomControl: false,
    });

    // Add zoom control top-right
    L.control.zoom({ position: "topright" }).addTo(map);

    // Clean, modern CartoDB Positron tiles
    L.tileLayer(
      "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png",
      {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: "abcd",
        maxZoom: 19,
      }
    ).addTo(map);

    mapInstanceRef.current = map;

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // Sync Markers when businesses change
  React.useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    // Clear previous markers
    markersRef.current.forEach((marker) => marker.remove());
    markersRef.current.clear();

    if (businesses.length === 0) return;

    const bounds = L.latLngBounds([]);

    businesses.forEach((b) => {
      const coords = getBusinessCoordinates(b.suburb, b.id);
      bounds.extend([coords.lat, coords.lng]);

      const isSelected = b.id === selectedBusinessId;

      // Custom Turkish Emblem SVG Pin
      const iconHtml = `
        <div class="group relative flex items-center justify-center cursor-pointer transition-transform duration-200 ${
          isSelected ? "scale-125 z-50" : "hover:scale-115"
        }">
          <div class="flex h-10 w-10 items-center justify-center rounded-full border-2 border-white shadow-lg ${
            isSelected ? "bg-[#E30A17] ring-4 ring-red-400/50" : "bg-[#E30A17]"
          }">
            <svg viewBox="13000 -22000 44000 44000" width="20" height="20" class="shrink-0" role="img">
              <path fill="#ffffff" d="m41750 0 13568-4408-8386 11541V-7133l8386 11541zm925 8021a15000 15000 0 1 1 0-16042 12000 12000 0 1 0 0 16042z"/>
            </svg>
          </div>
          <div class="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-[#E30A17] rotate-45 border-r border-b border-white"></div>
        </div>
      `;

      const customIcon = L.divIcon({
        html: iconHtml,
        className: "custom-leaflet-marker",
        iconSize: [40, 44],
        iconAnchor: [20, 42],
        popupAnchor: [0, -42],
      });

      const marker = L.marker([coords.lat, coords.lng], { icon: customIcon }).addTo(map);

      // Popup Content Card
      const popupContent = `
        <div class="p-3 max-w-[260px] font-sans">
          <div class="flex items-center gap-1.5 text-[11px] font-semibold text-[#E30A17] uppercase tracking-wider mb-1">
            <span>${b.category}</span>
            <span class="text-zinc-300">•</span>
            <span class="text-emerald-700 font-medium">Verified</span>
          </div>
          <h4 class="text-sm font-bold text-zinc-900 leading-snug mb-1.5">${b.name}</h4>
          <p class="text-xs text-zinc-600 line-clamp-2 leading-relaxed mb-3">${b.description}</p>
          
          <div class="pt-2 border-t border-zinc-100 flex flex-col gap-1.5 text-xs">
            <div class="flex items-center gap-1.5 text-zinc-700">
              <span class="font-medium text-zinc-500">📍 Suburb:</span>
              <span>${b.suburb}, QLD</span>
            </div>
            ${
              b.phone
                ? `<a href="tel:${b.phone}" class="inline-flex items-center gap-1.5 text-[#E30A17] font-semibold hover:underline">
                    📞 ${b.phone}
                   </a>`
                : ""
            }
            <div class="mt-2 flex items-center gap-2">
              <a 
                href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                  b.name + " " + b.suburb + " QLD Australia"
                )}" 
                target="_blank" 
                rel="noopener noreferrer"
                class="inline-flex items-center justify-center gap-1 w-full rounded-md bg-zinc-900 px-2.5 py-1.5 text-[11px] font-semibold text-white hover:bg-zinc-800 transition-colors"
              >
                Directions ↗
              </a>
              ${
                b.website
                  ? `<a 
                      href="${b.website}" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      class="inline-flex items-center justify-center gap-1 w-full rounded-md border border-zinc-300 bg-white px-2.5 py-1.5 text-[11px] font-semibold text-zinc-700 hover:bg-zinc-50 transition-colors"
                    >
                      Website ↗
                     </a>`
                  : ""
              }
            </div>
          </div>
        </div>
      `;

      marker.bindPopup(popupContent, {
        maxWidth: 280,
        className: "custom-leaflet-popup",
      });

      marker.on("click", () => {
        if (onSelectBusiness) {
          onSelectBusiness(b.id);
        }
      });

      markersRef.current.set(b.id, marker);
    });

    // Fit map to visible businesses bounds
    if (bounds.isValid()) {
      map.fitBounds(bounds, { padding: [40, 40], maxZoom: 15 });
    }
  }, [businesses, selectedBusinessId, onSelectBusiness]);

  // Handle selectedBusinessId focus
  React.useEffect(() => {
    if (!selectedBusinessId || !mapInstanceRef.current) return;
    const marker = markersRef.current.get(selectedBusinessId);
    if (marker) {
      const latLng = marker.getLatLng();
      mapInstanceRef.current.flyTo(latLng, 14, { duration: 1 });
      marker.openPopup();
    }
  }, [selectedBusinessId]);

  return (
    <div className={`relative overflow-hidden rounded-2xl border border-zinc-200 shadow-sm dark:border-zinc-800 ${className}`}>
      <div ref={mapContainerRef} className="h-full w-full z-0" />
      
      {/* Map Badge Info Overlay */}
      <div className="absolute bottom-3 left-3 z-[1000] pointer-events-none">
        <div className="rounded-xl border border-white/80 bg-white/95 px-3 py-1.5 shadow-md backdrop-blur-xs dark:border-zinc-800 dark:bg-zinc-900/95">
          <div className="flex items-center gap-2 text-xs font-semibold text-zinc-800 dark:text-zinc-200">
            <span className="flex h-2 w-2 rounded-full bg-[#E30A17] animate-pulse"></span>
            <span>{businesses.length} Verified Locations</span>
          </div>
        </div>
      </div>
    </div>
  );
}
