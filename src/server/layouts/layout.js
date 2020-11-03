import serialize from 'serialize-javascript' ; 

const Layout = ( init ) => {
  let { chunkName , title , css , js } = init ; 
  
  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <meta name="description" content="자신의 지식을 작성하세요.">
    <meta property="og:type" content="website">
    <meta property="og:title" content="개자이너 블로그">
    <meta property="og:description" content="개발과디자인지식을 공유하고싶어요">
    <meta property="og:image" content="http://www.gaesignerblog.com/images/gaesigner_400x400.jpg">
    <meta property="og:url" content="http://www.gaesignerblog.com/post/3">

    <meta name="msapplication-TileColor" content="#ffffff">
    <meta name="msapplication-TileImage" content="/favicon.ico">
    <meta name="theme-color" content="#ffffff">

    <title>${ title }</title>
  </head>
  <body>
    <div id="rootWrap"></div>
    <link rel="stylesheet" href="/css/${ css || chunkName }.css"/>
    <!-- <link rel="stylesheet" href="https://unpkg.com/ionicons@4.6.4-1/dist/css/ionicons.min.css"/> -->
    <script src="/js/${ js || chunkName }.js"></script>
    <script class="initialState">window.__INITIAL_STATE__ = ${ serialize( init ) }</script>
  </body>
  </html>
  ` ; 
}

export default Layout ; 