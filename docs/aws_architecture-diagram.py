from diagrams import Cluster, Diagram, Edge
from diagrams.aws.security import ACM, IAM
from diagrams.aws.compute import Lambda
from diagrams.aws.management import Cloudwatch, CloudwatchAlarm
from diagrams.aws.integration import SQS
from diagrams.aws.engagement import SES
from diagrams.aws.general import User
from diagrams.aws.network import Route53, CloudFront, APIGateway
from diagrams.aws.storage import S3
from diagrams.onprem.ci import GithubActions
from diagrams.programming.framework import React

with Diagram("", filename="aws_architecture-diagram", outformat="png"):
  user = User("User")
  github_action_s3= GithubActions("Github Action")
  github_action_lambda = GithubActions("Github Action")
    
  with Cluster("AWS"):
    route_53 = Route53("Route53")
    iam_role_s3 = IAM("IAM")
    iam_role_lambda = IAM("IAM")

    with Cluster("FrontEnd"):
        cdn = CloudFront("CloudFront")
        with Cluster(""):
          s3_bucket = S3("S3") 
          s3_bucket - React("React App")

        cdn - ACM("ACM")
        cdn >> s3_bucket
    
    att = { "bgcolor": "transparent", "pencolor": "transparent" }
    with Cluster(""):
      api = APIGateway("API Gateway")
      lambda_sub = Lambda("Lambda")

      api >> SQS("SQS") >> lambda_sub

      lambda_sub >> Cloudwatch("Cloudwatch")
      lambda_sub >> SQS("SQS (Dead Letter Queue)") << Edge(label="Check > 0 every hour") << CloudwatchAlarm("Alarm") >> SES("SES")

  user >> route_53 >> [cdn, api]

  github_action_s3 >> Edge(taillabel="\t\tGets bucket role") >> iam_role_s3
  github_action_s3 >> Edge(taillabel="\t\tDeploys react app to S3 and invalidate cloudfront cache") >> s3_bucket

  github_action_lambda >> Edge(label="Get lambda role") >> iam_role_lambda
  github_action_lambda >> Edge(label="Deploys lambda") >> lambda_sub
