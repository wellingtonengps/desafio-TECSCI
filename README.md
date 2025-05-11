docker-compose up -d

npx prisma migrate dev --name init

npx prisma generate

npm run dev

curl -X POST http://localhost:3000/usinas \
-H "Content-Type: application/json" \
-d @usinas.json
# desafio-TECSCI
