# cards-api

cd cards-api

docker build -t cards-api .

docker run -dp 3000:3000 cards-api

OR 

docker-compose -f "docker-compose.yml" up -d --build
