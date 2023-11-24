export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID;

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageview = (url: URL) => {
  // when in development mode, don't track pageview
  if (process.env.NODE_ENV !== 'production') {
    return;
  }
  window.gtag('config', GA_TRACKING_ID as string, {
    page_path: url,
  });
};

type GTagEvent = {
  action: string;
  category: string;
  label: string;
  value: number;
};

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const event = ({ action, category, label, value }: GTagEvent) => {
  if (process.env.NODE_ENV !== 'production') {
    return;
  }
  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value,
  });
};
