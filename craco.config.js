module.exports = {
    style: {
      postcss: {
        plugins: [
          require('tailwindcss'),
          require('autoprefixer'),
        ],
      },
    },
    devServer: {
      headers: {
        'Cross-Origin-Embedder-Policy': 'unsafe-none'
      }
    }
  }