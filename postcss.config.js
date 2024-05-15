module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
    ...(process.env.PUBLISH_TO_PRERELEASE === 'false' && process.env.PUBLISH_TO_DRAFT === 'false'
      ? { cssnano: {} }
      : {})
  }
}
