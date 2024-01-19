# Bitcoin Statistics

## Steps To Deploy

1. `npm install`
2. `npm i serve -g`
3. `npm run build` (creates static files in dist folder)
4. `serve -s dist -l 3000` (starts static server at port 3000)

### Important

**Note**: A better way is to not use `serve` and use nginx to deliver static resources (from dist directory). It's considered faster.
