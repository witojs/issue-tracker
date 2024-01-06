# JS ISSUE TRACKER

Aplikasi JS Issue Tracker merupakan sebuah aplikasi berbasis javascript sederhana, project ini akan menyimpan issue dan menampilkan issue pada tampilan website.

## Preparation

Pada project ini kita akan membuat 2 berkas yakni berkas index.html & main.js. Pada project kita juga akan menggunakan bootstrap & chance js.

1. Buat berkas index.html dan tuliskan code berikut:

```html
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>JS Issue Tracker</title>
    <link
      rel="stylesheet"
      href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"
      integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u"
      crossorigin="anonymous"
    />
    <!-- bootstrap style -->
  </head>
  <body>
    <script src="main.js"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
    <!-- jquery for bootstrap -->
    <script
      src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"
      integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa"
      crossorigin="anonymous"
    ></script>
    <!-- js for bootstrap -->
    <script src="http://chancejs.com/chance.min.js"></script>
    <!-- chance library for generating unique id -->
  </body>
</html>
```

Pada bagian link setelah tag title, kita menggunakan bootstrap yang kita impor melalui library, kita juga mengimpor script agar interaksi javascript menggunakan bootstrap dapat dilakukan.

## Implementasi UI

Selanjutnya kita akan menambahkan tampilan aplikasi atau user interface.

1. Pada berkas index.html tambahkan code berikut:

```html
<!-- code lainnya disembunyikan -->

<body onload="fetchIssues()">
  <div class="container">
    <h1>JS Issue Tracker <small>by CodingTheSmartWay.com</small></h1>
    <div class="jumbotron">
      <h3>Add New Issue:</h3>
      <form id="issueInputForm">
        <div class="form-group">
          <label for="issueDescInput">Description</label>
          <input
            type="text"
            class="form-control"
            id="issueDescInput"
            placeholder="Describe the issue ..."
          />
        </div>
        <div class="form-group">
          <label for="issueDescInput">Severity</label>
          <select class="form-control" id="issueSeverityInput">
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>
        <div class="form-group">
          <label for="issueDescInput">Assigned To</label>
          <input
            type="text"
            class="form-control"
            id="issueAssignedToInput"
            placeholder="Enter responsible ..."
          />
        </div>

        <button type="submit" class="btn btn-primary">Add</button>
      </form>
    </div>
    <div class="row">
      <div class="col-lg-12">
        <div id="issuesList"></div>
      </div>
    </div>
    <div class="footer">
      <p>&copy CodingTheSmartWay.com</p>
    </div>
  </div>
  <script src="main.js"></script>
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
  <!-- jquery for bootstrap -->
  <script
    src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"
    integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa"
    crossorigin="anonymous"
  ></script>
  <!-- js for bootstrap -->
  <script src="http://chancejs.com/chance.min.js"></script>
  <!-- chance library for generating unique id -->
</body>

<!-- code lainnya disembunyikan -->
```

Pada code di atas, kita menambahkan attribute onload dimana attribute tersebut akan memanggil fungsi fetchIssues() yang akan kita buat pada berkas main.js. Tampilan aplikasi akan terdiri dari bagian form dimana kita dapat menambahkan issue baru dengan id "issueInputForm" dan bagian issue dengan id "issuesList". Issues List akan kita buat agar dapat ditampilkan secara dinamis sesuai dengan data yang kita input pada bagian form.

## Implementasi Javascript

1. Tambahkan event listener pada event ketika form di submit.

```js
//main.js
document.getElementById('issueInputForm').addEventListener('submit', saveIssue);
```

2. Buat fungsi dengan nama fetchissues, fungsi ini akan mengambil data issue yang kita buat dari browser storage.

```js
//main.js
document.getElementById('issueInputForm').addEventListener('submit', saveIssue);

function fetchIssues() {
  const issues = JSON.parse(localStorage.getItem('issues')); //getting issues from browser storage
  const issuesList = document.getElementById('issuesList'); //getting DOM

  issuesList.innerHTML = '';

  for (let i = 0; i < issues.length; i++) {
    //generating issue list from issues
    const id = issues[i].id;
    const desc = issues[i].description;
    const severity = issues[i].severity;
    const assignedTo = issues[i].assignedTo;
    const status = issues[i].status;

    issuesList.innerHTML +=
      '<div class="well">' +
      '<h6>Issue ID: ' +
      id +
      '</h6>' +
      '<p><span class="label label-info">' +
      status +
      '</span></p>' +
      '<h3>' +
      desc +
      '</h3>' +
      '<p><span class="glyphicon glyphicon-time"></span> ' +
      severity +
      ' ' +
      '<span class="glyphicon glyphicon-user"></span> ' +
      assignedTo +
      '</p>' +
      '<a href="#" class="btn btn-warning" onclick="setStatusClosed(\'' +
      id +
      '\')">Close</a> ' +
      '<a href="#" class="btn btn-danger" onclick="deleteIssue(\'' +
      id +
      '\')">Delete</a>' +
      '</div>';
  }
}
```

Pada code di atas, fungsi fetchIssues akan mengambil data issues dari browser storage. kemudian data issues yang telah kita ambil kita lakukan iterasi di mana setiap data yang diiterasi akan menambahkan element baru pada DOM dengan id issuesList.

3. Buat fungsi saveIssue fungsi ini akan menyimpan issue yang kita input pada element form.

```js
//main.js

/* kode lainnya disembunyikan */

function saveIssue(e) {
  const issueId = chance.guid(); //generating unique id from chance js
  const issueDesc = document.getElementById('issueDescInput').value;
  const issueSeverity = document.getElementById('issueSeverityInput').value;
  const issueAssignedTo = document.getElementById('issueAssignedToInput').value;
  const issueStatus = 'Open';

  const issue = {
    //generating object issue
    id: issueId,
    description: issueDesc,
    severity: issueSeverity,
    assignedTo: issueAssignedTo,
    status: issueStatus,
  };

  //checking if issues data already exist
  if (localStorage.getItem('issues') === null) {
    const issues = [];
    issues.push(issue);
    localStorage.setItem('issues', JSON.stringify(issues));
  } else {
    const issues = JSON.parse(localStorage.getItem('issues'));
    issues.push(issue);
    localStorage.setItem('issues', JSON.stringify(issues));
  }

  //clearing input form
  document.getElementById('issueInputForm').reset();

  fetchIssues();

  e.preventDefault();
}
```

Pada code di atas, kita mengambil value dari masing-masing input yakni issueDescInput, issueSeverityInput & issueAssignedInput. Kita juga mengenerate id dengan menggunakan library chance dan memanggil method .guid(). Data input kita masukan kedalam sebuah object.
Objec issue tersebut kemudian kita tambahkan ke array issues. Sebelum menambahkan kita lakukan pengecekan terlebih dahulu. Jika data issues pada browser storage belum ada, maka data array tersebut kita tambahkan dengan nama issues.
Namun jika data telah ada sebelumnya, maka kita mengambil data dari storage terlebih dahulu, lalu menambahkan data issue dengan method push. Kemudian kita simpan kembali ke dalam browser storage.
Setelah data tersebut disimpan, kita mengembalikan nilai default input pada form dengan method reset.
Ketika kita telah melakukan input data, kita perlu memunculkan data tersebut sehingga kita memanggil fungsi fetchIssue(). Terakhir kita memanggil method preventDefault() untuk mencegah browser melakukan refresh halaman setiap kita melakukan submit data.

Jalankan website menggunakan live server dan coba lakukan input data, maka data akan muncul dengan id yang digenerate oleh chance js.

## Menambahkan fungsionalitas close & delete

Selanjutnya kita akan menambahkan fungsionalitas pada tombol close & delete. Tombol close digunakan untuk menandai bahwa issue tersebut telah diatasi. Tombol delete digunakan untuk menghapus issue.

1. Buat fungsi setStatusClosed seperti berikut:

```js
//main.js

/* code lainnya disembunyikan */
function setStatusClosed(id) {
  const issues = JSON.parse(localStorage.getItem('issues'));

  for (let i = 0; i < issues.length; i++) {
    if (issues[i].id == id) {
      issues[i].status = 'Closed';
    }
  }

  localStorage.setItem('issues', JSON.stringify(issues));

  fetchIssues();
}
```

Fungsi tersebut akan mengambil id kemudian mengambil data issues dari browser storage. Data issues yang telah diperolah kemudian dilakukan iterasi untuk menemukan issue dengan id yang dimiliki issue terkait dan mengubah status issue tersebut dari open menjadi closed. Lalu kita menyimpan kembali data terupdate ke dalam browser storage dan memanggil fungsi fetchIssues()

2. Buat fungsi deleteIssue seperti berikut:

```js
//main.js

/* code lainnya disembunyikan */
function setStatusClosed(id) {
  const issues = JSON.parse(localStorage.getItem('issues'));

  for (let i = 0; i < issues.length; i++) {
    if (issues[i].id == id) {
      issues[i].status = 'Closed';
    }
  }

  localStorage.setItem('issues', JSON.stringify(issues));

  fetchIssues();
}

function deleteIssue(id) {
  const issues = JSON.parse(localStorage.getItem('issues'));

  for (let i = 0; i < issues.length; i++) {
    if (issues[i].id == id) {
      issues.splice(i, 1);
    }
  }

  localStorage.setItem('issues', JSON.stringify(issues));

  fetchIssues();
}
```

fungsi deleteIssue bekerja dengan mengambil data issues dari browser storage. Data issue yang diperoleh lalu dilakukan iterasi, ketika id ditemukan maka kita akan menghapus data array dari index id yang ditemukan menggunakan method splice. Sama seperti pada fungsi sebelumnya kita simpan kembali data terupdate ke dalam browser storage dan memanggil fungsi fetchIssues().

Jalankan website kembali menggunakan live server dan uji coba aplikasi. Klik tombol close untuk mengubah status issue dan tombol delete untuk menghapus issue.

Aplikasi issue tracker telah kita buat dengan menggunakan code javascript murni, silahkan lakukan modifikasi baik dengan menambahkan fitur maupun dengan menggunakan library atau framework seperti react, angular maupun vue js.

Sumber:
PROJECT BASED LEARNING JAVASCRIPT: https://github.com/practical-tutorials/project-based-learning?tab=readme-ov-file#javascript

Codingthesmartway: https://www.codingthesmartway.com/pure-javascript-building-a-real-world-application-from-scratch/
