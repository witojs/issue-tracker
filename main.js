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
