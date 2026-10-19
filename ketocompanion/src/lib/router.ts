import { useEffect, useState } from 'react';

// Minimal hash router: works on static hosting (e.g. GitHub Pages) with no server config.
export type Route =
  | { name: 'today' }
  | { name: 'log-meal' }
  | { name: 'log-ketone' }
  | { name: 'ketones' }
  | { name: 'recipes' }
  | { name: 'recipe'; id: string }
  | { name: 'progress' }
  | { name: 'summary' }
  | { name: 'settings' };

export function parseHash(hash: string): Route {
  const [path, param] = hash.replace(/^#\/?/, '').split('/');
  switch (path) {
    case 'log-meal':
    case 'log-ketone':
    case 'ketones':
    case 'recipes':
    case 'progress':
    case 'summary':
    case 'settings':
      return { name: path };
    case 'recipe':
      return param ? { name: 'recipe', id: decodeURIComponent(param) } : { name: 'recipes' };
    default:
      return { name: 'today' };
  }
}

export function useRoute(): Route {
  const [route, setRoute] = useState(() => parseHash(window.location.hash));
  useEffect(() => {
    const onChange = () => {
      setRoute(parseHash(window.location.hash));
      window.scrollTo(0, 0);
    };
    window.addEventListener('hashchange', onChange);
    return () => window.removeEventListener('hashchange', onChange);
  }, []);
  return route;
}

export function navigate(path: string) {
  window.location.hash = path.startsWith('#') ? path : `#/${path.replace(/^\//, '')}`;
}

export function goBack(fallback = 'today') {
  if (window.history.length > 1) window.history.back();
  else navigate(fallback);
}
