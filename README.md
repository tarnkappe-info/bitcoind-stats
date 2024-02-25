# Bitcoin Statistics

## Steps To Deploy

1. `npm install`
2. `npm i serve -g`
3. `npm run build` (creates static files in dist folder)
4. `serve -s dist -l 3000` (starts static server at port 3000)

## Run in Docker
```
docker build --no-cache -t btc-stats .
docker run --name btc-stats -d -p  80:80 btc-stats
```

### Important

**Note**: A better way is to not use `serve` and use nginx to deliver static resources (from dist directory). It's considered faster.

To use this programm you have to use the listtransactions rpc command and copy the output into the textfield
