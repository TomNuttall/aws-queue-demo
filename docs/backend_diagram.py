from diagrams import Cluster, Diagram, Edge
from diagrams.aws.security import ACM, IAM, Cognito
from diagrams.aws.compute import Lambda
from diagrams.aws.management import Cloudwatch, CloudwatchAlarm
from diagrams.aws.engagement import SimpleEmailServiceSesEmail
from diagrams.aws.integration import SQS, SNS
from diagrams.aws.general import User
from diagrams.aws.network import Route53, APIGateway
from diagrams.onprem.ci import GithubActions

with Diagram("", filename="backend_diagram", outformat="png"):
  user = User("User")
  github_action_lambda = GithubActions("Github Action")
    
  with Cluster("AWS"):
    route_53 = Route53("Route53")
    iam_role_lambda = IAM("IAM")
    cognito_userpool = Cognito("Cognito")

    with Cluster(""):
      api = APIGateway("API Gateway")
      lambda_sub = Lambda("Lambda")

    
      api - ACM("ACM")
      api >> SQS("SQS") << Edge(label="Poll") << lambda_sub

      lambda_sub >> Cloudwatch("Cloudwatch")

      with Cluster(""):
        lambda_sub >> Edge(label="Throws Error\t\t") >> SQS("SQS (Dead Letter Queue)") << Edge(label="Check > 0 every hour") << CloudwatchAlarm("Alarm") >> SNS("SNS") >> Edge(label="Send Email") >> SimpleEmailServiceSesEmail("Email")

  user >> Edge(label="/ POST\n(JWT)") >> route_53 >> api
  user >> Edge(label="Username/Password") >> cognito_userpool
  user << Edge(label="JWT") << cognito_userpool

  github_action_lambda >> iam_role_lambda
  github_action_lambda >> Edge(label="Deploys lambda") >> lambda_sub
