set e

echo "Running database migrations"
npm run migrate

echo "Running Seeds"
npm run seed

# echo "Running Test Cases"
# npm test

echo "Running Server Server"
npm start