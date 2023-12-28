# Infastructure

## Overview

- CloudFormation templates used to deploy infastructure on AWS.
- GitHub action runs on push to main branch.
  - Builds lambda package and deploys.

## Architecture Diagram

<img
  src='../docs/aws_architecture-diagram.png'
  raw=true
  alt='AWS Architecture Diagram'
  height="500px"
  width="auto"
/>

### Environment variables for lambda

Add `TOPIC_ARN` environment variables for the lamba.
