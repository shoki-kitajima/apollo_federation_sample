# apollo federationのNode.jsサンプル

## 各サービス起動

api_author
```
cd api_author
node index.js
```

api_books
```
cd api_books
node index.js
```

api_reviews
```
cd api_reviews
node index.js
```

graphql_gateway
```
cd graphql_gateway
node index.js
```

## graphqlを実行して確認

graphql_gatewayのlistenポート(デフォルト4000)に向けてクエリを実行すれば確認できる。

手元にclientがない場合はapollo studioから確認するのが容易

https://studio.apollographql.com/sandbox/explorer
