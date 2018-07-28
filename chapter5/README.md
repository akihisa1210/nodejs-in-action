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

## todo/todo.js

コマンドライン式の todo リストツール。  
todo はファイル (todo/.tasks) に保存される。

```
cd todo

# todo を追加
node todo.js add {todo}

# todo を表示
node todo.js list
```

# 5.2 リレーショナルデータベース管理システム

# 5.2.1 MySQL

## timetrack/timetrack_server.js

日報管理 Web アプリケーション。
日報は MySQL の timetrack データベースに保存される。

```
# MySQL に timetrack データベースを作成する。
CREATE DATABASE timetrack;

# MySQL の myuser ユーザー（パスワード: mypassword）に、timetrack へのアクセス権を与える。

cd timetrack
node timetrack.js

# localhost:3000 にブラウザからアクセスする。
```

※日本語は文字化けします。
