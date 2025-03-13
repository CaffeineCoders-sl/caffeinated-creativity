# Images Directory

This directory contains public images used throughout the application.

## Logo

Make sure to add your logo file here with the name `logo.png`. This is required for the About page.

If you have a different logo filename or format, update the image path in the AboutPage.tsx file:

```tsx
<img 
  src="/images/your-logo-filename.extension" 
  alt="CaffeineCoders Logo" 
  className="max-w-full h-auto max-h-32"
  onLoad={() => setLogoLoaded(true)}
  onError={() => setLogoError(true)}
/>
```
