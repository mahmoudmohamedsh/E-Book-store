# API Documentation
heroku : https://e-book-node.herokuapp.com/
## User model

| endpoint | Methods |
|----------|:---------:|
| /user/signup  | POST    |
| /user/login   | POST    |

---

> 1 \
> endpoint : /user/signup \
> Method : POST \
> JSON Formate : { \
>    "email":"any@gmail.com",\
>    "password": "any password",\
> } 

---

> 2 \
> endpoint : /user/login \
> Method : POST \
> JSON Formate : { \
>    "email":"any@gmail.com",\
>    "password": "any password",\
>    "name":"name"\
> } 

# Books model

| endpoint | Methods |
|----------|:---------:|
| /book/add    | POST    |
| /book/edit   | POST    |
| /book/delet   | POST    |
| /book/getAllBooks | GET |
| /book/getBook/:bookId | GET|

---

> 1 \
> endpoint : /book/add \
> Method : POST \
> JSON Formate : {\
>    "title":"test",\
>    "description":"some basic des",\
>    "imagePath":"",\
>    "price":10\
>} 

---


# Order model

| endpoint | Methods |
|----------|:---------:|
| /order/add    | POST    |
| /order/edit   | POST    |
| /order/delet   | POST    |
| /order/getAllOrders | GET |
| /order/getAllOrders?page=1 | GET|

---

