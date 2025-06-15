import { LinkProps } from 'next/link';
import { Navigate } from '../AppProvider';

export type Theme = {light: string, dark: string};

export type AppTheme = Theme;

export interface Router {
  pathname: string;
  searchParams: URLSearchParams;
  navigate: Navigate;
  Link?: React.ComponentType<LinkProps>;
}

export interface Branding {
  title?: string;
  logo?: React.ReactNode;
  homeUrl?: string;
}

export interface NavigationPageItem {
	kind?: 'page';
	segment?: string;
	title?: string;
	icon?: React.ReactNode;
	pattern?: string;
	action?: React.ReactNode;
	children?: Navigation;
}

export interface NavigationSubheaderItem {
	kind: 'header';
	title: string;
}

export interface NavigationDividerItem {
	kind: 'divider';
}

export type NavigationItem = NavigationPageItem | NavigationSubheaderItem | NavigationDividerItem;

export type Navigation = NavigationItem[];

export interface DashboardSidebarPageItemProps {
  /**
   * Navigation page item definition.
   */
  item: NavigationPageItem;
  /**
  //  * Link `href` for when the item is rendered as a link.
   * @default getItemPath(navigationContext, item)
   */
  href?: string;
  /**
   * The component used to render the item as a link.
   * @default Link
   */
  LinkComponent?: React.ElementType;
  /**
   * If `true`, expands any nested navigation in the item, otherwise collapse it.
   * @default false
   */
  expanded?: boolean;
  /**
   * Use to apply selected styling.
   * @default false
   */
  selected?: boolean;
  /**
   * If `true`, the item is disabled.
   * @default false
   */
  disabled?: boolean;
}

export interface DashboardSidebarPageItemContextProps
  extends Partial<DashboardSidebarPageItemProps> {
  id: string;
  onClick: (itemId: string, item: NavigationPageItem) => void;
  isMini?: boolean;
  isSidebarFullyExpanded?: boolean;
  isSidebarFullyCollapsed?: boolean;
  renderNestedNavigation: (subNavigation: Navigation) => React.ReactNode;
}