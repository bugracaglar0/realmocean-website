pwd
ls -ll
cd /install/data
pwd
ls -ll
cat .env

docker-compose down
docker-compose up -d

cd /install

docker cp  ./realmocean  realmocean:/usr/src/code/app

cd /install/data
docker-compose restart