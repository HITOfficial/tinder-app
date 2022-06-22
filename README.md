# Tinder App

Uczestnicy: Tomasz Bochnak, Bartosz Czop, Ada Bodziony

Realizacja Projektu: Baza danych i technologie realizacji aplikacji/systemu

Zastosowane technologie Frontend -> struktura przy użyciu biblioteki React Backend -> Express, NodeJS, MongoDB

Tematyka projektu: obraliśmy za cel zbudowanie klona popularnej aplikacji randkowej Tinder, największy nacisk zostanie nałożony na rozbudowanie bazy danych posiadającej wiele funkcji. Przykładowo: możliwość czatu z parą, wieloma typami “swapów” ,wstawianie i usuwanie zdjęć, edycję profilu, matchowanie osób przy podobnych zainteresowaniach, system logowania i rejestracji. Wizualnie postaramy się stworzyć przyjemną dla oka responsywną aplikację, z wykorzystaniem biblioteki React. Serwer łączący się z systemem MongoDB, który wykorzystamy do zbudowania naszej bazy dany, budowany będzie w oparciu o Express puszczony na NodeJS.


#### Perspektywa użytkownika:
##### 1. Panel logowania

![panel logowania](https://i.imgur.com/bvNbv9a.png)

Prosty panel logowania, dzięki któremu po zalogowaniu możemy uzyskać dostęp do funkcjonalności aplikacji (dostępne tylko dla zalogowanych użytkowników)

Wysłane zostaje żądanie do serwera, który weryfikuje zgodność danych użytkownika z danymi pobranymi z bazy danych (kolekcja users), a następnie wysyła odpowiedź, wraz z tokenem JWT jeżeli logowanie przebiegło pomyślnie. Przekierowuje również do profilu użytkownika.
Po zalogowaniu górny pasek zmienia postać dając dostęp do kolejnych podstron. 

![górny pasek](https://i.imgur.com/CEdXqiy.png)

Przykładowe komunikaty w przypadku niepowodzenia

![komunikat niepowodzenia 1](https://i.imgur.com/hEC9xZM.png)


![komunikat niepowodzenia 2](https://i.imgur.com/AfmvnkE.png)


##### 2. Panel rejestracji

![panel rejestracji](https://i.imgur.com/28Gtb6a.png)

Panel rejestracji gdzie musimy podać swoje podstawowe dane. Walidacja od strony serwera, sprawdza czy w bazie nie istnieje już użytkownik z wprowadzonym przez nas adresem email lub nazwą użytkownika – w przypadku takiej sytuacji użytkownik otrzymuje stosowny komunikat.
W przypadku pomyślnej rejestracji zostajemy przekierowani do panelu logowania.
Przykładowy komunikat – pomyślna rejestracja:

![komunikat pomyślna rejestracja](https://i.imgur.com/iO1KeZw.png)

##### 3. Profil

![profil](https://i.imgur.com/JoW0pQV.png)

Po zalogowaniu zostajemy przekierowani na stronę naszego profilu, gdzie możemy podejrzeć nasze dane (przy zalogowaniu pobrane z bazy), oraz je aktualizować (wysłany zostaje request do serwera).


##### 4. Matches - połączenia

![matches](https://i.imgur.com/cGbTx9m.png)

Miejsce do wyboru użytkowników (swapowania). Przy użyciu przycisków możemy przyjąć, odrzucić lub powrócić do poprzedniej osoby. Przyjęcie użytkownika (matcha) powoduje dodanie go do czatu.

![poprzedni match](https://i.imgur.com/SmosaEn.png)

Przycisk odpowiedzialny za powrót do poprzedniej osoby.

![usuń match](https://i.imgur.com/CafyNej.png)

Przycisk odpowiedzialny za pominięcie osoby.

![dodaj match](https://i.imgur.com/fxcGaVJ.png)

Przyciski odpowiedzialne za przyjęcie osoby.


##### 5. Czaty
Miejsce do rozmów z innymi użytkownikami, których zeswapowaliśmy lub oni zeswapowali nas ( nowy match ). New Matches to osoby z którymi jeszcze nie rozpoczęliśmy konwersacji. 
Lista Messages to wszystkie dostępne czaty użytkownika. 

![czaty użytkownika](https://i.imgur.com/uf7kiQS.png)

Czat możliwy z osobami, które zeswapowaliśmy (daliśmy aplikacji znać, że mamy ochotę porozmawiać z daną osobą).  
Przykładowe działanie czatu, po wejściu w konkretną konwersację:

![przykładowy czat 1](https://i.imgur.com/OBvYzC2.png)


![przykładowy czat 2](https://i.imgur.com/LEjNC4o.png)

#### Kolekcje

##### 1. Users

```js
UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    rooms: [String],
    age: {
        type: Number,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    sex: {
        type: String,
        required: true
    },
    sexPreference: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    gallery: [String]
}, {versionKey: false});
```

##### Przykładowy dokument
```json
{
    "_id":{"$oid":"629be231b801aab61e00ac68"},
    "name":"test",
    "email":"test@test.pl",
    "password":"$2a$08$cTz1lkDpNHzrx.UcYPNfOujBK68g/LYhUvnlLS7VssnAsfIrh/nKa",
    "rooms":["62b0ddf7af50c418579f782a","62b11eb5af50c418579f782b"],
    "age":{"$numberInt":"21"},
    "location":"test",
    "sex":"woman",
    "sexPreference":"men",
    "description":"test",
    "gallery":[],
    "avatar":"https://images.unsplash.com/photo-1614283233556-f35b0c801ef1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mjh8fHByb2ZpbGV8ZW58MHx8MHx8&auto=format&fit=crop&w=600&q=60"
}
```

##### 2. Rooms

```js
const RoomSchema = new mongoose.Schema({
    user1: {
        type: String,
        required: true,
    },
    user2: {
        type: String,
        required: true,
    },
    user1Avatar: {
        type: String,
        required: true,
    },
    user2Avatar: {
        type: String,
        required: true,
    },
    user1Name: {
        type: String,
        required: true,
    },
    user2Name: {
        type: String,
        required: true,
      },
    messages: [
    {
        type: MessageSchema,
    },
    ],
});
```
```js
MessageSchema = new mongoose.Schema({
  sender: {
    type: String,
    required: true,
  },
  receiver: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
});
```
##### Przykładowy dokument
```json
{   
    "_id":{"$oid":"62b0ddf7af50c418579f782a"},
    "user1":"629be231b801aab61e00ac68",
    "user2":"629cecf6e79ee13060c92124",
    "user1Avatar":"https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cG9ydHJhaXR8ZW58MHx8MHx8&w=1000&q=80",
    "user2Avatar":"https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
    "messages":[{
        "sender":"629cecf6e79ee13060c92124",
        "receiver":"629be231b801aab61e00ac68",
        "message":"hi","date":"Mon Jun 20 2022 22:56:03 GMT+0200 (czas środkowoeuropejski letni)",
        "_id":{"$oid":"62b0dee3c44698b7ea85cba5"}
        },{
        "sender":"629cecf6e79ee13060c92124",
        "receiver":"629be231b801aab61e00ac68",
        "message":":)",
        "date":"Mon Jun 20 2022 23:01:18 GMT+0200 (czas środkowoeuropejski letni)",
        "_id":{"$oid":"62b0e01ec44698b7ea85cbbc"}}],
    "user1Name":"test",
    "user2Name":"test2"
}
```




#### Backend oraz współpraca z bazą danych MongoDB

##### Rejestracja użytkownika
```js
router.post( "/api/auth/signup",
[verifySignUp.checkDuplicateUsernameOrEmail],
async (req, res) => {
   try{
  console.log(req.query);
   }
   catch (err) {
      console.log(err);
      return;
    }
  const user = new User({
      name: req.query.name,
      email: req.query.email,
      password: bcrypt.hashSync(req.query.password, 8),
      description : "-",
      sexPreference: req.query.sexPreference,
      sex:  req.query.sex,
      location: req.query.location,
      age: req.query.age
    });
  await user.save((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
      res.send({ message: "User was registered successfully!" });
  });
})
```

###### Middleware, który umożliwia sprawdzenie czy email lub nazwa użytkownika nie istnieje już w bazie
```js
checkDuplicateUsernameOrEmail = (req, res, next) => {
  // Username
  User.findOne({
    name: req.query.name
  }).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (user) {
      res.status(400).send({ message: "Failed! Username is already in use!" });
      return;
    }

    // Email
    User.findOne({
      email: req.query.email
    }).exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (user) {
        res.status(400).send({ message: "Failed! Email is already in use!" });
        return;
      }

      next();
    });
  });
};
```



##### Logowanie użytkownika wraz z walidacją - zwracane zostają dane użytkownika oraz token JWT
```js
router.post("/api/auth/signin/:name/:password",async(req, res) => {
  const user = await User.findOne({
    name: req.params.name,
    
  }).then( user=> {
      if (!user) {
       res.status(404).send({ message: "User Not found." });
        return;
      } 
      
     
      var passwordIsValid = bcrypt.compareSync(
      req.params.password,
      user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          token: null,
          message: "Invalid Password!"
        });
      }

      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400 // 24 hours
      });
     
      console.log(token);
      res.send({user, token: token})
    });
 
  })
  ```

###### Funkcja do weryfikacji czy zapytania do serwera zawierają właściwy token JWT:
```js
verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({ message: "No token provided!" });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Unauthorized!" });
    }
    req.userId = decoded.id;
    next();
  });
};
```
 
###### oraz przykładowe zastosowanie powyższej weryfikacji:                           
```js
router.get("/users", [authJwt.verifyToken], async (req, res) => {
	try {
		const users = await User.find();
		res.send(users)
	}
	catch (err) {
		console.log(err);
		return;
	}
})
```

##### Operacje na Users
###### Zwrócenie wszystkich użytkowników
```js
router.get("/users", async (req, res) => {
  const users = await User.find();
  res.send(users);
});
```

###### Zwrócenie użytkownika o danym id
```js
router.get("/users/:id", async (req, res) => {
  const user = await User.findOne({ _id: req.params.id });
  res.send(user);
});
```



##### Operacje na Rooms
###### Zwrócenie wszystkich pokoi
```js
router.get("/rooms", async (req, res) => {
  const rooms = await Room.find();
  res.send(rooms);
});
```

###### Zwrócenie pokoju o danym id
```js
router.get("/rooms/:id", async (req, res) => {
  const room = await Room.findById(req.params.id);
  res.send(room);
});
```

###### Dodanie nowego pokoju
```js
router.post("/room/add", async (req, res) => {
    const room = new Room({
      user1: req.query.user1,
        user1Name: req.query.user1Name,
      user1Avatar: req.query.user1Avatar,
      user2: req.query.user2,
        user2Name: req.query.user2Name,
        user2Avatar: req.query.user2Avatar,
      messages: [],
    });

    room.save().then((e) => console.log("added new room", e))
    await User.updateOne(
        { _id: req.query.user1 },
        {
            $push: {
                rooms: room._id,
            },
        }
    );

    await User.updateOne(
        { _id: req.query.user2 },
        {
            $push: {
                rooms: room._id,
            },
        }
    );
});
```

###### Dodanie wiadomości do pokoju o danym id
```js
router.post("/rooms/:id", async (req, res) => {
  const message = new Message({
    sender: req.body.sender,
    receiver: req.body.receiver,
    message: req.body.message,
    date: req.body.date,
  });
  await Room.updateOne(
    { _id: req.body._id },
    {
      $push: {
        messages: message,
      },
    }
  );
});
```


