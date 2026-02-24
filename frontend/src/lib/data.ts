export interface FileItem {
  category: string;
  name: string;
  downloads: number;
  size?: string;
}

export type CategoryIcon = 'software' | 'dataset' | 'os' | 'tools' | 'media' | 'default';

export const CATEGORY_ICON_MAP: Record<string, CategoryIcon> = {
  'Software': 'software',
  'Datasets': 'dataset',
  'OS Images': 'os',
  'Tools': 'tools',
  'Media': 'media',
};

export const MOCK_FILES: FileItem[] = [
  { category: "Software", name: "VSCode-1.85.exe", downloads: 234, size: "95 MB" },
  { category: "Software", name: "Firefox-121.0.msi", downloads: 189, size: "55 MB" },
  { category: "Software", name: "NodeJS-20.10.0.msi", downloads: 156, size: "30 MB" },
  { category: "Software", name: "Python-3.12.1.exe", downloads: 142, size: "28 MB" },
  { category: "Software", name: "Git-2.43.0.exe", downloads: 198, size: "52 MB" },
  { category: "Software", name: "Postman-10.21.exe", downloads: 87, size: "120 MB" },
  { category: "OS Images", name: "Ubuntu-22.04.3-LTS.iso", downloads: 312, size: "4.7 GB" },
  { category: "OS Images", name: "Windows11-23H2.iso", downloads: 445, size: "5.2 GB" },
  { category: "OS Images", name: "Fedora-39.iso", downloads: 98, size: "2.1 GB" },
  { category: "OS Images", name: "Debian-12.4.iso", downloads: 76, size: "3.7 GB" },
  { category: "Datasets", name: "ImageNet-2023.tar.gz", downloads: 67, size: "150 GB" },
  { category: "Datasets", name: "COCO-Dataset.zip", downloads: 54, size: "25 GB" },
  { category: "Datasets", name: "WikiDump-Latest.bz2", downloads: 23, size: "20 GB" },
  { category: "Tools", name: "Wireshark-4.2.0.exe", downloads: 112, size: "75 MB" },
  { category: "Tools", name: "PuTTY-0.80.msi", downloads: 165, size: "4 MB" },
  { category: "Tools", name: "7zip-23.01.exe", downloads: 203, size: "1.5 MB" },
  { category: "Media", name: "VLC-3.0.20.exe", downloads: 267, size: "42 MB" },
  { category: "Media", name: "OBS-Studio-30.0.exe", downloads: 134, size: "110 MB" },
];

export const API_BASE = "http://localhost:5000";
