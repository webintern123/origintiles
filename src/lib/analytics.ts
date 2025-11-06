/**
 * Analytics Utilities
 * Track user interactions and page views (ready for GA4/analytics integration)
 */

interface AnalyticsEvent {
  category: string;
  action: string;
  label?: string;
  value?: number;
}

export const analytics = {
  /**
   * Track page view
   */
  pageView: (pageName: string) => {
    if (typeof window !== 'undefined') {
      // Ready for Google Analytics 4
      // window.gtag?.('event', 'page_view', { page_title: pageName });
      console.log('[Analytics] Page View:', pageName);
    }
  },

  /**
   * Track custom event
   */
  event: ({ category, action, label, value }: AnalyticsEvent) => {
    if (typeof window !== 'undefined') {
      // Ready for Google Analytics 4
      // window.gtag?.('event', action, { category, label, value });
      console.log('[Analytics] Event:', { category, action, label, value });
    }
  },

  /**
   * Track button click
   */
  buttonClick: (buttonName: string, location: string) => {
    analytics.event({
      category: 'User Interaction',
      action: 'Button Click',
      label: `${buttonName} - ${location}`,
    });
  },

  /**
   * Track form submission
   */
  formSubmit: (formName: string, success: boolean) => {
    analytics.event({
      category: 'Form',
      action: success ? 'Submit Success' : 'Submit Failed',
      label: formName,
    });
  },

  /**
   * Track product view
   */
  productView: (productId: string, productName: string) => {
    analytics.event({
      category: 'Product',
      action: 'View',
      label: `${productId} - ${productName}`,
    });
  },

  /**
   * Track sample request
   */
  sampleRequest: (productId: string) => {
    analytics.event({
      category: 'Sample',
      action: 'Request',
      label: productId,
    });
  },
};
