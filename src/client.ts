import { Connection, Client } from '@temporalio/client';
import { example, user } from './workflows';
import { nanoid } from 'nanoid';

export async function run(username: string) {
  // Connect to the default Server location (localhost:7233)
  const connection = await Connection.connect();
  // In production, pass options to configure TLS and other settings:
  // {
  //   address: 'foo.bar.tmprl.cloud',
  //   tls: {}
  // }

  const client = new Client({
    connection,
    // namespace: 'foo.bar', // connects to 'default' namespace if not specified
  });

  const handle = await client.workflow.start(example, {
    // type inference works! args: [name: string]
    args: [username],
    taskQueue: 'hello-world',
    // in practice, use a meaningful business ID, like customerId or transactionId
    workflowId: 'workflow-' + username + '-' + nanoid(),
  });
  console.log(`Started workflow ${handle.workflowId}`);

  // optional: wait for client result
  console.log(await handle.result()); // Hello, Temporal!
  return await handle.result();
}


export async function runGetUserWorkflow(userId: number) {
  // Connect to the default Server location (localhost:7233)
  const connection = await Connection.connect();
  // In production, pass options to configure TLS and other settings:
  // {
  //   address: 'foo.bar.tmprl.cloud',
  //   tls: {}
  // }

  const client = new Client({
    connection,
    // namespace: 'foo.bar', // connects to 'default' namespace if not specified
  });

  const handle = await client.workflow.start(user, {
    // type inference works! args: [name: string]
    args: [userId],
    taskQueue: 'hello-world',
    // in practice, use a meaningful business ID, like customerId or transactionId
    workflowId: 'user-workflow-' + userId + '-' + nanoid(),
  });
  console.log(`Started workflow ${handle.workflowId}`);

  // optional: wait for client result
  return await handle.result();
}
