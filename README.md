# Εφαρμογή υποστήριξης αρχαιολογικού Μουσείου

Εφαρμογή υποστήριξης αρχαιολογικού Μουσείου με τεχνολογίες Express.js, MongoDB, HTML, CSS, Javascript, Bootstrap.

Archaelogical Museum support application using Express.js, MongoDB, HTML, CSS, Javascript, Bootstrap.

Τρέχει με `npm run appstart` (δείτε τα αντίστοιχα script στο `packages.json`)

Runs with `npm run appstart` (see the scripts in `packages.json`)
## Λεπτομέρειες - Details

Το `appstart.js` ακολουθεί τη λογική MVC. Το πρόγραμμα μοιράζεται σε διάφορα τμήματα: 
 - `/models` παρέχει την πρόσβαση στη βάση δεδομένων
 - `/controllers` περιέχει συναρτήσεις για να έχουμε πρόσβαση στα δεδομένα που μας δίνουν τα models.
 - Οι φάκελοι `views` και `routers`:
  - Ο `/views` περιέχει template γραμμένα σε handlebars.
  - Ο `/routers` περιέχει τις διαδρομές που αναγνωρίζει η εφαρμογή.

`appstart.js` follows the MVC pattern. The program is split in various components: 
- `/models` is responsible for access to the data (reading/writing).
- `/controllers` controlls the core logic of the program. It acts upon a request, uses the models to read/store data and to prepare the answer to the client.
- `/views` contains the templates in handlebars language.
- `/routers` contains the application's routes, i.e. the URI's it will respond to.
## Τα μοντέλα - The models
Ο φάκελος `/models` περιέχει έξι (6) μοντέλα

- `col_model`: Μοντέλο που περιέχει δεδομένα για τις συλλογές (collections),

-`events_model`: Μοντέλο που περιέχει δεδομένα για τις εκδηλώσεις (events),

-`model_admin`: Μοντέλο που περιέχει δεδομένα για τoυς administrators (admins),

-`model_exhibitions`: Μοντέλο που περιέχει δεδομένα για τα εκθέματα (exhibits),

-`ticket_model`: Μοντέλο που περιέχει δεδομένα για τα εισιτήρια (tickets),

-`user_model`: Μοντέλο που περιέχει δεδομένα για τον χρήστη (user).
## Οι controllers
Στο αρχείο `/controller/task-list-controller.js` περιέχονται οι συναρτήσεις χειρισμού του μοντέλου.

Μπορείτε να χρησιμοποιήσετε τα διαφορετικά μοντέλα, προσαρμόζοντας κατάλληλα τα σχόλια στην κορυφή του αρχείου:

The controller is in file `/controller/task-list-controller.js`. After you have written different models, use them by just switching to the model you want to use.

```javascript
const model = require('../model/task-list-model-no-db.js');
// const model = require('../model/task-list-model-mongo.js');
// const model = require('../model/task-list-model-postgres.js');
```


