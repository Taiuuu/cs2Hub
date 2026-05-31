'use client';

import Link from 'next/link';
import Image from 'next/image';

interface MapCardProps {
  id: string;
  nombre: string;
  fondo: string;
  icono: string;
}

export function MapCard({ id, nombre, fondo, icono }: MapCardProps) {
  return (
    <Link href={`/maps/${id}`}>
      <div className="group relative h-80 w-full overflow-hidden rounded-2xl shadow-lg transition-all duration-250 hover:shadow-2xl hover:scale-105">
        {/* Imagen de fondo */}
        <div className="absolute inset-0">
          <Image
            src={fondo}
            alt={nombre}
            fill
            className="object-cover transition-all duration-250 group-hover:brightness-110"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
        </div>

        {/* Overlay oscuro con degradado */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/60 group-hover:to-black/50 transition-all duration-250" />

        {/* Logo centrado */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative h-20 w-20 drop-shadow-lg">
            <Image
              src={icono}
              alt={`${nombre} icon`}
              fill
              className="object-contain"
              priority={false}
            />
          </div>
        </div>

        {/* Nombre en la parte inferior */}
        <div className="absolute inset-x-0 bottom-0 flex flex-col items-center justify-end p-6">
          <h3 className="text-2xl font-bold text-white text-center drop-shadow-md">
            {nombre}
          </h3>
        </div>
      </div>
    </Link>
  );
}
