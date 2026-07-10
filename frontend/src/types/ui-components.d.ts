declare module './Button' {
  import * as React from 'react';

  export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children?: React.ReactNode;
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | string;
    size?: 'sm' | 'md' | 'lg' | string;
    className?: string;
    as?: React.ElementType;
  }

  export function Button(props: ButtonProps): React.JSX.Element;
}

declare module './Card' {
  import * as React from 'react';

  export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    children?: React.ReactNode;
    className?: string;
  }

  export function Card(props: CardProps): React.JSX.Element;
}

declare module './Badge' {
  import * as React from 'react';

  export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
    children?: React.ReactNode;
    variant?: 'slate' | 'primary' | 'secondary' | 'emerald' | string;
    className?: string;
  }

  export function Badge(props: BadgeProps): React.JSX.Element;
}

declare module '../components/Button' {
  import * as React from 'react';

  export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children?: React.ReactNode;
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | string;
    size?: 'sm' | 'md' | 'lg' | string;
    className?: string;
    as?: React.ElementType;
  }

  export function Button(props: ButtonProps): React.JSX.Element;
}

declare module '../components/Card' {
  import * as React from 'react';

  export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    children?: React.ReactNode;
    className?: string;
  }

  export function Card(props: CardProps): React.JSX.Element;
}

declare module '../components/Badge' {
  import * as React from 'react';

  export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
    children?: React.ReactNode;
    variant?: 'slate' | 'primary' | 'secondary' | 'emerald' | string;
    className?: string;
  }

  export function Badge(props: BadgeProps): React.JSX.Element;
}
