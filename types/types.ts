export interface MouseSettings {
  dpi?: number;
  sensitivity?: number;
  zoomSensitivityRatio?: number;
  pollingRate?: number;
}

export interface VideoSettings {
  brightness?: number; // %
  scalingMode?: string; // ej: "Estirado"
  aspectRatio?: string; // ej: "4:3"
  resolution?: string; // ej: "1280x960"
  displayMode?: string; // ej: "Pantalla completa"
}

export interface AdvancedVideoSettings {
  boostPlayerContrast?: string;
  vsync?: string;
  multisampling?: string;
  globalShadowQuality?: string;
  textureDetail?: string;
  textureFiltering?: string;
  shaderDetail?: string;
  particleDetail?: string;
  dynamicShadows?: string;
  ambientOcclusion?: string;
  hdr?: string;
  fsr?: string;
  nvidiaReflex?: string;
}

export interface ViewmodelSettings {
  fov?: number;
  offsetX?: number;
  offsetY?: number;
  offsetZ?: number;
}

export interface HudSettings {
  scaling?: number;
  showLoadout?: boolean;
  safezoneX?: number;
  safezoneY?: number;
  hudColor?: number;
}

export interface RadarSettings {
  hudRadarScale?: number;
  radarScale?: number;
  alwaysCentered?: boolean;
  rotate?: boolean;
  iconScaleMin?: number;
}


