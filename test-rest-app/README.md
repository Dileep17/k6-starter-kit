
run backend


postgress
1. docker-compose up
2. docker-compose exec database psql -U postgres
3. create database autk6;
4. \c autk6;
5. create schema
```
CREATE TABLE "user" (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    UNIQUE(name)
);

CREATE TABLE "song" (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    duration NUMERIC,
    UNIQUE(name)
);

CREATE TABLE "FavSong" (
    id SERIAL PRIMARY KEY,
    song_id INTEGER REFERENCES "song"(id),
    user_id INTEGER REFERENCES "user"(id),
    UNIQUE(song_id, user_id)
);
```
6. npm run dev
7. curl -X POST http://localhost:4000/user -H "Content-Type: application/json" -d "{\"name\": \"Dilp\"}"
8. curl http://localhost:4000/user
9. curl -X POST http://localhost:4000/song -H "Content-Type: application/json" -d "{\"name\": \"kim kim\", \"duration\": 100}"
10.curl http://localhost:4000/song
11.curl -X POST http://localhost:4000/fav -H "Content-Type: application/json" -d "{\"song_id\": \"1\", \"user_id\":\"1\"}"
12.curl http://localhost:4000/fav


curl -X POST http://localhost:4000/song -H "Content-Type: application/json" -d "{\"name\": \"kim kim\", \"duratioqwn\": 100}"

truncate "user" cascade;
truncate "song" cascade;
truncate "FavSong" cascade;
ALTER SEQUENCE "FavSong_id_seq" RESTART WITH 1;
ALTER SEQUENCE song_id_seq RESTART WITH 1;
ALTER SEQUENCE user_id_seq RESTART WITH 1;


docker exec -it 3c269d976445 sh
mkdir -p /tmp/bin && \
    wget -qO- https://curl.se/download/curl-7.82.0.tar.gz | tar xvz -C /tmp && \
    wget -qO- https://ftp.gnu.org/gnu/wget/wget-1.21.2.tar.gz | tar xvz -C /tmp && \
    cd /tmp/curl-7.82.0 && ./configure && make && cp src/curl /tmp/bin/curl && \
    cd /tmp/wget-1.21.2 && ./configure && make && cp src/wget /tmp/bin/wget
curl http://localhost:4000/user
