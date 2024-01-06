# Infastructure

## Overview

- CloudFormation templates used to deploy infastructure on AWS.
- GitHub action runs on push to main branch.
  - Builds lambda package and deploys.

## Architecture Diagram

Backend
<img
  src='../docs/backend_diagram.png'
  raw=true
  alt='AWS Backend Architecture Diagram'
  width="100%"
  height="auto"
/>

Frontend
<img
  src='../docs/frontend_diagram.png'
  raw=true
  alt='AWS Frontend Architecture Diagram'
  width="100%"
  height="auto"
/>

### Environment variables for lambda

Add `TOPIC_ARN` environment variables for the lamba.
