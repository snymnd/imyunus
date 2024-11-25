import { TooltipProps } from '@radix-ui/react-tooltip';
import { HelpCircle } from 'lucide-icons-react';
import * as React from 'react';

import cn from '@/lib/cn';

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/Tooltip';
import { TechStackIcons, TechStackType } from '@/constant/tech-stack';

type TechStackToolTipProps = {
  techStack: TechStackType;
  className?: string;
} & TooltipProps;

export default function TechStackToolTip({
  techStack: _techStack,
  className,
  ...rest
}: TechStackToolTipProps) {
  const techStack = TechStackIcons[_techStack];
  if (!techStack) return null;

  return (
    <TooltipProvider>
      <Tooltip delayDuration={200} {...rest}>
        <TooltipTrigger>
          {techStack.Icon ? (
            <techStack.Icon className={cn('size-6', className)} />
          ) : (
            <HelpCircle className='size-6' />
          )}
        </TooltipTrigger>
        <TooltipContent className='capitalize '>
          {techStack.name}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
