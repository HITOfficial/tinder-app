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
![image](https://user-images.githubusercontent.com/72196988/174889271-107ed0f5-6da4-4be7-b4a1-1c319d3bc4de.png)

Middleware, który umożliwia sprawdzenie czy email lub nazwa użytkownika nie istnieje już na bazie
![image](https://user-images.githubusercontent.com/72196988/174889423-f35edc2a-64ef-450c-90f5-afad7e66420f.png)

##### Logowanie użytkownika wraz z walidacją - zwracane zostają dane użytkownika oraz token JWT
![image](https://user-images.githubusercontent.com/72196988/174889389-9690de19-d3d2-4e88-8a4d-eda71e7b8cf9.png)

Funkcja do weryfikacji czy zapytania do serwera zawierają właściwy token JWT:
![image](https://user-images.githubusercontent.com/72196988/174889828-96bcea6f-b384-4c9a-acbd-3f70dd9d7c03.png)
 
oraz przykładowe zastosowanie powyższej weryfikacji:                           
![image](https://user-images.githubusercontent.com/72196988/174889955-6157d04c-ea8a-4401-ae62-86d26d151f13.png)


