from diagrams import Cluster, Diagram, Edge
from diagrams.aws.security import IAM
from diagrams.aws.compute import Lambda
from diagrams.aws.management import Cloudwatch, CloudwatchAlarm
from diagrams.aws.integration import SNS, SQS, SimpleQueueServiceSqsQueue
from diagrams.aws.engagement import SES
from diagrams.aws.general import User
from diagrams.onprem.ci import GithubActions

with Diagram("", filename="aws_architecture-diagram", outformat="png"):
  user = User("User")
  github_action_lambda = GithubActions("Github Action")
    
  with Cluster("AWS"):
    iam_role_lambda = IAM("IAM")
    
    att = { "bgcolor": "transparent", "pencolor": "transparent" }
    with Cluster(""):
      lambda_pub = Lambda("Lambda")
      lambda_sub = Lambda("Lambda")

      lambda_pub >> SNS("SNS") >> SimpleQueueServiceSqsQueue("SQS") >> lambda_sub
      lambda_pub >> Cloudwatch("Cloudwatch")

      lambda_sub >> Cloudwatch("Cloudwatch")
      lambda_sub >> SimpleQueueServiceSqsQueue("SQS (Dead Letter Queue)") << Edge(label="Check > 0 every hour") << CloudwatchAlarm("Alarm") >> SES("SES")

  user >> Edge(label="") >>lambda_pub

  github_action_lambda >> Edge(label="Get lambda role") >> iam_role_lambda
  github_action_lambda >> Edge(headlabel="\nDeploys lambda\t\t", style="dotted") >> [lambda_pub, lambda_sub]
