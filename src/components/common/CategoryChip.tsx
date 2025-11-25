'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';

interface CategoryChipProps {
  slug: string;
  name: string;
  selected?: boolean;
}

export function CategoryChip({ slug, name, selected = false }: CategoryChipProps) {
  return (
    <Link href={`/category/${slug}`}>
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Badge
          variant={selected ? 'default' : 'outline'}
          className="cursor-pointer whitespace-nowrap"
        >
          {name}
        </Badge>
      </motion.div>
    </Link>
  );
}
