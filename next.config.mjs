const nextConfig = {
  reactStrictMode: true,
  images: {
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placeholder.svg',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'source.unsplash.com',
      },
      {
        // Allow any IP address
        protocol: 'http',
        hostname: '**',
      },
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        // Allow localhost
        protocol: 'http',
        hostname: 'localhost',
      },
      {
        protocol: 'http',
        hostname: '127.0.0.1',
      }
    ],
    domains: [
      'localhost',
      '127.0.0.1',
      'placeholder.svg',
      'images.unsplash.com',
      'source.unsplash.com'
    ],
    formats: ['image/avif', 'image/webp'],
  },
  eslint: {
    // Only run ESLint on these directories
    dirs: ['app', 'components', 'lib', 'pages'],
    ignoreDuringBuilds: false,
  },
  // Modern optimizations for Vercel deployment
  poweredByHeader: false,
  compress: true,
}

export default nextConfig

