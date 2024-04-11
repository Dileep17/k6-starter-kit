npm install

docker-compose up -d influxdb grafana

./run.sh


view metrics in influx container
docker exec -it k6-starter-kit-influxdb-1 /usr/bin/influx
