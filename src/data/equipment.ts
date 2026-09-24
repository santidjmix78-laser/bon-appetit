import type { EquipmentId } from '../types';

export interface EquipmentOption {
  id: EquipmentId;
  label: string;
}

/** Catálogo extensible de equipamiento. */
export const EQUIPMENT_CATALOG: EquipmentOption[] = [
  { id: 'horno', label: 'Horno' },
  { id: 'microondas', label: 'Microondas' },
  { id: 'airfryer', label: 'Freidora de aire / Air Fryer' },
  { id: 'freidora', label: 'Freidora tradicional de aceite' },
  { id: 'vitro', label: 'Vitrocerámica / fogones' },
  { id: 'sarten', label: 'Sartén' },
  { id: 'olla', label: 'Olla' },
  { id: 'plancha', label: 'Plancha' },
  { id: 'batidora', label: 'Batidora' },
  { id: 'tostadora', label: 'Tostadora' },
];

/** Equipamiento por defecto para usuarios nuevos / migración. */
export const DEFAULT_EQUIPMENT: EquipmentId[] = [
  'vitro',
  'sarten',
  'olla',
  'microondas',
  'tostadora',
];

export function equipmentLabel(id: EquipmentId): string {
  return EQUIPMENT_CATALOG.find((e) => e.id === id)?.label ?? id;
}
