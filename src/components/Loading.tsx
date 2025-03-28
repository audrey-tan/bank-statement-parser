import React from 'react';
import animationData from '../../public/loading.json';
import dynamic from 'next/dynamic';
import { TypographyH3 } from './ui/typography';

const Lottie = dynamic(() => import('lottie-react'), { ssr: false });

export default function Loading() {
  return (
    <div className="flex flex-col h-150 items-center justify-center text-center">
      <Lottie animationData={animationData} loop={true} autoplay/>
      <TypographyH3 className="pb-12">Extracting data...</TypographyH3>
    </div>
  );
}