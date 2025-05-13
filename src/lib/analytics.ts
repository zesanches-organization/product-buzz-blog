
// Track pageviews with GA4
export const pageView = (url: string) => {
  if (typeof window.gtag === 'function') {
    window.gtag('config', process.env.NEXT_PUBLIC_GA_ID || '', {
      page_path: url,
    });
  }
};

// Track events with GA4
export const event = ({
  action,
  category,
  label,
  value,
}: {
  action: string;
  category: string;
  label: string;
  value?: number;
}) => {
  if (typeof window.gtag === 'function') {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value,
    });
  }
};
