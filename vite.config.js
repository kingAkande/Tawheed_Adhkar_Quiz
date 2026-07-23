import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import https from 'https'

// Custom Vite plugin to proxy TTS requests to Google Translate
function ttsProxyPlugin() {
  return {
    name: 'tts-proxy',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (!req.url.startsWith('/api/tts')) return next();

        const parsed = new URL(req.url, 'http://localhost');
        const text = parsed.searchParams.get('q') || '';
        const lang = parsed.searchParams.get('tl') || 'ar';

        const googleUrl = `https://translate.google.com/translate_tts?ie=UTF-8&tl=${lang}&client=tw-ob&q=${encodeURIComponent(text)}`;

        const options = {
          headers: {
            'Referer': 'https://translate.google.com/',
            'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
          }
        };

        https.get(googleUrl, options, (googleRes) => {
          res.writeHead(200, {
            'Content-Type': 'audio/mpeg',
            'Cache-Control': 'public, max-age=86400'
          });
          googleRes.pipe(res);
        }).on('error', (err) => {
          console.error('TTS proxy error:', err.message);
          res.writeHead(500);
          res.end('TTS Error');
        });
      });
    }
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), ttsProxyPlugin()]
})
