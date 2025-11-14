import { useState, useMemo } from 'react';

type NestedValueGetter<T> = (item: T, keyPath: string) => string;

interface UseSearchConfig<T> {
  keys: (keyof T)[];
  nestedKeys?: Record<string, NestedValueGetter<T>>;
}

export function useSearch<T>(items: T[], config: UseSearchConfig<T>) {
  const [searchTerm, setSearchTerm] = useState<string>('');

  const filteredItems = useMemo(() => {
    if (!searchTerm.trim()) {
      return items;
    }

    const lowerCaseSearchTerm = searchTerm.toLowerCase();

    return items.filter((item) => {
      const topLevelMatch = config.keys.some((key) => {
        const value = String(item[key] || '').toLowerCase();
        return value.includes(lowerCaseSearchTerm);
      });

      if (topLevelMatch) return true;

      if (config.nestedKeys) {
        return Object.entries(config.nestedKeys).some(([keyPath, getterFn]) => {
          const nestedValue = getterFn(item, keyPath).toLowerCase();
          return nestedValue.includes(lowerCaseSearchTerm);
        });
      }

      return false;
    });
  }, [searchTerm, items, config]);

  return {
    searchTerm,
    setSearchTerm,
    filteredItems,
  };
}