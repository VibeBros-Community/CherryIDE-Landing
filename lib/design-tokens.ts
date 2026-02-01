/**
 * Centralized design tokens for consistent interaction patterns
 * and visual styling across the application.
 */

export const interactionStates = {
  hover: {
    scale: 'hover:scale-105',
    transition: 'transition-all duration-300',
    color: 'hover:text-cherry-500',
    borderColor: 'hover:border-cherry-500/50',
    backgroundColor: 'hover:bg-cherry-600/10',
  },
  active: {
    scale: 'active:scale-95',
    color: 'active:text-cherry-600',
    backgroundColor: 'active:bg-cherry-600/20',
  },
  focus: {
    ring: 'focus-visible:ring-2 focus-visible:ring-cherry-500 focus-visible:ring-offset-2 focus-visible:ring-offset-black',
    outline: 'focus-visible:outline-none',
  },
} as const;

export const animations = {
  fadeIn: 'animate-in fade-in duration-500',
  slideUp: 'animate-in slide-in-from-bottom-4 duration-500',
  slideDown: 'animate-in slide-in-from-top-4 duration-500',
  spin: 'animate-spin',
  pulse: 'animate-pulse',
  bounce: 'animate-bounce',
} as const;

export const colors = {
  cherry: {
    primary: '#ff0f39',
    hover: '#ff3366',
    active: '#cc0033',
    light: '#ff6688',
    dark: '#aa0022',
  },
  background: {
    primary: '#000000',
    secondary: '#0a0a0a',
    tertiary: '#1a1a1a',
  },
  text: {
    primary: '#ffffff',
    secondary: '#e5e5e5',
    tertiary: '#a3a3a3',
    muted: '#737373',
  },
} as const;

/**
 * Combine interaction state classes
 */
export const getInteractionClasses = (options?: {
  includeScale?: boolean;
  includeColor?: boolean;
  includeBorder?: boolean;
  includeBackground?: boolean;
}): string => {
  const {
    includeScale = true,
    includeColor = true,
    includeBorder = false,
    includeBackground = false,
  } = options || {};

  const classes: string[] = [
    interactionStates.hover.transition,
    interactionStates.focus.ring,
    interactionStates.focus.outline,
  ];

  if (includeScale) {
    classes.push(interactionStates.hover.scale, interactionStates.active.scale);
  }

  if (includeColor) {
    classes.push(interactionStates.hover.color, interactionStates.active.color);
  }

  if (includeBorder) {
    classes.push(interactionStates.hover.borderColor);
  }

  if (includeBackground) {
    classes.push(
      interactionStates.hover.backgroundColor,
      interactionStates.active.backgroundColor
    );
  }

  return classes.join(' ');
};
