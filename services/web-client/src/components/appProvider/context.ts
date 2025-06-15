'use client';
import { Router } from 'next/router';
import * as React from 'react';
import {
	Branding,
	DashboardSidebarPageItemContextProps,
	Navigation,
} from './types/appProvider.types';

export const BrandingContext = React.createContext<Branding | null>(null);

export const NavigationContext = React.createContext<Navigation>([]);

export const RouterContext = React.createContext<Router | null>(null);

export const DashboardSidebarPageItemContext =
	React.createContext<DashboardSidebarPageItemContextProps | null>(null);

export const WindowContext = React.createContext<Window | undefined>(undefined);
