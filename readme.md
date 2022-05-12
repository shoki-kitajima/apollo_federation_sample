# apollo federationのNode.jsサンプル

## このリポジトリについて

こちらの記事のためにで作成したものです。

https://note.com/shopon/n/nba50fd2bc1e7


## node version

14.17.5
一応各サービス内に.node-versionを置いてあります。

## 各サービスpackageインストール

api_authors
```
cd api_authors
npm install
```

api_books
```
cd api_books
npm install
```

api_reviews
```
cd api_reviews
npm install
```

graphql_gateway(他のサービスがすべて立ち上がっていないと起動しないので注意が必要です)
```
cd graphql_gateway
npm install
```

## 各サービス起動

api_authors
```
cd api_authors
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

graphql_gateway(他のサービスがすべて立ち上がっていないと起動しない)
```
cd graphql_gateway
node index.js
```

## graphqlを実行して確認

graphql_gatewayのlistenポート(デフォルト4000)に向けてクエリを実行すれば確認できます。

http://localhost:4000/

手元にGraphQL clientがない場合はapollo studioから確認するのが容易です。

https://studio.apollographql.com/sandbox/explorer


サンプルクエリ

```
query {
  # reviewからbook, authorをとる
  reviews {
    id
    book_id
    comment
    book {
      id
      title
      author {
        name
      }
    }
  }
  # booksからauthor, reviewをとる
  books {
    id
    title
    author_id
    author {
      id
    }
    reviews {
      id
      book_id
      score
    }
  }
  # authorsからbooks,reviewをとる
  authors {
    id
    name
    books {
      author_id
      title
      reviews {
        id
        score
      }
    }
  }
}
```
