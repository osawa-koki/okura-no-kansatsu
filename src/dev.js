const httpServer = require('http-server')
const esbuild = require('esbuild')

const PORT = 8000

const server = httpServer.createServer({
  root: './public/',
  robots: true,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': 'true'
  }
})

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
  console.log(`http://localhost:${PORT}`)
})

esbuild.context({
  entryPoints: ['./src/index.ts'],
  outfile: './public/script.js',
  bundle: true,
  minify: false,
  sourcemap: true,
  plugins: [{
    name: 'on-end',
    setup(build) {
      build.onEnd((error, result) => {
        console.log('Rebuild done!!!')
      })
    }
  }]
})
.then((ctx) => {
  ctx.watch()
})
.catch((err) => {
  console.error(err)
})
