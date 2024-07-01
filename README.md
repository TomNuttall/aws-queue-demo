# aws-queue-demo

Demo Project to explore setting up a queue workflow with SQS and Cognito.

Client can add messages to a queue, lambda processes queue messages and adds to DLQ if error.

## Architecture Diagram

Backend
<img
  src='./diagrams/backend_diagram.png'
  raw=true
  alt='AWS Backend Architecture Diagram'
  width="100%"
  height="auto"
/>

Frontend
<img
  src='./diagrams/frontend_diagram.png'
  raw=true
  alt='AWS Frontend Architecture Diagram'
  width="100%"
  height="auto"
/>
