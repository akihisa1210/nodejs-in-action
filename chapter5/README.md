# 5.1 サーバーレスデータストレージ

# 5.1.1 メモリ内ストレージ

## counter.js

アクセス回数を表示するサーバー。
アクセス回数は変数に保存される。

```
node counter.js
curl localhost:3000
```

# 5.1.2 ファイルベースのストレージ

## todo.js

コマンドライン式の todo リストツール。
todo はファイル (.tasks) に保存される。
```
# todo を追加
node todo.js add {todo}

# todo を表示
node todo.js list
```
