clone repository 

cd to projct directory

```
cd client\bmtg\
npm i
npm start
```

in other termonal cd to project directory and make sure you have docker installed

```
docker-compose up -d --build
docker-compose exec web python manage.py makemigrations --noinput
docker-compose exec web python manage.py migrate --noinput
docker-compose exec web python manage.py seed_days --noinput
docker-compose exec web python manage.py seed_tags_names --noinput
```

you can access client app on 
```
http://localhost:3000/
```

