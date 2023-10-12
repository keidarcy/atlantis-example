import { Construct } from 'constructs';
import { App, S3Backend, TerraformStack } from 'cdktf';
import { provider } from '@cdktf/provider-aws';
import { S3Bucket } from './.gen/providers/aws/s3-bucket';

const isProd = process.env.CDK_ENV === 'prod';
const cdkEnv = isProd ? 'prod' : 'staging';

class MyStack extends TerraformStack {
  constructor(scope: Construct, id: string) {
    super(scope, id);

    new provider.AwsProvider(this, 'aws_default', {
      region: 'ap-northeast-1',
      accessKey: process.env.AWS_ACCESS_KEY,
      secretKey: process.env.AWS_SECRET_KEY,
    });

    new S3Backend(this, {
      bucket: 'meetsmore-dev-tfstates',
      key: `test-cdk-tf/terraform.tfstate`,
      region: 'ap-northeast-1',
    });

    new S3Bucket(this, 'bucket', {
      bucket: '92b41cd5e76feb8b196472eac0b89ad4c89bd36a8edc552ea178d6e9f21c15cd',
    });
  }
}

class MyStack2 extends TerraformStack {
  constructor(scope: Construct, id: string) {
    super(scope, id);

    new provider.AwsProvider(this, 'aws_default', {
      region: 'ap-northeast-1',
      accessKey: process.env.AWS_ACCESS_KEY,
      secretKey: process.env.AWS_SECRET_KEY,
    });

    new S3Backend(this, {
      bucket: 'meetsmore-dev-tfstates',
      key: `test-cdk-tf/terraform-2.tfstate`,
      region: 'ap-northeast-1',
    });

    new S3Bucket(this, 'bucket', {
      bucket: '04c2b2a313950d5fd609424faa1cb98e50b54af114029bbf934ee3a81e39c186',
    });
  }
}

const app = new App();
new MyStack(app, `stack-1-${cdkEnv}`);
new MyStack2(app, `stack-2-${cdkEnv}`);
app.synth();
