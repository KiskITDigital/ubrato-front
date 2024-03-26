/* eslint-disable no-undef */
import fs from 'fs';
import path from 'path';
import express from 'express';

const createServer = async () => {
  const app = express();
  let vite;
  // console.log(import.meta.env.VITE_NODE_ENV)

  if (process.env.NODE_ENV === 'development') {
    vite = await (
      await import('vite')
    ).createServer({
      server: { middlewareMode: true },
      appType: 'custom',
    });
    app.use(vite.middlewares);
  } else {
    app.use((await import('compression')).default());
    app.use(
      (await import('serve-static')).default(path.resolve('dist/client'), {
        index: false,
      })
    );
  }

  app.use('*', async (req, res, next) => {
    const url = req.originalUrl;
    let template, render;

    try {
      if (process.env.NODE_ENV === 'development') {
        template = fs.readFileSync(path.resolve('./index.html'), 'utf-8');

        template = await vite.transformIndexHtml(url, template);

        render = (await vite.ssrLoadModule('/src/entry-server.tsx')).render;
      } else {
        template = fs.readFileSync(path.resolve('dist/client/index.html'), 'utf-8');
        render = (await import('./dist/server/entry-server.js')).render;
      }

      const appHtml = await render({ path: url});

      const html = template.replace(`<!--ssr-outlet-->`, appHtml);

      res.status(200).set({ 'Content-Type': 'text/html' }).end(html);
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        vite.ssrFixStacktrace(error);
      }
      next(error);
    }
  });

  const PORT = process.env.PORT || 5174;

  app.listen(PORT);
};

createServer().then(() => {
  console.log(`http://localhost:${process.env.PORT}`);
});
