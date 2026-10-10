# Full Stack Open — Part 0

Prepared by Codex (AI) at the account holder's request. This assistance is disclosed in the course submission. These diagrams are not represented as independently authored by the account holder.

Read the official Fundamentals of Web Apps chapter and the linked MDN HTML, CSS, and first-form tutorials (exercises 0.1–0.3). The following original diagrams cover exercises 0.4–0.6. No claim that the user personally completed these readings or authored these diagrams.

Source: https://fullstackopen.com/en/part0/fundamentals_of_web_apps/

## 0.4 — New note with traditional form submission

```mermaid
sequenceDiagram
    actor User
    participant Browser
    participant Server
    User->>Browser: Enter note and click Save
    Browser->>Server: POST /exampleapp/new_note (form field note)
    Note right of Server: Append content and server timestamp to in-memory notes
    Server-->>Browser: 302 redirect to /exampleapp/notes
    Browser->>Server: GET /exampleapp/notes
    Server-->>Browser: HTML
    Browser->>Server: GET /exampleapp/main.css
    Server-->>Browser: CSS
    Browser->>Server: GET /exampleapp/main.js
    Server-->>Browser: JavaScript
    Note right of Browser: Execute script and request notes
    Browser->>Server: GET /exampleapp/data.json
    Server-->>Browser: Notes JSON
    Note right of Browser: Callback builds the note list in the DOM
```

CSS and JavaScript requests may overlap; the diagram describes dependencies, rather than asserting that every browser serializes them.

## 0.5 — Opening the SPA

```mermaid
sequenceDiagram
    actor User
    participant Browser
    participant Server
    User->>Browser: Navigate to /exampleapp/spa
    Browser->>Server: GET /exampleapp/spa
    Server-->>Browser: HTML
    Browser->>Server: GET /exampleapp/main.css
    Server-->>Browser: CSS
    Browser->>Server: GET /exampleapp/spa.js
    Server-->>Browser: JavaScript
    Note right of Browser: Register form handler and load notes
    Browser->>Server: GET /exampleapp/data.json
    Server-->>Browser: Notes JSON
    Note right of Browser: Render notes in the existing document
```

## 0.6 — New note in the SPA

```mermaid
sequenceDiagram
    actor User
    participant Browser
    participant Server
    User->>Browser: Enter note and click Save
    Note right of Browser: Handler prevents default form navigation
    Note right of Browser: Create content/date object, append to local notes, clear input, redraw
    Browser->>Server: POST /exampleapp/new_note_spa (JSON, Content-Type application/json)
    Note right of Server: Save the new note in memory
    Server-->>Browser: 201 Created
    Note right of Browser: Keep the current document, no redirect or reload
```

The demo stores notes in memory, not a durable database. A local DOM change alone does not save server data. The SPA updates the list before the POST completes, which can leave a local/server mismatch if that request fails.
