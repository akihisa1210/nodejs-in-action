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
# MySQL のユーザー: myuser@localhost/mypassword
# MySQL に timetrack データベースを作成する。
CREATE DATABASE timetrack;

cd timetrack
node timetrack.js

# localhost:3000 にブラウザからアクセスする。
```

※日本語は文字化けします。

# 5.2.2 PostgreSQL

## fakeuser/fakeuser.js

ダミーユーザーデータ生成ツール。
ダミーデータは PostgreSQL の mydatabase データベースに保存される。

```
# PostgreSQL のユーザー: postgres@localhost/root
# PostgreSQL に mydatabase データベースを作成する。
# mydatabase に users テーブルを作成する。
create table users (id SERIAL, name TEXT NOT NULL, age INTEGER NOT NULL, city TEXT NOT NULL);

cd fakeuser
node fakeuser.js
```

# 5.3 NoSQL データベース

# 5.3.1 Redis

## redis/redis.js

redis への接続とデータ登録、データ取得のテスト。
