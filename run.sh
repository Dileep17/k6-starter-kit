exit_c=0
echo "Start the performance test"
BUILD="$(date | sed -e "s/ /_/g")"
docker-compose run k6 run /scripts/fav.js --tag pipeline_id=$BUILD || exit_c=0
echo "End performance test"
exit $exit_c