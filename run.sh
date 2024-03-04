exit_c=0

echo "Start the performance test"
docker-compose run k6 run /scripts/script.js || exit_c=$?
echo "Ene performance test"
exit $exit_c